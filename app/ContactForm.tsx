"use client";

import { useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function ContactForm() {
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [classInterested, setClassInterested] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("enquiries").insert({
      student_name: studentName,
      parent_name: parentName,
      phone,
      class_interested: classInterested,
      message,
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("success");
    setStudentName("");
    setParentName("");
    setPhone("");
    setClassInterested("");
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-slate-50 p-8 space-y-4">
      <input
        type="text"
        placeholder="Student's Name"
        required
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <input
        type="text"
        placeholder="Parent's Name"
        required
        value={parentName}
        onChange={(e) => setParentName(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <input
        type="text"
        placeholder="Class Interested In"
        value={classInterested}
        onChange={(e) => setClassInterested(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <textarea
        placeholder="Message"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3.5 hover:scale-[1.02] transition disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Enquiry"}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-600 text-center">
          Thank you! We&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
