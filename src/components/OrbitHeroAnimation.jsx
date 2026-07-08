import { useEffect, useState } from "react";
import "./OrbitHeroAnimation.css";

// Avatar config list
const AVATARS = [
  ["https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png", 1, 270, 177, "", "mk-avatar--sq", "glow-blue", 0.6],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png", 2, 60, 251, "", "", "glow-yellow", 0.8],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png", 2, 180, 251, "mk-avatar--md", "", "glow-pink", 1.0],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png", 2, 300, 251, "", "mk-avatar--sq", "glow-blue", 1.2],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png", 3, 130, 325, "mk-avatar--lg", "", "glow-pink", 1.4],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png", 4, 30, 399, "", "", "glow-blue", 1.6],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png", 4, 95, 399, "mk-avatar--lg", "mk-avatar--sq-lg", "glow-orange", 1.85],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png", 4, 220, 399, "mk-avatar--lg", "mk-avatar--sq-lg", "glow-pink", 2.1],
  ["https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png", 4, 320, 399, "", "", "glow-blue", 2.3],
];

// Subcomponent for each orbiting avatar
function OrbitAvatar({ url, angle, radius, sizeClass, shapeClass, glowClass, delay, uprightClass }) {
  return (
    <div
      className="mk-avatar-pos"
      style={{
        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`
      }}
    >
      <div className={uprightClass}>
        <img
          src={url}
          alt="Avatar"
          loading="lazy"
          className={`mk-avatar ${sizeClass} ${shapeClass} ${glowClass}`}
          style={{ animationDelay: `${delay}s` }}
        />
      </div>
    </div>
  );
}

export default function OrbitHeroAnimation() {
  const [count, setCount] = useState(0);
  const targetCount = 20;

  // Custom count up animation helper
  useEffect(() => {
    let start;
    const duration = 2000;
    const delay = 1200; // Delay countup start to match avatar entrance timings
    let raf;
    let timeout;

    timeout = setTimeout(() => {
      const tick = (now) => {
        if (start === undefined) start = now;
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setCount(Math.round(targetCount * eased));
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="mk-hero-right" aria-hidden="true">
      <div className="mk-circles">
        {/* Orbit Ring 4 */}
        <div className="mk-orbit mk-orbit-4">
          {AVATARS.filter((a) => a[1] === 4).map(([url, , angle, radius, size, shape, glow, delay]) => (
            <OrbitAvatar key={url + angle} url={url} angle={angle} radius={radius} sizeClass={size} shapeClass={shape} glowClass={glow} delay={delay} uprightClass="mk-upright-4" />
          ))}
        </div>
        {/* Orbit Ring 3 */}
        <div className="mk-orbit mk-orbit-3">
          {AVATARS.filter((a) => a[1] === 3).map(([url, , angle, radius, size, shape, glow, delay]) => (
            <OrbitAvatar key={url + angle} url={url} angle={angle} radius={radius} sizeClass={size} shapeClass={shape} glowClass={glow} delay={delay} uprightClass="mk-upright-3" />
          ))}
        </div>
        {/* Orbit Ring 2 */}
        <div className="mk-orbit mk-orbit-2">
          {AVATARS.filter((a) => a[1] === 2).map(([url, , angle, radius, size, shape, glow, delay]) => (
            <OrbitAvatar key={url + angle} url={url} angle={angle} radius={radius} sizeClass={size} shapeClass={shape} glowClass={glow} delay={delay} uprightClass="mk-upright-2" />
          ))}
        </div>
        {/* Orbit Ring 1 */}
        <div className="mk-orbit mk-orbit-1">
          {AVATARS.filter((a) => a[1] === 1).map(([url, , angle, radius, size, shape, glow, delay]) => (
            <OrbitAvatar key={url + angle} url={url} angle={angle} radius={radius} sizeClass={size} shapeClass={shape} glowClass={glow} delay={delay} uprightClass="mk-upright-1" />
          ))}
        </div>
        {/* Central Badge */}
        <div className="mk-center">
          <div className="mk-count">{count}k+</div>
          <div className="mk-count-label">Specialists</div>
        </div>
      </div>
    </div>
  );
}
