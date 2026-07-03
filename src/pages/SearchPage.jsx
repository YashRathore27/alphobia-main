import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import { Container, Tabs, EmptyState, SkeletonCard, SearchInput, Button } from "../components/ui";
import { ProductCard, DealCard, CouponCard, BlogCard, ReviewCard } from "../components/cards";
import { products, deals, coupons, blogs, reviews } from "../data";
import { useFakeLoading, useDebounce } from "../hooks";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [tab, setTab] = useState("all");
  const dq = useDebounce(q, 250);
  const loading = useFakeLoading([dq, tab]);

  const match = (text) => text.toLowerCase().includes(dq.toLowerCase());
  const results = useMemo(() => {
    if (!dq) return { products: [], deals: [], coupons: [], blogs: [], reviews: [] };
    return {
      products: products.filter((p) => match(`${p.name} ${p.brand} ${p.category}`)).slice(0, 12),
      deals: deals.filter((d) => match(`${d.title} ${d.merchant} ${d.category}`)).slice(0, 9),
      coupons: coupons.filter((c) => match(`${c.merchant} ${c.title} ${c.code}`)).slice(0, 9),
      blogs: blogs.filter((b) => match(`${b.title} ${b.tag} ${b.author}`)).slice(0, 9),
      reviews: reviews.filter((r) => match(`${r.title} ${r.category}`)).slice(0, 6),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dq]);

  const total = Object.values(results).reduce((s, arr) => s + arr.length, 0);
  const counts = { all: total, products: results.products.length, deals: results.deals.length, coupons: results.coupons.length, blogs: results.blogs.length, reviews: results.reviews.length };

  const Section = ({ title, children, show }) =>
    show ? (
      <div className="mb-14">
        <h2 className="mb-6 text-xl font-extrabold text-slate-900 dark:text-white">{title}</h2>
        {children}
      </div>
    ) : null;

  return (
    <>
      <PageHero
        eyebrow="Global Search" crumbs={[{ label: "Search" }]}
        title={dq ? `Results for “${dq}”` : "Search everything on Alphobia"}
        subtitle={dq ? `${total} matches across products, deals, coupons, reviews and articles.` : "One search box for 300+ products, 100+ deals, 80+ coupons and our full editorial archive."}
      >
        <SearchInput autoFocus value={q} onChange={(v) => setParams(v ? { q: v } : {})} placeholder="Search products, deals, coupons, articles…" className="mt-8 max-w-xl" />
      </PageHero>

      <Container className="py-12">
        {dq && (
          <Tabs
            className="mb-10"
            tabs={[
              { value: "all", label: `All (${counts.all})` },
              { value: "products", label: `Products (${counts.products})` },
              { value: "deals", label: `Deals (${counts.deals})` },
              { value: "coupons", label: `Coupons (${counts.coupons})` },
              { value: "reviews", label: `Reviews (${counts.reviews})` },
              { value: "blogs", label: `Articles (${counts.blogs})` },
            ]}
            active={tab} onChange={setTab}
          />
        )}

        {!dq ? (
          <EmptyState title="Start typing to search" subtitle="Try “AI writer”, “earbuds”, “hosting” or a store name." />
        ) : loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : total === 0 ? (
          <EmptyState title={`Nothing found for “${dq}”`} subtitle="Check the spelling or try a broader term."
            action={<Button variant="soft" onClick={() => setParams({})}>Clear search</Button>} />
        ) : (
          <>
            <Section title="Products" show={(tab === "all" || tab === "products") && results.products.length > 0}>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{results.products.map((p) => <ProductCard key={p.id} product={p} />)}</div>
            </Section>
            <Section title="Deals" show={(tab === "all" || tab === "deals") && results.deals.length > 0}>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.deals.map((d) => <DealCard key={d.id} deal={d} />)}</div>
            </Section>
            <Section title="Coupons" show={(tab === "all" || tab === "coupons") && results.coupons.length > 0}>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.coupons.map((c) => <CouponCard key={c.id} coupon={c} />)}</div>
            </Section>
            <Section title="Expert reviews" show={(tab === "all" || tab === "reviews") && results.reviews.length > 0}>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{results.reviews.map((r) => <ReviewCard key={r.id} review={r} />)}</div>
            </Section>
            <Section title="Articles" show={(tab === "all" || tab === "blogs") && results.blogs.length > 0}>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{results.blogs.map((b) => <BlogCard key={b.id} post={b} />)}</div>
            </Section>
          </>
        )}
      </Container>
    </>
  );
}
