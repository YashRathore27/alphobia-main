import { useMemo, useState } from "react";
import { LayoutGrid, List as ListIcon, SlidersHorizontal } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Container, Select, Pagination, EmptyState, SkeletonCard, SearchInput, Button } from "../components/ui";
import { ProductCard } from "../components/cards";
import { products, categories } from "../data";
import { useFakeLoading, useDebounce } from "../hooks";
import { cn } from "../utils/cn";

const PER_PAGE = 12;

export default function Products() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [brand, setBrand] = useState("all");
  const [store, setStore] = useState("all");
  const [price, setPrice] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const dq = useDebounce(q, 250);
  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), []);
  const stores = useMemo(() => [...new Set(products.map((p) => p.store))].sort(), []);
  const loading = useFakeLoading([dq, cat, brand, store, price, minRating, sort, page]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (dq && !`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(dq.toLowerCase())) return false;
      if (cat !== "all" && p.category !== cat) return false;
      if (brand !== "all" && p.brand !== brand) return false;
      if (store !== "all" && p.store !== store) return false;
      if (p.rating < minRating) return false;
      if (price !== "all") {
        const [lo, hi] = price.split("-").map(Number);
        if (p.price < lo || p.price > hi) return false;
      }
      return true;
    });
    const sorters = {
      featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating,
      rating: (a, b) => b.rating - a.rating,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      discount: (a, b) => b.discount - a.discount,
      reviews: (a, b) => b.reviews - a.reviews,
    };
    return [...list].sort(sorters[sort]);
  }, [dq, cat, brand, store, price, minRating, sort]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const set = (fn) => (v) => { fn(v); setPage(1); };

  return (
    <>
      <PageHero
        eyebrow="Product Discovery" crumbs={[{ label: "Products" }]}
        title="Find your next favorite product"
        subtitle={`${products.length} lab-tested products across ${categories.length} categories, each with transparent scoring and live pricing.`}
      >
        <SearchInput value={q} onChange={set(setQ)} placeholder={`Search ${products.length} products…`} className="mt-8 max-w-xl" />
      </PageHero>

      <Container className="py-12">
        {/* filter toolbar */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal size={15} /> Filters
          </Button>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            <button onClick={() => set(setCat)("all")} className={cn("shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition-all", cat === "all" ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-primary/40 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10")}>All</button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => set(setCat)(c.id)} className={cn("shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition-all", cat === c.id ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-primary/40 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10")}>
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Select value={sort} onChange={set(setSort)} label="Sort products"
              options={[
                { value: "featured", label: "Featured" },
                { value: "rating", label: "Highest rated" },
                { value: "reviews", label: "Most reviewed" },
                { value: "discount", label: "Biggest discount" },
                { value: "price-asc", label: "Price: low → high" },
                { value: "price-desc", label: "Price: high → low" },
              ]} />
            <div className="flex rounded-2xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-slate-800" role="group" aria-label="View mode">
              <button onClick={() => setView("grid")} aria-label="Grid view" className={cn("rounded-xl p-2 transition-colors", view === "grid" ? "bg-primary/10 text-primary" : "text-slate-400 hover:text-slate-600")}><LayoutGrid size={16} /></button>
              <button onClick={() => setView("list")} aria-label="List view" className={cn("rounded-xl p-2 transition-colors", view === "list" ? "bg-primary/10 text-primary" : "text-slate-400 hover:text-slate-600")}><ListIcon size={16} /></button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="card-base mb-8 grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <Select value={brand} onChange={set(setBrand)} label="Brand" options={[{ value: "all", label: "All brands" }, ...brands.map((b) => ({ value: b, label: b }))]} />
            <Select value={store} onChange={set(setStore)} label="Store" options={[{ value: "all", label: "All stores" }, ...stores.map((s) => ({ value: s, label: s }))]} />
            <Select value={price} onChange={set(setPrice)} label="Price"
              options={[{ value: "all", label: "Any price" }, { value: "0-50", label: "Under $50" }, { value: "50-150", label: "$50 – $150" }, { value: "150-500", label: "$150 – $500" }, { value: "500-99999", label: "$500+" }]} />
            <Select value={String(minRating)} onChange={(v) => set(setMinRating)(Number(v))} label="Rating"
              options={[{ value: "0", label: "Any rating" }, { value: "4", label: "★ 4.0+" }, { value: "4.5", label: "★ 4.5+" }]} />
          </div>
        )}

        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> products found
        </p>

        {loading ? (
          <div className={cn("grid gap-5", view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1")}>
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : pageItems.length === 0 ? (
          <EmptyState
            title="No products found"
            subtitle={dq ? `Nothing matched “${dq}”. Try a broader term.` : "Try adjusting your filters."}
            action={<Button variant="soft" onClick={() => { setQ(""); setCat("all"); setBrand("all"); setStore("all"); setPrice("all"); setMinRating(0); }}>Reset everything</Button>}
          />
        ) : (
          <div className={cn("grid gap-5", view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1")}>
            {pageItems.map((p) => <ProductCard key={p.id} product={p} list={view === "list"} />)}
          </div>
        )}

        <Pagination page={page} pages={pages} onChange={setPage} className="mt-12" />
      </Container>
    </>
  );
}
