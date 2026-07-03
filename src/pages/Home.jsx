import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import {
  ArrowRight, ArrowUpRight, Search, TrendingUp, Clock, Star,
  BarChart3, MousePointerClick, DollarSign, Zap, ShieldCheck, Users,
  LayoutDashboard, Megaphone, Wallet, LineChart, Sparkles, Timer, Trophy,
} from "lucide-react";
import { Container, Button, Badge, Rating, CountUpStat, Reveal, Visual, BrandLogo } from "../components/ui";
import { iconMap } from "../components/cards";

import { TrustedCompanies, TestimonialsSection, NewsletterCTA } from "../components/sections";
import {
  deals, products, reviews, blogs, categories, stats,
  affiliatePrograms, marketingTools, adPlatforms, countByCategory,
} from "../data";
import { formatPrice, timeLeftLabel } from "../utils/format";
import { useApp } from "../hooks";
import { cn } from "../utils/cn";


function SectionHead({ eyebrow, title, subtitle, to, cta = "View all" }) {
  return (
    <Reveal className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-5 w-full">
      <div className="w-[90%] flex-grow">
        {eyebrow && <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-[28px] shrink-0">{title}</h2>
          <div className="h-[1.5px] flex-grow bg-slate-200 dark:bg-white/20 hidden sm:block" />
        </div>
        {subtitle && <p className="mt-2.5 text-sm leading-relaxed text-body">{subtitle}</p>}
      </div>
      {to && (
        <Link to={to} className="group inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:border-primary/40 hover:text-primary shrink-0 self-start md:self-center">
          {cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </Reveal>
  );
}

/* ------------------------------ hero section ----------------------------- */
const sparkData = [12, 18, 15, 24, 22, 31, 28, 39, 36, 48, 44, 58].map((v, i) => ({ i, v }));
const heroKpis = [
  { icon: DollarSign, label: "Revenue", value: "$84.2K", delta: "+18.4%", color: "text-primary", bg: "bg-primary/10" },
  { icon: TrendingUp, label: "ROAS", value: "5.8x", delta: "+0.6x", color: "text-secondary", bg: "bg-secondary/10" },
  { icon: MousePointerClick, label: "Clicks", value: "412K", delta: "+12.1%", color: "text-tangerine", bg: "bg-tangerine/10" },
];
const heroCampaigns = [
  { name: "Spring Sale — Search", status: "Live", value: "6.4x", tone: "text-success bg-success/10" },
  { name: "Creators — Social", status: "Live", value: "4.2x", tone: "text-success bg-success/10" },
  { name: "Retarget — Display", status: "Paused", value: "3.1x", tone: "text-warning bg-warning/10" },
];

const AVATARS = [
  // [url, orbit, angleDeg, radiusPx, sizeClass, shapeClass, glowClass, delay]
  ["https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png", 1, 270, 177, "", "mk-avatar--sq", "glow-purple", 0.6],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png", 2, 60, 251, "", "", "glow-yellow", 0.8],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png", 2, 180, 251, "mk-avatar--md", "", "glow-pink", 1.0],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png", 2, 300, 251, "", "mk-avatar--sq", "glow-blue", 1.2],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png", 3, 130, 325, "mk-avatar--lg", "", "glow-pink", 1.4],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png", 4, 30, 399, "", "", "glow-purple", 1.6],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png", 4, 95, 399, "mk-avatar--lg", "mk-avatar--sq-lg", "glow-orange", 1.85],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png", 4, 220, 399, "mk-avatar--lg", "mk-avatar--sq-lg", "glow-pink", 2.1],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png", 4, 320, 399, "", "", "glow-purple", 2.3],
];

function OrbitAvatar({ url, angle, radius, sizeClass, shapeClass, glowClass, delay, uprightClass }) {
  return (
    <div
      className="mk-avatar-pos"
      style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)` }}
    >
      <div className={uprightClass}>
        <img
          src={url}
          alt="Marketing specialist"
          loading="lazy"
          className={`mk-avatar ${sizeClass} ${shapeClass} ${glowClass}`}
          style={{ animationDelay: `${delay}s` }}
        />
      </div>
    </div>
  );
}

function OrbitHeroAnimation() {
  const [count, setCount] = useState(0);
  const target = 20;

  useEffect(() => {
    let start;
    const duration = 2000;
    const delay = 1200;
    const timeout = setTimeout(() => {
      let raf;
      const tick = (now) => {
        if (start === undefined) start = now;
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setCount(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mk-hero-right mx-auto" aria-hidden="true">
      <div className="mk-circles">
        <div className="mk-orbit mk-orbit-4">
          {AVATARS.filter((a) => a[1] === 4).map(([url, , angle, radius, size, shape, glow, delay]) => (
            <OrbitAvatar key={url + angle} url={url} angle={angle} radius={radius} sizeClass={size} shapeClass={shape} glowClass={glow} delay={delay} uprightClass="mk-upright-4" />
          ))}
        </div>
        <div className="mk-orbit mk-orbit-3">
          {AVATARS.filter((a) => a[1] === 3).map(([url, , angle, radius, size, shape, glow, delay]) => (
            <OrbitAvatar key={url + angle} url={url} angle={angle} radius={radius} sizeClass={size} shapeClass={shape} glowClass={glow} delay={delay} uprightClass="mk-upright-3" />
          ))}
        </div>
        <div className="mk-orbit mk-orbit-2">
          {AVATARS.filter((a) => a[1] === 2).map(([url, , angle, radius, size, shape, glow, delay]) => (
            <OrbitAvatar key={url + angle} url={url} angle={angle} radius={radius} sizeClass={size} shapeClass={shape} glowClass={glow} delay={delay} uprightClass="mk-upright-2" />
          ))}
        </div>
        <div className="mk-orbit mk-orbit-1">
          {AVATARS.filter((a) => a[1] === 1).map(([url, , angle, radius, size, shape, glow, delay]) => (
            <OrbitAvatar key={url + angle} url={url} angle={angle} radius={radius} sizeClass={size} shapeClass={shape} glowClass={glow} delay={delay} uprightClass="mk-upright-1" />
          ))}
        </div>

        <div className="mk-center">
          <div className="mk-count">{count}k+</div>
          <div className="mk-count-label">Specialists</div>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <OrbitHeroAnimation />
  );
}

function Hero() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <section className="pb-24 pt-14 sm:pt-20">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-1.5 text-xs font-bold text-primary">
            <Sparkles size={13} /> The intelligent marketing ecosystem
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-6 text-[40px] font-bold leading-[1.06] tracking-tight text-ink sm:text-6xl">
            Grow smarter with <span className="text-gradient">deals & data</span> that perform.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-body sm:text-lg">
            Discover verified deals, top affiliate programs and best-in-class marketing tools — backed by the analytics platform trusted by 2.4M marketers and smart shoppers.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3.5">
            <Button to="/deals" variant="accent" size="lg">Explore Deals <ArrowRight size={17} /></Button>
            <Button to="/contact" variant="outline" size="lg">Get Free Marketing Audit</Button>
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.3 }}
            onSubmit={(e) => { e.preventDefault(); navigate(`/search?q=${encodeURIComponent(q)}`); }}
            className="mt-8 flex max-w-md items-center gap-2 rounded-lg border border-line bg-white p-1.5 pl-5" role="search">
            <Search size={17} className="shrink-0 text-faint" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools, deals, programs…" aria-label="Search"
              className="h-10 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-faint" />
            <Button type="submit" size="sm" className="!h-10">Search</Button>
          </motion.form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="mt-5 flex flex-wrap items-center gap-2 text-[13px]">
            <span className="font-semibold text-faint">Popular:</span>
            {["AI tools", "SEO software", "Hosting deals"].map((t) => (
              <button key={t} onClick={() => navigate(`/search?q=${encodeURIComponent(t)}`)}
                className="rounded-lg border border-line bg-white px-3.5 py-1.5 font-medium text-body transition-all hover:border-primary/40 hover:text-primary">
                {t}
              </button>
            ))}
          </motion.div>
        </div>

        <DashboardPreview />
      </Container>
    </section>
  );
}

/* ----------------------------- trust indicators --------------------------- */
function TrustIndicators() {
  return (
    <>
      <TrustedCompanies />
      <section className="border-b border-line bg-surface py-14">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.headline.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07} className="text-center">
                <p className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  <CountUpStat value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} decimals={s.decimals || 0} />
                </p>
                <p className="mt-2 text-[13px] font-medium text-faint">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

/* -------------------------------- categories ------------------------------ */
function CategoriesRow() {
  return (
    <section className="py-24">
      <Container>
        <SectionHead eyebrow="Browse" title="Explore by category" subtitle="Ten expertly-curated verticals with verified deals, tested tools and honest reviews." to="/categories" cta="All categories" />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={(i % 5) * 0.05}>
              <Link to={`/categories/${c.id}`}
                className="group flex h-full items-start gap-4 rounded-xl border border-line bg-white p-5 transition-all duration-300 hover:border-primary/30">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl shadow-inner transition-all duration-300 group-hover:scale-110">
                  {(() => {
                    const Icon = iconMap[c.icon] || null;
                    return Icon ? <Icon size={24} /> : null;
                  })()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-bold text-ink transition-colors group-hover:text-primary">{c.name}</span>
                  <span className="mt-0.5 block text-xs text-faint">{countByCategory(products, c.id) + countByCategory(deals, c.id)} items</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------ featured deals ---------------------------- */
function FeaturedDeals() {
  const { toast } = useApp();
  const featured = deals.filter((d) => d.exclusive || d.badge).slice(0, 6);
  return (
    <section className="bg-surface py-24">
      <Container>
        <SectionHead eyebrow="Exclusive Deals" title="Featured deals, verified today" subtitle="Our engine tracks 40,000+ prices daily. These are the strongest live drops." to="/deals" cta="View all deals" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 0.07}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-300 hover:border-primary/30">
                <div className="relative h-40 overflow-hidden">
                  <img src={d.image} alt={d.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-lg bg-white px-3 py-1 text-xs font-bold text-primary">−{d.discount}%</span>
                  <BrandLogo src={d.brandLogo} name={d.title} size="h-10 w-10" imgSize="h-6 w-6" rounded="rounded-xl" className="absolute bottom-3 left-3" />
                </div>
                <div className="flex flex-1 flex-col p-6 pt-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-faint">
                    <BrandLogo src={d.merchantLogo} name={d.merchant} size="h-4.5 w-4.5" imgSize="h-3 w-3" rounded="rounded" /> {d.merchant}
                  </p>
                  <h3 className="mt-1 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-primary">{d.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-body">{d.description}</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-ink">{formatPrice(d.price)}</span>
                    <span className="text-sm text-faint line-through">{formatPrice(d.originalPrice)}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-body"><Timer size={13} className="text-warning" /> {timeLeftLabel(d.expiresAt)}</span>
                    <Button size="sm" onClick={() => toast("Redirecting to partner store…")}>Get Deal <ArrowUpRight size={14} /></Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------- affiliate programs -------------------------- */
function AffiliatePrograms() {
  const { toast } = useApp();
  return (
    <section className="py-24">
      <Container>
        <SectionHead eyebrow="Earn" title="Top affiliate programs" subtitle="Hand-vetted programs with transparent commissions, cookie windows and real payout data." to="/advertise" cta="Partner with us" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {affiliatePrograms.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <article className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-all duration-300 hover:border-primary/30">
                <div className="flex items-center justify-between">
                  <BrandLogo src={p.logo} name={p.name} color={p.color} className="transition-transform duration-300 group-hover:scale-110" />
                  <Rating value={p.rating} showValue={false} size={12} />
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-ink transition-colors group-hover:text-primary">{p.name}</h3>
                <p className="text-xs text-faint">{p.category}</p>
                <div className="mt-4 space-y-2 border-t border-line pt-4 text-[13px]">
                  <p className="flex items-center justify-between"><span className="text-faint">Commission</span><span className="font-semibold text-ink">{p.commission}</span></p>
                  <p className="flex items-center justify-between"><span className="text-faint">Cookie</span><span className="font-semibold text-ink">{p.cookie}</span></p>
                </div>
                <button onClick={() => toast(`Application started for ${p.name}`)}
                  className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-line py-2.5 text-[13px] font-bold text-ink transition-all hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-500">
                  Join program <ArrowUpRight size={13} />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------ marketing tools --------------------------- */
function MarketingTools() {
  return (
    <section className="bg-surface py-24">
      <Container>
        <SectionHead eyebrow="Stack" title="Best-rated marketing tools" subtitle="The software our editors and 84K marketing teams actually recommend." to="/products" cta="Browse all tools" />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {marketingTools.map((t, i) => (
            <Reveal key={t.id} delay={(i % 5) * 0.05}>
              <Link to="/products" className="group flex h-full flex-col items-center rounded-xl border border-line bg-white p-6 text-center transition-all duration-300 hover:border-primary/30">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white drop-shadow-lg" aria-hidden>
                  {(() => {
                    const Icon = iconMap[t.icon] || null;
                    return Icon ? <Icon size={20} /> : null;
                  })()}
                </span>
                <h3 className="mt-4 text-sm font-bold text-ink transition-colors group-hover:text-primary">{t.name}</h3>
                <p className="mt-0.5 text-[11px] font-medium text-faint">{t.tag}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-body">
                  <Star size={12} className="fill-warning text-warning" /> {t.rating}
                  <span className="text-faint">· {t.users}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------- advertising platforms ------------------------ */
function AdvertisingPlatforms() {
  return (
    <section className="py-24">
      <Container>
        <SectionHead eyebrow="Advertise" title="Advertising platforms we manage" subtitle="Full-funnel campaign management across every channel that matters." to="/services" cta="Our ad services" />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {adPlatforms.map((p, i) => (
            <Reveal key={p.id} delay={(i % 5) * 0.05}>
              <div className="group flex h-full flex-col items-center justify-center rounded-xl border border-line bg-white px-4 py-8 text-center transition-all duration-300 hover:border-primary/30">
                <BrandLogo src={p.logo} name={p.name} color={p.color} className="transition-transform duration-300 group-hover:scale-110" />
                <p className="mt-3.5 text-sm font-bold text-ink">{p.name}</p>
                <p className="mt-1 text-[11px] text-faint">{p.reach}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------- deals carousel --------------------------- */
function DealsCarousel() {
  const { toast } = useApp();
  const list = deals.filter((d) => d.discount >= 30).slice(0, 10);
  return (
    <section className="bg-surface py-24">
      <Container>
        <SectionHead eyebrow="Ending Soon" title="Deals worth moving fast on" subtitle="High-discount drops with verified stock — most expire within days." to="/deals" cta="All live deals" />
      </Container>
      <Swiper
        modules={[Autoplay, FreeMode]}
        freeMode slidesPerView={1.08} spaceBetween={20} loop
        autoplay={{ delay: 3400, disableOnInteraction: false }}
        breakpoints={{ 640: { slidesPerView: 1.6 }, 1024: { slidesPerView: 2.4 }, 1440: { slidesPerView: 3.1 } }}
        className="!px-6 lg:!px-16" aria-label="Deals carousel"
      >
        {list.map((d) => (
          <SwiperSlide key={d.id} className="!h-auto py-2">
            <article className="group flex h-full items-center gap-5 rounded-xl border border-line bg-white p-6 transition-all duration-300 hover:border-primary/30">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl shadow-soft">
                <img src={d.image} alt={d.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gradient">−{d.discount}%</span>
                  <BrandLogo src={d.merchantLogo} name={d.merchant} size="h-4.5 w-4.5" imgSize="h-3 w-3" rounded="rounded" />
                  <span className="truncate text-xs font-semibold text-faint">{d.merchant}</span>
                </div>
                <h3 className="truncate text-[15px] font-bold text-ink">{d.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-body">
                  <Clock size={12} className="text-warning" /> {timeLeftLabel(d.expiresAt)} · {formatPrice(d.price)}
                </p>
              </div>
              <Button size="sm" onClick={() => toast("Redirecting to partner store…")} className="shrink-0">Claim</Button>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

/* ----------------------------- comparison banner -------------------------- */
function ComparisonBanner() {
  const [a, b] = [products[0], products[5]];
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-400 p-10 text-white shadow-2xl shadow-primary/25 sm:p-14">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest"><Trophy size={13} /> Comparison engine</span>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[34px]">Not sure which one wins? We already tested both.</h2>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75">Side-by-side lab scores across five dimensions, live pricing and clear winner verdicts — for any products on Alphobia.</p>
                <Button to="/compare" size="lg" className="mt-8 !bg-white !text-primary shadow-xl hover:!bg-slate-100">Compare products <ArrowRight size={16} /></Button>
              </div>
              <div className="relative mx-auto flex w-full max-w-sm items-center justify-center gap-6">
                {[a, b].map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 24, rotate: i ? 3 : -3 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
                    className="flex-1 rounded-xl border border-white/15 bg-white/10 p-5 text-center">
                    <Visual gradient={p.gradient} emoji={p.emoji} image={p.image} alt={p.name} iconSize="text-4xl" className="mx-auto mb-3 h-20 w-20 rounded-2xl" />
                    <p className="line-clamp-1 text-sm font-bold">{p.name}</p>
                    <p className="mt-1 text-xs text-white/60">{formatPrice(p.price)} · ★ {p.rating}</p>
                  </motion.div>
                ))}
                <span className="absolute left-1/2 top-1/2 z-10 flex h-13 w-13 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white shadow-xl ring-4 ring-white/20">VS</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------ reviews + news ----------------------------- */
function ReviewsAndNews() {
  const topReviews = reviews.slice(0, 4);
  const news = [...blogs].sort((x, y) => new Date(y.date) - new Date(x.date)).slice(0, 5);
  return (
    <section className="bg-surface py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <SectionHead eyebrow="Expert Reviews" title="Reviews with receipts" to="/reviews" cta="All reviews" />
            <div className="grid gap-5 sm:grid-cols-2">
              {topReviews.map((r, i) => (
                <Reveal key={r.id} delay={(i % 2) * 0.07}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-300 hover:border-primary/30">
                    <div className="relative h-32 overflow-hidden">
                      <img src={r.image} alt={r.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-primary">
                        <Star size={11} className="fill-warning text-warning" /> {r.score}
                      </span>
                      <BrandLogo src={r.logo} name={r.title} size="h-9 w-9" imgSize="h-5 w-5" rounded="rounded-xl" className="absolute bottom-3 left-3" />
                    </div>
                    <div className="flex flex-1 flex-col p-6 pt-4">
                      <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-ink transition-colors group-hover:text-primary">{r.title}</h3>
                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-body">{r.excerpt}</p>
                      <Link to="/reviews" className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-bold text-primary transition-all hover:gap-2">
                        Read review <ArrowRight size={13} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHead eyebrow="Marketing News" title="The latest" to="/blog" cta="All articles" />
            <Reveal className="rounded-xl border border-line bg-white p-3">
              <div className="divide-y divide-line">
                {news.map((n) => (
                  <Link key={n.id} to="/blog" className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-surface">
                    <span className="h-13 w-13 shrink-0 overflow-hidden rounded-2xl">
                      <img src={n.image} alt={n.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <span className="min-w-0">
                      <span className="line-clamp-2 text-[13px] font-bold leading-snug text-ink transition-colors group-hover:text-primary">{n.title}</span>
                      <span className="mt-1 block text-[11px] text-faint">
                        {new Date(n.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {n.readTime} min read
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------- page ---------------------------------- */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <CategoriesRow />
      <FeaturedDeals />
      <AffiliatePrograms />
      <MarketingTools />
      <AdvertisingPlatforms />
      <DealsCarousel />
      <ComparisonBanner />
      <ReviewsAndNews />
      <TestimonialsSection count={9} />
      <NewsletterCTA />
    </>
  );
}
