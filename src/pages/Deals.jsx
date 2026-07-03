import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Container, Select, Pagination, EmptyState, SkeletonCard, Badge, Button } from "../components/ui";
import { DealCard } from "../components/cards";
import { deals, categories } from "../data";
import { useFakeLoading } from "../hooks";
import { cn } from "../utils/cn";

const PER_PAGE = 12;
const priceRanges = [
  { value: "all", label: "Any price" },
  { value: "0-50", label: "Under $50" },
  { value: "50-150", label: "$50 – $150" },
  { value: "150-500", label: "$150 – $500" },
  { value: "500-99999", label: "$500+" },
];

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-slate-100 py-5 first:pt-0 last:border-0 dark:border-white/5">
      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">{title}</h4>
      {children}
    </div>
  );
}

export default function Deals() {
  console.log('Deals component render');
  const [cat, setCat] = useState("all");
  const [price, setPrice] = useState("all");
  const [store, setStore] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [minCashback, setMinCashback] = useState(0);
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  const stores = useMemo(() => [...new Set(deals.map((d) => d.merchant))].sort(), []);
  const loading = useFakeLoading([cat, price, store, minRating, minCashback, sort, page]);
  console.log('Deals loading:', loading);

  const filtered = useMemo(() => {
    console.log('Deals filtered start');
    let list = deals.filter((d) => {
      if (cat !== "all" && d.category !== cat) return false;
      if (store !== "all" && d.merchant !== store) return false;
      if (d.rating < minRating) return false;
      if (d.cashback < minCashback) return false;
      if (price !== "all") {
        const [lo, hi] = price.split("-").map(Number);
        if (d.price < lo || d.price > hi) return false;
      }
      return true;
    });
    if (sort === "discount") list = [...list].sort((a, b) => b.discount - a.discount);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "ending") list = [...list].sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));
    if (sort === "popular") list = [...list].sort((a, b) => b.claimed - a.claimed);
    console.log('Deals filtered count:', list.length);
    return list;
  }, [cat, price, store, minRating, minCashback, sort]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  console.log('Deals pages:', pages);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  console.log('Deals pageItems count:', pageItems.length);
  const set = (fn) => (v) => { fn(v); setPage(1); };

  const sidebar = (
    <div className="card-base p-6">
      <FilterGroup title="Categories">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => set(setCat)("all")} className={cn("rounded-lg px-3 py-1.5 text-xs font-semibold transition-all", cat === "all" ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300")}>All</button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => set(setCat)(c.id)} className={cn("rounded-lg px-3 py-1.5 text-xs font-semibold transition-all", cat === c.id ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300")}>
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Price">
        <div className="space-y-1.5">
          {priceRanges.map((r) => (
            <label key={r.value} className="flex cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5">
              <input type="radio" name="price" checked={price === r.value} onChange={() => set(setPrice)(r.value)} className="h-4 w-4 accent-blue-600" />
              {r.label}
            </label>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Store">
        <Select value={store} onChange={set(setStore)} label="Store" className="w-full"
          options={[{ value: "all", label: "All stores" }, ...stores.map((s) => ({ value: s, label: s }))]} />
      </FilterGroup>
      <FilterGroup title="Minimum rating">
        <div className="flex gap-2">
          {[0, 4, 4.5].map((r) => (
            <button key={r} onClick={() => set(setMinRating)(r)} className={cn("flex-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-all", minRating === r ? "border-primary bg-primary/10 text-primary" : "border-slate-200 text-slate-500 hover:border-primary/40 dark:border-white/10 dark:text-slate-300")}>
              {r === 0 ? "Any" : `★ ${r}+`}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Cashback">
        <div className="flex gap-2">
          {[0, 5, 10].map((c) => (
            <button key={c} onClick={() => set(setMinCashback)(c)} className={cn("flex-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-all", minCashback === c ? "border-primary bg-primary/10 text-primary" : "border-slate-200 text-slate-500 hover:border-primary/40 dark:border-white/10 dark:text-slate-300")}>
              {c === 0 ? "Any" : `${c}%+`}
            </button>
          ))}
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow="Exclusive Deals"
        crumbs={[{ label: "Deals" }]}
        title="Today's verified deals"
        subtitle={`${deals.length} live deals across ${categories.length} categories — tracked, verified and refreshed every hour.`}
      />
      <Container className="py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> deals
            {cat !== "all" && <Badge tone="blue" className="ml-2">{categories.find((c) => c.id === cat)?.name} <button onClick={() => set(setCat)("all")} aria-label="Clear category"><X size={11} /></button></Badge>}
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setMobileFilters(!mobileFilters)}>
              <SlidersHorizontal size={15} /> Filters
            </Button>
            <Select value={sort} onChange={set(setSort)} label="Sort deals"
              options={[
                { value: "popular", label: "Most popular" },
                { value: "discount", label: "Biggest discount" },
                { value: "ending", label: "Ending soon" },
                { value: "price-asc", label: "Price: low → high" },
                { value: "price-desc", label: "Price: high → low" },
              ]} />
          </div>
        </div>

        {mobileFilters && <div className="mb-8 lg:hidden">{sidebar}</div>}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden self-start lg:sticky lg:top-24 lg:block">{sidebar}</aside>
          <div>
            {loading ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : pageItems.length === 0 ? (
              <EmptyState title="No deals match your filters" action={<Button variant="soft" onClick={() => { setCat("all"); setPrice("all"); setStore("all"); setMinRating(0); setMinCashback(0); setPage(1); }}>Reset filters</Button>} />
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {pageItems.map((d, i) => (
                  <DealCard key={d.id} deal={d} size={i === 0 ? "large" : "small"} className={i === 0 ? "sm:col-span-2 xl:col-span-2" : ""} />
                ))}
              </div>
            )}
            <Pagination page={page} pages={pages} onChange={setPage} className="mt-12" />
          </div>
        </div>
      </Container>
    </>
  );
}
