"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type GalleryRow = {
  id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
};

export default function GalleryTab() {
  const [images, setImages] = useState<GalleryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadImages() {
    setLoading(true);
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setImages(data as GalleryRow[]);
    setLoading(false);
  }

  useEffect(() => {
    loadImages();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    await supabase.from("gallery").insert({
      image_url: publicUrlData.publicUrl,
      caption: caption || null,
    });

    setCaption("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploading(false);
    loadImages();
  }

  async function handleDelete(row: GalleryRow) {
    if (!confirm("Delete this photo?")) return;

    const path = row.image_url.split("/gallery/")[1];
    if (path) {
      await supabase.storage.from("gallery").remove([path]);
    }
    await supabase.from("gallery").delete().eq("id", row.id);
    setImages((prev) => prev.filter((img) => img.id !== row.id));
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          disabled={uploading}
          className="text-sm"
        />
        {uploading && <p className="text-sm text-slate-500">Uploading...</p>}
      </div>

      {loading ? (
        <p className="text-slate-500">Loading gallery...</p>
      ) : images.length === 0 ? (
        <p className="text-slate-500">No photos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="rounded-2xl overflow-hidden border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.image_url} alt={img.caption ?? ""} className="w-full aspect-square object-cover" />
              <div className="p-3 flex items-center justify-between gap-2">
                <p className="text-xs text-slate-500 truncate">{img.caption || "—"}</p>
                <button
                  onClick={() => handleDelete(img)}
                  className="text-xs font-medium text-red-600 hover:underline shrink-0"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
