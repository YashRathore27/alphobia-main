import { useState } from "react";
import { navigate } from "../router";
import { Send, Share2, Globe } from "lucide-react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
      <div className="bg-primary rounded-[2px] p-12 md:p-20 relative overflow-hidden text-center text-on-primary shadow-2xl">
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
                  className="h-14 shrink-0 rounded-[2px] bg-white px-8 text-sm font-bold text-primary hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
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
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const go = (r) => {
    navigate(r);
  };

  return (
    <footer className="bg-surface dark:bg-inverse-surface border-t border-outline-variant w-full py-20 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          <button onClick={() => go("home")} className="flex items-center gap-2 cursor-pointer text-left">
            <span style={{ fontFamily: "'Caveat', cursive" }} className="text-3xl font-bold tracking-normal">
              <span className="text-primary">Al</span><span className="text-secondary">phobia</span>
            </span>
          </button>
          <p className="text-on-surface-variant font-body-md text-body-md pr-6">
            The definitive standard in global B2B digital transformation and performance marketing.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-[2px] bg-surface-container flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-[2px] bg-surface-container flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-primary">Solutions</h4>
          <ul className="space-y-4 text-sm font-body-md">
            <li>
              <button onClick={() => go("digital-marketing")} className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all text-left">
                Digital Marketing
              </button>
            </li>
            <li>
              <button onClick={() => go("affiliate-marketing")} className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all text-left">
                Affiliate Programs
              </button>
            </li>
            <li>
              <button onClick={() => go("advertising-programs")} className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all text-left">
                Advertising Solutions
              </button>
            </li>
            <li>
              <button onClick={() => go("case-studies")} className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all text-left">
                Case Studies
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-primary">Company</h4>
          <ul className="space-y-4 text-sm font-body-md">
            <li>
              <button onClick={() => go("about")} className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all text-left">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => go("industries")} className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all text-left">
                Industries
              </button>
            </li>
            <li>
              <button onClick={() => go("insights")} className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all text-left">
                Insights & Trends
              </button>
            </li>
            <li>
              <button onClick={() => go("contact")} className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all text-left">
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-primary">Stay Kinetic</h4>
          <p className="text-on-surface-variant text-sm">Join our network for high-frequency market intelligence.</p>
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSent(true);
            }}
          >
            {sent ? (
              <p className="text-xs font-semibold text-secondary">Subscribed! Check email.</p>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="bg-white border-2 border-outline-variant/30 rounded-l-[2px] px-4 py-3 focus:border-secondary outline-none w-full text-sm text-on-surface"
                />
                <button type="submit" className="bg-primary text-white rounded-r-[2px] px-4 flex items-center justify-center hover:bg-secondary transition-all">
                  <Send className="w-4 h-4" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-outline-variant/30 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
        <p className="font-body-md text-sm text-on-surface-variant">© 2026 Alphobia. All rights reserved. Global B2B Excellence.</p>
        <div className="flex gap-8 text-sm text-on-surface-variant">
          <a href="#" className="hover:text-secondary">LinkedIn</a>
          <a href="#" className="hover:text-secondary">Twitter / X</a>
          <a href="#" className="hover:text-secondary">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export {
  Footer,
  Newsletter
};
