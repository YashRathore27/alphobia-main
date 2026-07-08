import { useState, useEffect } from "react";
import { navigate, useRoute } from "../router";
import { ChevronDown, Menu, X, Search } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { route } = useRoute();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = (r, id) => {
    navigate(r, id);
    setOpen(false);
    setServicesOpen(false);
  };

  const navLinks = [
    { label: "About", route: "about" },
    { label: "Case Studies", route: "case-studies" },
    { label: "Industries", route: "industries" },
    { label: "Insights", route: "insights" }
  ];

  const isServicesActive = ["digital-marketing", "affiliate-marketing", "advertising-programs"].includes(route);

  return (
    <header className={`fixed z-50 transition-all duration-300 ease-in-out backdrop-blur-xl ${
      isScrolled 
        ? "top-4 left-4 right-4 rounded-xl border border-slate-200/80 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.08)]" 
        : "top-0 left-0 right-0 rounded-none border-b border-slate-200/40 bg-white/70 shadow-none"
    }`}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-8">
        
        {/* Left Side: Logo & Nav Links */}
        <div className="flex items-center gap-6">
          {/* 1. Logo */}
          <button onClick={() => go("home")} className="flex shrink-0 items-center gap-2 cursor-pointer">
            <span style={{ fontFamily: "'Caveat', cursive" }} className="text-3xl font-bold tracking-normal">
              <span className="text-slate-900">Al</span>
              <span className="text-blue-600">phobia</span>
            </span>
          </button>

          {/* 2. Navigation List (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Services Dropdown Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  isServicesActive 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => go("digital-marketing")}
                    className="flex w-full text-left rounded-lg px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-semibold">Digital Marketing</p>
                      <p className="text-xs text-slate-500">Omnichannel performance growth</p>
                    </div>
                  </button>
                  <button
                    onClick={() => go("affiliate-marketing")}
                    className="flex w-full text-left rounded-lg px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-semibold">Affiliate Marketing</p>
                      <p className="text-xs text-slate-500">Global partner networks</p>
                    </div>
                  </button>
                  <button
                    onClick={() => go("advertising-programs")}
                    className="flex w-full text-left rounded-lg px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-semibold">Advertising Programs</p>
                      <p className="text-xs text-slate-500">Precision target campaign scale</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.route)}
                className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  route === l.route 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side: Embedded Search Bar & Book Call */}
        <div className="flex items-center gap-4">
          {/* 3. Search input bar (Desktop) */}
          <div className="hidden md:flex max-w-xs w-60 items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search insights..."
                onKeyDown={(e) => e.key === "Enter" && go("insights")}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-11 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
              <button 
                onClick={() => go("insights")}
                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white transition-transform hover:scale-105 cursor-pointer"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button 
            onClick={() => go("contact")}
            className="hidden lg:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 font-semibold text-sm transition-all active:scale-[0.98] rounded-xl cursor-pointer"
          >
            Book a Strategy Call
          </button>
          
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-slate-700 hover:text-blue-600 transition-colors p-1"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-6 py-4 absolute w-full left-0 top-full shadow-lg rounded-b-xl z-50 flex flex-col gap-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Services</p>
          <button 
            onClick={() => go("digital-marketing")}
            className="flex items-center justify-between text-left rounded-xl px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-semibold cursor-pointer"
          >
            Digital Marketing
          </button>
          <button 
            onClick={() => go("affiliate-marketing")}
            className="flex items-center justify-between text-left rounded-xl px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-semibold cursor-pointer"
          >
            Affiliate Marketing
          </button>
          <button 
            onClick={() => go("advertising-programs")}
            className="flex items-center justify-between text-left rounded-xl px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-semibold cursor-pointer"
          >
            Advertising Programs
          </button>

          <div className="h-px bg-slate-200 my-2" />

          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l.route)}
              className={`flex items-center justify-between text-left rounded-xl px-4 py-3 text-slate-700 font-semibold cursor-pointer ${
                route === l.route ? "bg-blue-50 text-blue-600" : "hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {l.label}
            </button>
          ))}
          
          <button 
            onClick={() => go("contact")}
            className="w-full bg-blue-600 text-white py-3 font-bold hover:bg-blue-700 transition-all active:scale-[0.98] rounded-xl mt-2 text-center cursor-pointer"
          >
            Book a Strategy Call
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
