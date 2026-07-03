import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Container, SectionHeading, Button, EmptyState, Reveal } from "../components/ui";
import { CategoryCard, ProductCard, DealCard, CouponCard, BlogCard } from "../components/cards";
import { categories, products, deals, coupons, blogs, getCategory, countByCategory } from "../data";

export default function Categories() {
  const { id } = useParams();
  const category = id ? getCategory(id) : null;

  if (id && !category) {
    return (
      <Container className="py-24">
        <EmptyState title="Category not found" action={<Button to="/categories">All categories</Button>} />
      </Container>
    );
  }

  if (!category) {
    return (
      <>
        <PageHero
          eyebrow="Categories" crumbs={[{ label: "Categories" }]}
          title="Browse by category"
          subtitle="Ten expertly-curated categories, each with verified deals, tested products, working coupons and in-depth guides."
        />
        <Container className="py-16">
          <div className="grid auto-rows-[11rem] grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal key={c.id} delay={(i % 4) * 0.06} className={i === 0 || i === 5 ? "col-span-2 row-span-2" : i === 3 ? "col-span-2" : ""}>
                <CategoryCard category={c} count={countByCategory(products, c.id) + countByCategory(deals, c.id)} large={i === 0 || i === 5} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </>
    );
  }

  const catProducts = products.filter((p) => p.category === category.id).slice(0, 8);
  const catDeals = deals.filter((d) => d.category === category.id).slice(0, 3);
  const catCoupons = coupons.filter((c) => c.category === category.id).slice(0, 3);
  const catBlogs = blogs.filter((b) => b.category === category.id).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`Category · ${category.emoji}`} crumbs={[{ label: "Categories", to: "/categories" }, { label: category.name }]}
        title={category.name}
        subtitle={category.description}
      />
      <Container className="py-16">
        {catDeals.length > 0 && (
          <section className="mb-20">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Top {category.name.toLowerCase()} deals</h2>
              <Link to="/deals" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2">All deals <ArrowRight size={14} /></Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {catDeals.map((d) => <DealCard key={d.id} deal={d} />)}
            </div>
          </section>
        )}

        <section className="mb-20">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Best {category.name.toLowerCase()} products</h2>
            <Link to="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2">All products <ArrowRight size={14} /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {catProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {catCoupons.length > 0 && (
          <section className="mb-20">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Working coupons</h2>
              <Link to="/coupons" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2">All coupons <ArrowRight size={14} /></Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {catCoupons.map((c) => <CouponCard key={c.id} coupon={c} />)}
            </div>
          </section>
        )}

        {catBlogs.length > 0 && (
          <section>
            <div className="mb-8 flex items-end justify-between">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Guides & research</h2>
              <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2">Visit blog <ArrowRight size={14} /></Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {catBlogs.map((b) => <BlogCard key={b.id} post={b} />)}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
