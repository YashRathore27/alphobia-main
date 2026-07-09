import { Container, Reveal } from "../components/ui";
import { useAppData } from "../context/DataContext";

export default function About() {
  const { aboutData, team } = useAppData();

  const header = aboutData.header;
  const values = aboutData.values || [];
  const timelineHeader = aboutData.timelineHeader;
  const timeline = aboutData.timeline || [];
  const teamHeader = aboutData.teamHeader;

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="inline-block py-1 px-4 rounded-[2px] bg-secondary/10 text-secondary font-label-sm uppercase tracking-widest">
          {header.badge || "Who We Are"}
        </span>
        <h1 className="font-display-xl text-primary leading-tight">
          {header.titleBefore || "We're the Trust Layer for"} <br />
          <span className="text-secondary">{header.titleAccent || "Smarter B2B Growth"}</span>
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          {header.subtitle || "Combining analytical precision with digital agility to deploy high-performance marketing ecosystems that compound value month over month."}
        </p>
      </section>

      {/* Values Grid */}
      <section className="py-16 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title || i} delay={i * 0.1}>
              <div className="glass-card p-8 rounded-[2px] h-full space-y-4">
                <span className="w-10 h-10 bg-secondary/15 text-secondary flex items-center justify-center rounded-[2px] font-bold">0{i + 1}</span>
                <h3 className="font-headline-md text-primary">{v.title}</h3>
                <p className="text-on-surface-variant font-body-md leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story Timeline */}
      <section className="bg-surface-container-low py-24 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-headline-lg text-primary">{timelineHeader.title || "From Consultancy to Global Powerhouse"}</h2>
            <p className="text-on-surface-variant font-body-lg max-w-lg mx-auto">
              {timelineHeader.subtitle || "Our milestone journey engineering digital velocity."}
            </p>
          </div>

          <div className="relative border-l border-outline-variant/50 ml-4 md:ml-32 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-[2px] bg-white border-2 border-secondary group-hover:bg-secondary transition-colors" />

                <div className="space-y-2">
                  <span className="font-label-sm font-bold text-secondary">{item.year}</span>
                  <h3 className="font-headline-md text-primary">{item.title}</h3>
                  <p className="text-on-surface-variant font-body-md leading-relaxed max-w-2xl">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline-lg text-primary">{teamHeader.title || "Our Leadership Team"}</h2>
          <p className="text-on-surface-variant font-body-lg max-w-lg mx-auto">
            {teamHeader.subtitle || "Growth consultants and technical engineers aligning values with campaign performance."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((t, idx) => (
            <div key={t.id || idx} className="group relative rounded-[2px] overflow-hidden bg-white shadow-lg border border-outline-variant/20">
              <img src={t.img} alt={t.name} loading="lazy" className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="font-headline-md text-white">{t.name}</h4>
                <p className="font-label-sm font-bold text-secondary uppercase tracking-widest mt-1">{t.role}</p>
                <p className="text-white/70 font-body-md leading-relaxed mt-2">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
