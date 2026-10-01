import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import FacilitiesSection from "./FacilitiesSection";
import FeesSection from "./FeesSection";
import GallerySection from "./GallerySection";
import ContactForm from "./ContactForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#fffaf0] text-slate-800">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-yellow-200/60 blur-2xl" />
        <div className="pointer-events-none absolute top-40 -right-16 h-80 w-80 rounded-full bg-pink-200/60 blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-200/50 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block rounded-full bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 mb-5">
              Admissions Open for 2026–27
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-slate-800">
              Where Every Child
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Loves to Learn
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-lg">
              Nurturing curious minds from Nursery to Class 12 with a joyful,
              modern, and value-based education since 1998.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#admissions"
                className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 hover:scale-105 transition"
              >
                Apply for Admission
              </a>
              <a
                href="#about"
                className="rounded-full border-2 border-slate-200 px-8 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Take a Tour
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <p className="text-3xl font-bold text-orange-500">25+</p>
                <p className="text-xs text-slate-500 mt-1">Years of Excellence</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-pink-500">1200+</p>
                <p className="text-xs text-slate-500 mt-1">Happy Students</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-500">98%</p>
                <p className="text-xs text-slate-500 mt-1">Board Results</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2.5rem] bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200 p-3 shadow-2xl">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5]">
                <Image
                  src="/school.png"
                  alt="Dev Public School campus"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">CBSE Affiliated</p>
                <p className="text-xs text-slate-500">Recognized Board</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />

      {/* Academics */}
      <section id="academics" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              Academics
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-800">
              Programs for Every Age Group
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🧸", title: "Pre-Primary", desc: "Nursery – UKG. Play-based learning that builds strong foundations.", bg: "bg-orange-100" },
              { icon: "✏️", title: "Primary", desc: "Class 1 – 5. Building core skills in a fun, engaging way.", bg: "bg-pink-100" },
              { icon: "🧪", title: "Middle School", desc: "Class 6 – 8. Exploring science, tech, and critical thinking.", bg: "bg-sky-100" },
              { icon: "🎓", title: "Senior School", desc: "Class 9 – 12. Science, Commerce & Humanities streams.", bg: "bg-purple-100" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-100 p-7 hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className={`h-14 w-14 rounded-2xl ${item.bg} flex items-center justify-center text-2xl mb-5`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FacilitiesSection />

      <FeesSection />

      {/* Admissions CTA */}
      <section id="admissions" className="mx-auto max-w-7xl px-6 md:px-10 pb-20">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 px-8 py-14 md:px-16 text-center text-white relative overflow-hidden">
          <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-white/10" />
          <h2 className="text-3xl md:text-4xl font-bold relative">
            Admissions Open for 2026–27
          </h2>
          <p className="mt-4 text-white/90 max-w-xl mx-auto relative">
            Give your child the best start. Limited seats available across all
            classes — apply today.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-full bg-white text-orange-600 font-semibold px-8 py-3.5 hover:scale-105 transition relative"
          >
            Enquire Now
          </a>
        </div>
      </section>

      <GallerySection />

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              Contact Us
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-800">
              Get in Touch
            </h2>
            <p className="mt-4 text-slate-600">
              Have questions about admissions or our programs? We&apos;d love
              to hear from you.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-orange-100 flex items-center justify-center">📍</div>
                <p className="text-slate-700">123 Education Lane, Your City, India</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-pink-100 flex items-center justify-center">📞</div>
                <p className="text-slate-700">+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-purple-100 flex items-center justify-center">✉️</div>
                <p className="text-slate-700">info@devpublicschool.edu</p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm">
        © 2026 Dev Public School. All rights reserved.
      </footer>
    </main>
  );
}