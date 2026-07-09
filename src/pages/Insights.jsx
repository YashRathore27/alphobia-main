import { useState, useEffect } from "react";
import { Container, Reveal } from "../components/ui";
import { Calendar, Clock, User, X } from "lucide-react";
import { useAppData } from "../context/DataContext";

export default function Insights() {
  const { insights } = useAppData();
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedArticle]);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <section className="pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="inline-block py-1 px-4 rounded-[2px] bg-secondary/10 text-secondary font-label-sm uppercase tracking-widest">
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
                onClick={() => setSelectedArticle(article)}
                className="glass-card rounded-[2px] overflow-hidden border border-outline-variant hover:border-secondary transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className="aspect-[16/9] overflow-hidden bg-slate-200">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                    alt={article.title} 
                    src={article.image} 
                    loading="lazy"
                  />
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex gap-4 font-label-sm text-on-surface-variant font-semibold">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime} min read</span>
                    </div>
                    <h3 className="font-headline-md text-primary group-hover:text-secondary transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-on-surface-variant font-body-md leading-relaxed line-clamp-3">{article.excerpt}</p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center font-label-sm font-semibold">
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

      {/* Article Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto"
          onClick={() => setSelectedArticle(null)}
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div 
            className="relative bg-white rounded-[2px] max-w-3xl w-full shadow-2xl overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-outline-variant/30 flex items-center justify-between px-8 py-4 z-10">
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-bold font-label-sm uppercase tracking-wider rounded-[2px]">{selectedArticle.tag}</span>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-8 py-6 space-y-6">
              <h2 className="font-display-xl text-primary leading-tight font-extrabold">{selectedArticle.title}</h2>

              <div className="flex flex-wrap gap-6 text-sm text-on-surface-variant border-y border-outline-variant/30 py-4">
                <span className="flex items-center gap-2"><User className="w-4 h-4 text-secondary" /> By {selectedArticle.author}</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(selectedArticle.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {selectedArticle.readTime} min read</span>
              </div>

              <div className="aspect-[16/9] rounded-[2px] overflow-hidden bg-slate-100 border border-outline-variant/20">
                <img className="w-full h-full object-cover" alt={selectedArticle.title} src={selectedArticle.image} />
              </div>

              <article className="text-on-surface-variant font-body-md leading-relaxed space-y-6">
                <p className="font-body-lg text-primary">{selectedArticle.excerpt}</p>
                <p>{selectedArticle.content}</p>
              </article>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
