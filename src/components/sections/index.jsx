import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { Container, SectionHeading, CountUpStat, Reveal } from "../ui";
import { TestimonialCard } from "../cards";
import { companies, testimonials, stats } from "../../data";
import { useApp } from "../../hooks";

/* --------------------------- trusted companies -------------------------- */
export function TrustedCompanies({ label = "Trusted by teams & shoppers from the world's best brands" }) {
  const row = [...companies, ...companies];
  return (
    <section className="border-y border-line bg-white/60 py-10 dark:border-white/5 dark:bg-white/[0.02]" aria-label="Trusted companies">
      <Container>
        <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.2em] text-faint">{label}</p>
      </Container>
      <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)" }}>
        <div className="flex w-max animate-marquee items-center gap-14 px-7">
          {row.map((c, i) => (
            <span key={`${c.id}-${i}`} className="flex items-center gap-3 text-lg font-bold text-slate-700 dark:text-slate-300 transition-all duration-300">
              <img src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=64`} alt={`${c.name} logo`} loading="lazy" className="h-7 w-7 rounded-md object-contain" />
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- client results ---------------------------- */
const chartTooltip = { contentStyle: { borderRadius: 16, border: "1px solid rgba(236,238,245,.9)", background: "rgba(255,255,255,.95)", fontSize: 12, boxShadow: "0 12px 32px -8px rgba(124,58,237,.10)" } };

export function ClientResults() {
  return (
    <section className="bg-ink py-24 text-white">
      <Container>
        <SectionHeading
          eyebrow="Client Success"
          title="Numbers our clients brag about"
          subtitle="Aggregated performance across 380+ growth engagements — measured, verified, and audited quarterly."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {stats.clientResults.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  <CountUpStat value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals || 0} />
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-slate-400">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-sm font-bold text-white">Traffic growth — trailing 12 months</h3>
            <p className="mb-5 text-xs text-slate-400">Sessions (thousands), median client</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.trafficGrowth}>
                  <defs>
                    <linearGradient id="organicG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="paidG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EC4899" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#EC4899" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} width={34} />
                  <ReTooltip {...chartTooltip} />
                  <Area type="monotone" dataKey="organic" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#organicG)" name="Organic" />
                  <Area type="monotone" dataKey="paid" stroke="#EC4899" strokeWidth={2.5} fill="url(#paidG)" name="Paid" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-sm font-bold text-white">Blended ROAS by channel</h3>
            <p className="mb-5 text-xs text-slate-400">Return on ad spend, last quarter</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.campaignPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" vertical={false} />
                  <XAxis dataKey="channel" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                  <ReTooltip {...chartTooltip} cursor={{ fill: "rgba(255,255,255,.04)" }} />
                  <Bar dataKey="roas" radius={[10, 10, 4, 4]} fill="#7C3AED" name="ROAS (x)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------ testimonials ----------------------------- */
export function TestimonialsSection({ count = 12 }) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Wall of Love"
          title="Loved by shoppers. Trusted by brands."
          subtitle="30,000+ five-star experiences from deal hunters, founders and marketing teams."
        />
      </Container>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1.1}
        centeredSlides={false}
        spaceBetween={20}
        loop
        autoplay={{ delay: 3600, disableOnInteraction: false }}
        breakpoints={{ 640: { slidesPerView: 2.1 }, 1024: { slidesPerView: 3.2 }, 1440: { slidesPerView: 3.8 } }}
        className="!px-6 lg:!px-16"
        aria-label="Testimonials carousel"
      >
        {testimonials.slice(0, count).map((t) => (
          <SwiperSlide key={t.id} className="!h-auto py-2">
            <TestimonialCard t={t} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

/* ------------------------------- newsletter ------------------------------ */
export function NewsletterCTA() {
  const { toast } = useApp();
  const [email, setEmail] = useState("");
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-indigo-600 p-10 text-white shadow-2xl shadow-primary/30 sm:p-16">
            <div className="relative max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                <Sparkles size={13} /> Weekly deal brief
              </span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
                The best 1% of deals, delivered every Thursday.
              </h2>
              <p className="mt-3 text-white/85">
                Join 410,000+ subscribers. Zero spam, one email a week, unsubscribe anytime. Average reader saves $214/month.
              </p>
              <form
                className="mt-7 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => { e.preventDefault(); if (email) { toast("Subscribed! Check your inbox on Thursday 💌"); setEmail(""); } }}
              >
                <div className="relative flex-1">
                  <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                  <input
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com" aria-label="Email address"
                    className="h-13 w-full rounded-xl border border-white/25 bg-white/15 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/60 outline-none transition-all focus:border-white/60 focus:bg-white/20"
                  />
                </div>
                <button className="inline-flex h-13 items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-primary shadow-xl transition-all hover:shadow-2xl active:scale-95">
                  Subscribe free <ArrowRight size={15} />
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
