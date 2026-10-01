"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

type GalleryRow = {
  id: string;
  image_url: string;
  caption: string | null;
};

export default function GallerySection() {
  const [images, setImages] = useState<GalleryRow[]>([]);

  useEffect(() => {
    async function loadImages() {
      const { data } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setImages(data as GalleryRow[]);
    }
    loadImages();
  }, []);

  return (
    <section id="gallery" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Gallery
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-800">
            Life at Our School
          </h2>
        </div>

        {images.length === 0 ? (
          <p className="mt-12 text-center text-slate-500">
            Photos coming soon.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={img.id}
                src={img.image_url}
                alt={img.caption ?? ""}
                className="rounded-2xl aspect-square w-full object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
