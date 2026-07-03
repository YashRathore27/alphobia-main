import { Target, Eye, HeartHandshake, ArrowRight } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Container, SectionHeading, Button, CountUpStat, Reveal, Avatar } from "../components/ui";
import { TrustedCompanies, TestimonialsSection, NewsletterCTA } from "../components/sections";
import { stats } from "../data";

const timeline = [
  { year: "2019", title: "A spreadsheet of deals", text: "Alphobia starts as a shared spreadsheet of verified deals between three friends in a San Francisco apartment." },
  { year: "2020", title: "The review lab opens", text: "First dedicated testing lab. We buy every product we review — no free samples, no strings." },
  { year: "2021", title: "1M monthly readers", text: "The Thursday newsletter crosses 100K subscribers and the site passes a million monthly readers." },
  { year: "2022", title: "The agency is born", text: "Brands kept asking how we grew. We started doing it for them — Alphobia Growth Services launches." },
  { year: "2024", title: "$10M saved for readers", text: "Cumulative verified reader savings cross eight figures. The deal engine tracks 40,000+ prices daily." },
  { year: "2026", title: "2.4M and counting", text: "640+ brand partners, 380+ growth engagements and a team of 48 across 11 countries." },
];

const team = [
  { name: "Ava Lindqvist", role: "Co-founder & CEO", color: "#7C3AED", bio: "Ex-growth at two unicorns. Still answers reader emails on Fridays." },
  { name: "Marcus Chen", role: "Co-founder & CTO", color: "#EC4899", bio: "Built the deal engine that tracks 40K+ prices a day." },
  { name: "Maya Collins", role: "Head of Editorial", color: "#8B5CF6", bio: "15 years in consumer journalism. Guards the review firewall." },
  { name: "Devon Reyes", role: "Head of Testing Lab", color: "#F59E0B", bio: "Has personally broken 200+ products so you don't have to." },
  { name: "Priya Sharma", role: "VP, Growth Services", color: "#22C55E", bio: "Leads the agency team behind 5.8x average client ROAS." },
  { name: "Sofia Marin", role: "Head of Partnerships", color: "#EC4899", bio: "Keeps 640+ brand relationships honest and win-win." },
  { name: "Ethan Brooks", role: "Design Director", color: "#0EA5E9", bio: "Believes premium design is a trust signal, not decoration." },
  { name: "Hana Sato", role: "AI Tools Editor", color: "#F97316", bio: "Tests every AI tool the day it launches. Sleep optional." },
];

const values = [
  { icon: Target, title: "Our mission", text: "Make every purchase and every marketing dollar demonstrably smarter — with verified data, honest testing and zero dark patterns." },
  { icon: Eye, title: "Our vision", text: "A web where discovery platforms are trusted by default: transparent about money, ruthless about accuracy, delightful to use." },
  { icon: HeartHandshake, title: "Our promise", text: "Commissions never touch verdicts. If a partnership ever conflicts with a reader's interest, the reader wins. Every time." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Alphobia" crumbs={[{ label: "About" }]}
        title="We're the trust layer for smarter buying"
        subtitle="Since 2019, Alphobia has combined a rigorous review lab, a deal-verification engine and a performance marketing team — all built on one principle: the reader wins."
      >
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.headline.map((s) => (
            <div key={s.label} className="card-base p-5">
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                <CountUpStat value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} decimals={s.decimals || 0} />
              </p>
              <p className="mt-1 text-xs font-medium text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <Container className="py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="card-base card-hover h-full p-8">
                <span className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-indigo-600 p-3.5 text-white shadow-lg shadow-primary/25"><v.icon size={22} /></span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="bg-white py-24 dark:bg-white/[0.02]">
        <Container>
          <SectionHeading eyebrow="The Story" title="From spreadsheet to platform" />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute bottom-4 left-5 top-4 w-px bg-gradient-to-b from-primary via-accent to-transparent sm:left-1/2" aria-hidden />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.05} className={`relative flex gap-6 sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:flex-row-reverse sm:pr-10 sm:text-right"} pl-14 sm:pl-0`}>
                  <span className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-primary ring-2 ring-primary/20 dark:bg-slate-800 sm:top-0 ${i % 2 ? "sm:-left-5" : "sm:-right-5 sm:left-auto"}`}>
                    {t.year.slice(2)}
                  </span>
                  <div className="card-base card-hover w-full p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">{t.year}</p>
                    <h3 className="mt-1 font-bold text-slate-900 dark:text-white">{t.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{t.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-24">
        <SectionHeading eyebrow="The Team" title="48 humans, zero egos"
          subtitle="Editors, engineers, analysts and growth leads across 11 countries." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 0.07}>
              <div className="card-base card-hover group h-full p-7 text-center">
                <Avatar name={m.name} color={m.color} size="h-20 w-20" className="mx-auto !text-xl transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-4 font-bold text-slate-900 dark:text-white">{m.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Button to="/contact" variant="outline" size="lg">We're hiring — say hello <ArrowRight size={16} /></Button>
        </Reveal>
      </Container>

      <TrustedCompanies />
      <TestimonialsSection count={9} />
      <NewsletterCTA />
    </>
  );
}
