import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart, Bookmark, Clock, Copy, Check, BadgeCheck, Flame, Zap,
  ArrowRight, Scale, Eye, ThumbsUp, ThumbsDown, ExternalLink, Users, Star,
  Search, Target, Share2 as ShareIcon, Code2, PenTool, Mail, BarChart3, Layout,
  FileText, Video, Workflow, Cpu, Shirt, Sparkles, Megaphone, Wallet, Plane, Server, Home as HomeIcon,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { Badge, Rating, Visual, Avatar, Button, BrandLogo } from "../ui";
import { useApp } from "../../hooks";
import { formatPrice, formatNumber, timeLeftLabel, scoreLabel } from "../../utils/format";
import { getCategory } from "../../data";

export const iconMap = { Search, Target, Share2: ShareIcon, Code2, PenTool, Mail, BarChart3, Layout, FileText, Video, Workflow, Users, Cpu, Shirt, Sparkles, Megaphone, Wallet, Plane, Server, Heart, Home: HomeIcon };

/* ------------------------------- deal card ------------------------------ */
export function DealCard({ deal, size = "small", className }) {
  const { wishlist, toggleWish, toast } = useApp();
  const saved = wishlist.has(deal.id);
  const large = size === "large";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group card-base card-hover relative flex flex-col overflow-hidden", className)}
    >
      <Visual gradient={deal.gradient} emoji={deal.emoji} image={deal.image} alt={deal.title} iconSize={large ? "text-8xl" : "text-6xl"} className={cn(large ? "h-64" : "h-40")}>
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge tone="white">-{deal.discount}%</Badge>
          {deal.badge && (
            <Badge tone={deal.badge === "Limited Offer" ? "red" : "amber"} className="bg-white">
              {deal.badge === "Trending" ? <Flame size={11} /> : <Zap size={11} />} {deal.badge}
            </Badge>
          )}
        </div>
        <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <button aria-label="Save deal" onClick={() => { toggleWish(deal.id); toast(saved ? "Removed from saved deals" : "Deal saved to your list"); }}
            className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm transition-all hover:scale-110", saved ? "text-danger" : "text-slate-600")}>
            <Bookmark size={15} className={saved ? "fill-current" : ""} />
          </button>
          <button aria-label="Share deal" onClick={() => toast("Share link copied to clipboard")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm transition-all hover:scale-110">
            <ShareIcon size={15} />
          </button>
        </div>
      </Visual>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs font-medium text-body">
          <span className="flex min-w-0 items-center gap-1.5">
            <BrandLogo src={deal.merchantLogo} name={deal.merchant} size="h-5 w-5" imgSize="h-3.5 w-3.5" rounded="rounded-md" />
            <span className="truncate">{deal.merchant}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-warning"><Clock size={12} />{timeLeftLabel(deal.expiresAt)}</span>
        </div>
        <h3 className={cn("font-bold leading-snug text-ink transition-colors group-hover:text-primary dark:text-white", large ? "text-xl" : "text-[15px]")}>
          {deal.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-body">{deal.description}</p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className={cn("font-extrabold text-ink dark:text-white", large ? "text-2xl" : "text-lg")}>{formatPrice(deal.price)}</span>
          <span className="text-sm text-faint line-through">{formatPrice(deal.originalPrice)}</span>
          <Badge tone="green" className="ml-auto">Save {formatPrice(deal.originalPrice - deal.price)}</Badge>
        </div>

        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[11px] font-medium text-body">
            <span>{deal.claimed}% claimed</span>
            <span className="text-info">+{deal.cashback}% cashback</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-line">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${deal.claimed}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <Rating value={deal.rating} />
          <Button size="sm" variant="soft" onClick={() => toast("Redirecting to partner store…")}>
            Get Deal <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------ coupon card ----------------------------- */
export function CouponCard({ coupon, className }) {
  const { toast } = useApp();
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(coupon.code).catch(() => {});
    setCopied(true);
    toast(`Code ${coupon.code} copied — apply at checkout`);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45 }}
      className={cn("group card-base card-hover relative overflow-hidden p-6", className)}
    >
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", coupon.gradient)} />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <BrandLogo src={coupon.merchantLogo} name={coupon.merchant} />
          <div>
            <p className="text-sm font-bold text-ink dark:text-white">{coupon.merchant}</p>
            <p className="text-xs text-faint">{formatNumber(coupon.usedCount)} used · {coupon.successRate}% success</p>
          </div>
        </div>
        {coupon.verified && <Badge tone="green"><BadgeCheck size={12} /> Verified</Badge>}
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-gradient">{coupon.discountLabel}</span>
        <span className="text-sm font-semibold text-body">OFF</span>
        {coupon.exclusive && <Badge tone="cyan" className="ml-auto">Exclusive</Badge>}
      </div>
      <p className="mt-1 line-clamp-1 text-sm text-body">{coupon.title}</p>

      <div className="mt-5 flex items-center gap-2">
        <span className="flex h-11 flex-1 items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 font-mono text-sm font-bold tracking-widest text-primary">
          {coupon.code}
        </span>
        <Button size="sm" className="h-11 px-4" onClick={copy} aria-label={`Copy code ${coupon.code}`}>
          {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-faint">
        <span className="flex items-center gap-1"><Clock size={12} /> {timeLeftLabel(coupon.expiresAt)}</span>
        <span>Avg. saving {formatPrice(coupon.avgSavings)}</span>
      </div>
    </motion.article>
  );
}

/* ------------------------------ product card ---------------------------- */
export function ProductCard({ product, list = false, className }) {
  const { wishlist, toggleWish, compare, toggleCompare, toast } = useApp();
  const wished = wishlist.has(product.id);
  const comparing = compare.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45 }}
      className={cn("group card-base card-hover relative overflow-hidden", list ? "flex flex-col sm:flex-row" : "flex flex-col", className)}
    >
      <Link to={`/products/${product.slug}`} className="contents">
        <Visual gradient={product.gradient} emoji={product.emoji} image={product.image} alt={product.name} iconSize="text-6xl" className={list ? "h-44 sm:h-auto sm:w-56 sm:shrink-0" : "h-44"}>
          <div className="absolute left-3 top-3 flex gap-2">
            {product.discount > 0 && <Badge tone="white">-{product.discount}%</Badge>}
            {product.badge && <Badge tone="amber">{product.badge}</Badge>}
          </div>
        </Visual>
      </Link>

      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <button aria-label="Add to wishlist" onClick={() => { toggleWish(product.id); toast(wished ? "Removed from wishlist" : "Added to wishlist"); }}
          className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm transition-transform hover:scale-110", wished ? "text-danger" : "text-slate-600")}>
          <Heart size={15} className={wished ? "fill-current" : ""} />
        </button>
        <button aria-label="Add to compare" onClick={() => { toggleCompare(product.id); toast(comparing ? "Removed from compare" : "Added to compare (max 3)"); }}
          className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm transition-transform hover:scale-110", comparing ? "text-primary" : "text-slate-600")}>
          <Scale size={15} />
        </button>
        <Link to={`/products/${product.slug}`} aria-label="Quick view"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm transition-transform hover:scale-110">
          <Eye size={15} />
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1.5 flex items-center justify-between text-xs text-body">
          <span className="flex items-center gap-1.5 font-medium">
            <BrandLogo src={product.logo} name={product.brand} size="h-5 w-5" imgSize="h-3.5 w-3.5" rounded="rounded-md" />
            {product.brand}
          </span>
          <Badge tone="slate" className="!px-2 !py-0.5">Affiliate</Badge>
        </div>
        <Link to={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-ink transition-colors group-hover:text-primary dark:text-white">{product.name}</h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <Rating value={product.rating} />
          <span className="text-xs text-faint">({formatNumber(product.reviews)})</span>
        </div>
        {list && <p className="mt-2 line-clamp-2 text-sm text-body">{product.description}</p>}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-ink dark:text-white">{formatPrice(product.price)}</span>
            <span className="text-xs text-faint line-through">{formatPrice(product.originalPrice)}</span>
          </div>
          <Button size="sm" variant="soft" to={`/products/${product.slug}`}>View <ArrowRight size={14} /></Button>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------ review card ----------------------------- */
export function ReviewCard({ review, large = false, className }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }}
      className={cn("group card-base card-hover flex flex-col overflow-hidden", className)}
    >
      <Visual gradient={review.gradient} emoji={review.emoji} image={review.image} alt={review.title} iconSize={large ? "text-8xl" : "text-6xl"} className={large ? "h-64" : "h-44"}>
        <div className="absolute left-4 top-4">
          <span className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-white shadow-lg">
            <span className="text-lg font-extrabold text-primary">{review.score}</span>
            <span className="text-[9px] font-bold uppercase tracking-wide text-faint">score</span>
          </span>
        </div>
        <div className="absolute bottom-4 right-4"><Badge tone="white">{scoreLabel(review.score)}</Badge></div>
      </Visual>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{getCategory(review.category)?.name} · Expert Review</p>
        <h3 className={cn("font-bold leading-snug text-ink transition-colors group-hover:text-primary dark:text-white", large ? "text-2xl" : "text-lg")}>{review.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-body">{review.excerpt}</p>
        <div className="mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
          <span className="flex items-start gap-1.5 text-success"><ThumbsUp size={13} className="mt-0.5 shrink-0" /> {review.pros[0]}</span>
          <span className="flex items-start gap-1.5 text-danger"><ThumbsDown size={13} className="mt-0.5 shrink-0" /> {review.cons[0]}</span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div className="flex items-center gap-2.5">
            <Avatar name={review.author.name} size="h-8 w-8" color="#EC4899" />
            <div className="text-xs">
              <p className="font-semibold text-ink dark:text-slate-200">{review.author.name}</p>
              <p className="text-faint">{review.readTime} min read</p>
            </div>
          </div>
          <Link to="/reviews" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2">
            Read review <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------- blog card ------------------------------ */
export function BlogCard({ post, featured = false, compact = false, className }) {
  if (compact) {
    return (
      <Link to="/blog" className={cn("group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-surface dark:hover:bg-white/5", className)}>
        <span className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
          <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{post.tag}</p>
          <h4 className="line-clamp-2 text-sm font-bold leading-snug text-ink transition-colors group-hover:text-primary dark:text-slate-100">{post.title}</h4>
          <p className="mt-0.5 text-xs text-faint">{post.readTime} min read</p>
        </div>
      </Link>
    );
  }
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }}
      className={cn("group card-base card-hover flex flex-col overflow-hidden", className)}
    >
      <Link to="/blog" className="contents">
        <Visual gradient={post.gradient} emoji={post.emoji} image={post.image} alt={post.title} iconSize={featured ? "text-8xl" : "text-5xl"} className={featured ? "h-72" : "h-44"}>
          <div className="absolute left-3 top-3"><Badge tone="white">{post.tag}</Badge></div>
          {post.trending && <div className="absolute right-3 top-3"><Badge tone="red"><Flame size={11} /> Trending</Badge></div>}
        </Visual>
        <div className="flex flex-1 flex-col p-6">
          <h3 className={cn("font-bold leading-snug text-ink transition-colors group-hover:text-primary dark:text-white", featured ? "text-2xl" : "text-lg")}>{post.title}</h3>
          <p className={cn("mt-2 text-sm text-body", featured ? "line-clamp-3" : "line-clamp-2")}>{post.excerpt}</p>
          <div className="mt-auto flex items-center gap-3 pt-5">
            <Avatar name={post.author} size="h-8 w-8" color="#7C3AED" />
            <div className="text-xs">
              <p className="font-semibold text-ink dark:text-slate-200">{post.author}</p>
              <p className="text-faint">{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {post.readTime} min</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ----------------------------- service card ----------------------------- */
export function ServiceCard({ service, className }) {
  const Icon = iconMap[service.icon] || Search;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }}
      className={cn("group card-base card-hover relative flex flex-col overflow-hidden p-7", className)}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/10" />
      <span className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-gray-200">
        {(() => {
          const logoPath = `/logos/${service.id}.svg`;
          return (
            <>
              <img src={logoPath} alt={service.name} className="h-8 w-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              {Icon && <Icon size={24} className="h-8 w-8" />}
            </>
          );
        })()}
      </span>
      <h3 className="text-lg font-bold text-ink dark:text-white">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{service.description}</p>
      <p className="mt-4 text-xs font-semibold text-secondary">{service.results}</p>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
        <p className="text-sm text-faint">From <span className="text-lg font-extrabold text-ink dark:text-white">{formatPrice(service.price)}</span>/mo</p>
        <Link to="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2">
          Explore <ArrowRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}

/* --------------------------- testimonial card --------------------------- */
export function TestimonialCard({ t, className }) {
  return (
    <article className={cn("card-base card-hover flex h-full flex-col p-7", className)}>
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} className={i < t.rating ? "fill-warning text-warning" : "text-line dark:text-slate-600"} />
        ))}
      </div>
      <p className="flex-1 text-[15px] leading-relaxed text-ink dark:text-slate-300">"{t.text}"</p>
      <div className="mt-6 flex items-center gap-3">
        <Avatar name={t.name} color={t.color} />
        <div>
          <p className="text-sm font-bold text-ink dark:text-white">{t.name}</p>
          <p className="text-xs text-faint">{t.role} · {t.company}</p>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------- category card ----------------------------- */
export function CategoryCard({ category, count, large = false, className }) {
  return (
    <Link to={`/categories/${category.id}`} className={cn("group relative block overflow-hidden rounded-xl border border-line transition-all duration-300 hover:border-primary/30", className)}>
      {category.image && (
        <img src={category.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      )}
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-opacity duration-500", category.gradient, category.image ? "opacity-75 group-hover:opacity-65" : "opacity-90")} />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 80% 15%, rgba(255,255,255,.6) 0, transparent 40%)" }} />
      <div className={cn("relative flex h-full flex-col justify-between p-6 text-white", large ? "min-h-56" : "min-h-40")}>
        {/* Icon overlay removed */}
        <div>
          <h3 className={cn("font-extrabold", large ? "text-2xl" : "text-lg")}>{category.name}</h3>
          {large && <p className="mt-1 line-clamp-2 max-w-xs text-sm text-white/80">{category.description}</p>}
          <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/90">
            {count} curated items <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </p>
        </div>
      </div>
    </Link>
  );
}
