import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, StarHalf, ChevronDown, ChevronLeft, ChevronRight, Search, X, CheckCircle2, AlertTriangle, Inbox, Home } from "lucide-react";
import { cn } from "../../utils/cn";
import { useApp, useCountUp } from "../../hooks";

/* ------------------------------ container ------------------------------ */
export const Container = ({ className, children }) => (
  <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
);

/* ------------------------------- button ------------------------------- */
const btnVariants = {
  primary: "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-primary/35",
  secondary: "bg-ink text-white hover:bg-slate-700 dark:bg-white dark:text-ink dark:hover:bg-slate-200",
  outline: "border border-line bg-white text-slate-700 hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-200",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
  accent: "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-primary/35",
  soft: "bg-primary/10 text-primary hover:bg-primary/15 dark:bg-primary/20 dark:text-violet-300",
};
const btnSizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-5.5 text-sm", lg: "h-13 px-7 text-base" };

export function Button({ as, to, variant = "primary", size = "md", className, children, ...props }) {
  const Comp = to ? Link : as || "button";
  return (
    <Comp
      to={to}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-50",
        btnVariants[variant], btnSizes[size], className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

/* -------------------------------- badge -------------------------------- */
const badgeTones = {
  blue: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-violet-300",
  cyan: "bg-secondary/10 text-pink-600 dark:bg-secondary/20 dark:text-pink-300",
  green: "bg-success/10 text-emerald-600 dark:bg-success/20 dark:text-emerald-300",
  amber: "bg-warning/10 text-amber-600 dark:bg-warning/20 dark:text-amber-300",
  red: "bg-danger/10 text-red-600 dark:bg-danger/20 dark:text-red-300",
  slate: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
  white: "bg-white text-slate-800 shadow-sm",
};
export const Badge = ({ tone = "blue", className, children }) => (
  <span className={cn("inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-wide", badgeTones[tone], className)}>
    {children}
  </span>
);

/* --------------------------- section heading --------------------------- */
export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-12", align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-violet-300">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl dark:text-white">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-body dark:text-slate-400">{subtitle}</p>}
    </motion.div>
  );
}

/* -------------------------------- rating ------------------------------- */
export function Rating({ value, size = 14, className, showValue = true }) {
  const stars = [1, 2, 3, 4, 5].map((i) => {
    if (value >= i) return <Star key={i} size={size} className="fill-warning text-warning" />;
    if (value >= i - 0.5) return <StarHalf key={i} size={size} className="fill-warning text-warning" />;
    return <Star key={i} size={size} className="text-neutral-light dark:text-slate-600" />;
  });
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="flex gap-0.5">{stars}</span>
      {showValue && <span className="text-xs font-semibold text-body dark:text-slate-400">{value}</span>}
    </span>
  );
}

/* -------------------------------- visual ------------------------------- */
export function Visual({ gradient, emoji, image, alt = "", className, iconSize = "text-5xl", children }) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden bg-gradient-to-br", gradient, className)}>
      {image ? (
        <img
          src={image} alt={alt} loading="lazy" decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <>
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.5) 0, transparent 45%), radial-gradient(circle at 85% 80%, rgba(255,255,255,.35) 0, transparent 40%)" }} />
          <span className={cn("relative drop-shadow-lg transition-transform duration-500 group-hover:scale-110", iconSize)} aria-hidden>{emoji}</span>
        </>
      )}
      {children}
    </div>
  );
}

/* ------------------------------ brand logo ------------------------------ */
export function BrandLogo({ src, name, color = "#7C3AED", size = "h-12 w-12", imgSize = "h-7 w-7", rounded = "rounded-2xl", className }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <span className={cn("flex shrink-0 items-center justify-center text-lg font-bold text-white shadow-md", size, rounded, className)} style={{ background: color }}>
        {name?.[0]}
      </span>
    );
  }
  return (
    <span className={cn("flex shrink-0 items-center justify-center border border-line bg-white shadow-soft", size, rounded, className)}>
      <img src={src} alt={`${name} logo`} loading="lazy" decoding="async" className={cn("object-contain", imgSize)} onError={() => setFailed(true)} />
    </span>
  );
}

/* -------------------------------- avatar ------------------------------- */
export function Avatar({ name, color = "#7C3AED", size = "h-11 w-11", className }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-white/60 dark:ring-white/20", size, className)} style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
      {initials}
    </span>
  );
}

/* ------------------------------ search input --------------------------- */
export function SearchInput({ value, onChange, placeholder = "Search…", className, onSubmit, autoFocus }) {
  return (
    <form
      role="search"
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(value); }}
      className={cn("group relative", className)}
    >
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint transition-colors group-focus-within:text-primary" />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-12 w-full rounded-lg border border-line bg-white pl-11 pr-4 text-sm text-ink outline-none transition-all placeholder:text-faint focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-slate-800/80 dark:text-white"
      />
    </form>
  );
}

/* -------------------------------- select ------------------------------- */
export function Select({ value, onChange, options, label, className }) {
  return (
    <label className={cn("relative inline-flex items-center", className)}>
      {label && <span className="sr-only">{label}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-line bg-white pl-4 pr-10 text-sm font-medium text-ink outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-200"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3.5 text-faint" />
    </label>
  );
}

/* ------------------------------- accordion ------------------------------ */
export function Accordion({ items, className }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
          <div key={i} className="card-base overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-ink dark:text-slate-100"
          >
            {item.q}
            <ChevronDown size={18} className={cn("shrink-0 text-faint transition-transform duration-300", open === i && "rotate-180 text-primary")} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                <p className="px-6 pb-5 text-sm leading-relaxed text-body dark:text-slate-400">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- tabs -------------------------------- */
export function Tabs({ tabs, active, onChange, className }) {
  return (
    <div role="tablist" className={cn("inline-flex flex-wrap gap-1 rounded-xl bg-neutral-light/50 p-1.5 dark:bg-white/5", className)}>
      {tabs.map((t) => (
        <button
          key={t.value}
          role="tab"
          aria-selected={active === t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            "relative rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
            active === t.value ? "text-ink dark:text-white" : "text-body hover:text-ink dark:text-slate-400 dark:hover:text-slate-200"
          )}
        >
          {active === t.value && (
            <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-xl bg-white shadow-soft dark:bg-slate-700" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
          )}
          <span className="relative">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------ pagination ------------------------------ */
export function Pagination({ page, pages, onChange, className }) {
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === pages || Math.abs(n - page) <= 1
  );
  const items = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) items.push("…");
    items.push(n);
  });
  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-2", className)}>
      <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1} aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-body transition-all hover:border-primary/40 hover:text-primary disabled:opacity-40 dark:border-white/10 dark:bg-slate-800">
        <ChevronLeft size={16} />
      </button>
      {items.map((n, i) =>
        n === "…" ? (
          <span key={`e${i}`} className="px-1 text-faint">…</span>
        ) : (
          <button key={n} onClick={() => onChange(n)} aria-current={n === page ? "page" : undefined}
            className={cn("h-10 w-10 rounded-lg text-sm font-semibold transition-all",
              n === page ? "bg-primary text-white shadow-lg shadow-primary/30" : "border border-line bg-white text-body hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-800 dark:text-slate-300")}>
            {n}
          </button>
        )
      )}
      <button onClick={() => onChange(Math.min(pages, page + 1))} disabled={page === pages} aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-body transition-all hover:border-primary/40 hover:text-primary disabled:opacity-40 dark:border-white/10 dark:bg-slate-800">
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

/* ------------------------------ breadcrumb ------------------------------ */
export function Breadcrumb({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2 text-sm text-body dark:text-slate-400", className)}>
      <Link to="/" className="flex items-center gap-1 transition-colors hover:text-primary"><Home size={14} /> Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-neutral-light dark:text-slate-600" />
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-primary">{item.label}</Link>
          ) : (
            <span className="font-medium text-ink dark:text-slate-200">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* -------------------------------- modal -------------------------------- */
export function Modal({ open, onClose, title, children, wide }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
            className={cn("relative w-full overflow-hidden rounded-xl bg-white shadow-2xl", wide ? "max-w-2xl" : "max-w-md")}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h3 className="text-base font-bold text-ink dark:text-white">{title}</h3>
              <button onClick={onClose} aria-label="Close" className="rounded-xl p-2 text-faint transition-colors hover:bg-slate-100 hover:text-ink dark:hover:bg-white/10">
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------- toast -------------------------------- */
export function ToastViewport() {
  const { toasts } = useApp();
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[90] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
            className="pointer-events-auto flex w-full items-center gap-3 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-white shadow-2xl dark:bg-white dark:text-ink"
            role="status"
          >
            {t.tone === "success" ? <CheckCircle2 size={18} className="shrink-0 text-success" /> : <AlertTriangle size={18} className="shrink-0 text-warning" />}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------- skeleton ------------------------------- */
export const Skeleton = ({ className }) => <div className={cn("shimmer-bg rounded-2xl", className)} aria-hidden />;

export function SkeletonCard({ className }) {
  return (
    <div className={cn("card-base space-y-4 p-5", className)}>
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-3"><Skeleton className="h-8 w-20" /><Skeleton className="h-8 w-24" /></div>
    </div>
  );
}

/* ------------------------------ empty state ----------------------------- */
export function EmptyState({ title = "Nothing found", subtitle = "Try adjusting your filters or search terms.", action, className }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-line py-20 text-center", className)}>
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-faint">
        <Inbox size={28} />
      </span>
      <h3 className="text-lg font-bold text-ink dark:text-white">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-body dark:text-slate-400">{subtitle}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}

/* -------------------------------- counter ------------------------------- */
export function CountUpStat({ value, prefix = "", suffix = "", decimals = 0, className }) {
  const { ref, value: v } = useCountUp(value, { decimals });
  return (
    <span ref={ref} className={className}>
      {prefix}{decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()}{suffix}
    </span>
  );
}

/* ------------------------------- reveal -------------------------------- */
export function Reveal({ children, delay = 0, className, y = 28 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
