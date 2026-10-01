"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type FacilityRow = {
  id: string;
  icon: string;
  title: string;
  sort_order: number;
  image_url: string | null;
};

async function uploadFacilityImage(file: File): Promise<string | null> {
  const fileExt = file.name.split(".").pop();
  const fileName = `facilities/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("site-images")
    .upload(fileName, file);

  if (uploadError) {
    alert("Upload failed: " + uploadError.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("site-images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

export default function FacilitiesTab() {
  const [facilities, setFacilities] = useState<FacilityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [newIcon, setNewIcon] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
  const [uploadingNew, setUploadingNew] = useState(false);
  const [adding, setAdding] = useState(false);

  async function loadFacilities() {
    setLoading(true);
    const { data } = await supabase
      .from("facilities")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setFacilities(data as FacilityRow[]);
    setLoading(false);
  }

  useEffect(() => {
    loadFacilities();
  }, []);

  function updateField(id: string, field: "icon" | "title", value: string) {
    setFacilities((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  }

  async function handleRowImageUpload(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(id);
    const url = await uploadFacilityImage(file);
    if (url) {
      setFacilities((prev) =>
        prev.map((row) => (row.id === id ? { ...row, image_url: url } : row))
      );
    }
    setUploadingId(null);
    e.target.value = "";
  }

  function handleRemoveRowImage(id: string) {
    setFacilities((prev) =>
      prev.map((row) => (row.id === id ? { ...row, image_url: null } : row))
    );
  }

  async function handleSave(row: FacilityRow) {
    setSavingId(row.id);
    await supabase
      .from("facilities")
      .update({ icon: row.icon, title: row.title, image_url: row.image_url })
      .eq("id", row.id);
    setSavingId(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this facility?")) return;
    await supabase.from("facilities").delete().eq("id", id);
    setFacilities((prev) => prev.filter((row) => row.id !== id));
  }

  async function handleNewImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingNew(true);
    const url = await uploadFacilityImage(file);
    if (url) setNewImageUrl(url);
    setUploadingNew(false);
    e.target.value = "";
  }

  async function handleAdd() {
    if (!newIcon.trim() || !newTitle.trim()) return;
    setAdding(true);
    const nextSort = facilities.length
      ? Math.max(...facilities.map((f) => f.sort_order)) + 1
      : 1;
    await supabase.from("facilities").insert({
      icon: newIcon.trim(),
      title: newTitle.trim(),
      sort_order: nextSort,
      image_url: newImageUrl,
    });
    setNewIcon("");
    setNewTitle("");
    setNewImageUrl(null);
    setAdding(false);
    loadFacilities();
  }

  if (loading) return <p className="text-slate-500">Loading facilities...</p>;

  return (
    <div className="space-y-4">
      {facilities.map((row) => (
        <div
          key={row.id}
          className="rounded-2xl border border-slate-200 p-5 grid gap-3 sm:grid-cols-[64px_80px_1fr_auto_auto] sm:items-center"
        >
          <div className="flex flex-col items-center gap-1">
            {row.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={row.image_url}
                alt={row.title}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-slate-50 border border-dashed border-slate-200" />
            )}
            <label className="text-[10px] text-orange-600 cursor-pointer hover:underline">
              {uploadingId === row.id ? "..." : row.image_url ? "Change" : "Add photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingId === row.id}
                onChange={(e) => handleRowImageUpload(row.id, e)}
              />
            </label>
            {row.image_url && (
              <button
                onClick={() => handleRemoveRowImage(row.id)}
                className="text-[10px] text-slate-400 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
          <input
            value={row.icon}
            onChange={(e) => updateField(row.id, "icon", e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-center"
            placeholder="Icon"
          />
          <input
            value={row.title}
            onChange={(e) => updateField(row.id, "title", e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Title"
          />
          <button
            onClick={() => handleSave(row)}
            disabled={savingId === row.id}
            className="rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 disabled:opacity-60"
          >
            {savingId === row.id ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="rounded-lg border border-red-200 text-red-600 text-sm font-medium px-4 py-2.5 hover:bg-red-50 transition"
          >
            Delete
          </button>
        </div>
      ))}

      <div className="rounded-2xl border border-dashed border-slate-300 p-5 grid gap-3 sm:grid-cols-[64px_80px_1fr_auto] sm:items-center">
        <div className="flex flex-col items-center gap-1">
          {newImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={newImageUrl} alt="" className="h-12 w-12 rounded-lg object-cover" />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-slate-50 border border-dashed border-slate-200" />
          )}
          <label className="text-[10px] text-orange-600 cursor-pointer hover:underline">
            {uploadingNew ? "..." : "Add photo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploadingNew}
              onChange={handleNewImageUpload}
            />
          </label>
        </div>
        <input
          value={newIcon}
          onChange={(e) => setNewIcon(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-center"
          placeholder="🏫"
        />
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder="New facility name"
        />
        <button
          onClick={handleAdd}
          disabled={adding}
          className="rounded-lg bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 disabled:opacity-60"
        >
          {adding ? "Adding..." : "Add Facility"}
        </button>
      </div>

      <p className="text-xs text-slate-400">
        Changes here (including photos) update live on the website&apos;s Facilities section
        only after you click Save on that row.
      </p>
    </div>
  );
}
