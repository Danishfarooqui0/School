"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Enquiry = {
  id: string;
  student_name: string | null;
  parent_name: string;
  phone: string;
  class_interested: string | null;
  message: string | null;
  created_at: string;
};

export default function EnquiriesTab() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadEnquiries() {
    setLoading(true);
    const { data } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setEnquiries(data as Enquiry[]);
    setLoading(false);
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    await supabase.from("enquiries").delete().eq("id", id);
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  }

  if (loading) return <p className="text-slate-500">Loading enquiries...</p>;

  if (enquiries.length === 0) {
    return <p className="text-slate-500">No enquiries yet.</p>;
  }

  return (
    <div className="space-y-4">
      {enquiries.map((e) => (
        <div
          key={e.id}
          className="rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
        >
          <div>
            {e.student_name && (
              <p className="font-semibold text-slate-800">{e.student_name}</p>
            )}
            <p className={e.student_name ? "text-sm text-slate-500" : "font-semibold text-slate-800"}>
              Parent: {e.parent_name}
            </p>
            <p className="text-sm text-slate-500">{e.phone}</p>
            {e.class_interested && (
              <p className="text-sm text-slate-500">Class: {e.class_interested}</p>
            )}
            {e.message && <p className="mt-2 text-sm text-slate-600">{e.message}</p>}
            <p className="mt-2 text-xs text-slate-400">
              {new Date(e.created_at).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => handleDelete(e.id)}
            className="shrink-0 rounded-lg border border-red-200 text-red-600 text-sm font-medium px-4 py-2 hover:bg-red-50 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
