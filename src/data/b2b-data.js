/* ------------------------------------------------------------------
 * Alphobia — B2B Digital Agency Data
 * ------------------------------------------------------------------ */

export const logoUrl = (domain, size = 128) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

const px = (id, file) => `https://images.pexels.com/photos/${id}/${file || `pexels-photo-${id}.jpeg`}?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`;

export const services = [
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    route: "digital-marketing",
    icon: "insights",
    tagline: "Omnichannel strategies aligning brand identity with aggressive performance metrics.",
    description: "We don't just drive traffic; we engineer growth. Our data-centric approach leverages advanced analytics and creative precision to scale your global digital presence.",
    results: "+312% avg. organic traffic in 9 months",
    capabilities: [
      { name: "SEO Architecture", desc: "Technical optimization and authoritative content structures designed for search dominance." },
      { name: "Social Precision", desc: "High-performance paid social campaigns and organic brand building that converts." },
      { name: "Editorial Edge", desc: "Strategic storytelling that establishes industry authority and nurtures pipeline growth." },
      { name: "Email Lifecycle", desc: "Automated nurture sequences that maximize LTV and reduce customer acquisition costs." }
    ]
  },
  {
    id: "affiliate-marketing",
    name: "Affiliate Marketing",
    route: "affiliate-marketing",
    icon: "account_tree",
    tagline: "Global partnership networks built for sustainable, performance-based conversion growth.",
    description: "Execute high-performance partner ecosystems with precision. Our corporate-grade affiliate management platform turns influence into measurable ROI through automated compliance and intelligent attribution.",
    results: "400% Lead Volume Increase",
    capabilities: [
      { name: "Strategic Mapping", desc: "Alignment of your product categories with high-authority vertical leaders and niche experts." },
      { name: "Quality Vetting", desc: "Multi-layered compliance checks to ensure traffic quality, brand safety, and ethical standard adherence." },
      { name: "Lifecycle Management", desc: "Ongoing optimization, incentive scaling, and dedicated account support for top-tier performers." },
      { name: "Attribution Modeling", desc: "Transparent tracking that allocates value to the right touchpoints dynamically." }
    ]
  },
  {
    id: "advertising-programs",
    name: "Advertising Programs",
    route: "advertising-programs",
    icon: "campaign",
    tagline: "Precision-targeted campaigns across programmatic, social, and search ecosystems.",
    description: "Leverage the power of algorithmic bidding and behavioral intelligence. We don't just buy ads; we engineer high-performance ecosystems that scale with your ambitions.",
    results: "5.8x average blended ROAS",
    capabilities: [
      { name: "Google Search & Display", desc: "Granular keyword segmentation and automated bidding scripts that maximize search intent." },
      { name: "LinkedIn B2B Ads", desc: "Account-Based Marketing (ABM) precision targeting for C-suite decision makers." },
      { name: "Meta Ecosystem", desc: "Full-funnel social commerce leveraging Instagram and Facebook interest graphs." },
      { name: "Programmatic RTB", desc: "Real-time bidding across premium publishers, Connected TV (CTV), and DOOH." }
    ]
  }
];

export const caseStudies = [
  {
    id: "fintech-lead-gen",
    slug: "fintech-lead-gen",
    title: "400% Lead Volume Increase for Series C Neobank",
    client: "Finstrat Neobank",
    sector: "Fintech",
    results: "400% Lead Growth",
    description: "How we scaled a publisher network of 150+ high-authority finance blogs to dominate market share and reduce CPA by 28%.",
    image: px(32642488),
    details: "By establishing granular attribution modeling and dynamic compensation tiers, we aligned partner incentives directly with high-quality user deposits, unlocking a massive scalable growth channel."
  },
  {
    id: "luxury-apparel-expansion",
    slug: "luxury-apparel-expansion",
    title: "Global Expansion Strategy for Luxury Apparel Brand",
    client: "Vivid Media & Fashion",
    sector: "E-Commerce",
    results: "3.2x ROI Boost",
    description: "Expanding a boutique label into 12 new European markets via local fashion influencer networks and localized paid campaigns.",
    image: px(28271086),
    details: "We built a localized micro-influencer collective combined with targeted meta lookalike campaign retargeting, scaling monthly active users across Europe without diluting the brand's premium value."
  },
  {
    id: "saas-abm-dominance",
    slug: "saas-abm-dominance",
    title: "ABM Campaigns Drive $14M Pipeline for Enterprise SaaS",
    client: "TechCorp Global",
    sector: "Enterprise SaaS",
    results: "$14M Pipeline Created",
    description: "Targeting Fortune 500 decision-makers using hyper-personalized LinkedIn campaigns and executive content tracks.",
    image: px(34803966),
    details: "By coordinating custom programmatic advertising with tailored thought-leadership essays, we penetrated high-barrier target accounts, creating massive brand awareness in the enterprise tech space."
  }
];

export const industries = [
  { id: "saas", name: "SaaS & Cloud Tech", icon: "cloud", description: "Strategic growth consulting and automated funnel design for high-scale software models." },
  { id: "fintech", name: "Fintech & Banking", icon: "payments", description: "Compliance-safe performance marketing matching user acquisition with strict CPA limits." },
  { id: "ecommerce", name: "D2C & E-Commerce", icon: "shopping_bag", description: "Global scale across search and social channels, maximizing customer lifetime value." },
  { id: "logistics", name: "Global Logistics", icon: "local_shipping", description: "Targeting enterprise supply-chain decision makers using Account-Based Marketing (ABM)." }
];

export const stats = {
  impressions: "500M+",
  adSpend: "$50M+",
  avgRoi: "300%",
  headline: [
    { label: "Global Impressions", value: 500000000, suffix: "+", prefix: "" },
    { label: "Managed Ad Spend", value: 50000000, suffix: "+", prefix: "$" },
    { label: "Avg Client ROI", value: 300, suffix: "%", prefix: "" },
    { label: "Active Publisher Partners", value: 12400, suffix: "+", prefix: "" }
  ]
};

export const team = [
  { name: "Ava Lindqvist", role: "Co-founder & CEO", color: "#0F172A", bio: "Ex-growth executive at two unicorns. Leads the consulting team from London." },
  { name: "Marcus Chen", role: "Co-founder & CTO", color: "#0058be", bio: "Built our unified performance attribution engine. Oversees analytics infrastructure." },
  { name: "Priya Sharma", role: "VP, Growth Services", color: "#64748b", bio: "Leads tactical operations across paid media. 12+ years of enterprise growth experience." }
];

export const testimonials = [
  { quote: "Alphobia completely re-architected our performance dashboard. We now have 100% transparency into our global ad accounts.", author: "Director of Marketing, TechCorp" },
  { quote: "Their programmatic bidding scripts saved us 30% in ad spend in the first month while increasing overall lead volume by 2x.", author: "VP Growth, FinStrat" }
];

export const blogs = [
  {
    id: "insight-1",
    slug: "b2b-seo-attribution-guide",
    title: "Omnichannel Attribution: Solving First-Touch vs Last-Touch",
    excerpt: "Stop relying on basic analytics dashboards. Learn how to map complex enterprise conversion funnels using multi-touch modeling.",
    tag: "Data Studies",
    image: px(590022),
    author: "Marcus Chen",
    date: "2026-06-15T09:00:00Z",
    readTime: 8,
    content: "Enterprise purchasing lifecycles are rarely linear. A decision-maker might click an organic search result, read a whitepaper, see a retargeting ad on LinkedIn, and eventually click a brand search ad weeks later to schedule a demo. If your marketing team evaluates channel performance on last-click attribution alone, you are likely underfunding top-of-funnel channels and overpaying for branded search. Multi-touch attribution modeling distributes credit across the entire conversion path, giving you the real ROI of your marketing spend."
  },
  {
    id: "insight-2",
    slug: "programmatic-rtb-scaling-2026",
    title: "Programmatic RTB: Best Practices for High-Value Lead Gen",
    excerpt: "How real-time bidding platforms and dynamic out-of-home networks are changing the B2B marketing landscape.",
    tag: "Trends",
    image: px(34804001),
    author: "Priya Sharma",
    date: "2026-06-28T10:30:00Z",
    readTime: 6,
    content: "Real-time bidding (RTB) has transitioned from a simple banner-ad clearance mechanism into a highly sophisticated targeting engine. Modern programmatic platforms allow growth teams to serve dynamic creatives to specific IP clusters, targeting corporate offices or industry conferences directly. Combined with connected TV (CTV) advertising, programmatic RTB delivers high-frequency impressions to high-value decision-makers, bypassing the noise of traditional social networks."
  }
];
