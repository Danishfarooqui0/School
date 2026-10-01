"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

type FeeRow = {
  id: string;
  class_name: string;
  admission_fee: string;
  tuition_fee: string;
  total_fee: string;
  sort_order: number;
};

export default function FeesSection() {
  const [fees, setFees] = useState<FeeRow[]>([]);

  useEffect(() => {
    async function loadFees() {
      const { data } = await supabase
        .from("fees")
        .select("*")
        .order("sort_order", { ascending: true });
      if (data) setFees(data as FeeRow[]);
    }
    loadFees();
  }, []);

  return (
    <section id="fees" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Fee Structure
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-800">
            Transparent &amp; Affordable Fees
          </h2>
          <p className="mt-4 text-slate-500 text-sm">
            Annual fee structure for the 2026–27 academic session.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                <th className="px-6 py-4 font-semibold">Class</th>
                <th className="px-6 py-4 font-semibold">Admission Fee</th>
                <th className="px-6 py-4 font-semibold">Tuition Fee (Annual)</th>
                <th className="px-6 py-4 font-semibold">Total (First Year)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fees.map((row, i) => (
                <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-orange-50/40"}>
                  <td className="px-6 py-4 font-semibold text-slate-800">{row.class_name}</td>
                  <td className="px-6 py-4 text-slate-600">{row.admission_fee}</td>
                  <td className="px-6 py-4 text-slate-600">{row.tuition_fee}</td>
                  <td className="px-6 py-4 font-semibold text-orange-600">{row.total_fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
          <div className="rounded-2xl bg-orange-50 p-5 flex items-start gap-3">
            <span className="text-xl">💳</span>
            <p className="text-slate-600">
              Fees can be paid quarterly, half-yearly, or annually.
            </p>
          </div>
          <div className="rounded-2xl bg-pink-50 p-5 flex items-start gap-3">
            <span className="text-xl">🚌</span>
            <p className="text-slate-600">
              Transport &amp; uniform charges are billed separately.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-50 p-5 flex items-start gap-3">
            <span className="text-xl">🎓</span>
            <p className="text-slate-600">
              Sibling &amp; merit-based fee concessions available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
