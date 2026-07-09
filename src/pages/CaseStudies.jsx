import { Container, Button, Reveal } from "../components/ui";
import { navigate } from "../router";
import { useAppData } from "../context/DataContext";

export default function CaseStudies() {
  const { caseStudies } = useAppData();
  const go = (slug) => {
    navigate("insights"); // Redirect to insights or keep it simple
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <section className="pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="inline-block py-1 px-4 rounded-[2px] bg-secondary/10 text-secondary font-label-sm uppercase tracking-widest">
          Proof of Concept
        </span>
        <h1 className="font-display-xl text-primary leading-tight">
          Delivering High-stakes <br/><span className="text-secondary">B2B Performance</span>
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Documented case reports showing how our growth consulting scaled real-world business pipelines.
        </p>
      </section>

      <section className="py-12 px-6 sm:px-8 max-w-7xl mx-auto space-y-16">
        {caseStudies.map((cs, idx) => (
          <Reveal key={cs.id} delay={idx * 0.1}>
            <div className={`glass-card rounded-[2px] p-8 md:p-12 border border-outline-variant flex flex-col lg:flex-row gap-12 items-center hover:border-secondary transition-all ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className="w-full lg:w-1/2 rounded-[2px] overflow-hidden aspect-[16/10]">
                <img className="w-full h-full object-cover" alt={cs.title} src={cs.image} loading="lazy" />
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <span className="px-3 py-1 bg-secondary/10 text-secondary font-bold font-label-sm uppercase tracking-wider rounded-[2px]">{cs.sector}</span>
                <h3 className="font-headline-md text-primary leading-snug">{cs.title}</h3>
                <p className="text-on-surface-variant font-body-md leading-relaxed">{cs.description}</p>
                <div className="p-6 bg-surface-container rounded-[2px] border border-outline-variant/30">
                  <p className="font-label-sm text-outline uppercase font-bold tracking-widest mb-1">Key Results</p>
                  <p className="text-2xl font-black text-secondary">{cs.results}</p>
                </div>
                <p className="text-on-surface-variant font-body-md leading-relaxed italic">{cs.details}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
