"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

type AboutRow = {
  heading: string;
  description: string;
  bullet_1: string | null;
  bullet_2: string | null;
  bullet_3: string | null;
  image_url: string | null;
};

const ICON_BG = ["bg-orange-100", "bg-pink-100", "bg-sky-100", "bg-purple-100"];
const BULLET_BG = ["bg-orange-100 text-orange-600", "bg-pink-100 text-pink-600", "bg-purple-100 text-purple-600"];

export default function AboutSection() {
  const [about, setAbout] = useState<AboutRow | null>(null);

  useEffect(() => {
    async function loadAbout() {
      const { data } = await supabase
        .from("about_content")
        .select("*")
        .eq("id", "main")
        .single();
      if (data) setAbout(data as AboutRow);
    }
    loadAbout();
  }, []);

  const bullets = about
    ? [about.bullet_1, about.bullet_2, about.bullet_3].filter(
        (b): b is string => !!b
      )
    : [];

  return (
    <section id="about" className="mx-auto max-w-7xl px-6 md:px-10 py-20">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        {about?.image_url ? (
          <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={about.image_url}
              alt={about.heading}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {["📚", "🎨", "⚽", "🔬"].map((icon, i) => (
              <div
                key={icon}
                className={`rounded-3xl ${ICON_BG[i]} aspect-square flex items-center justify-center text-6xl ${
                  i === 1 ? "mt-8" : i === 2 ? "-mt-8" : ""
                }`}
              >
                {icon}
              </div>
            ))}
          </div>
        )}
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            About Us
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-800">
            {about?.heading ?? ""}
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            {about?.description ?? ""}
          </p>
          <ul className="mt-6 space-y-3">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                <span
                  className={`h-6 w-6 rounded-full ${BULLET_BG[i]} flex items-center justify-center text-xs`}
                >
                  ✓
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
