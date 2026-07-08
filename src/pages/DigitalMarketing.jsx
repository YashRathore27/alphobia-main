import { useState } from "react";
import { Container, Button, CountUpStat, Reveal } from "../components/ui";
import { ChevronDown, ArrowRight } from "lucide-react";
import { navigate } from "../router";

export default function DigitalMarketing() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "How quickly can we expect to see ROI?", a: "While SEO efforts take 3-6 months for full maturation, our paid media strategies typically yield measurable attribution and ROI within the first 30 days of campaign launch." },
    { q: "Do you handle international marketing?", a: "Yes, Alphobia operates globally. We have specialized localization teams that manage multi-currency and multi-language campaigns across 12+ primary markets." },
    { q: "What platforms do you specialize in?", a: "Our core focus is on high-intent platforms: Google Search, LinkedIn Ads for B2B, Meta for high-scale B2C, and TikTok for Gen-Z reach, backed by Klaviyo for email automation." }
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden border-b border-outline-variant/10">
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src="/digital-marketing-hero.jpeg" 
            alt="Digital Marketing Hero Background" 
            className="w-full h-full object-cover opacity-90"
          />
          </div>

        <section className="relative px-6 sm:px-8 pt-32 pb-20 max-w-7xl mx-auto overflow-hidden z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <span className="inline-block py-1 px-4 mb-3 rounded-[2px] bg-secondary/10 text-secondary font-label-sm text-label-sm uppercase tracking-widest">
                Digital Marketing Strategy
              </span>
              <h1 className="font-display-xl text-primary leading-tight">
                Full-Funnel <span className="text-secondary">Digital Marketing</span> Excellence
              </h1>
              <p className="font-body-lg text-on-surface-variant leading-relaxed max-w-xl">
                We don't just drive traffic; we engineer growth. Our data-centric approach leverages advanced analytics and creative precision to scale your global digital presence.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button as="a" href="#audit" className="bg-secondary text-white px-8 py-4 font-bold rounded-[2px] shadow-lg hover:translate-y-[-2px] transition-transform">
                  Request Performance Audit
                </Button>
              </div>
            </div>

            <Reveal delay={0.2} className="relative flex justify-center lg:justify-end self-end">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-20 w-full max-w-lg">
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2px] border border-outline-variant/30 shadow-lg text-center">
                  <div className="text-xs text-on-surface-variant mb-1 font-bold uppercase tracking-wider">ROAS</div>
                  <div className="font-bold text-3xl text-secondary">4.2x</div>
                  <p className="text-[10px] text-on-surface-variant mt-1">Campaign Blended</p>
                </div>
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2px] border border-outline-variant/30 shadow-lg text-center">
                  <div className="text-xs text-on-surface-variant mb-1 font-bold uppercase tracking-wider">CTR</div>
                  <div className="font-bold text-3xl text-primary">3.8%</div>
                  <p className="text-[10px] text-on-surface-variant mt-1">Average Click Rate</p>
                </div>
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2px] border border-outline-variant/30 shadow-lg text-center">
                  <div className="text-xs text-on-surface-variant mb-1 font-bold uppercase tracking-wider">CPA</div>
                  <div className="font-bold text-3xl text-primary">-$12</div>
                  <p className="text-[10px] text-on-surface-variant mt-1">Target Reduction</p>
                </div>
              </div>
            </Reveal>
        </div>
      </section>
    </div>

      {/* Core Services Section */}
      <section className="bg-surface-container-low py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-headline-lg text-primary">Precision Engineering for Every Channel</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Specialized expertise integrated into a unified growth engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-[2px] border border-outline-variant/30 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group">
              <div className="w-14 h-14 bg-secondary-container/10 flex items-center justify-center rounded-[2px] mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">search_insights</span>
              </div>
              <h3 className="font-bold text-xl text-primary mb-3">SEO Architecture</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Technical optimization and authoritative content structures designed for search dominance.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  Core Web Vitals Optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  Semantic Content Strategy
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-[2px] border border-outline-variant/30 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group">
              <div className="w-14 h-14 bg-secondary-container/10 flex items-center justify-center rounded-[2px] mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">share_reviews</span>
              </div>
              <h3 className="font-bold text-xl text-primary mb-3">Social Precision</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                High-performance paid social campaigns and organic brand building that converts.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  Audience Segmentation
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  Viral Content Frameworks
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-[2px] border border-outline-variant/30 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group">
              <div className="w-14 h-14 bg-secondary-container/10 flex items-center justify-center rounded-[2px] mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">auto_stories</span>
              </div>
              <h3 className="font-bold text-xl text-primary mb-3">Editorial Edge</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Strategic storytelling that establishes industry authority and nurtures pipeline growth.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  B2B Thought Leadership
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  Video Sales Letters (VSL)
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-[2px] border border-outline-variant/30 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group">
              <div className="w-14 h-14 bg-secondary-container/10 flex items-center justify-center rounded-[2px] mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">alternate_email</span>
              </div>
              <h3 className="font-bold text-xl text-primary mb-3">Email Lifecycle</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Automated nurture sequences that maximize LTV and reduce customer acquisition costs.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  Behavior-Triggered Flows
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  AI-Personalized Messaging
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Kinetic Growth Framework Process Section */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="font-headline-lg text-primary">The Kinetic Growth Framework</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-[2px] bg-primary text-on-primary flex items-center justify-center font-bold">01</div>
                <div>
                  <h4 className="font-bold text-xl text-primary mb-1">Audit &amp; Infrastructure</h4>
                  <p className="text-on-surface-variant text-sm">We dismantle your current funnel to identify friction points and deploy advanced tracking pixels for data integrity.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-[2px] bg-primary text-on-primary flex items-center justify-center font-bold">02</div>
                <div>
                  <h4 className="font-bold text-xl text-primary mb-1">Omnichannel Testing</h4>
                  <p className="text-on-surface-variant text-sm">Rapid A/B testing across creative, messaging, and platforms to find the highest-ROI entry points.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-[2px] bg-primary text-on-primary flex items-center justify-center font-bold">03</div>
                <div>
                  <h4 className="font-bold text-xl text-primary mb-1">Aggressive Scaling</h4>
                  <p className="text-on-surface-variant text-sm">Capital deployment into winning variants, utilizing algorithm-friendly bidding strategies for global reach.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative h-[450px]">
            <div className="absolute inset-0 bg-secondary/5 rounded-[2px] border border-secondary/10 rotate-3"></div>
            <div className="absolute inset-0 bg-white shadow-2xl rounded-[2px] border border-outline-variant/30 flex items-center justify-center overflow-hidden">
              <img 
                className="w-full h-full object-cover p-8" 
                alt="Growth framework illustration" 
                src="https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="bg-primary text-on-primary py-24 px-6 sm:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/15 blur-[100px] rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-headline-lg text-white mb-16 text-center">Metrics That Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-white/10 p-10 rounded-[2px] hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined text-secondary text-4xl">payments</span>
                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-[2px] text-xs font-bold">+28% YoY</div>
              </div>
              <div className="text-white/60 text-xs font-bold uppercase mb-2">Average CAC reduction</div>
              <div className="text-5xl font-bold text-white mb-4">$42.50</div>
              <div className="h-1 w-full bg-white/10 rounded-[2px] overflow-hidden">
                <div className="h-full bg-secondary w-2/3 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>

            <div className="border border-white/10 p-10 rounded-[2px] hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined text-secondary text-4xl">trending_up</span>
                <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-[2px] text-xs font-bold">Record High</div>
              </div>
              <div className="text-white/60 text-xs font-bold uppercase mb-2">Customer LTV Growth</div>
              <div className="text-5xl font-bold text-white mb-4">320%</div>
              <div className="h-1 w-full bg-white/10 rounded-[2px] overflow-hidden">
                <div className="h-full bg-secondary w-3/4 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>

            <div className="border border-white/10 p-10 rounded-[2px] hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined text-secondary text-4xl">visibility</span>
                <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-[2px] text-xs font-bold">Viral Reach</div>
              </div>
              <div className="text-white/60 text-xs font-bold uppercase mb-2">Brand Awareness Score</div>
              <div className="text-5xl font-bold text-white mb-4">9.2/10</div>
              <div className="h-1 w-full bg-white/10 rounded-[2px] overflow-hidden">
                <div className="h-full bg-secondary w-1/2 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <h2 className="font-headline-lg text-primary mb-16 text-center">Service Tier Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-outline-variant/30">
            <thead>
              <tr className="border-b-2 border-primary bg-surface-container">
                <th className="py-6 px-4 font-bold text-primary">Capabilities</th>
                <th className="py-6 px-4 font-bold text-on-surface-variant">Standard Growth</th>
                <th className="py-6 px-4 font-bold text-secondary">Kinetic Enterprise</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-outline-variant/30">
                <td className="py-6 px-4 font-bold text-primary">SEO Optimization</td>
                <td className="py-6 px-4 text-on-surface-variant">Standard On-Page</td>
                <td className="py-6 px-4 text-secondary font-bold">Advanced Semantic Architecture</td>
              </tr>
              <tr className="border-b border-outline-variant/30">
                <td className="py-6 px-4 font-bold text-primary">Ad Spend Management</td>
                <td className="py-6 px-4 text-on-surface-variant">Up to $50k/mo</td>
                <td className="py-6 px-4 text-secondary font-bold">Unlimited Scaling</td>
              </tr>
              <tr className="border-b border-outline-variant/30">
                <td className="py-6 px-4 font-bold text-primary">Creative Development</td>
                <td className="py-6 px-4 text-on-surface-variant">Template-Based</td>
                <td className="py-6 px-4 text-secondary font-bold">Custom Motion &amp; 3D Assets</td>
              </tr>
              <tr className="border-b border-outline-variant/30">
                <td className="py-6 px-4 font-bold text-primary">Reporting Frequency</td>
                <td className="py-6 px-4 text-on-surface-variant">Monthly</td>
                <td className="py-6 px-4 text-secondary font-bold">Real-time Live Dashboard</td>
              </tr>
              <tr className="border-b border-outline-variant/30">
                <td className="py-6 px-4 font-bold text-primary">Dedicated Growth Officer</td>
                <td className="py-6 px-4 text-on-surface-variant">—</td>
                <td className="py-6 px-4 text-secondary font-bold">Included (24/7 Access)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-surface-container-low py-24 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline-lg text-primary mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-[2px] border border-outline-variant/30 overflow-hidden shadow-sm">
                <button
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-surface-container-high transition-colors"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-bold text-lg text-primary">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-secondary" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-6 pt-0 text-on-surface-variant border-t border-outline-variant/10 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section id="audit" className="py-24 px-6 sm:px-8 bg-primary text-on-primary w-full relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <h2 className="font-headline-lg text-white">Ready to Scale Your Digital Impact?</h2>
          <p className="font-body-lg mb-12 max-w-2xl mx-auto text-on-primary/75">
            Join the ranks of high-growth enterprises leveraging Alphobia's full-funnel marketing strategies. Your global dominance starts with a single strategy session.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate("contact")} variant="accent" size="lg" className="shadow-2xl">
              Book Free Strategy Session
            </Button>
            <Button 
              onClick={() => navigate("case-studies")}
              variant="outline"
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
