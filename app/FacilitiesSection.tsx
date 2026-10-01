"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

type FacilityRow = {
  id: string;
  icon: string;
  title: string;
  sort_order: number;
  image_url: string | null;
};

export default function FacilitiesSection() {
  const [facilities, setFacilities] = useState<FacilityRow[]>([]);

  useEffect(() => {
    async function loadFacilities() {
      const { data } = await supabase
        .from("facilities")
        .select("*")
        .order("sort_order", { ascending: true });
      if (data) setFacilities(data as FacilityRow[]);
    }
    loadFacilities();
  }, []);

  return (
    <section id="facilities" className="mx-auto max-w-7xl px-6 md:px-10 py-20">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Facilities
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-800">
          Everything a Growing Mind Needs
        </h2>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((item, i) => (
          <div
            key={item.id}
            className={`rounded-3xl bg-gradient-to-br ${
              ["from-orange-50", "from-pink-50", "from-sky-50", "from-purple-50", "from-yellow-50", "from-green-50"][
                i % 6
              ]
            } to-white p-7 flex items-center gap-4`}
          >
            {item.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image_url}
                alt={item.title}
                className="h-12 w-12 rounded-xl object-cover shrink-0"
              />
            ) : (
              <span className="text-3xl">{item.icon}</span>
            )}
            <span className="font-semibold text-slate-700">{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
