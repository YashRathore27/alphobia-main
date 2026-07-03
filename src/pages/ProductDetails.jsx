import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Heart, Scale, ShieldCheck, ThumbsUp, ThumbsDown, ArrowRight, Trophy } from "lucide-react";
import { Container, Badge, Rating, Visual, Button, Tabs, Breadcrumb, EmptyState, BrandLogo } from "../components/ui";
import { ProductCard, ReviewCard } from "../components/cards";
import { products, getCategory, getReviewForProduct, relatedProducts } from "../data";
import { formatPrice, formatNumber } from "../utils/format";
import { useApp } from "../hooks";
import { cn } from "../utils/cn";

export default function ProductDetails() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { wishlist, toggleWish, toggleCompare, toast } = useApp();
  const [tab, setTab] = useState("specs");
  const [galleryIdx, setGallery] = useState(0);

  if (!product) {
    return (
      <Container className="py-24">
        <EmptyState title="Product not found" subtitle="This product may have been removed or the link is incorrect."
          action={<Button to="/products">Browse all products</Button>} />
      </Container>
    );
  }

  const cat = getCategory(product.category);
  const review = getReviewForProduct(product.id);
  const related = relatedProducts(product, 4);
  const alternatives = products.filter((p) => p.category === product.category && p.id !== product.id).slice(4, 7);
  const wished = wishlist.has(product.id);
  const gallery = product.gallery || [product.image];

  return (
    <>
      <section className="border-b border-slate-200/60 bg-white py-10 dark:border-white/5 dark:bg-white/[0.02]">
        <Container>
          <Breadcrumb items={[{ label: "Products", to: "/products" }, { label: cat?.name, to: `/categories/${cat?.id}` }, { label: product.name }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            {/* gallery */}
            <div>
              <motion.div key={galleryIdx} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
                <Visual gradient={product.gradient} emoji={product.emoji} image={gallery[galleryIdx]} alt={product.name} iconSize="text-9xl" className="h-96 rounded-xl">
                  <div className="absolute left-4 top-4 flex gap-2">
                    {product.discount > 0 && <Badge tone="white">-{product.discount}%</Badge>}
                    {product.badge && <Badge tone="amber" className="bg-white">{product.badge}</Badge>}
                  </div>
                </Visual>
              </motion.div>
              <div className="mt-4 flex gap-3">
                {gallery.map((img, i) => (
                  <button key={i} onClick={() => setGallery(i)} aria-label={`View image ${i + 1}`}
                    className={cn("h-20 w-20 overflow-hidden rounded-2xl transition-all", galleryIdx === i ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-ink" : "opacity-60 hover:opacity-100")}>
                    <img src={img} alt={`${product.name} view ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* info */}
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <BrandLogo src={product.logo} name={product.brand} size="h-6 w-6" imgSize="h-4 w-4" rounded="rounded-md" />
                {product.brand} · {cat?.name}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{product.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Rating value={product.rating} size={16} />
                <span className="text-sm text-slate-400">{formatNumber(product.reviews)} reviews</span>
                {review && <Badge tone="blue"><ShieldCheck size={12} /> Expert score {review.score}/10</Badge>}
              </div>
              <p className="mt-5 leading-relaxed text-slate-500 dark:text-slate-400">{product.description}</p>

              <div className="card-base mt-7 p-6">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{formatPrice(product.price)}</span>
                  <span className="text-lg text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <Badge tone="green">You save {formatPrice(product.originalPrice - product.price)}</Badge>
                </div>
                <p className="mt-2 text-xs text-slate-400">Best price via {product.store} · price checked 2 hours ago</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button size="lg" variant="accent" className="flex-1" onClick={() => toast("Opening partner store — cashback tracked ✓")}>
                    Get Best Price <ExternalLink size={16} />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => { toggleWish(product.id); toast(wished ? "Removed from wishlist" : "Added to wishlist"); }} aria-label="Wishlist">
                    <Heart size={17} className={wished ? "fill-danger text-danger" : ""} />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => { toggleCompare(product.id); toast("Added to compare"); }} aria-label="Compare">
                    <Scale size={17} />
                  </Button>
                </div>
                <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400"><ShieldCheck size={13} className="text-success" /> Affiliate link — we may earn a commission at no cost to you.</p>
              </div>

              {/* score bars */}
              <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                {Object.entries(product.attributes).map(([k, v]) => (
                  <div key={k}>
                    <div className="mb-1 flex justify-between text-xs font-semibold"><span className="text-slate-500 dark:text-slate-400">{k}</span><span className="text-slate-900 dark:text-white">{v}</span></div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${v * 10}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <Tabs
          tabs={[{ value: "specs", label: "Specifications" }, { value: "proscons", label: "Pros & Cons" }, { value: "alts", label: "Alternatives" }]}
          active={tab} onChange={setTab}
        />
        <div className="mt-8">
          {tab === "specs" && (
            <div className="card-base max-w-3xl divide-y divide-slate-100 p-2 dark:divide-white/5">
              {Object.entries(product.specs).filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 px-5 py-3.5 text-sm">
                  <span className="font-medium text-slate-400">{k}</span>
                  <span className="text-right font-semibold text-slate-800 dark:text-slate-100">{v}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "proscons" && (
            <div className="grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="card-base border-t-4 border-t-success p-7">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-emerald-600"><ThumbsUp size={18} /> What we love</h3>
                <ul className="space-y-3">{product.pros.map((p) => <li key={p} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />{p}</li>)}</ul>
              </div>
              <div className="card-base border-t-4 border-t-danger p-7">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-red-500"><ThumbsDown size={18} /> Worth knowing</h3>
                <ul className="space-y-3">{product.cons.map((c) => <li key={c} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />{c}</li>)}</ul>
              </div>
            </div>
          )}
          {tab === "alts" && (
            <div className="max-w-3xl space-y-4">
              {alternatives.map((alt, i) => (
                <Link key={alt.id} to={`/products/${alt.slug}`} className="card-base card-hover group flex items-center gap-5 p-4">
                  <Visual gradient={alt.gradient} emoji={alt.emoji} image={alt.image} alt={alt.name} iconSize="text-3xl" className="h-16 w-16 shrink-0 rounded-2xl" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-slate-900 group-hover:text-primary dark:text-white">{alt.name}</p>
                    <Rating value={alt.rating} className="mt-1" />
                  </div>
                  {i === 0 && <Badge tone="green"><Trophy size={11} /> Best alternative</Badge>}
                  <span className="font-extrabold text-slate-900 dark:text-white">{formatPrice(alt.price)}</span>
                  <ArrowRight size={16} className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {review && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-extrabold text-slate-900 dark:text-white">Our expert review</h2>
            <ReviewCard review={review} large className="max-w-3xl" />
          </div>
        )}

        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Similar products</h2>
            <Link to={`/categories/${cat?.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">More in {cat?.name} <ArrowRight size={14} /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </Container>
    </>
  );
}
