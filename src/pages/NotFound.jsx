import { motion } from "framer-motion";
import { Home, Search, Compass } from "lucide-react";
import { Container, Button } from "../components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", bounce: 0.4 }}
        className="text-gradient text-[8rem] font-extrabold leading-none sm:text-[11rem]"
      >
        404
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">This deal has expired… and so has this page.</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-500 dark:text-slate-400">
          The page you're looking for was moved, renamed or never existed. The savings, however, are very real.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button to="/" size="lg"><Home size={16} /> Back home</Button>
          <Button to="/deals" variant="outline" size="lg"><Compass size={16} /> Browse deals</Button>
          <Button to="/search" variant="ghost" size="lg"><Search size={16} /> Search</Button>
        </div>
      </motion.div>
    </Container>
  );
}
