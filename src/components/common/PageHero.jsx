import { motion } from "framer-motion";
import { Container, Breadcrumb } from "../ui";

export default function PageHero({ eyebrow, title, subtitle, crumbs = [], children }) {
  return (
    <section className="border-b border-slate-200/60 bg-white/60 py-14 dark:border-white/5 dark:bg-white/[0.02]">
      <Container>
        <Breadcrumb items={crumbs} className="mb-6" />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </motion.div>
        {children}
      </Container>
    </section>
  );
}
