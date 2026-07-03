import { Check, ArrowRight, Sparkles } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Container, SectionHeading, Button, Accordion, Badge, Reveal } from "../components/ui";
import { ServiceCard } from "../components/cards";
import { ClientResults, TrustedCompanies, TestimonialsSection } from "../components/sections";
import { services } from "../data";
import { cn } from "../utils/cn";

const process = [
  { step: "01", title: "Discovery & Audit", text: "We tear down your funnel, analytics and competitive landscape in a free 10-page audit." },
  { step: "02", title: "Strategy Sprint", text: "A 2-week sprint produces your growth roadmap with channel priorities and forecasts." },
  { step: "03", title: "Launch & Learn", text: "Campaigns go live with weekly experiment cycles and transparent reporting." },
  { step: "04", title: "Scale What Works", text: "Winning channels get compounding budget; losers get killed fast. No vanity metrics." },
];

const pricing = [
  { name: "Starter", price: 990, blurb: "For early teams validating channels.", features: ["1 growth channel", "Monthly strategy call", "Core analytics setup", "Email support", "Quarterly audit"], popular: false },
  { name: "Growth", price: 2490, blurb: "Our most popular full-funnel plan.", features: ["3 growth channels", "Weekly strategy calls", "Landing page sprints", "Creative production", "Dedicated growth lead", "Slack access"], popular: true },
  { name: "Scale", price: 5900, blurb: "For brands past $2M ARR ready to dominate.", features: ["Unlimited channels", "Embedded growth squad", "Full creative studio", "CRO & experimentation", "Custom reporting suite", "Priority everything"], popular: false },
];

const faqs = [
  { q: "How fast will we see results?", a: "Paid channels typically show signal within 2–4 weeks. SEO and content compound over 3–6 months. Every engagement starts with a forecast so expectations are explicit from day one." },
  { q: "Do you require long-term contracts?", a: "No. All plans are month-to-month after an initial 90-day ramp period. 92% of clients stay longer than a year — retention is our sales team." },
  { q: "Who will actually work on our account?", a: "A dedicated growth lead plus specialists per channel. No account-manager telephone games — you talk directly to the people doing the work." },
  { q: "What does the free marketing audit include?", a: "A 10-page teardown of your funnel, analytics hygiene, channel efficiency and 3 quick-win opportunities. No strings attached, delivered within 5 business days." },
  { q: "Can you work with our in-house team?", a: "Absolutely. Roughly half of our engagements are hybrid — we plug into existing teams for strategy, creative or specific channels." },
];

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Marketing Services" crumbs={[{ label: "Services" }]}
        title="The growth engine behind Alphobia — for your brand"
        subtitle="380+ engagements. 5.8x average blended ROAS. The same performance team that grew Alphobia to 2.4M monthly readers, working on your funnel."
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button to="/contact" variant="accent" size="lg">Get Free Marketing Audit <ArrowRight size={16} /></Button>
          <Button as="a" href="#pricing" variant="outline" size="lg">View pricing</Button>
        </div>
      </PageHero>

      <TrustedCompanies label="Growth partners to category leaders" />

      <Container className="py-24">
        <SectionHeading eyebrow="Capabilities" title="Every channel. One accountable team."
          subtitle="Pick a single channel or hand us the whole funnel — pricing scales with scope, not headcount." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </Container>

      <section className="bg-white py-24 dark:bg-white/[0.02]">
        <Container>
          <SectionHeading eyebrow="Process" title="From audit to scale in four moves" />
          <div className="grid gap-6 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="card-base card-hover relative h-full overflow-hidden p-7">
                  <span className="absolute -right-3 -top-5 text-7xl font-extrabold text-slate-100 dark:text-white/5">{p.step}</span>
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-sm font-extrabold text-primary">{p.step}</span>
                  <h3 className="relative mt-4 font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-24" id="pricing">
        <SectionHeading eyebrow="Pricing" title="Transparent plans, zero lock-in"
          subtitle="Month-to-month after a 90-day ramp. Cancel anytime — 92% don't." />
        <div className="grid gap-6 lg:grid-cols-3">
          {pricing.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <div className={cn("card-base relative flex h-full flex-col p-8", tier.popular && "border-2 border-primary ring-0")}>
                {tier.popular && (
                  <Badge tone="blue" className="absolute -top-3 left-1/2 -translate-x-1/2 !bg-primary !text-white shadow-lg shadow-primary/30">
                    <Sparkles size={11} /> Most popular
                  </Badge>
                )}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{tier.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{tier.blurb}</p>
                <p className="mt-5"><span className="text-4xl font-extrabold text-slate-900 dark:text-white">${tier.price.toLocaleString()}</span><span className="text-sm text-slate-400">/month</span></p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success"><Check size={12} /></span>{f}
                    </li>
                  ))}
                </ul>
                <Button to="/contact" variant={tier.popular ? "accent" : "outline"} size="lg" className="mt-8 w-full">Start with {tier.name}</Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <ClientResults />
      <TestimonialsSection count={9} />

      <Container className="pb-24">
        <SectionHeading eyebrow="FAQ" title="Questions, answered honestly" />
        <Accordion items={faqs} className="mx-auto max-w-3xl" />
        <Reveal className="mx-auto mt-16 max-w-3xl rounded-[2rem] bg-indigo-600 p-10 text-center text-white shadow-2xl shadow-primary/30">
          <h3 className="text-2xl font-extrabold sm:text-3xl">Ready to see what's leaking in your funnel?</h3>
          <p className="mx-auto mt-3 max-w-md text-white/85">Get a free 10-page marketing audit — delivered in 5 business days, no strings attached.</p>
          <Button to="/contact" variant="secondary" size="lg" className="mt-7 !bg-white !text-primary hover:!bg-slate-100">Get Free Marketing Audit <ArrowRight size={16} /></Button>
        </Reveal>
      </Container>
    </>
  );
}
