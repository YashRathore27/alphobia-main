import { useState } from "react";
import { Container, Button, CountUpStat, Reveal } from "../components/ui";
import { ArrowRight } from "lucide-react";
import { navigate } from "../router";
import { useAppData } from "../context/DataContext";

export default function AffiliateMarketing() {
  const { servicesData } = useAppData();
  const svc = servicesData.find((s) => s.id === "affiliate-marketing") || servicesData[2] || {};
  const [revenue, setRevenue] = useState(500000);
  const [partners, setPartners] = useState(250);

  // Growth Potential math logic
  const minReturn = Math.round(revenue * 0.05 + partners * 2000);
  const maxReturn = Math.round(revenue * 0.08 + partners * 3500);

  const formatCurrency = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    return `$${Math.round(val / 1000).toLocaleString()}K`;
  };

  const go = (r) => {
    navigate(r);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden border-b border-outline-variant/10">
        <div className="absolute inset-0 pointer-events-none z-0">
            <img
                src={svc.heroImage || "/affiliated-marketing-hero.png"}
                alt="Affiliate Marketing Hero Background"
                className="w-full h-full object-cover opacity-90"
            />
          <div className="hero-image-blur-overlay" />
        </div>

        <section className="relative px-6 sm:px-8 pt-32 pb-20 max-w-7xl mx-auto overflow-hidden z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-[2px] w-fit">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-sm text-secondary uppercase tracking-widest">Global Reach</span>
              </div>
              <h1 className="font-display-xl text-primary leading-tight">
                Scale Your Reach with Global <span className="text-secondary">Affiliate</span> Networks.
              </h1>
              <p className="font-body-lg text-on-surface-variant leading-relaxed max-w-lg">
                Execute high-performance partner ecosystems with precision. Our corporate-grade affiliate management platform turns influence into measurable ROI through automated compliance and intelligent attribution.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button onClick={() => go("contact")} variant="accent" size="lg" className="shadow-lg">Launch Program</Button>
              </div>
            </div>

            <Reveal delay={0.2} className="relative flex justify-center lg:justify-end self-end">
              <div className="bg-white/80 backdrop-blur-md p-8 border border-outline-variant/30 shadow-lg rounded-[2px] min-w-[240px]">
                <p className="font-label-sm font-bold text-secondary uppercase tracking-widest">{svc.metrics?.[1]?.label || "ACTIVE PARTNERS"}</p>
                <p className="text-4xl font-extrabold text-primary mt-2">{svc.metrics?.[1]?.value || "12.4k+"}</p>
                <div className="mt-4 w-full bg-slate-200 h-1.5 overflow-hidden rounded-full">
                  <div className="bg-secondary h-full w-[85%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-on-surface-variant mt-2">{svc.metrics?.[1]?.detail || "Global publisher footprint"}</p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      {/* Vetting Strategy section */}
      <section className="bg-surface py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-20 items-end justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 className="font-headline-lg text-primary">Partner Ecosystems Built for Dominance.</h2>
              <p className="text-on-surface-variant leading-relaxed">
                We don't just recruit affiliates; we curate premium publisher networks that align with your brand's authority. Our strategic vetting process ensures every partner is an asset.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="material-symbols-outlined text-secondary text-[64px]">hub</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(svc.capabilities || [
              { name: "Strategic Mapping", desc: "Alignment of your product categories with high-authority vertical leaders and niche experts." },
              { name: "Quality Vetting", desc: "Multi-layered compliance checks to ensure traffic quality, brand safety, and ethical standard adherence." },
              { name: "Lifecycle Management", desc: "Ongoing optimization, incentive scaling, and dedicated account support for top-tier performers." },
            ]).slice(0, 3).map((cap, idx) => (
              <div key={idx} className="group/card glass-card p-8 rounded-[2px] hover:-translate-y-2 transition-all duration-300 border-b-4 border-b-secondary">
                <div className="mb-6 flex items-center justify-between">
                  <span className="material-symbols-outlined text-secondary text-4xl">{["strategy", "verified_user", "handshake"][idx]}</span>
                  <span className="text-outline group-hover/card:text-secondary text-4xl font-bold opacity-10 group-hover/card:opacity-100 transition-all duration-300">0{idx + 1}</span>
                </div>
                <h3 className="font-headline-md text-primary mb-3">{cap.name}</h3>
                <p className="text-on-surface-variant font-body-md leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Models Matrix */}
      <section className="py-24 px-6 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="font-headline-lg text-primary">Flexible Commission Frameworks</h2>
            <p className="text-on-surface-variant leading-relaxed">
              Maximize ROI with payout structures tailored to your specific business objectives and customer acquisition costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-outline-variant rounded-[2px] hover:border-secondary transition-colors group">
              <div className="h-40 bg-surface-container-low rounded-[2px] mb-6 flex items-center justify-center relative overflow-hidden">
                <span className="material-symbols-outlined text-secondary text-8xl">payments</span>
              </div>
              <h4 className="font-headline-md text-primary mb-2">CPA (Cost Per Action)</h4>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                Fixed payout for specific conversions like sales or subscriptions. Pure performance.
              </p>
            </div>

            <div className="p-6 border border-outline-variant rounded-[2px] hover:border-secondary transition-colors group">
              <div className="h-40 bg-surface-container-low rounded-[2px] mb-6 flex items-center justify-center relative overflow-hidden">
                <span className="material-symbols-outlined text-secondary text-8xl">person_add</span>
              </div>
              <h4 className="font-headline-md text-primary mb-2">CPL (Cost Per Lead)</h4>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                Incentivize top-of-funnel growth through qualified lead generation and signups.
              </p>
            </div>

            <div className="p-6 border border-outline-variant rounded-[2px] hover:border-secondary transition-colors group">
              <div className="h-40 bg-surface-container-low rounded-[2px] mb-6 flex items-center justify-center relative overflow-hidden">
                <span className="material-symbols-outlined text-secondary text-8xl">show_chart</span>
              </div>
              <h4 className="font-headline-md text-primary mb-2">Revenue Share</h4>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                Percentage-based models for high-ticket items or recurring SaaS subscriptions.
              </p>
            </div>

            <div className="p-6 border border-outline-variant rounded-[2px] bg-primary text-on-primary group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/20 blur-[80px] rounded-full" />
              <div className="h-40 bg-white/10 rounded-[2px] mb-6 flex items-center justify-center relative overflow-hidden">
                <span className="material-symbols-outlined text-white text-8xl">auto_awesome</span>
              </div>
              <h4 className="font-headline-md text-white mb-2">Hybrid Models</h4>
              <p className="text-white/70 font-body-md leading-relaxed">
                Custom blended structures combining flat fees with performance escalators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Mockup Panel */}
      <section className="py-24 px-6 sm:px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="glass-card rounded-[2px] p-4 border border-outline-variant shadow-2xl relative">
              <div className="bg-white rounded-[2px] overflow-hidden shadow-inner flex h-[350px]">
                <div className="w-16 bg-surface-container flex flex-col items-center py-6 gap-6 border-r border-outline-variant/30 text-outline">
                  <span className="material-symbols-outlined text-secondary">dashboard</span>
                  <span className="material-symbols-outlined">monitoring</span>
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <div className="flex-1 p-6 space-y-6">
                  <div className="h-4 w-32 bg-surface-container-highest rounded"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-surface rounded-[2px] border border-outline-variant/20 h-16"></div>
                    <div className="p-4 bg-surface rounded-[2px] border border-outline-variant/20 h-16"></div>
                    <div className="p-4 bg-surface rounded-[2px] border border-outline-variant/20 h-16"></div>
                  </div>
                  <div className="h-28 bg-surface-container rounded-[2px] flex items-end p-2 gap-2 justify-around">
                    <div className="w-6 bg-secondary h-[40%] rounded-t-sm"></div>
                    <div className="w-6 bg-secondary h-[65%] rounded-t-sm"></div>
                    <div className="w-6 bg-secondary h-[80%] rounded-t-sm"></div>
                    <div className="w-6 bg-secondary h-[95%] rounded-t-sm"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 glass-card p-6 border border-outline-variant rounded-[2px] shadow-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-[2px] bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">trending_up</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-secondary tracking-widest uppercase">REAL-TIME ROI</p>
                  <p className="text-xl font-bold text-primary">+24.8%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-headline-lg text-primary">Unrivaled Performance Clarity.</h2>
            <p className="text-on-surface-variant leading-relaxed">
              Our dashboard provides granular visibility into every touchpoint. From attribution modeling to fraud detection, stay informed with data that drives decision-making.
            </p>
            <ul className="space-y-3 font-semibold text-on-surface">
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Multi-touch attribution modeling
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Real-time fraud monitoring &amp; mitigation
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-24 px-6 sm:px-8 bg-primary text-on-primary">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/10 rounded-[2px] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 blur-[100px] rounded-[2px] -mr-32 -mt-32"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
              <div className="space-y-8">
                <h2 className="font-headline-lg text-white">Estimate Your <span className="text-secondary">Growth Potential</span></h2>
                <p className="font-body-lg text-white/70">
                  Use our predictive model to visualize the scale of a curated affiliate ecosystem for your brand.
                </p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs uppercase tracking-wider text-slate-300">
                      <span>Current Monthly Revenue</span>
                      <span className="font-bold text-white">${revenue.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="2000000"
                      step="10000"
                      value={revenue}
                      onChange={(e) => setRevenue(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-[2px] appearance-none cursor-pointer accent-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between font-label-sm uppercase tracking-wider text-slate-300">
                      <span>Desired Partner Scale</span>
                      <span className="font-bold text-white">{partners} Publishers</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={partners}
                      onChange={(e) => setPartners(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-[2px] appearance-none cursor-pointer accent-secondary"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-transparent p-8 rounded-[2px] border border-white/10 flex flex-col justify-center text-center">
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">PREDICTED ANNUAL AFFILIATE REVENUE</p>
                <p className="text-4xl sm:font-headline-lg font-extrabold text-white mb-2">{formatCurrency(minReturn)} - {formatCurrency(maxReturn)}</p>
                <p className="text-white/50 font-label-sm italic mb-6">Based on average vertical performance benchmarks.</p>
                <Button onClick={() => go("contact")} variant="accent" className="w-full font-bold bg-secondary py-4 hover:bg-opacity-90">
                  Get Custom Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case studies list */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-headline-lg text-primary">Proven Scaling.</h2>
          <button
            onClick={() => go("case-studies")}
            className="text-secondary font-bold hover:underline flex items-center gap-2"
          >
            View All Case Studies <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div onClick={() => go("case-studies")} className="group cursor-pointer space-y-4">
            <div className="aspect-[16/9] overflow-hidden rounded-[2px] relative">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Case Study Neobank"
                src="https://images.pexels.com/photos/5849594/pexels-photo-5849594.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=800"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-primary px-6 py-2 font-bold rounded-[2px] font-body-md">Read Report</span>
              </div>
            </div>
            <p className="font-label-sm font-semibold text-secondary uppercase tracking-wider">FINTECH SECTOR</p>
            <h3 className="font-headline-md text-primary group-hover:text-secondary transition-colors">400% Lead Volume Increase for Series C Neobank</h3>
            <p className="text-on-surface-variant font-body-md">How we scaled a publisher network of 150+ high-authority finance blogs to dominate market share.</p>
          </div>

          <div onClick={() => go("case-studies")} className="group cursor-pointer space-y-4">
            <div className="aspect-[16/9] overflow-hidden rounded-[2px] relative">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Case Study Apparel"
                src="https://images.pexels.com/photos/30707531/pexels-photo-30707531.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=800"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-primary px-6 py-2 font-bold rounded-[2px] font-body-md">Read Report</span>
              </div>
            </div>
            <p className="font-label-sm font-semibold text-secondary uppercase tracking-wider">E-COMMERCE</p>
            <h3 className="font-headline-md text-primary group-hover:text-secondary transition-colors">Global Expansion Strategy for Luxury Apparel Brand</h3>
            <p className="text-on-surface-variant font-body-md">Expanding a boutique label into 12 new European markets via local fashion influencer networks.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8 bg-surface-container-highest">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="font-display-xl text-primary">Ready to Build Your Partner Powerhouse?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => go("contact")} variant="accent" size="lg" className="shadow-2xl">
              Schedule Strategy Call
            </Button>
            <Button
              onClick={() => go("insights")}
              variant="outline"
              size="lg"
              className="bg-white text-secondary border-secondary hover:bg-surface cursor-pointer"
            >
              View Industry Insights
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
