"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type FeeRow = {
  id: string;
  class_name: string;
  admission_fee: string;
  tuition_fee: string;
  total_fee: string;
  sort_order: number;
};

export default function FeesTab() {
  const [fees, setFees] = useState<FeeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function loadFees() {
    setLoading(true);
    const { data } = await supabase
      .from("fees")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setFees(data as FeeRow[]);
    setLoading(false);
  }

  useEffect(() => {
    loadFees();
  }, []);

  function updateField(id: string, field: keyof FeeRow, value: string) {
    setFees((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  }

  async function handleSave(row: FeeRow) {
    setSavingId(row.id);
    await supabase
      .from("fees")
      .update({
        class_name: row.class_name,
        admission_fee: row.admission_fee,
        tuition_fee: row.tuition_fee,
        total_fee: row.total_fee,
      })
      .eq("id", row.id);
    setSavingId(null);
  }

  if (loading) return <p className="text-slate-500">Loading fees...</p>;

  return (
    <div className="space-y-4">
      {fees.map((row) => (
        <div key={row.id} className="rounded-2xl border border-slate-200 p-5 grid gap-3 sm:grid-cols-5 sm:items-center">
          <input
            value={row.class_name}
            onChange={(e) => updateField(row.id, "class_name", e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold"
          />
          <input
            value={row.admission_fee}
            onChange={(e) => updateField(row.id, "admission_fee", e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Admission Fee"
          />
          <input
            value={row.tuition_fee}
            onChange={(e) => updateField(row.id, "tuition_fee", e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Tuition Fee"
          />
          <input
            value={row.total_fee}
            onChange={(e) => updateField(row.id, "total_fee", e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Total Fee"
          />
          <button
            onClick={() => handleSave(row)}
            disabled={savingId === row.id}
            className="rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold py-2.5 disabled:opacity-60"
          >
            {savingId === row.id ? "Saving..." : "Save"}
          </button>
        </div>
      ))}
      <p className="text-xs text-slate-400">
        Changes here update live on the website&apos;s Fee Structure section.
      </p>
    </div>
  );
}
