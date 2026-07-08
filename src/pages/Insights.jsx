import { insights } from "../data";
import { Container, Reveal } from "../components/ui";
import { navigate } from "../router";
import { Calendar, Clock, User } from "lucide-react";

export default function Insights() {
  const go = (slug) => {
    navigate("insight", slug);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <section className="pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="inline-block py-1 px-4 rounded-[2px] bg-secondary/10 text-secondary font-label-sm text-label-sm uppercase tracking-widest">
          Knowledge Base
        </span>
        <h1 className="font-display-xl text-primary leading-tight">
          High-Frequency <br/><span className="text-secondary">Market Intelligence</span>
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Deep-dives, data studies, and operational blueprints written by our consulting practitioners.
        </p>
      </section>

      <section className="py-12 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {insights.map((article, idx) => (
            <Reveal key={article.id} delay={idx * 0.1}>
              <div 
                onClick={() => go(article.slug)}
                className="glass-card rounded-[2px] overflow-hidden border border-outline-variant hover:border-secondary transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className="aspect-[16/9] overflow-hidden bg-slate-200">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                    alt={article.title} 
                    src={article.image} 
                  />
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex gap-4 text-xs text-on-surface-variant font-semibold">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime} min read</span>
                    </div>
                    <h3 className="font-bold text-2xl text-primary group-hover:text-secondary transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs font-semibold">
                    <span className="flex items-center gap-2 text-primary">
                      <User className="w-4.5 h-4.5 text-secondary" /> {article.author}
                    </span>
                    <span className="text-secondary group-hover:translate-x-1 transition-transform flex items-center gap-1">Read Article →</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
