import { Link } from "react-router-dom";
import { Zap, Globe, AtSign, Rss, MessageCircle, Send, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../hooks";
import { categories } from "../../data";

const cols = [
  {
    title: "Discover",
    links: [
      { label: "Exclusive Deals", to: "/deals" },
      { label: "Coupon Codes", to: "/coupons" },
      { label: "Products", to: "/products" },
      { label: "Compare", to: "/compare" },
      { label: "Categories", to: "/categories" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "SEO & Organic", to: "/services" },
      { label: "PPC & Paid Media", to: "/services" },
      { label: "Web Development", to: "/services" },
      { label: "Branding", to: "/services" },
      { label: "Analytics & CRO", to: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog & Guides", to: "/blog" },
      { label: "Expert Reviews", to: "/reviews" },
      { label: "Data Studies", to: "/blog" },
      { label: "Media Kit", to: "/advertise" },
      { label: "Search", to: "/search" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Advertise", to: "/advertise" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: "/about" },
      { label: "Press", to: "/about" },
    ],
  },
];

export default function Footer() {
  const { toast } = useApp();
  const [email, setEmail] = useState("");
  return (
    <footer className="border-t border-line bg-white dark:border-white/5 dark:bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Link to="/" className="flex items-center gap-2.5" aria-label="Alphobia home">
              <span className="text-lg font-extrabold tracking-tight text-ink dark:text-white">Alphobia<span className="text-primary">.</span></span>
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-body">
              The performance marketing platform for verified deals, honest reviews and growth that compounds.
            </p>
            <form
              className="mt-5 flex gap-2"
              onSubmit={(e) => { e.preventDefault(); if (email) { toast("You're on the list — welcome! 🎉"); setEmail(""); } }}
            >
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com" aria-label="Email address"
                className="h-10 flex-1 rounded-lg border border-line bg-surface px-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
              <button className="flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark active:scale-95">
                Join <ArrowRight size={14} />
              </button>
            </form>
            <div className="mt-5 flex gap-2">
              {[Globe, AtSign, Rss, MessageCircle, Send].map((Icon, i) => (
                <a key={i} href="#social" aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-faint transition-all hover:border-primary/40 hover:text-primary">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-faint">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-[13px] text-body transition-colors hover:text-primary">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-7 sm:flex-row sm:items-center">
          <p className="text-xs text-faint">© {new Date().getFullYear()} Alphobia Media Inc. Some links are affiliate links — we may earn a commission at no cost to you.</p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-faint"><ShieldCheck size={13} className="text-success" /> Independently tested & verified</span>
        </div>
      </div>
    </footer>
  );
}
