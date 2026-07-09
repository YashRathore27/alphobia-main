import { Container, Reveal } from "../components/ui";
import { Cloud, Wallet, ShoppingBag, Truck } from "lucide-react";
import { useAppData } from "../context/DataContext";

const icons = {
  cloud: Cloud,
  payments: Wallet,
  shopping_bag: ShoppingBag,
  local_shipping: Truck
};

export default function Industries() {
  const { industries } = useAppData();
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <section className="pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="inline-block py-1 px-4 rounded-[2px] bg-secondary/10 text-secondary font-label-sm uppercase tracking-widest">
          Sectors We Scale
        </span>
        <h1 className="font-display-xl text-primary leading-tight">
          Tailored Growth Protocols for <br/><span className="text-secondary">Your Industry</span>
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          We combine domain expertise with specialized performance infrastructure to solve industry-specific CAC challenges.
        </p>
      </section>

      <section className="py-12 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((ind, idx) => {
            const Icon = icons[ind.icon] || Cloud;
            return (
              <Reveal key={ind.id} delay={idx * 0.1}>
                <div className="glass-card p-10 rounded-[2px] border border-outline-variant flex gap-6 items-start hover:border-secondary transition-all">
                  <span className="w-14 h-14 bg-secondary/10 text-secondary flex items-center justify-center rounded-[2px] shrink-0">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div className="space-y-3">
                    <h3 className="font-headline-md text-primary">{ind.name}</h3>
                    <p className="text-on-surface-variant font-body-md leading-relaxed">{ind.description}</p>
                    <ul className="grid grid-cols-2 gap-2 font-label-sm font-semibold text-secondary pt-2">
                      <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">check</span> Compliance Vetted</li>
                      <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">check</span> Target Personas</li>
                      <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">check</span> Custom Funnel</li>
                      <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">check</span> API Integrations</li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
