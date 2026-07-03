import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Trophy, Check, Minus, Search } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Container, Visual, Badge, Rating, Button, Modal, SearchInput, EmptyState } from "../components/ui";
import { products } from "../data";
import { formatPrice, formatNumber } from "../utils/format";
import { useApp, useDebounce } from "../hooks";
import { cn } from "../utils/cn";

const attributeRows = ["Performance", "Design", "Value", "Features", "Support"];

export default function Compare() {
  const { compare, toggleCompare, setCompare, toast } = useApp();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [q, setQ] = useState("");
  const dq = useDebounce(q, 200);

  const selected = compare.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const defaults = selected.length ? selected : [products[0], products[1], products[2]];
  const items = selected.length ? selected : defaults;

  const searchResults = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(dq.toLowerCase())).slice(0, 8),
    [dq]
  );

  const winnerFor = (row) => {
    let best = items[0];
    items.forEach((p) => { if (p.attributes[row] > best.attributes[row]) best = p; });
    return best.id;
  };
  const overallWinner = useMemo(() => {
    let best = items[0];
    const total = (p) => attributeRows.reduce((s, r) => s + p.attributes[r], 0);
    items.forEach((p) => { if (total(p) > total(best)) best = p; });
    return best.id;
  }, [items]);

  const addProduct = (p) => {
    if (selected.length === 0) setCompare([...defaults.slice(0, 2).map((x) => x.id), p.id].slice(-3));
    else toggleCompare(p.id);
    setPickerOpen(false);
    toast(`${p.name} added to comparison`);
  };

  return (
    <>
      <PageHero
        eyebrow="Comparison Tool" crumbs={[{ label: "Compare" }]}
        title="Compare products, side by side"
        subtitle="Lab scores across five dimensions with clear winner verdicts. Add up to 3 products from anywhere on Alphobia."
      />
      <Container className="py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Comparing <span className="font-bold text-slate-900 dark:text-white">{items.length}</span> products
            {selected.length === 0 && <span className="ml-2 text-xs text-slate-400">(showing a sample — add your own)</span>}
          </p>
          <Button onClick={() => setPickerOpen(true)}><Plus size={16} /> Add product</Button>
        </div>

        <div className="overflow-x-auto rounded-xl ring-1 ring-slate-900/5 dark:ring-white/10">
          <table className="w-full min-w-[720px] border-collapse bg-white text-sm dark:bg-slate-800/70">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 w-44 bg-white p-5 text-left align-bottom text-xs font-bold uppercase tracking-widest text-slate-400 dark:bg-slate-800">Feature</th>
                {items.map((p) => (
                  <th key={p.id} className="min-w-52 p-5 text-left align-top">
                    <div className="relative">
                      {selected.length > 0 && (
                        <button onClick={() => toggleCompare(p.id)} aria-label="Remove" className="absolute -right-1 -top-1 z-10 rounded-lg bg-slate-100 p-1.5 text-slate-400 transition-colors hover:bg-danger/10 hover:text-danger dark:bg-white/10"><X size={13} /></button>
                      )}
                      <Visual gradient={p.gradient} emoji={p.emoji} image={p.image} alt={p.name} iconSize="text-4xl" className="mb-3 h-24 rounded-2xl" />
                      {p.id === overallWinner && <Badge tone="green" className="mb-2"><Trophy size={11} /> Overall winner</Badge>}
                      <p className="font-bold leading-snug text-slate-900 dark:text-white">{p.name}</p>
                      <p className="mt-1 text-xs font-normal text-slate-400">{p.brand}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              <tr>
                <td className="sticky left-0 bg-white p-5 font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">Price</td>
                {items.map((p) => (
                  <td key={p.id} className="p-5">
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">{formatPrice(p.price)}</span>
                    <span className="ml-2 text-xs text-slate-400 line-through">{formatPrice(p.originalPrice)}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="sticky left-0 bg-white p-5 font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">Rating</td>
                {items.map((p) => (
                  <td key={p.id} className="p-5"><Rating value={p.rating} /><p className="mt-1 text-xs text-slate-400">{formatNumber(p.reviews)} reviews</p></td>
                ))}
              </tr>
              {attributeRows.map((row) => (
                <tr key={row}>
                  <td className="sticky left-0 bg-white p-5 font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">{row}</td>
                  {items.map((p) => (
                    <td key={p.id} className="p-5">
                      <div className="flex items-center gap-2">
                        <span className={cn("font-extrabold", p.id === winnerFor(row) ? "text-primary" : "text-slate-700 dark:text-slate-200")}>{p.attributes[row]}</span>
                        {p.id === winnerFor(row) && <Badge tone="blue" className="!px-2"><Trophy size={10} /> Best</Badge>}
                      </div>
                      <div className="mt-2 h-1.5 w-full max-w-32 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.attributes[row] * 10}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                          className={cn("h-full rounded-full", p.id === winnerFor(row) ? "bg-gradient-to-r from-primary to-accent" : "bg-slate-300 dark:bg-slate-500")} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="sticky left-0 bg-white p-5 font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">Discount live</td>
                {items.map((p) => (
                  <td key={p.id} className="p-5">
                    {p.discount > 20 ? <span className="inline-flex items-center gap-1.5 font-semibold text-success"><Check size={15} /> −{p.discount}%</span> : <span className="inline-flex items-center gap-1.5 text-slate-400"><Minus size={15} /> Small ({p.discount}%)</span>}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="sticky left-0 bg-white p-5 dark:bg-slate-800" />
                {items.map((p) => (
                  <td key={p.id} className="p-5">
                    <Button size="sm" to={`/products/${p.slug}`} variant={p.id === overallWinner ? "accent" : "outline"} className="w-full">View product</Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Container>

      <Modal open={pickerOpen} onClose={() => setPickerOpen(false)} title="Add a product to compare" wide>
        <SearchInput autoFocus value={q} onChange={setQ} placeholder="Search products…" />
        <div className="mt-4 max-h-80 space-y-1 overflow-y-auto">
          {searchResults.length === 0 ? (
            <EmptyState title="No matches" subtitle="Try a different search term." className="!py-10" />
          ) : searchResults.map((p) => (
            <button key={p.id} onClick={() => addProduct(p)}
              className="flex w-full items-center gap-4 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
              <span className="h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{p.name}</span>
                <span className="text-xs text-slate-400">★ {p.rating} · {formatPrice(p.price)}</span>
              </span>
              <Plus size={16} className="text-primary" />
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
