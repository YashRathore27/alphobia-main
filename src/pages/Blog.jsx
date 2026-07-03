import { useMemo, useState } from "react";
import { Flame } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Container, Pagination, EmptyState, SkeletonCard, SearchInput, Button, Reveal } from "../components/ui";
import { BlogCard } from "../components/cards";
import { blogs, categories } from "../data";
import { useFakeLoading, useDebounce } from "../hooks";
import { cn } from "../utils/cn";

const PER_PAGE = 9;
const tags = [...new Set(blogs.map((b) => b.tag))];

export default function Blog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [tag, setTag] = useState("all");
  const [page, setPage] = useState(1);
  const dq = useDebounce(q, 250);
  const loading = useFakeLoading([dq, cat, tag, page]);

  const featured = blogs.find((b) => b.featured) || blogs[0];
  const trending = blogs.filter((b) => b.trending).slice(0, 5);

  const filtered = useMemo(() =>
    blogs.filter((b) => {
      if (dq && !`${b.title} ${b.tag} ${b.author}`.toLowerCase().includes(dq.toLowerCase())) return false;
      if (cat !== "all" && b.category !== cat) return false;
      if (tag !== "all" && b.tag !== tag) return false;
      return true;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)),
    [dq, cat, tag]
  );

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const set = (fn) => (v) => { fn(v); setPage(1); };

  return (
    <>
      <PageHero
        eyebrow="The Alphobia Blog" crumbs={[{ label: "Blog" }]}
        title="Research, guides & data studies"
        subtitle={`${blogs.length} articles from our editorial team — buying guides, price studies and marketing playbooks.`}
      >
        <SearchInput value={q} onChange={set(setQ)} placeholder="Search articles…" className="mt-8 max-w-xl" />
      </PageHero>

      <Container className="py-12">
        {/* featured + trending */}
        {!dq && cat === "all" && tag === "all" && page === 1 && (
          <div className="mb-16 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <BlogCard post={featured} featured />
            <Reveal className="card-base self-start p-5">
              <p className="mb-2 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <Flame size={13} className="text-danger" /> Trending now
              </p>
              <div className="divide-y divide-slate-100 dark:divide-white/5">
                {trending.map((p) => <BlogCard key={p.id} post={p} compact className="py-2" />)}
              </div>
            </Reveal>
          </div>
        )}

        {/* filters */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button onClick={() => set(setCat)("all")} className={cn("rounded-full px-4 py-2 text-xs font-semibold transition-all", cat === "all" ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-primary/40 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10")}>All categories</button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => set(setCat)(c.id)} className={cn("rounded-full px-4 py-2 text-xs font-semibold transition-all", cat === c.id ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-primary/40 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10")}>
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
        <div className="mb-10 flex flex-wrap gap-2">
          <button onClick={() => set(setTag)("all")} className={cn("rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all", tag === "all" ? "bg-secondary/10 text-pink-600 ring-1 ring-secondary/30" : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400")}># All topics</button>
          {tags.map((t) => (
            <button key={t} onClick={() => set(setTag)(t)} className={cn("rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all", tag === t ? "bg-secondary/10 text-pink-600 ring-1 ring-secondary/30" : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400")}># {t}</button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : pageItems.length === 0 ? (
          <EmptyState title="No articles found" subtitle={dq ? `Nothing matched “${dq}”.` : "Try different filters."}
            action={<Button variant="soft" onClick={() => { setQ(""); setCat("all"); setTag("all"); }}>Reset filters</Button>} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pageItems.map((b) => <BlogCard key={b.id} post={b} />)}
          </div>
        )}
        <Pagination page={page} pages={pages} onChange={setPage} className="mt-12" />
      </Container>
    </>
  );
}
