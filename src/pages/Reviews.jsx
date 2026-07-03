import { useMemo, useState } from "react";
import PageHero from "../components/common/PageHero";
import { Container, Select, Pagination, EmptyState, SkeletonCard, Button } from "../components/ui";
import { ReviewCard } from "../components/cards";
import { reviews, categories } from "../data";
import { useFakeLoading } from "../hooks";
import { cn } from "../utils/cn";

const PER_PAGE = 9;

export default function Reviews() {
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const loading = useFakeLoading([cat, sort, page]);

  const filtered = useMemo(() => {
    let list = reviews.filter((r) => cat === "all" || r.category === cat);
    if (sort === "recent") list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "score") list = [...list].sort((a, b) => b.score - a.score);
    return list;
  }, [cat, sort]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const set = (fn) => (v) => { fn(v); setPage(1); };

  return (
    <>
      <PageHero
        eyebrow="Expert Reviews" crumbs={[{ label: "Reviews" }]}
        title="Honest reviews, tested in our lab"
        subtitle="Every product is purchased, tested for weeks, and scored across four dimensions. Commissions never touch verdicts."
      />
      <Container className="py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            <button onClick={() => set(setCat)("all")} className={cn("shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all", cat === "all" ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-primary/40 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10")}>All</button>
            {categories.filter((c) => reviews.some((r) => r.category === c.id)).map((c) => (
              <button key={c.id} onClick={() => set(setCat)(c.id)} className={cn("shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all", cat === c.id ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-primary/40 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10")}>
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
          <Select value={sort} onChange={set(setSort)} label="Sort reviews"
            options={[{ value: "recent", label: "Most recent" }, { value: "score", label: "Highest score" }]} />
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : pageItems.length === 0 ? (
          <EmptyState title="No reviews in this category yet" action={<Button variant="soft" onClick={() => setCat("all")}>Show all reviews</Button>} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pageItems.map((r, i) => (
              <ReviewCard key={r.id} review={r} large={page === 1 && i === 0 && cat === "all"} className={page === 1 && i === 0 && cat === "all" ? "md:col-span-2" : ""} />
            ))}
          </div>
        )}
        <Pagination page={page} pages={pages} onChange={setPage} className="mt-12" />
      </Container>
    </>
  );
}
