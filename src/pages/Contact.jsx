import { useState } from "react";
import { Container, Button, Reveal } from "../components/ui";
import { Mail, Phone, MapPin, Clock, Send, ChevronDown } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "Free Marketing Audit", message: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const faqs = [
    { q: "How does the free marketing audit work?", a: "Tell us your website and active marketing goals. Within 5 business days, our team will deliver a 10-page performance teardown covering conversions, tracking setups, and 3 immediate quick wins." },
    { q: "What does the embedded strategy consulting contract require?", a: "Our campaign services operate month-to-month after an initial 90-day ramp period. This gives us ample time to implement tracking, optimize assets, and prove ROAS benchmarks." },
    { q: "Do you collaborate with in-house growth teams?", a: "Absolutely. Roughly half of our engagements are hybrid, where we plug in to provide specialist paid media scripts, advanced SEO copywriting, or analytics blueprints." }
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="inline-block py-1 px-4 rounded-[2px] bg-secondary/10 text-secondary font-label-sm uppercase tracking-widest">
          Get in Touch
        </span>
        <h1 className="font-display-xl text-primary leading-tight">
          Let's Build Your <br/><span className="text-secondary">Kinetic Advantage</span>
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Request a free marketing audit, schedule a strategy call, or discuss partner configurations with our team.
        </p>
      </section>

      {/* Grid with info and form */}
      <section className="py-12 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Info Column */}
          <div className="space-y-6">
            <div className="glass-card flex items-center gap-4 p-6 rounded-[2px] hover:border-secondary transition-all">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-secondary/10 text-secondary">
                <Mail className="w-5 h-5" />
              </span>
              <div>
                <p className="font-bold text-outline uppercase tracking-wider" style={{fontSize: "10px"}}>Email us</p>
                <p className="font-bold text-primary">hello@alphobia.com</p>
                <p className="font-label-sm text-on-surface-variant">Replies within one business day</p>
              </div>
            </div>

            <div className="glass-card flex items-center gap-4 p-6 rounded-[2px] hover:border-secondary transition-all">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-secondary/10 text-secondary">
                <Phone className="w-5 h-5" />
              </span>
              <div>
                <p className="font-bold text-outline uppercase tracking-wider" style={{fontSize: "10px"}}>Call us</p>
                <p className="font-bold text-primary">+1 (415) 555-0192</p>
                <p className="font-label-sm text-on-surface-variant">Mon–Fri, 9am–6pm PT</p>
              </div>
            </div>

            <div className="glass-card flex items-center gap-4 p-6 rounded-[2px] hover:border-secondary transition-all">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-secondary/10 text-secondary">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <p className="font-bold text-outline uppercase tracking-wider" style={{fontSize: "10px"}}>Our HQ</p>
                <p className="font-bold text-primary">548 Market St, San Francisco</p>
                <p className="font-label-sm text-on-surface-variant">By appointment only</p>
              </div>
            </div>

            {/* map placeholder */}
            <div className="relative h-64 overflow-hidden rounded-[2px] bg-slate-200 border border-outline-variant/30 flex items-center justify-center text-outline">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.2) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative text-center z-10 space-y-2">
                <MapPin className="w-8 h-8 text-secondary mx-auto" />
                <p className="font-bold text-primary">San Francisco, CA</p>
                <p className="font-label-sm">Precision B2B Hub</p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="glass-card p-8 rounded-[2px] relative">
            {sent ? (
              <div className="space-y-6 py-12 text-center">
                <div className="w-16 h-16 rounded-[2px] bg-secondary/10 text-secondary flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="font-headline-md text-primary">Message Sent Successfully</h3>
                <p className="text-on-surface-variant font-body-md max-w-sm mx-auto leading-relaxed">
                  Thank you for writing to Alphobia. A certified growth consultant will follow up within 4 hours.
                </p>
                <Button onClick={() => setSent(false)} variant="outline" className="mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (form.name && form.email) setSent(true);
                }}
              >
                <h2 className="font-headline-md text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">mail</span> Book Strategy Session
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="font-label-sm font-bold text-primary uppercase tracking-wider">Your Name</label>
                    <input 
                      required 
                      value={form.name} 
                      onChange={update("name")} 
                      placeholder="Jane Doe" 
                      className="w-full h-12 rounded-[2px] border border-outline-variant bg-white px-4 text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm font-bold text-primary uppercase tracking-wider">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={form.email} 
                      onChange={update("email")} 
                      placeholder="jane@company.com" 
                      className="w-full h-12 rounded-[2px] border border-outline-variant bg-white px-4 text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none"
                    />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="font-label-sm font-bold text-primary uppercase tracking-wider">Company Name</label>
                    <input 
                      value={form.company} 
                      onChange={update("company")} 
                      placeholder="Company Inc." 
                      className="w-full h-12 rounded-[2px] border border-outline-variant bg-white px-4 text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm font-bold text-primary uppercase tracking-wider">Request Type</label>
                    <select 
                      value={form.subject} 
                      onChange={update("subject")} 
                      className="w-full h-12 rounded-[2px] border border-outline-variant bg-white px-4 text-on-surface focus:border-secondary outline-none cursor-pointer"
                    >
                      <option>Free Marketing Audit</option>
                      <option>Book a Strategy Call</option>
                      <option>Advertising Partnerships</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm font-bold text-primary uppercase tracking-wider">How can we help?</label>
                  <textarea 
                    required 
                    rows={5} 
                    value={form.message} 
                    onChange={update("message")} 
                    placeholder="Briefly describe your business goals and active ad budgets..." 
                      className="w-full rounded-[2px] border border-outline-variant bg-white p-4 text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none resize-none"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-secondary text-white py-4 font-bold rounded-[2px] hover:bg-secondary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Submit Request <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Accordion FAQ */}
      <section className="py-24 px-6 sm:px-8 max-w-3xl mx-auto border-t border-outline-variant/30 mt-20">
        <h2 className="font-headline-lg text-primary text-center mb-12">Common Inquiries</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-[2px] border border-outline-variant/30 overflow-hidden shadow-sm">
              <button
                className="w-full flex justify-between items-center p-6 text-left hover:bg-surface-container-high transition-colors"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span className="font-body-lg text-primary">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-secondary" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="p-6 pt-0 text-on-surface-variant border-t border-outline-variant/10 font-body-md leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
