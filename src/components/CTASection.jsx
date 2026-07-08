import { useState } from "react";
import { Send } from "lucide-react";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-primary py-16 px-6 sm:px-8 w-full relative overflow-hidden text-center text-on-primary shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/15 blur-[100px] rounded-full" />
      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        <h2 className="font-display-xl text-headline-lg-mobile leading-tight text-white">
          Ready to Capture the <span className="text-secondary italic">Future</span> of Your Market?
        </h2>
        <p className="text-on-primary/70 text-lg font-body-lg">
          Join the ranks of the world's most aggressive B2B growth brands. Subscribe to stay kinetic with high-frequency market intelligence.
        </p>

        <form
          className="w-full max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setSent(true);
          }}
        >
          {sent ? (
            <p className="rounded-[2px] bg-white/10 px-6 py-4 text-center text-sm font-bold text-white backdrop-blur">
              🎉 Welcome to the Alphobia intelligence network.
            </p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-14 flex-1 rounded-[2px] border border-white/20 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-white/50 focus:ring-4 focus:ring-white/10"
              />
              <button
                type="submit"
                className="h-14 shrink-0 rounded-[2px] bg-white px-8 text-sm font-bold text-primary hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Join Now <Send className="w-4 h-4" />
              </button>
            </div>
          )}
          <p className="mt-3 text-xs text-white/50">
            No spam. Fully compliant. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}