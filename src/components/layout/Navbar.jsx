import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Moon, Sun, Menu, X, Zap, Scale, ArrowRight, TrendingUp } from "lucide-react";
import { cn } from "../../utils/cn";
import { useApp, useDebounce } from "../../hooks";
import { Badge, Modal, SearchInput } from "../ui";
import { products } from "../../data";
import { formatPrice } from "../../utils/format";

const links = [
  { to: "/deals", label: "Deals" },
  { to: "/products", label: "Products" },
  { to: "/coupons", label: "Coupons" },
  { to: "/reviews", label: "Reviews" },
  { to: "/compare", label: "Compare" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/advertise", label: "Advertise" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Alphobia home">
      <span className="text-lg font-extrabold tracking-tight text-ink dark:text-white">
        Alphobia<span className="text-primary">.</span>
      </span>
    </Link>
  );
}

function GlobalSearch({ open, onClose }) {
  const [q, setQ] = useState("");
  const dq = useDebounce(q, 200);
  const navigate = useNavigate();
  const results = dq.length > 1
    ? products.filter((p) => p.name.toLowerCase().includes(dq.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => { if (!open) setQ(""); }, [open]);

  return (
    <Modal open={open} onClose={onClose} title="Search Alphobia" wide>
      <SearchInput autoFocus value={q} onChange={setQ} placeholder="Search 150+ products, deals & coupons…"
        onSubmit={(v) => { onClose(); navigate(`/search?q=${encodeURIComponent(v)}`); }} />
      <div className="mt-4">
        {dq.length <= 1 ? (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-faint">Trending searches</p>
            <div className="flex flex-wrap gap-2">
              {["ChatGPT Plus", "Sony WH-1000XM5", "Hosting deals", "Semrush", "Standing desk", "Nespresso"].map((t) => (
                <button key={t} onClick={() => setQ(t)} className="flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-1.5 text-xs font-medium text-body transition-all hover:border-primary/40 hover:text-primary">
                  <TrendingUp size={12} /> {t}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <p className="py-8 text-center text-sm text-faint">No instant matches — press Enter for full search.</p>
        ) : (
          <ul className="divide-y divide-line">
            {results.map((p) => (
              <li key={p.id}>
                <Link to={`/products/${p.slug}`} onClick={onClose} className="group flex items-center gap-4 rounded-2xl px-2 py-3 transition-colors hover:bg-surface">
                  <span className="h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                    <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink group-hover:text-primary">{p.name}</span>
                    <span className="text-xs text-faint">{p.brand} · ★ {p.rating}</span>
                  </span>
                  <span className="text-sm font-bold text-ink">{formatPrice(p.price)}</span>
                  <ArrowRight size={14} className="text-faint transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => { onClose(); navigate(`/search?q=${encodeURIComponent(q)}`); }}
          className="mt-4 w-full rounded-2xl bg-surface py-3 text-sm font-semibold text-body transition-colors hover:bg-primary/10 hover:text-primary">
          View all results {dq && `for "${dq}"`}
        </button>
      </div>
    </Modal>
  );
}

export default function Navbar() {
  const { dark, setDark, compare } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearch(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "border-b border-line bg-white" : "bg-transparent")}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8" aria-label="Main">
          <Logo />

          <div className="ml-6 hidden items-center gap-0.5 xl:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) => cn(
                  "rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-body hover:bg-surface hover:text-ink"
                )}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setSearch(true)} aria-label="Search"
              className="flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-4 text-sm text-faint transition-all hover:border-primary/40 hover:text-primary sm:w-44 sm:justify-between">
              <span className="flex items-center gap-2"><Search size={16} /><span className="hidden sm:inline">Search…</span></span>
              <kbd className="hidden rounded-full bg-surface px-2 py-0.5 text-[10px] font-bold text-faint sm:inline">⌘K</kbd>
            </button>

            {compare.length > 0 && (
              <Link to="/compare" aria-label="Compare list" className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-body transition-all hover:text-primary">
                <Scale size={17} />
                <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">{compare.length}</span>
              </Link>
            )}

            <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-body transition-all hover:text-primary">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={dark ? "moon" : "sun"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                  {dark ? <Sun size={17} /> : <Moon size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>



            <Link to="/contact" className="hidden items-center gap-2 rounded-lg bg-primary hover:bg-primary-dark px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-primary/25 transition-all active:scale-[0.97] lg:inline-flex">
              Get Free Audit
            </Link>

            <button onClick={() => setDrawer(true)} aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-ink xl:hidden">
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm xl:hidden" onClick={() => setDrawer(false)} aria-hidden />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.45 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col bg-white p-6 shadow-2xl"
              role="dialog" aria-label="Mobile navigation"
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <button onClick={() => setDrawer(false)} aria-label="Close menu" className="rounded-xl p-2 text-faint hover:bg-slate-100"><X size={20} /></button>
              </div>
              <div className="flex-1 space-y-1 overflow-y-auto">
                {[{ to: "/", label: "Home" }, ...links, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }].map((l, i) => (
                  <motion.div key={l.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                    <NavLink to={l.to} onClick={() => setDrawer(false)}
                      className={({ isActive }) => cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-semibold transition-colors",
                        isActive ? "bg-primary/10 text-primary" : "text-ink hover:bg-surface"
                      )}>
                      {l.label} <ArrowRight size={15} className="text-faint" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <Link to="/contact" onClick={() => setDrawer(false)}
                className="mt-6 flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25">
                Get Free Marketing Audit
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <GlobalSearch open={search} onClose={() => setSearch(false)} />
    </>
  );
}
