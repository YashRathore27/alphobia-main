import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useCountUp } from "../../hooks";
import { navigate } from "../../router";

/* ------------------------------ container ------------------------------ */
export const Container = ({ className, children }) => (
  <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
);

/* ------------------------------- button ------------------------------- */
const btnVariants = {
  primary: "bg-secondary text-white shadow-lg shadow-secondary/25 hover:bg-secondary/90 hover:shadow-secondary/35",
  secondary: "bg-ink text-white hover:bg-slate-700 dark:bg-white dark:text-ink dark:hover:bg-slate-200",
  outline: "border border-line bg-white text-slate-700 hover:border-secondary/40 hover:text-secondary dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-200",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
  accent: "bg-secondary text-white shadow-lg shadow-secondary/25 hover:bg-secondary/90 hover:shadow-secondary/35",
  soft: "bg-secondary/10 text-secondary hover:bg-secondary/15 dark:bg-secondary/20 dark:text-blue-300",
};
const btnSizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-5.5 text-sm", lg: "h-13 px-7 text-base" };

export function Button({ as, to, variant = "primary", size = "md", className, children, onClick, ...props }) {
  const Comp = as || "button";
  const handleClick = (e) => {
    if (to) {
      e.preventDefault();
      const route = to.replace(/^\//, "");
      navigate(route);
    }
    if (onClick) onClick(e);
  };
  return (
    <Comp
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-50 cursor-pointer",
        btnVariants[variant], btnSizes[size], className
      )}
      {...props}
    >
      {children}
    </Comp>
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
