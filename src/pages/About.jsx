import { Container, Reveal } from "../components/ui";

const values = [
  { title: "Our Mission", text: "Empower global enterprise brands to capture the future of their markets through precision B2B performance marketing and unified data attribution." },
  { title: "Our Vision", text: "To define the definitive standard in global B2B digital transformation, providing complete metrics transparency and high-stakes growth engineering." },
  { title: "Our Promise", text: "We never guess, we model. We distribute resources based on proven metrics and absolute client transparency, aligning incentives for win-win results." }
];

const timeline = [
  { year: "2019", title: "Founding in London", text: "Alphobia begins as a small boutique consultancy of three growth engineers specializing in programmatic marketing." },
  { year: "2021", title: "Attribution Dashboard Launch", text: "We release our custom performance attribution framework, aggregating multi-channel insights for client-side scaling." },
  { year: "2024", title: "Global Expansion", text: "Opening tactical offices in New York and Singapore to support B2B clients across four continents, surpassing $50M managed ad spend." },
  { year: "2026", title: "Kinetic Network Integration", text: "Expanding publisher networks to 12.4k+ verified partners and setting industry-leading benchmarks for B2B ROAS." }
];

const team = [
  { name: "Ava Lindqvist", role: "Co-founder & CEO", bio: "Ex-growth executive at two B2B tech unicorns. Oversees global consultancy operations from London.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=80" },
  { name: "Marcus Chen", role: "Co-founder & CTO", bio: "Attribution architecture lead. Built our unified performance analytics engine.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=750&q=80" },
  { name: "Elina Goodwin", role: "VP, Growth Services", bio: "Tactical operations lead for Paid Media & SEO. 12+ years of enterprise scaling experience.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=750&q=80" }
];

export default function About() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="inline-block py-1 px-4 rounded-[2px] bg-secondary/10 text-secondary font-label-sm text-label-sm uppercase tracking-widest">
          Who We Are
        </span>
        <h1 className="font-display-xl text-primary leading-tight">
          We're the Trust Layer for <br /><span className="text-secondary">Smarter B2B Growth</span>
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Combining analytical precision with digital agility to deploy high-performance marketing ecosystems that compound value month over month.
        </p>
      </section>

      {/* Values Grid */}
      <section className="py-16 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="glass-card p-8 rounded-[2px] h-full space-y-4">
                <span className="w-10 h-10 bg-secondary/15 text-secondary flex items-center justify-center rounded-[2px] font-bold">0{i + 1}</span>
                <h3 className="font-bold text-xl text-primary">{v.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story Timeline */}
      <section className="bg-surface-container-low py-24 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-headline-lg text-primary">From Consultancy to Global Powerhouse</h2>
            <p className="text-on-surface-variant text-sm max-w-lg mx-auto">
              Our milestone journey engineering digital velocity.
            </p>
          </div>

          <div className="relative border-l border-outline-variant/50 ml-4 md:ml-32 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-[2px] bg-white border-2 border-secondary group-hover:bg-secondary transition-colors" />

                <div className="space-y-2">
                  <span className="text-xs font-bold text-secondary">{item.year}</span>
                  <h3 className="font-bold text-lg text-primary">{item.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline-lg text-primary">Our Leadership Team</h2>
          <p className="text-on-surface-variant text-sm max-w-lg mx-auto">
            Growth consultants and technical engineers aligning values with campaign performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((t, idx) => (
            <div key={idx} className="group relative rounded-[2px] overflow-hidden bg-white shadow-lg border border-outline-variant/20">
              <img src={t.img} alt={t.name} className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="font-bold text-lg text-white">{t.name}</h4>
                <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">{t.role}</p>
                <p className="text-white/70 text-xs leading-relaxed mt-2">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
