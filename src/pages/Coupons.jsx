import { useMemo, useState } from "react";
import { BadgeCheck, Ticket, TrendingUp, PiggyBank } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Container, Select, Pagination, EmptyState, SkeletonCard, Tabs, Button, CountUpStat } from "../components/ui";
import { CouponCard } from "../components/cards";
import { coupons, categories } from "../data";
import { useFakeLoading } from "../hooks";
import { cn } from "../utils/cn";

const PER_PAGE = 12;

const heroStats = [
  { icon: Ticket, value: coupons.length, suffix: "+", label: "Active codes" },
  { icon: BadgeCheck, value: 98, suffix: "%", label: "Success rate" },
  { icon: PiggyBank, value: 214, prefix: "$", suffix: "/mo", label: "Avg. savings" },
  { icon: TrendingUp, value: 410, suffix: "K", label: "Codes used monthly" },
];

export default function Coupons() {
  const [tab, setTab] = useState("all");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const loading = useFakeLoading([tab, cat, sort, page]);

  const filtered = useMemo(() => {
    let list = coupons.filter((c) => {
      if (tab === "verified" && !c.verified) return false;
      if (tab === "exclusive" && !c.exclusive) return false;
      if (cat !== "all" && c.category !== cat) return false;
      return true;
    });
    if (sort === "popular") list = [...list].sort((a, b) => b.usedCount - a.usedCount);
    if (sort === "success") list = [...list].sort((a, b) => b.successRate - a.successRate);
    if (sort === "expiry") list = [...list].sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));
    if (sort === "savings") list = [...list].sort((a, b) => b.avgSavings - a.avgSavings);
    return list;
  }, [tab, cat, sort]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const set = (fn) => (v) => { fn(v); setPage(1); };

  return (
    <>
      <PageHero
        eyebrow="Coupon Codes" crumbs={[{ label: "Coupons" }]}
        title="Copy. Paste. Save."
        subtitle="Every code is machine-tested daily. If it's marked verified, it works — or we pull it within the hour."
      >
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="card-base flex items-center gap-3 p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><s.icon size={19} /></span>
              <div>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white"><CountUpStat value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} /></p>
                <p className="text-[11px] font-medium text-slate-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      <Container className="py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Tabs
            tabs={[{ value: "all", label: "All codes" }, { value: "verified", label: "✓ Verified" }, { value: "exclusive", label: "★ Exclusive" }]}
            active={tab} onChange={set(setTab)}
          />
          <Select value={sort} onChange={set(setSort)} label="Sort coupons"
            options={[
              { value: "popular", label: "Most used" },
              { value: "success", label: "Highest success rate" },
              { value: "savings", label: "Biggest savings" },
              { value: "expiry", label: "Expiring soon" },
            ]} />
        </div>

        <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto">
          <button onClick={() => set(setCat)("all")} className={cn("shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition-all", cat === "all" ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-primary/40 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10")}>All categories</button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => set(setCat)(c.id)} className={cn("shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition-all", cat === c.id ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-primary/40 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10")}>
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : pageItems.length === 0 ? (
          <EmptyState title="No coupons here yet" action={<Button variant="soft" onClick={() => { setTab("all"); setCat("all"); }}>Show all coupons</Button>} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((c) => <CouponCard key={c.id} coupon={c} />)}
          </div>
        )}

        <Pagination page={page} pages={pages} onChange={setPage} className="mt-12" />
      </Container>
    </>
  );
}
