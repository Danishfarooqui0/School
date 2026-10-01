"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type AboutRow = {
  heading: string;
  description: string;
  bullet_1: string | null;
  bullet_2: string | null;
  bullet_3: string | null;
  image_url: string | null;
};

const EMPTY: AboutRow = {
  heading: "",
  description: "",
  bullet_1: "",
  bullet_2: "",
  bullet_3: "",
  image_url: null,
};

export default function AboutTab() {
  const [about, setAbout] = useState<AboutRow>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadAbout() {
      setLoading(true);
      const { data } = await supabase
        .from("about_content")
        .select("*")
        .eq("id", "main")
        .single();
      if (data) setAbout(data as AboutRow);
      setLoading(false);
    }
    loadAbout();
  }, []);

  function updateField(field: keyof AboutRow, value: string) {
    setSaved(false);
    setAbout((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `about/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(fileName, file);

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("site-images")
      .getPublicUrl(fileName);

    setSaved(false);
    setAbout((prev) => ({ ...prev, image_url: publicUrlData.publicUrl }));
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploading(false);
  }

  function handleRemoveImage() {
    setSaved(false);
    setAbout((prev) => ({ ...prev, image_url: null }));
  }

  async function handleSave() {
    setSaving(true);
    await supabase
      .from("about_content")
      .update({
        heading: about.heading,
        description: about.description,
        bullet_1: about.bullet_1,
        bullet_2: about.bullet_2,
        bullet_3: about.bullet_3,
        image_url: about.image_url,
      })
      .eq("id", "main");
    setSaving(false);
    setSaved(true);
  }

  if (loading) return <p className="text-slate-500">Loading about content...</p>;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Image
        </label>
        {about.image_url && (
          <div className="relative w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={about.image_url}
              alt="About section"
              className="rounded-xl aspect-[4/5] w-full object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="mt-2 text-xs font-medium text-red-600 hover:underline"
            >
              Remove image
            </button>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          disabled={uploading}
          className="text-sm"
        />
        {uploading && <p className="text-sm text-slate-500">Uploading...</p>}

        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide pt-2">
          Heading
        </label>
        <input
          value={about.heading}
          onChange={(e) => updateField("heading", e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />

        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide pt-2">
          Description
        </label>
        <textarea
          value={about.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />

        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide pt-2">
          Highlight 1
        </label>
        <input
          value={about.bullet_1 ?? ""}
          onChange={(e) => updateField("bullet_1", e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />

        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide pt-2">
          Highlight 2
        </label>
        <input
          value={about.bullet_2 ?? ""}
          onChange={(e) => updateField("bullet_2", e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />

        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide pt-2">
          Highlight 3
        </label>
        <input
          value={about.bullet_3 ?? ""}
          onChange={(e) => updateField("bullet_3", e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {saved && !saving && (
          <span className="ml-3 text-xs text-green-600">Saved — live on the website.</span>
        )}
      </div>
      <p className="text-xs text-slate-400">
        Changes here update live on the website&apos;s About section only after you click Save.
      </p>
    </div>
  );
}
