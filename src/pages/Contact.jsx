import { useState } from "react";
import { Mail, MapPin, Phone, Clock, Send, MessageSquareHeart } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Container, SectionHeading, Button, Accordion, Reveal } from "../components/ui";
import { useApp } from "../hooks";

const info = [
  { icon: Mail, label: "Email us", value: "hello@alphobia.media", sub: "Replies within one business day" },
  { icon: Phone, label: "Call us", value: "+1 (415) 555-0192", sub: "Mon–Fri, 9am–6pm PT" },
  { icon: MapPin, label: "Visit us", value: "548 Market St, San Francisco", sub: "By appointment only" },
  { icon: Clock, label: "Support hours", value: "24/5 live chat", sub: "Weekend email support" },
];

const faqs = [
  { q: "How do I submit a deal or coupon?", a: "Use this form with subject 'Deal submission'. Our verification team tests every submission within 24 hours before it can go live." },
  { q: "A coupon code didn't work — what now?", a: "Report it via the form and we'll pull it within the hour. Codes are machine-tested daily, but merchants occasionally end promotions early." },
  { q: "How does the free marketing audit work?", a: "Tell us your website and goals. Within 5 business days you'll receive a 10-page teardown covering funnel, analytics and 3 quick wins — completely free." },
  { q: "Do you accept guest posts?", a: "We accept data-driven contributions from practitioners. Pitch your idea with an outline — our editors respond to every serious pitch." },
  { q: "How is Alphobia funded?", a: "Affiliate commissions and clearly-labelled advertising. Commissions never influence scores, rankings or editorial verdicts — independence is our entire moat." },
];

export default function Contact() {
  const { toast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", subject: "General enquiry", message: "" });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <PageHero
        eyebrow="Contact" crumbs={[{ label: "Contact" }]}
        title="Say hello — we actually reply"
        subtitle="Deal submissions, partnership ideas, audit requests or just feedback. Average first response: 4 hours."
      />
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {info.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.07}>
                <div className="card-base card-hover flex items-center gap-4 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><c.icon size={20} /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{c.label}</p>
                    <p className="font-bold text-slate-900 dark:text-white">{c.value}</p>
                    <p className="text-xs text-slate-400">{c.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            {/* map placeholder */}
            <Reveal delay={0.3}>
              <div className="relative h-64 overflow-hidden rounded-xl bg-indigo-600" role="img" aria-label="Office location map">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(100,116,139,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,.25) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
                <div className="absolute left-1/3 top-0 h-full w-4 -skew-x-12 bg-white/40 dark:bg-white/10" />
                <div className="absolute left-0 top-1/2 h-3 w-full bg-white/40 dark:bg-white/10" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                  <span className="relative flex flex-col items-center">
                    <span className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white shadow-xl dark:bg-white dark:text-slate-900">Alphobia HQ</span>
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40"><MapPin size={18} /></span>
                  </span>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form
              className="card-base space-y-4 p-8"
              onSubmit={(e) => { e.preventDefault(); toast("Message sent! We'll reply within one business day 💬"); setForm({ name: "", email: "", subject: "General enquiry", message: "" }); }}
            >
              <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900 dark:text-white"><MessageSquareHeart size={22} className="text-primary" /> Send a message</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required value={form.name} onChange={update("name")} placeholder="Your name" aria-label="Your name" className="h-12 rounded-2xl border border-slate-200 bg-surface px-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:text-white" />
                <input required type="email" value={form.email} onChange={update("email")} placeholder="Email address" aria-label="Email address" className="h-12 rounded-2xl border border-slate-200 bg-surface px-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:text-white" />
              </div>
              <select value={form.subject} onChange={update("subject")} aria-label="Subject" className="h-12 w-full cursor-pointer rounded-2xl border border-slate-200 bg-surface px-4 text-sm outline-none transition-all focus:border-primary/50 dark:border-white/10 dark:bg-white/5 dark:text-white">
                {["General enquiry", "Free marketing audit", "Deal submission", "Report a coupon", "Partnership / advertising", "Press"].map((s) => <option key={s}>{s}</option>)}
              </select>
              <textarea required rows={6} value={form.message} onChange={update("message")} placeholder="How can we help?" aria-label="Message" className="w-full rounded-2xl border border-slate-200 bg-surface p-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:text-white" />
              <Button type="submit" size="lg" variant="accent" className="w-full">Send message <Send size={15} /></Button>
              <p className="text-center text-xs text-slate-400">We never share your details. Average first response: 4 hours.</p>
            </form>
          </Reveal>
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="FAQ" title="Before you write in…" />
          <Accordion items={faqs} className="mx-auto max-w-3xl" />
        </div>
      </Container>
    </>
  );
}
