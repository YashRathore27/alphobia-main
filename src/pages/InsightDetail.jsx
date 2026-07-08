import { insights } from "../data";
import { Container, Button } from "../components/ui";
import { navigate } from "../router";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";

export default function InsightDetail({ id }) {
  // Find article by slug (which is passed as 'id' in our hash route structure: #/insight/b2b-seo-attribution-guide)
  const article = insights.find((item) => item.slug === id) || insights[0];

  const goBack = () => {
    navigate("insights");
  };

  if (!article) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Article not found</h2>
        <Button onClick={goBack}>Back to Insights</Button>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface min-h-screen pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-8">
        {/* Back Button */}
        <button 
          onClick={goBack}
          className="flex items-center gap-2 font-body-md font-semibold text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </button>

        {/* Title */}
        <div className="space-y-4">
          <span className="px-3 py-1 bg-secondary/10 text-secondary font-bold font-label-sm uppercase tracking-wider rounded-[2px]">{article.tag}</span>
          <h1 className="font-display-xl text-primary leading-tight font-extrabold">{article.title}</h1>
          <div className="flex flex-wrap gap-6 font-body-md text-on-surface-variant pt-2 border-y border-outline-variant/30 py-4">
            <span className="flex items-center gap-2"><User className="w-4 h-4 text-secondary" /> By {article.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime} min read</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] rounded-[2px] overflow-hidden shadow-lg bg-slate-100 border border-outline-variant/20">
          <img 
            className="w-full h-full object-cover" 
            alt={article.title} 
            src={article.image} 
            loading="lazy"
          />
        </div>

        {/* Content */}
        <article className="prose max-w-none text-on-surface-variant leading-relaxed space-y-6 font-body-lg">
          <p className="font-semibold text-primary font-body-lg">
            {article.excerpt}
          </p>
          <p>
            {article.content}
          </p>
          <p>
            Implementing these strategies requires a deep alignment between creative assets and structural tracking configurations. In today's dynamic ad environment, brands that rely solely on surface-level metrics fail to capture the long-term compound value of their digital real estate. By prioritizing attribution integrity and granular lifecycle nurture flows, you ensure that every acquisition matches strict efficiency metrics.
          </p>
        </article>

        {/* CTA */}
        <div className="pt-8 border-t border-outline-variant/30 text-center">
          <p className="font-headline-md text-primary mb-4">Want a custom analysis based on these trends?</p>
          <Button onClick={() => navigate("contact")} variant="accent">
            Request Performance Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
