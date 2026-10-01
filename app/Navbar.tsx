"use client";

import { useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#academics", label: "Academics" },
  { href: "#facilities", label: "Facilities" },
  { href: "#fees", label: "Fees" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between h-20">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Dev Public School"
            width={64}
            height={64}
            className="h-14 w-14 object-contain"
          />
          <span className="text-xl md:text-2xl font-bold text-slate-800">
            Dev Public School
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-orange-500 transition">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#admissions"
            className="hidden sm:inline-block rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 hover:scale-105 transition"
          >
            Admissions Open
          </a>

          {/* Hamburger button (mobile only) */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#admissions"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white text-center mt-2"
          >
            Admissions Open
          </a>
        </div>
      )}
    </nav>
  );
}