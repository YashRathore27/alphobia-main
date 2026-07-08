import { useEffect, useRef } from "react";
import { Container, Button, Reveal } from "../components/ui";
import { navigate } from "../router";
import { TrendingUp, ArrowRight } from "lucide-react";

// Webgl flow shader for page header
function ShaderHeader({ canvasId }) {
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
      console.error("WebGL ShaderHeader compilation error:", err);
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id={canvasId} className="absolute inset-0 w-full h-full object-cover" />;
}

export default function AdvertisingPrograms() {
  const go = (r) => {
    navigate(r);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center overflow-hidden pt-32 pb-12">
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full opacity-60 pointer-events-none z-0">
          <img 
            src="/advertisment-marketing-hero.jpeg" 
            alt="Advertising Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background"></div>
        </div>

        <div className="px-6 sm:px-8 max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1 rounded-[2px] bg-secondary/10 text-secondary font-label-sm text-label-sm mb-2">
                GLOBAL ADVERTISING PROGRAMS
              </span>
              <h1 className="font-display-xl text-primary leading-tight">
                Precision-Targeted Advertising for Enterprise Growth
              </h1>
              <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Leverage the power of algorithmic bidding and behavioral intelligence. We don't just buy ads; we engineer high-performance ecosystems that scale with your ambitions.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button onClick={() => go("contact")} variant="accent" size="lg" className="flex items-center gap-2 animate-pulse">
                  Review Performance <span className="material-symbols-outlined">trending_up</span>
                </Button>
              </div>
            </div>

            <Reveal delay={0.2} className="relative flex justify-center lg:justify-end">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-20 w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2px] border border-outline-variant/30 shadow-lg text-center">
                  <div className="text-xs text-on-surface-variant mb-1 font-bold uppercase tracking-wider">AD SPEND REACH</div>
                  <div className="font-bold text-3xl text-secondary">$45M+</div>
                  <p className="text-[10px] text-on-surface-variant mt-1">Managed Annually</p>
                </div>
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2px] border border-outline-variant/30 shadow-lg text-center">
                  <div className="text-xs text-on-surface-variant mb-1 font-bold uppercase tracking-wider">AVERAGE ROAS</div>
                  <div className="font-bold text-3xl text-primary">5.8x</div>
                  <p className="text-[10px] text-on-surface-variant mt-1">Blended Client Return</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ad Platforms Bento Grid */}
      <section className="py-16 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline-lg text-primary">Multi-Channel Dominance</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Strategic deployment across the world's most powerful intent and interest-based networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Google Ads */}
          <div className="md:col-span-7 group bg-white border border-outline-variant rounded-[2px] p-10 hover:active-glow transition-all duration-500 overflow-hidden relative">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-4xl text-secondary">ads_click</span>
                <h3 className="font-headline-md text-primary">Google Search &amp; Display</h3>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-md">
                Capture high-intent prospects at the exact moment of search. Our proprietary alpha-beta account structures maximize ROI through granular keyword segmentation.
              </p>
              <ul className="space-y-3 text-xs font-semibold text-on-surface">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Hyper-local intent targeting</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Dynamic search ads (DSA) optimization</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Automated bidding scripts</li>
              </ul>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/5 rounded-[2px] blur-3xl group-hover:bg-secondary/10 transition-all pointer-events-none"></div>
          </div>

          {/* LinkedIn Ads */}
          <div className="md:col-span-5 bg-primary text-on-primary rounded-[2px] p-10 hover:active-glow transition-all duration-500 flex flex-col justify-between min-h-[300px]">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-4xl text-white">corporate_fare</span>
                <h3 className="font-headline-md text-white">LinkedIn B2B</h3>
              </div>
              <p className="text-on-primary-container text-sm leading-relaxed">
                Precision ABM targeting for C-suite decision-makers and high-value stakeholders.
              </p>
            </div>
            <div className="space-y-3 mt-8">
              <div className="h-1 w-full bg-white/20 rounded-[2px] overflow-hidden">
                <div className="h-full bg-secondary w-4/5"></div>
              </div>
              <div className="flex justify-between text-xs text-white/70 font-semibold">
                <span>Engagement Rate</span>
                <span>3.4% High-Tier Avg</span>
              </div>
            </div>
          </div>

          {/* Meta Ads */}
          <div className="md:col-span-5 border border-outline-variant rounded-[2px] p-10 hover:active-glow transition-all duration-500 bg-surface-container-low">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-4xl text-secondary">hub</span>
                <h3 className="font-headline-md text-primary">Meta Ecosystem</h3>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Full-funnel social commerce utilizing Facebook and Instagram's sophisticated interest graphs.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1.5 bg-white border border-outline-variant rounded-[2px] text-[10px] font-bold text-primary">Retargeting</span>
                <span className="px-3 py-1.5 bg-white border border-outline-variant rounded-[2px] text-[10px] font-bold text-primary">Lookalike</span>
                <span className="px-3 py-1.5 bg-white border border-outline-variant rounded-[2px] text-[10px] font-bold text-primary">UGC Creative</span>
              </div>
            </div>
          </div>

          {/* Programmatic */}
          <div className="md:col-span-7 bg-white border border-outline-variant rounded-[2px] p-10 hover:active-glow transition-all duration-500 flex items-center justify-between gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-4xl text-secondary">memory</span>
                <h3 className="font-headline-md text-primary">Programmatic RTB</h3>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm">
                Real-time bidding across premium publishers, connected TV (CTV), and digital out-of-home (DOOH).
              </p>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-2 w-32 shrink-0">
              <div className="aspect-square bg-surface-container rounded-[2px]"></div>
              <div className="aspect-square bg-secondary/20 rounded-[2px]"></div>
              <div className="aspect-square bg-secondary rounded-[2px]"></div>
              <div className="aspect-square bg-surface-container-highest rounded-[2px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Dashboard Section */}
      <section className="bg-primary-container py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-headline-lg text-white">Unified Performance Intelligence</h2>
            <p className="text-on-primary-container text-body-lg">
              Stop oscillating between platforms. Our proprietary dashboard aggregates multi-channel data into a single source of truth for cross-attribution analysis.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-[2px] bg-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary">query_stats</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Real-Time Attribution</h4>
                  <p className="text-on-primary-container text-sm">First-touch and last-touch modeling to understand the true impact of every dollar spent.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-[2px] bg-white/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-primary">psychology</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">AI-Driven Anomaly Detection</h4>
                  <p className="text-on-primary-container text-sm">Automated alerts for CPA fluctuations or budget pacing issues across all accounts.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-surface p-8 rounded-[2px] border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h5 className="font-bold text-primary">Conversion Analytics</h5>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="w-3 h-3 rounded-full bg-outline"></span>
              </div>
            </div>
            <div className="relative h-64 w-full bg-surface-container rounded-[2px] mb-6 flex items-end justify-between p-4 gap-2">
              <div className="w-full h-[60%] bg-secondary/40 rounded-t-sm"></div>
              <div className="w-full h-[85%] bg-secondary rounded-t-sm"></div>
              <div className="w-full h-[70%] bg-secondary/60 rounded-t-sm"></div>
              <div className="w-full h-[95%] bg-secondary rounded-t-sm"></div>
              <div className="w-full h-[55%] bg-secondary/40 rounded-t-sm"></div>
              <div className="w-full h-[80%] bg-secondary rounded-t-sm"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-[2px] text-center">
                <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">ROAS</p>
                <p className="text-xl font-bold text-secondary">4.2x</p>
              </div>
              <div className="bg-white p-4 rounded-[2px] text-center">
                <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">CPA</p>
                <p className="text-xl font-bold text-primary">$42.50</p>
              </div>
              <div className="bg-white p-4 rounded-[2px] text-center">
                <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Conv Rate</p>
                <p className="text-xl font-bold text-primary">12.8%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Allocation and Funnels */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-surface-container-low p-12 rounded-[2px] border border-outline-variant/30 space-y-8">
            <h3 className="font-headline-md text-primary">Omnichannel Funnel Architecture</h3>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-[2px] border border-outline-variant flex justify-between items-center shadow-sm">
                <span className="font-bold flex items-center gap-3"><span class="material-symbols-outlined text-secondary">visibility</span> Awareness</span>
                <span className="text-sm font-bold text-on-surface-variant">Top of Funnel (40%)</span>
              </div>
              <div className="flex justify-center py-2 text-outline-variant">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <div className="bg-white p-6 rounded-[2px] border border-outline-variant flex justify-between items-center shadow-sm ml-8">
                <span className="font-bold flex items-center gap-3"><span class="material-symbols-outlined text-secondary">psychology_alt</span> Consideration</span>
                <span className="text-sm font-bold text-on-surface-variant">Middle of Funnel (35%)</span>
              </div>
              <div className="flex justify-center py-2 ml-8 text-outline-variant">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <div className="bg-secondary text-on-secondary p-6 rounded-[2px] flex justify-between items-center shadow-lg ml-16">
                <span className="font-bold flex items-center gap-3"><span class="material-symbols-outlined">shopping_cart_checkout</span> Conversion</span>
                <span className="text-sm font-bold">Bottom of Funnel (25%)</span>
              </div>
            </div>
          </div>

          <div className="p-12 space-y-8">
            <h3 className="font-headline-md text-primary">Strategic Budget Allocation</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              We distribute resources based on a dynamic 70-20-10 model: 70% proven performance, 20% expansion, and 10% experimental high-alpha channels.
            </p>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Google Ads (Search)</span>
                  <span>45%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-[2px] overflow-hidden">
                  <div className="h-full bg-primary w-[45%]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>LinkedIn (B2B Lead Gen)</span>
                  <span>30%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-[2px] overflow-hidden">
                  <div className="h-full bg-secondary w-[30%]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Programmatic Display</span>
                  <span>15%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-[2px] overflow-hidden">
                  <div className="h-full bg-secondary/50 w-[15%]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>R&amp;D / Emerging Platforms</span>
                  <span>10%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-[2px] overflow-hidden">
                  <div className="h-full bg-outline w-[10%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Management Steps */}
      <section className="py-24 bg-surface z-10 relative border-t border-outline-variant/30">
        <div className="px-6 sm:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-secondary font-display-xl text-[80px] font-extrabold opacity-20 leading-none">01</div>
              <h4 className="font-bold text-xl text-primary">Audit &amp; Architect</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">Comprehensive tracking audit and structural redesign to ensure every conversion is captured accurately.</p>
            </div>
            <div className="space-y-4">
              <div className="text-secondary font-display-xl text-[80px] font-extrabold opacity-20 leading-none">02</div>
              <h4 className="font-bold text-xl text-primary">Creative Testing</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">A/B and multivariate testing of visual assets to identify high-converting hooks and imagery.</p>
            </div>
            <div className="space-y-4">
              <div className="text-secondary font-display-xl text-[80px] font-extrabold opacity-20 leading-none">03</div>
              <h4 className="font-bold text-xl text-primary">Bidding Logic</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">Implementation of advanced scripts and portfolio bidding strategies to out-compete the market.</p>
            </div>
            <div className="space-y-4">
              <div className="text-secondary font-display-xl text-[80px] font-extrabold opacity-20 leading-none">04</div>
              <h4 className="font-bold text-xl text-primary">Scale &amp; Refine</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">Incremental budget scaling based on real-time ROAS benchmarks and secondary metric signals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Content Section */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-[2px] overflow-hidden border border-outline-variant shadow-2xl h-[450px]">
          <img 
            className="w-full h-full object-cover" 
            alt="Enterprise grade transparency dashboard" 
            src="https://images.pexels.com/photos/8636589/pexels-photo-8636589.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
            <div className="max-w-xl space-y-3">
              <h3 className="text-white font-bold text-3xl">Enterprise Grade Transparency</h3>
              <p className="text-white/70 text-sm leading-relaxed">Access the same high-resolution data points our analysts use. No hidden fees, no obscured metrics—just raw performance power.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 px-6 sm:px-8 bg-primary text-on-primary w-full relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="font-headline-lg text-white">Ready to Scale Your Program?</h2>
          <p className="max-w-2xl mx-auto text-white/80 leading-relaxed text-sm">
            Let's audit your current ad accounts and identify the immediate efficiency gains that could be driving your bottom line today.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button onClick={() => go("contact")} variant="secondary" size="lg" className="bg-white text-secondary hover:bg-white/90">
              Book Audit Call
            </Button>
            <Button 
              onClick={() => go("insights")}
              variant="outline"
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 cursor-pointer"
            >
              View Industry Insights
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
