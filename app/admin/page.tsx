"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import EnquiriesTab from "./EnquiriesTab";
import FeesTab from "./FeesTab";
import GalleryTab from "./GalleryTab";
import AboutTab from "./AboutTab";
import FacilitiesTab from "./FacilitiesTab";

type Tab = "enquiries" | "fees" | "gallery" | "about" | "facilities";

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("enquiries");

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/admin/login");
        return;
      }
      setChecking(false);
    }
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/admin/login");
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#fffaf0]">
        <p className="text-slate-500">Checking login...</p>
      </main>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "enquiries", label: "Enquiries" },
    { id: "about", label: "About" },
    { id: "facilities", label: "Facilities" },
    { id: "fees", label: "Fee Structure" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-200 text-slate-600 text-sm font-medium px-5 py-2 hover:bg-slate-50 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-2 mb-8 border-b border-slate-200">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
                tab === t.id
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "enquiries" && <EnquiriesTab />}
        {tab === "about" && <AboutTab />}
        {tab === "facilities" && <FacilitiesTab />}
        {tab === "fees" && <FeesTab />}
        {tab === "gallery" && <GalleryTab />}
      </div>
    </main>
  );
}
