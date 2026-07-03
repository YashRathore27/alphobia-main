import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ReTooltip } from "recharts";
import { Megaphone, Layout, Newspaper, Mail, Check, ArrowRight, Send } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Container, SectionHeading, Button, Badge, Reveal, CountUpStat } from "../components/ui";
import { TrustedCompanies } from "../components/sections";
import { stats } from "../data";
import { useApp } from "../hooks";
import { cn } from "../utils/cn";

const COLORS = ["#7C3AED", "#EC4899", "#F97316", "#3B82F6", "#22C55E"];

const packages = [
  { icon: Newspaper, name: "Sponsored Content", price: "From $2,900", blurb: "Editorial-grade sponsored reviews and guides, clearly labelled, written by our team.", features: ["2,000+ word feature", "Homepage placement (7 days)", "Newsletter inclusion", "Evergreen SEO placement"] },
  { icon: Layout, name: "Display & Banners", price: "From $1,400/mo", blurb: "Premium, non-intrusive placements across category pages and reviews.", features: ["1.2M+ monthly impressions", "Category targeting", "Viewability reporting", "Creative refresh included"] },
  { icon: Megaphone, name: "Category Takeover", price: "From $6,500", blurb: "Own an entire category for 30 days — every deal page, review and comparison.", features: ["Exclusive category branding", "Featured deal slots", "Comparison placement", "4.1x avg. tracked ROI"] },
  { icon: Mail, name: "Newsletter Sponsorship", price: "From $3,200", blurb: "The Thursday brief reaches 410K opted-in deal hunters with 52% open rates.", features: ["Primary sponsor slot", "410K subscribers", "52% avg. open rate", "Click & conversion report"] },
];

export default function Advertise() {
  const { toast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "$5K – $10K", message: "" });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <PageHero
        eyebrow="Advertise · Media Kit" crumbs={[{ label: "Advertise" }]}
        title="Reach 2.4M buyers at the moment of decision"
        subtitle="Alphobia readers arrive with purchase intent — 76% are actively researching a purchase. Put your brand exactly where decisions happen."
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button as="a" href="#contact-form" variant="accent" size="lg">Request media kit <ArrowRight size={16} /></Button>
          <Button as="a" href="#packages" variant="outline" size="lg">View packages</Button>
        </div>
      </PageHero>

      <TrustedCompanies label="Brands that grow with Alphobia" />

      {/* audience stats */}
      <Container className="py-24">
        <SectionHeading eyebrow="Audience" title="An audience that converts"
          subtitle="Independently verified traffic and engagement metrics, updated monthly." />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {stats.audience.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="card-base card-hover h-full p-6">
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</p>
                  <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-slate-400">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="card-base p-7">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Audience by interest</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.audienceSplit} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={4} cornerRadius={8}>
                    {stats.audienceSplit.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <ReTooltip contentStyle={{ borderRadius: 16, border: "1px solid rgba(148,163,184,.2)", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {stats.audienceSplit.map((s, i) => (
                <span key={s.name} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} /> {s.name} · {s.value}%
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      {/* packages */}
      <section className="bg-white py-24 dark:bg-white/[0.02]" id="packages">
        <Container>
          <SectionHeading eyebrow="Packages" title="Four ways to show up"
            subtitle="Every placement is clearly labelled as sponsored — trust is why our audience converts." />
          <div className="grid gap-6 md:grid-cols-2">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="card-base card-hover flex h-full flex-col p-8">
                  <div className="flex items-start justify-between">
                    <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-indigo-600 p-3.5 text-white shadow-lg shadow-primary/25"><p.icon size={22} /></span>
                    <Badge tone="blue">{p.price}</Badge>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{p.blurb}</p>
                  <ul className="mt-5 grid flex-1 gap-2.5 sm:grid-cols-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Check size={15} className="mt-0.5 shrink-0 text-success" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button as="a" href="#contact-form" variant="soft" className="mt-7 w-full">Enquire about {p.name}</Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* contact form */}
      <Container className="py-24" id="contact-form">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Let's talk" title="Tell us about your campaign"
              subtitle="Our partnerships team replies within one business day with availability, rates and audience fit." className="!mb-8" />
            <div className="space-y-4">
              {[["📊", "Full media kit with verified analytics"], ["🎯", "Custom targeting recommendations"], ["🤝", "Dedicated partnerships manager"]].map(([e, t]) => (
                <div key={t} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-900/5 dark:bg-slate-800/70 dark:ring-white/10">
                  <span className="text-2xl">{e}</span>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t}</p>
                </div>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <form
              className="card-base space-y-4 p-8"
              onSubmit={(e) => { e.preventDefault(); toast("Request sent! Our partnerships team will reply within 24h 🚀"); setForm({ name: "", email: "", company: "", budget: "$5K – $10K", message: "" }); }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input required value={form.name} onChange={update("name")} placeholder="Your name" aria-label="Your name" className="h-12 rounded-2xl border border-slate-200 bg-surface px-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:text-white" />
                <input required type="email" value={form.email} onChange={update("email")} placeholder="Work email" aria-label="Work email" className="h-12 rounded-2xl border border-slate-200 bg-surface px-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:text-white" />
              </div>
              <input required value={form.company} onChange={update("company")} placeholder="Company / brand" aria-label="Company" className="h-12 w-full rounded-2xl border border-slate-200 bg-surface px-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:text-white" />
              <select value={form.budget} onChange={update("budget")} aria-label="Monthly budget" className="h-12 w-full cursor-pointer rounded-2xl border border-slate-200 bg-surface px-4 text-sm outline-none transition-all focus:border-primary/50 dark:border-white/10 dark:bg-white/5 dark:text-white">
                {["Under $5K", "$5K – $10K", "$10K – $25K", "$25K – $50K", "$50K+"].map((b) => <option key={b}>{b}</option>)}
              </select>
              <textarea required rows={4} value={form.message} onChange={update("message")} placeholder="What are you promoting, and what does success look like?" aria-label="Message" className="w-full rounded-2xl border border-slate-200 bg-surface p-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:text-white" />
              <Button type="submit" size="lg" variant="accent" className="w-full">Send enquiry <Send size={15} /></Button>
            </form>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
