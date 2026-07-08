import { useEffect, useRef, useState } from "react";
import { navigate } from "../router";
import { Container, Button, CountUpStat, Reveal } from "../components/ui";
import { CTASection } from "../components/CTASection";
import { TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import OrbitHeroAnimation from "../components/OrbitHeroAnimation";



function CompanyLogo({ name, domain }) {
  const [src, setSrc] = useState(`https://logo.clearbit.com/${domain}`);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="h-7 w-7 rounded-md bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold shrink-0">
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      loading="lazy"
      className="h-7 w-7 rounded-md object-contain shrink-0"
      onError={() => {
        if (src.includes("clearbit")) {
          setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=64`);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

// Flowing webgl gradient shader component for background
function ShaderBackground({ canvasId }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    let animFrameId;

    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return;

      const vs = `
        attribute vec2 a_position;
        varying vec2 v_texCoord;
        void main() {
          v_texCoord = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const fs = `
        precision highp float;
        varying vec2 v_texCoord;
        uniform float u_time;
        
        void main() {
          vec2 uv = v_texCoord;
          float flow = sin(uv.x * 2.0 + u_time * 0.5) * 0.5 + 0.5;
          float wave = cos(uv.y * 3.0 - u_time * 0.3) * 0.5 + 0.5;
          
          vec3 color1 = vec3(0.058, 0.09, 0.164); // #0f172a Deep Slate
          vec3 color2 = vec3(0.972, 0.976, 1.0);  // #f8f9ff Light Ice
          
          vec3 finalColor = mix(color1, color2, (flow * wave) * 0.15);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `;

      function compileShader(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      }

      const prog = gl.createProgram();
      gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vs));
      gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(prog);
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

      const pos = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(prog, 'u_time');
      const uRes = gl.getUniformLocation(prog, 'u_resolution');

      function syncSize() {
        const w = canvas.clientWidth || 1280;
        const h = canvas.clientHeight || 720;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      syncSize();

      function render(t) {
        syncSize();
        if (uTime) gl.uniform1f(uTime, t * 0.001);
        if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        animFrameId = requestAnimationFrame(render);
      }

      render(0);
    } catch (err) {
      console.error("WebGL ShaderBackground compilation error:", err);
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id={canvasId} className="absolute inset-0 w-full h-full object-cover" />;
}

const COMPANIES = [
  { id: "amazon", name: "Amazon", domain: "amazon.com" },
  { id: "shopify", name: "Shopify", domain: "shopify.com" },
  { id: "adobe", name: "Adobe", domain: "adobe.com" },
  { id: "canva", name: "Canva", domain: "canva.com" },
  { id: "hostinger", name: "Hostinger", domain: "hostinger.com" },
  { id: "google", name: "Google", domain: "google.com" },
  { id: "microsoft", name: "Microsoft", domain: "microsoft.com" },
  { id: "hubspot", name: "HubSpot", domain: "hubspot.com" },
  { id: "meta", name: "Meta", domain: "meta.com" },
  { id: "semrush", name: "Semrush", domain: "semrush.com" },
];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const go = (r) => {
    navigate(r);
  };

  return (
    <div className="bg-background text-on-surface overflow-x-hidden relative">
      {/* Background Flowing Shader */}
      <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0">
        <ShaderBackground canvasId="bg-shader-home" />
      </div>

      {/* Hero Section Wrapper with full-width background image */}
      <div className="relative w-full overflow-hidden border-b border-outline-variant/10">
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src="/HeroImg.jpeg" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="hero-image-blur-overlay" />
        </div>

        <section className="relative min-h-[800px] flex items-center px-6 sm:px-8 max-w-7xl mx-auto py-20 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            {/* Left Hero Text */}
            <div className="space-y-8 max-w-2xl">
              <Reveal>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-surface-container text-secondary font-label-sm uppercase tracking-widest">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  Global Expansion Leaders
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="font-display-xl leading-tight text-primary">
                  Empowering <span className="text-secondary italic">Global</span> Growth Through Data.
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="font-body-lg text-on-surface-variant max-w-xl">
                  We fuse high-stakes consultancy intelligence with digital agency agility to scale enterprise performance across four continents.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button onClick={() => go("contact")} variant="accent" size="lg" className="shadow-xl rounded-[2px]">
                    Book a Strategy Call
                  </Button>
                  <Button onClick={() => go("about")} variant="outline" size="lg" className="bg-transparent border border-slate-300 text-slate-800 hover:bg-slate-200/50 transition-all rounded-[2px]">
                    Our Approach
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="pt-8 flex items-center gap-8 grayscale">
                  <span className="font-label-sm uppercase tracking-tighter">Verified by</span>
                  <div className="flex gap-6 font-bold font-body-lg">
                    <span>Google Premier</span>
                    <span>HubSpot Elite</span>
                    <span>Meta Business</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Hero Interactive Node */}
            <Reveal delay={0.2} className="relative w-full hidden lg:block">
              <OrbitHeroAnimation />
            </Reveal>
          </div>
        </section>
      </div>

      {/* Trusted By logo cloud */}
      <section className="py-10 z-10 relative overflow-hidden" aria-label="Trusted companies">
        <Container>
          <p className="mb-7 text-center font-label-sm uppercase tracking-[0.2em] text-outline">{`Pioneering the future with global industry leaders`}</p>
        </Container>
        <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)" }}>
          <div className="flex w-max animate-marquee items-center gap-14 px-7 opacity-60 font-bold tracking-tighter">
            {[...COMPANIES, ...COMPANIES].map((c, i) => (
              <span key={`${c.id}-${i}`} className="flex items-center gap-3 font-body-lg font-bold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer">
                <CompanyLogo name={c.name} domain={c.domain} />
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="mb-16 space-y-4">
          <h2 className="font-headline-lg text-primary">Core Capabilities</h2>
          <p className="text-on-surface-variant max-w-2xl">
            From foundational SEO to high-frequency programmatic advertising, we provide the full spectrum of digital velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Large Card: Digital Marketing */}
          <div className="md:col-span-2 md:row-span-2 bg-primary p-10 rounded-[2px] text-on-primary flex flex-col justify-between group hover:bg-secondary transition-colors duration-500 overflow-hidden relative min-h-[380px]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/15 blur-[100px] rounded-full" />
            <div className="relative z-10 space-y-6">
              <span className="material-symbols-outlined text-5xl text-white">insights</span>
              <h3 className="font-headline-md text-white">Digital Marketing Architecture</h3>
              <p className="text-white/70 font-body-md leading-relaxed max-w-md">
                Comprehensive omnichannel strategies that align brand identity with aggressive performance metrics.
              </p>
            </div>
            <div className="mt-8 relative z-10">
              <Button onClick={() => go("digital-marketing")} className="bg-white text-primary px-6 py-3 rounded-[2px] font-bold flex items-center gap-2 w-fit group-hover:gap-4 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <span className="material-symbols-outlined absolute opacity-15 font-thin pointer-events-none" style={{ fontSize: "400px", lineHeight: 1, bottom: "-50px", right: "-30px", transform: "perspective(500px) rotateX(25deg) rotateY(-12deg)" }}>
              hub
            </span>
          </div>

          {/* Medium Card: Affiliate Marketing */}
          <div className="md:col-span-2 bg-white border border-outline-variant p-8 rounded-[2px] flex items-center justify-between group hover:border-secondary transition-all">
            <div className="space-y-3">
              <span className="material-symbols-outlined text-secondary text-4xl">account_tree</span>
              <h3 className="font-headline-md text-primary">Affiliate Marketing</h3>
              <p className="text-on-surface-variant font-body-md max-w-xs leading-relaxed">
                Global partnership networks built for sustainable, performance-based conversion growth.
              </p>
            </div>
            <button onClick={() => go("affiliate-marketing")} className="w-12 h-12 rounded-[2px] bg-surface-container-high flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all shrink-0">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* Medium Card: Advertising Programs */}
          <div className="md:col-span-2 bg-white border border-outline-variant p-8 rounded-[2px] flex items-center justify-between group hover:border-secondary transition-all">
            <div className="space-y-3">
              <span className="material-symbols-outlined text-secondary text-4xl">campaign</span>
              <h3 className="font-headline-md text-primary">Advertising Programs</h3>
              <p className="text-on-surface-variant font-body-md max-w-xs leading-relaxed">
                Precision-targeted campaigns across programmatic, social, and search ecosystems.
              </p>
            </div>
            <button onClick={() => go("advertising-programs")} className="w-12 h-12 rounded-[2px] bg-surface-container-high flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all shrink-0">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* Small Cards */}
          <div className="bg-white border border-outline-variant p-8 rounded-[2px] hover:-translate-y-1 hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-3xl mb-4">search</span>
            <h4 className="font-headline-md text-primary">SEO</h4>
            <p className="font-body-md text-on-surface-variant">Organic domination.</p>
          </div>
          <div className="bg-white border border-outline-variant p-8 rounded-[2px] hover:-translate-y-1 hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-3xl mb-4">monitoring</span>
            <h4 className="font-headline-md text-primary">Analytics</h4>
            <p className="font-body-md text-on-surface-variant">Real-time intelligence.</p>
          </div>
          <div className="bg-white border border-outline-variant p-8 rounded-[2px] hover:-translate-y-1 hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-3xl mb-4">mail</span>
            <h4 className="font-headline-md text-primary">Email</h4>
            <p className="font-body-md text-on-surface-variant">Retention automation.</p>
          </div>
          <div className="bg-white border border-outline-variant p-8 rounded-[2px] hover:-translate-y-1 hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-3xl mb-4">rocket_launch</span>
            <h4 className="font-headline-md text-primary">Automation</h4>
            <p className="font-body-md text-on-surface-variant">Scalable workflows.</p>
          </div>
        </div>
      </section>
      {/* Our Execution Protocol Process Section */}
      <section className="py-24 bg-primary text-on-primary relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/15 blur-[100px] rounded-full" />
        <div className="px-6 sm:px-8 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <h2 className="font-headline-lg text-white">Our Execution Protocol</h2>
            <p className="text-white/60 font-body-lg leading-relaxed">
              A five-stage lifecycle designed for aggressive market capture and sustained ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 relative">
            {/* Desktop progress connector line background */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-white/10 -z-10" />
            {/* Animated progress fill */}
            <div 
              className="hidden md:block absolute top-10 left-[10%] h-[2px] bg-secondary -z-10 transition-all duration-700 ease-in-out" 
              style={{ width: `${(activeStep / 4) * 80}%` }}
            />

            {[
              { num: "01", name: "Discovery", desc: "Deep-dive audit into current ecosystems and competitor vulnerabilities." },
              { num: "02", name: "Strategy", desc: "Tailored growth roadmap with defined KPIs and channel mix priorities." },
              { num: "03", name: "Execution", desc: "Rapid deployment of high-performance campaign creative assets." },
              { num: "04", name: "Optimization", desc: "Real-time multivariate testing and algorithmic budget reallocation." },
              { num: "05", name: "Growth", desc: "Scaling successful protocols across global consumer territories." }
            ].map((step, idx) => (
              <div key={step.num} className="space-y-4 flex flex-col items-center text-center">
                <div 
                  className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-white backdrop-blur transition-all duration-500 cursor-pointer ${
                    idx <= activeStep 
                      ? "bg-secondary/20 border-2 border-secondary shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                      : "bg-white/10 border border-white/20"
                  }`}
                  onClick={() => setActiveStep(idx)}
                >
                  {step.num}
                </div>
                <h4 className={`font-headline-md transition-colors duration-500 ${idx <= activeStep ? "text-secondary" : "text-white"}`}>
                  {step.name}
                </h4>
                <p className="text-white/50 font-body-md leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-12 rounded-[2px] text-center space-y-4 hover:shadow-2xl transition-all duration-500 group hover:border-secondary">
              <p className="text-secondary font-display-xl group-hover:scale-105 transition-transform">
              <CountUpStat value={500} suffix="M+" />
            </p>
            <p className="font-headline-md text-primary">Global Impressions</p>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              Delivered annually across high-intent B2B audience segments.
            </p>
          </div>

          <div className="glass-card p-12 rounded-[2px] text-center space-y-4 hover:shadow-2xl transition-all duration-500 group hover:border-secondary">
              <p className="text-secondary font-display-xl group-hover:scale-105 transition-transform">
              <CountUpStat value={50} prefix="$" suffix="M+" />
            </p>
            <p className="font-headline-md text-primary">Managed Ad Spend</p>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              Optimized with machine learning protocols for maximum efficiency.
            </p>
          </div>

          <div className="glass-card p-12 rounded-[2px] text-center space-y-4 hover:shadow-2xl transition-all duration-500 group hover:border-secondary">
              <p className="text-secondary font-display-xl group-hover:scale-105 transition-transform">
              <CountUpStat value={300} suffix="%" />
            </p>
            <p className="font-headline-md text-primary">Avg Client ROI</p>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              Documented growth across our top-tier enterprise accounts.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us: Alternating Layout */}
      <section className="py-24 space-y-24 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="rounded-[2px] overflow-hidden aspect-square glass-card p-2">
            <img 
              className="w-full h-full object-cover rounded-[2px]" 
              alt="Corporate office with analytics charts" 
              src="https://images.pexels.com/photos/7621381/pexels-photo-7621381.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600" 
              loading="lazy"
            />
          </div>
          <div className="space-y-6">
            <h3 className="font-headline-lg text-primary">Data-Driven DNA</h3>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              We don't guess. We model. Our proprietary Kinetic Engine analyzes billions of data points to predict market shifts before they happen, allowing your brand to move faster than the competition.
            </p>
            <ul className="space-y-3 font-semibold text-on-surface">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                Proprietary AI predictive modeling
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                Real-time performance transparency
              </li>
            </ul>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center lg:flex-row-reverse">
          <div className="lg:order-2 rounded-[2px] overflow-hidden aspect-square glass-card p-2">
            <img 
              className="w-full h-full object-cover rounded-[2px]" 
              alt="Digital interface network nodes" 
              src="https://images.pexels.com/photos/34804001/pexels-photo-34804001.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600" 
              loading="lazy"
            />
          </div>
          <div className="lg:order-1 space-y-6">
            <h3 className="font-headline-lg text-primary">Certified Global Experts</h3>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Our team consists of senior-level consultants and tactical specialists located in primary financial hubs. We speak the language of global enterprise and understand regional market nuances.
            </p>
            <ul className="space-y-3 font-semibold text-on-surface">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                15+ years average industry experience
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                Multilingual campaign management
              </li>
            </ul>
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
}
