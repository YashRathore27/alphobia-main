/* ------------------------------------------------------------------
 * Alphobia — datasets built from real products, brands & photography
 * (all client-side; logos via public favicon service, photos via Pexels CDN)
 * ------------------------------------------------------------------ */
import { slugify } from "../utils/format";

let seed = 20240613;
const rand = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const between = (min, max, dp = 0) => {
  const v = min + rand() * (max - min);
  return dp ? Number(v.toFixed(dp)) : Math.round(v);
};
const futureDate = (minD, maxD) => {
  const d = new Date();
  d.setDate(d.getDate() + between(minD, maxD));
  return d.toISOString();
};
const pastDate = (minD, maxD) => {
  const d = new Date();
  d.setDate(d.getDate() - between(minD, maxD));
  return d.toISOString();
};

/* ------------------------------- logos -------------------------------- */
export const logoUrl = (domain, size = 128) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

/* --------------------------- image pools (Pexels) ---------------------- */
const px = (id, file) => `https://images.pexels.com/photos/${id}/${file || `pexels-photo-${id}.jpeg`}?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`;

const IMG = {
  electronics: [
    px(30981655), px(8858287), px(33797659), px(33022724),
    px(8380417), px(20573137), px(7812322), px(7417547),
  ],
  fashion: [
    px(28645956), px(28271086), px(1456733), px(9546375),
    px(1456740), px(11324518), px(30707531), px(11324548),
  ],
  tech: [
    px(34804016), px(34804011), px(34803999), px(34803994),
    px(34803966), px(34804001), px(34803973), px(34803986),
  ],
  analytics: [
    px(97080), px(106344), px(577195), px(12969403),
    px(10020092), px(139387), px(8636589), px(577210),
  ],
  beauty: [
    px(12969358), px(1502219), px(5632324), px(5650039),
    px(27544691), px(13534508), px(5632350), px(11935611),
  ],
  home: [
    px(30276385), px(18071814), px(6980574), px(6980568),
    px(6032787), px(5591850), px(4050463), px(8089083),
  ],
  travel: [
    px(1008155), px(1381415), px(31711206), px(54380),
    px(4213044), px(32176083), px(34629931), px(7446972),
  ],
  finance: [
    px(7621381), px(5198284), px(38565, "iphone-visa-business-buying-38565.jpeg"), px(32642486),
    px(5849594), px(32642488), px(8938735), px(33785776),
  ],
  hosting: [
    px(17489152), px(17323801), px(5480781), px(17489163),
    px(37605913), px(17489157), px(4508751), px(1181316),
  ],
};

const POOL_BY_CAT = {
  electronics: IMG.electronics,
  fashion: IMG.fashion,
  "ai-tools": IMG.tech,
  marketing: IMG.analytics,
  finance: IMG.finance,
  travel: IMG.travel,
  software: IMG.tech,
  hosting: IMG.hosting,
  beauty: IMG.beauty,
  home: IMG.home,
};

/* ----------------------------- categories ----------------------------- */
export const categories = [
  { id: "electronics", name: "Electronics", icon: "Cpu", emoji: "🎧", description: "Headphones, laptops, wearables & smart gadgets — lab-tested and price-tracked.", gradient: "from-blue-500 to-indigo-600", featured: true, image: IMG.electronics[0] },
  { id: "fashion", name: "Fashion", icon: "Shirt", emoji: "👟", description: "Sneakers, apparel and accessories from Nike, Adidas, Levi's and more.", gradient: "from-rose-400 to-pink-600", featured: true, image: IMG.fashion[2] },
  { id: "ai-tools", name: "AI Tools", icon: "Sparkles", emoji: "🧠", description: "ChatGPT, Midjourney, Jasper and the best AI software for creators and teams.", gradient: "from-violet-500 to-purple-600", featured: true, image: IMG.tech[0] },
  { id: "marketing", name: "Marketing", icon: "Megaphone", emoji: "📈", description: "Semrush, Mailchimp, HubSpot — growth stacks that actually move the needle.", gradient: "from-amber-400 to-orange-500", featured: true, image: IMG.analytics[5] },
  { id: "finance", name: "Finance", icon: "Wallet", emoji: "💳", description: "QuickBooks, YNAB, Wise and fintech apps worth your money.", gradient: "from-emerald-400 to-teal-600", featured: false, image: IMG.finance[7] },
  { id: "travel", name: "Travel", icon: "Plane", emoji: "🧳", description: "Away, Osprey, Airalo eSIMs — gear and services with exclusive cashback.", gradient: "from-sky-400 to-cyan-500", featured: false, image: IMG.travel[6] },
  { id: "software", name: "Software", icon: "Code2", emoji: "⌨️", description: "Notion, Figma, Adobe CC — productivity and creative tools that ship faster.", gradient: "from-slate-500 to-slate-800", featured: true, image: IMG.tech[5] },
  { id: "hosting", name: "Hosting", icon: "Server", emoji: "☁️", description: "Hostinger, Cloudways, Vercel — cloud and managed hosting deals for every stack.", gradient: "from-cyan-500 to-blue-600", featured: false, image: IMG.hosting[1] },
  { id: "beauty", name: "Beauty", icon: "Heart", emoji: "💄", description: "CeraVe, The Ordinary, Dyson Airwrap — skincare and grooming reviewed honestly.", gradient: "from-fuchsia-400 to-rose-500", featured: false, image: IMG.beauty[1] },
  { id: "home", name: "Home", icon: "Home", emoji: "☕", description: "Dyson, Nespresso, Philips Hue — smart home and kitchen picks for modern living.", gradient: "from-lime-400 to-emerald-500", featured: false, image: IMG.home[4] },
];

/* ----------------------------- companies ------------------------------ */
export const companies = [
  { id: "amazon", name: "Amazon", domain: "amazon.com", color: "#FF9900" },
  { id: "shopify", name: "Shopify", domain: "shopify.com", color: "#96BF48" },
  { id: "adobe", name: "Adobe", domain: "adobe.com", color: "#FF0000" },
  { id: "canva", name: "Canva", domain: "canva.com", color: "#8B3DFF" },
  { id: "hostinger", name: "Hostinger", domain: "hostinger.com", color: "#673DE6" },
  { id: "google", name: "Google", domain: "google.com", color: "#4285F4" },
  { id: "microsoft", name: "Microsoft", domain: "microsoft.com", color: "#00A4EF" },
  { id: "hubspot", name: "HubSpot", domain: "hubspot.com", color: "#FF7A59" },
  { id: "meta", name: "Meta", domain: "meta.com", color: "#0081FB" },
  { id: "semrush", name: "Semrush", domain: "semrush.com", color: "#FF642D" },
];

/* -------------------- real product catalog per category ---------------- */
/* [name, brand, brandDomain, price, originalPrice, description] */
const catalog = {
  electronics: [
    ["Sony WH-1000XM5 Wireless Headphones", "Sony", "sony.com", 328, 399, "Industry-leading noise cancellation driven by two processors and eight microphones, 30-hour battery life and best-in-class call quality."],
    ["Apple AirPods Pro 2 (USB-C)", "Apple", "apple.com", 199, 249, "H2 chip with up to 2x more active noise cancellation, Adaptive Audio, and Precision Finding via the USB-C MagSafe case."],
    ["Samsung Galaxy Watch6 44mm", "Samsung", "samsung.com", 219, 329, "Advanced sleep coaching, body-composition analysis and a bright 1.5\" Super AMOLED display in a slimmer, more comfortable design."],
    ["Apple MacBook Air 13\" (M3, 8GB/256GB)", "Apple", "apple.com", 899, 1099, "The M3 chip delivers up to 60% faster performance than M1 in a fanless design with 18 hours of battery life and a Liquid Retina display."],
    ["Bose QuietComfort Ultra Headphones", "Bose", "bose.com", 299, 429, "Breakthrough spatial audio with Bose Immersive Audio, world-class noise cancellation and up to 24 hours of battery."],
    ["GoPro HERO12 Black", "GoPro", "gopro.com", 299, 399, "5.3K60 video with HDR, Emmy-winning HyperSmooth 6.0 stabilization and 2x longer runtimes than the previous generation."],
    ["Kindle Paperwhite (16 GB)", "Amazon", "amazon.com", 129, 159, "6.8\" glare-free display, adjustable warm light, weeks of battery life and 20% faster page turns — waterproof for the bath or beach."],
    ["JBL Flip 6 Portable Speaker", "JBL", "jbl.com", 89, 129, "Bold JBL Original Pro Sound with a racetrack-shaped woofer, 12 hours of playtime and IP67 waterproof-dustproof rating."],
    ["Anker 737 Power Bank (24,000mAh)", "Anker", "anker.com", 109, 149, "140W two-way fast charging with a smart digital display — tops up a 13\" MacBook Air to 50% in about 40 minutes."],
    ["Logitech MX Master 3S", "Logitech", "logitech.com", 84, 99, "8K DPI tracking on any surface including glass, Quiet Clicks and MagSpeed scrolling at 1,000 lines per second."],
    ["Samsung T7 Shield 1TB Portable SSD", "Samsung", "samsung.com", 89, 159, "Rugged IP65-rated portable SSD with up to 1,050 MB/s reads — drop-tested up to 3 meters."],
    ["LG UltraGear 27\" QHD 165Hz Monitor", "LG", "lg.com", 249, 349, "27\" QHD IPS panel with 1ms response, 165Hz refresh rate and NVIDIA G-SYNC compatibility for tear-free gaming."],
    ["DJI Mini 4K Drone", "DJI", "dji.com", 259, 299, "Under 249 g — no registration needed in most regions. 4K UHD video, 3-axis gimbal and level-5 wind resistance."],
    ["Keychron K2 V2 Mechanical Keyboard", "Keychron", "keychron.com", 79, 99, "75% layout wireless mechanical keyboard with hot-swappable Gateron switches and Mac/Windows compatibility."],
    ["Sony WF-1000XM5 Earbuds", "Sony", "sony.com", 248, 299, "The best truly wireless noise-canceling earbuds Sony has made — 25% smaller, with Dynamic Driver X and 8 hours per charge."],
  ],
  fashion: [
    ["Nike Air Force 1 '07", "Nike", "nike.com", 90, 115, "The radiance lives on. Crisp leather, bold colors and that perfect amount of flash — the b-ball original since 1982."],
    ["Adidas Ultraboost Light", "Adidas", "adidas.com", 119, 190, "The lightest Ultraboost ever, with 30% lighter BOOST capsules and a Linear Energy Push system for epic energy return."],
    ["Levi's 501 Original Fit Jeans", "Levi's", "levi.com", 48, 70, "The blueprint of every jean in existence since 1873 — a cultural icon with the signature straight fit and button fly."],
    ["The North Face 1996 Retro Nuptse", "The North Face", "thenorthface.com", 249, 330, "The iconic 700-fill goose down puffer, reborn with recycled fabrics and the boxy 1996 silhouette."],
    ["Ray-Ban Aviator Classic", "Ray-Ban", "ray-ban.com", 129, 171, "The sunglass that started it all in 1937 — gold frame, crystal green G-15 lenses, 100% UV protection."],
    ["Converse Chuck 70 High Top", "Converse", "converse.com", 75, 90, "Premium canvas, higher rubber foxing and cushioned OrthoLite insole — the elevated take on the 1970s classic."],
    ["New Balance 574 Core", "New Balance", "newbalance.com", 69, 90, "The most New Balance shoe ever — a clean, classic runner with ENCAP midsole cushioning built for everyday wear."],
    ["Carhartt WIP Watch Beanie", "Carhartt", "carhartt-wip.com", 25, 35, "The cult-favorite acrylic rib-knit beanie with the woven square label. One size, every outfit."],
    ["Herschel Little America Backpack", "Herschel", "herschel.com", 79, 110, "Mountaineering style meets modern function — 30L, padded 15\" laptop sleeve and signature striped liner."],
    ["Patagonia Better Sweater Fleece", "Patagonia", "patagonia.com", 99, 139, "100% recycled polyester fleece dyed with a low-impact process — Fair Trade Certified sewn and endlessly versatile."],
    ["Vans Old Skool", "Vans", "vans.com", 55, 70, "The first Vans to bear the iconic sidestripe — durable canvas and suede with the classic waffle outsole."],
    ["Dr. Martens 1460 Boots", "Dr. Martens", "drmartens.com", 129, 170, "Eight eyes, yellow stitching, air-cushioned sole — the original boot that's carried subcultures since 1960."],
    ["Champion Reverse Weave Hoodie", "Champion", "champion.com", 42, 70, "The heavyweight fleece that made hoodies famous — cut cross-grain to resist vertical shrinkage since 1938."],
    ["Casio G-Shock GA-2100", "Casio", "casio.com", 79, 99, "The 'CasiOak' — carbon core guard structure, octagonal bezel and 3-year battery in an ultra-slim analog-digital case."],
    ["Timberland 6-Inch Premium Boots", "Timberland", "timberland.com", 149, 198, "Waterproof premium leather, seam-sealed construction and 400g PrimaLoft insulation — the original yellow boot."],
  ],
  "ai-tools": [
    ["ChatGPT Plus (Annual)", "OpenAI", "openai.com", 200, 240, "Priority access to GPT-4o and o-series reasoning models, advanced data analysis, vision, DALL·E image generation and custom GPTs."],
    ["Midjourney Standard Plan", "Midjourney", "midjourney.com", 288, 360, "15 hours of fast GPU time per month, unlimited relaxed generations and full commercial usage rights for stunning AI imagery."],
    ["Jasper Creator (Annual)", "Jasper", "jasper.ai", 468, 588, "The AI copilot for marketing teams — on-brand copy across 30+ languages with Brand Voice and SEO mode."],
    ["Copy.ai Pro (Annual)", "Copy.ai", "copy.ai", 432, 588, "Go-to-market AI platform with 2,000+ workflows, unlimited brand voices and five user seats included."],
    ["ElevenLabs Creator Plan", "ElevenLabs", "elevenlabs.io", 220, 264, "The most realistic AI voice generator — 100k credits monthly, professional voice cloning and 192kbps audio."],
    ["Synthesia Starter (Annual)", "Synthesia", "synthesia.io", 264, 348, "Create studio-quality videos with 230+ AI avatars in 140+ languages — no cameras, mics or actors needed."],
    ["Grammarly Premium (Annual)", "Grammarly", "grammarly.com", 144, 288, "Full-sentence rewrites, tone adjustments, plagiarism detection and generative AI assistance across every app you write in."],
    ["Notion AI Add-on (Annual)", "Notion", "notion.so", 96, 120, "Q&A across your entire workspace, instant writing help, autofill databases and meeting summaries inside Notion."],
    ["Runway Standard (Annual)", "Runway", "runwayml.com", 144, 180, "Gen-3 Alpha video generation, 625 credits monthly, watermark-free exports and pro editing tools for AI filmmaking."],
    ["Perplexity Pro (Annual)", "Perplexity", "perplexity.ai", 200, 240, "600+ Pro searches a day powered by GPT-4o, Claude and Sonar, with file uploads and API credits included."],
    ["GitHub Copilot Pro (Annual)", "GitHub", "github.com", 100, 120, "Your AI pair programmer — code completions, multi-file edits and Copilot Chat in your IDE, trained on billions of lines of code."],
    ["Descript Creator (Annual)", "Descript", "descript.com", 288, 360, "Edit video and podcasts like a doc — AI transcription in 23 languages, Studio Sound and Overdub voice cloning."],
    ["Otter.ai Pro (Annual)", "Otter.ai", "otter.ai", 100, 200, "1,200 minutes of AI meeting transcription monthly with automated summaries, action items and Slack integrations."],
    ["Claude Pro (Annual)", "Anthropic", "anthropic.com", 200, 240, "5x more usage of Claude's most capable models, Projects for organized work, and priority access during peak hours."],
    ["Canva Pro (Annual)", "Canva", "canva.com", 120, 156, "Magic Studio AI suite, 100M+ premium assets, brand kits and background remover — design superpowers for everyone."],
  ],
  marketing: [
    ["Semrush Pro (Monthly)", "Semrush", "semrush.com", 117, 140, "The all-in-one SEO suite — 55+ tools covering keyword research, competitor analysis, site audits and rank tracking."],
    ["Ahrefs Lite (Monthly)", "Ahrefs", "ahrefs.com", 99, 129, "Industry-leading backlink index and Site Explorer, plus keyword research across 10 search engines."],
    ["Mailchimp Standard (Monthly)", "Mailchimp", "mailchimp.com", 20, 29, "Email marketing with generative AI, customer journeys, send-time optimization and 100+ pre-built templates."],
    ["Hootsuite Professional", "Hootsuite", "hootsuite.com", 99, 149, "Schedule across 10 social profiles, best-time-to-post recommendations and unified inbox — social management since 2008."],
    ["Klaviyo Email (500 contacts)", "Klaviyo", "klaviyo.com", 45, 60, "The e-commerce email and SMS platform behind 100K+ brands — predictive analytics, flows and 300+ integrations."],
    ["Hotjar Plus (Monthly)", "Hotjar", "hotjar.com", 32, 39, "Heatmaps, session recordings and on-site surveys that show you exactly how users experience your site."],
    ["Unbounce Build (Monthly)", "Unbounce", "unbounce.com", 74, 99, "The landing page platform with Smart Traffic AI that routes visitors to their best-converting variant automatically."],
    ["ActiveCampaign Plus", "ActiveCampaign", "activecampaign.com", 49, 70, "Marketing automation with 900+ integrations, predictive sending and CRM with sales automation built in."],
    ["Buffer Team (Monthly)", "Buffer", "buffer.com", 10, 12, "Clean, simple social publishing with unlimited team members, drafts and engagement tools for every channel."],
    ["Kit Creator (Monthly)", "Kit", "kit.com", 25, 29, "The creator marketing platform (formerly ConvertKit) — visual automations, tip jars and a creator network of 60K+."],
    ["Sprout Social Standard", "Sprout Social", "sproutsocial.com", 199, 249, "Enterprise-grade social management: unified smart inbox, publishing, analytics and social listening."],
    ["Surfer SEO Essential", "Surfer", "surferseo.com", 79, 99, "Content editor that scores your draft against 500+ ranking signals — write content that ranks, faster."],
    ["Brevo Business (Monthly)", "Brevo", "brevo.com", 18, 25, "Email, SMS, WhatsApp and marketing automation (formerly Sendinblue) with a generous free tier and pay-per-send pricing."],
    ["MailerLite Growing Business", "MailerLite", "mailerlite.com", 9, 15, "Beautiful email builder, automations, websites and paid subscriptions — the friendliest email tool for small teams."],
    ["HubSpot Marketing Starter", "HubSpot", "hubspot.com", 15, 20, "Email marketing, forms, landing pages and live chat on top of the free HubSpot CRM — remove branding and scale up."],
  ],
  finance: [
    ["QuickBooks Online Simple Start", "Intuit", "quickbooks.intuit.com", 18, 35, "Track income and expenses, send invoices, sort business taxes and connect your bank — the small-business standard."],
    ["YNAB (Annual)", "YNAB", "ynab.com", 99, 109, "The zero-based budgeting method that gives every dollar a job — the average new user saves $600 in their first two months."],
    ["TurboTax Deluxe", "Intuit", "turbotax.intuit.com", 69, 89, "Maximize 350+ deductions and credits with step-by-step guidance — accuracy and maximum refund guaranteed."],
    ["Wise Multi-Currency Account", "Wise", "wise.com", 9, 12, "Hold 40+ currencies, get local account details in 9 currencies and spend abroad at the real mid-market rate."],
    ["Monarch Money (Annual)", "Monarch", "monarchmoney.com", 99, 120, "The top-rated Mint replacement — net worth tracking, collaborative budgets and investment monitoring in one beautiful app."],
    ["FreshBooks Lite (Monthly)", "FreshBooks", "freshbooks.com", 10, 19, "Ridiculously easy invoicing, expense tracking and time tracking built for freelancers and service businesses."],
    ["Robinhood Gold (Annual)", "Robinhood", "robinhood.com", 50, 60, "4.5% APY on uninvested cash, 3% IRA match, bigger instant deposits and professional Morningstar research."],
    ["Coinbase One (Monthly)", "Coinbase", "coinbase.com", 25, 30, "Zero trading fees, boosted staking rewards, enhanced account protection and priority 24/7 support."],
    ["Xero Grow (Monthly)", "Xero", "xero.com", 42, 47, "Beautiful cloud accounting with unlimited users, bank reconciliation and 1,000+ app integrations."],
    ["Acorns Gold (Monthly)", "Acorns", "acorns.com", 12, 15, "Invest spare change automatically, earn a 3% IRA match and open investment accounts for your kids."],
    ["NordVPN Plus (2-Year)", "NordVPN", "nordvpn.com", 82, 220, "Protect your banking and browsing on 10 devices — Threat Protection Pro, password manager and 7,300+ servers."],
    ["Betterment Digital", "Betterment", "betterment.com", 4, 5, "Automated investing with tax-loss harvesting, personalized portfolios and no minimum balance."],
    ["Empower Personal Dashboard", "Empower", "empower.com", 0, 0, "Free award-winning net-worth, cash-flow and retirement planning tools used by 3.4M+ households."],
    ["Stripe Atlas", "Stripe", "stripe.com", 500, 500, "Form a Delaware C-corp or LLC from anywhere in the world — bank account, equity setup and $100K+ in partner deals."],
    ["Mercury Business Banking", "Mercury", "mercury.com", 0, 0, "Banking built for startups — FDIC-insured accounts, corporate cards, 4%+ treasury yield and zero monthly fees."],
  ],
  travel: [
    ["Away The Carry-On", "Away", "awaytravel.com", 245, 275, "The cult-favorite polycarbonate carry-on with 360° Hinomoto wheels, TSA-approved locks and a lifetime warranty."],
    ["Samsonite Freeform 21\" Spinner", "Samsonite", "samsonite.com", 189, 280, "Ultra-lightweight yet incredibly strong hardside spinner with dual-spinning wheels and brushed matte finish."],
    ["Osprey Farpoint 40 Travel Pack", "Osprey", "osprey.com", 165, 185, "The gold standard of carry-on backpacks — stowaway harness, padded laptop sleeve and Osprey's All Mighty Guarantee."],
    ["Peak Design Travel Backpack 45L", "Peak Design", "peakdesign.com", 255, 300, "Expandable 30–45L one-bag travel system with intuitive access points and a weatherproof 400D nylon shell."],
    ["Airalo Global eSIM (10GB)", "Airalo", "airalo.com", 34, 45, "Instant data in 130+ countries from the world's first eSIM store — no roaming fees, no physical SIM swaps."],
    ["Priority Pass Standard (Annual)", "Priority Pass", "prioritypass.com", 89, 99, "Access to 1,500+ airport lounges worldwide regardless of airline, class or loyalty membership."],
    ["SafetyWing Nomad Insurance", "SafetyWing", "safetywing.com", 45, 56, "Travel medical insurance built for nomads — coverage in 180+ countries that you can start and stop like a subscription."],
    ["Apple AirTag (4-Pack)", "Apple", "apple.com", 79, 99, "Precision Finding via the Find My network — never lose your luggage, keys or backpack again."],
    ["Anker 65W GaN Charger", "Anker", "anker.com", 39, 56, "Charges a MacBook, iPad and phone simultaneously from one palm-sized GaN II charger with foldable plug."],
    ["Trtl Travel Pillow", "Trtl", "trtltravel.com", 44, 60, "Scientifically proven neck support that holds your head upright — half the size of a U-shaped pillow."],
    ["Hydro Flask 32oz Wide Mouth", "Hydro Flask", "hydroflask.com", 38, 45, "TempShield double-wall insulation keeps drinks cold 24 hours or hot 12 — the trail-to-terminal icon."],
    ["Tumi Alpha Bravo Backpack", "Tumi", "tumi.com", 495, 595, "Ballistic nylon build quality that survives a decade of daily commutes and long-hauls, with Tumi Tracer included."],
    ["Bellroy Tech Kit", "Bellroy", "bellroy.com", 59, 69, "The beloved organizer for cables, chargers and adapters — opens flat like a book so nothing hides."],
    ["Matador Freefly16 Packable Duffel", "Matador", "matadorequipment.com", 65, 80, "A 16L weatherproof duffel that packs down to palm size — the perfect airline personal item."],
    ["Booking.com Genius Gift Card", "Booking.com", "booking.com", 90, 100, "Stack 10–20% Genius discounts on 2.7M+ properties worldwide with flexible cancellation."],
  ],
  software: [
    ["Notion Plus (Annual)", "Notion", "notion.so", 96, 120, "The connected workspace — docs, wikis, projects and databases with unlimited blocks for small teams."],
    ["Figma Professional (Annual)", "Figma", "figma.com", 144, 180, "The collaborative interface design tool — unlimited files, team libraries, Dev Mode and design systems at scale."],
    ["Adobe Creative Cloud All Apps", "Adobe", "adobe.com", 599, 660, "20+ apps including Photoshop, Illustrator, Premiere Pro and Firefly generative AI — the complete creative toolkit."],
    ["Microsoft 365 Family (Annual)", "Microsoft", "microsoft.com", 99, 130, "Word, Excel, PowerPoint and Outlook for up to 6 people, with 1TB OneDrive storage each and advanced security."],
    ["1Password Families (Annual)", "1Password", "1password.com", 48, 60, "Protect up to 5 family members with the world's most-loved password manager — Watchtower alerts and travel mode."],
    ["Slack Pro (Annual, per user)", "Slack", "slack.com", 87, 105, "Unlimited message history, group huddles, workflow automations and screen sharing for growing teams."],
    ["Zoom Workplace Pro (Annual)", "Zoom", "zoom.us", 140, 160, "30-hour meetings for 100 participants, 5GB cloud recording, AI Companion summaries and whiteboards."],
    ["CleanMyMac X (Annual)", "MacPaw", "macpaw.com", 89, 120, "The Mac maintenance icon — smart cleanup, malware removal and performance monitoring, notarized by Apple."],
    ["Todoist Pro (Annual)", "Todoist", "todoist.com", 48, 60, "The #1 to-do app for 30M+ people — natural language input, 300 projects, reminders and calendar layout."],
    ["Dropbox Plus (Annual)", "Dropbox", "dropbox.com", 120, 144, "2TB of storage with automatic backup, 30-day file recovery and transfer of files up to 50GB."],
    ["Affinity Photo 2 (Lifetime)", "Affinity", "affinity.serif.com", 41, 70, "Professional photo editing with a one-off payment — no subscription, ever. Winner of Apple's Mac App of the Year."],
    ["Camtasia (Perpetual License)", "TechSmith", "techsmith.com", 179, 300, "The all-in-one screen recorder and video editor trusted for tutorials, courses and product demos since 2002."],
    ["Parallels Desktop 20 for Mac", "Parallels", "parallels.com", 100, 130, "Run Windows on Apple Silicon seamlessly — tested on 200,000+ Windows apps with one-click setup."],
    ["JetBrains IntelliJ IDEA Ultimate", "JetBrains", "jetbrains.com", 169, 199, "The leading Java and Kotlin IDE with full-stack framework support, database tools and AI Assistant."],
    ["Final Cut Pro", "Apple", "apple.com", 299, 329, "Apple's professional video editor — Magnetic Timeline, spatial video editing and blazing performance on Apple Silicon."],
  ],
  hosting: [
    ["Hostinger Premium (48 mo)", "Hostinger", "hostinger.com", 2.99, 11.99, "100 websites, free domain, weekly backups and LiteSpeed-powered NVMe hosting — the best value in shared hosting."],
    ["Bluehost Basic (12 mo)", "Bluehost", "bluehost.com", 1.99, 9.99, "WordPress.org-recommended hosting since 2005 — free domain for the first year, SSL and one-click WP install."],
    ["SiteGround StartUp", "SiteGround", "siteground.com", 2.99, 17.99, "Google Cloud infrastructure, ultrafast PHP, daily backups and the best-rated support in shared hosting."],
    ["Cloudways DigitalOcean 1GB", "Cloudways", "cloudways.com", 11, 14, "Managed cloud hosting on DigitalOcean, Vultr or AWS — vertical scaling, staging and 24/7 expert support."],
    ["DigitalOcean Droplet 4GB", "DigitalOcean", "digitalocean.com", 20, 24, "Predictable cloud compute with 99.99% uptime SLA, floating IPs and a developer experience teams love."],
    ["Vultr High Frequency 2GB", "Vultr", "vultr.com", 12, 15, "3GHz+ CPUs and NVMe storage across 32 global locations — deploy in 60 seconds."],
    ["Namecheap .com Domain", "Namecheap", "namecheap.com", 5.98, 13.98, "First-year .com registration with free WHOIS privacy forever and 2FA — the registrar 11M+ users trust."],
    ["Kinsta Starter", "Kinsta", "kinsta.com", 24, 35, "Premium managed WordPress on Google's fastest C2 machines with Cloudflare Enterprise and free migrations."],
    ["WP Engine Startup", "WP Engine", "wpengine.com", 20, 25, "The managed WordPress pioneer — EverCache, daily backups, staging and Genesis themes included."],
    ["Vercel Pro (per user)", "Vercel", "vercel.com", 16, 20, "The frontend cloud built by the creators of Next.js — preview deployments, edge functions and analytics."],
    ["Netlify Pro (per user)", "Netlify", "netlify.com", 15, 19, "Build, deploy and scale modern web projects with background functions, analytics and 1TB bandwidth."],
    ["Google Workspace Business Starter", "Google", "workspace.google.com", 6, 7.2, "Custom business Gmail, 30GB storage per user, Meet video calls and Gemini AI assistance."],
    ["Cloudflare Pro", "Cloudflare", "cloudflare.com", 20, 25, "WAF, image optimization with Polish, mobile acceleration and enhanced DDoS protection for your site."],
    ["AWS Lightsail 2GB", "AWS", "aws.amazon.com", 3.5, 5, "Simple virtual private servers with predictable pricing — everything you need to jump-start your project on AWS."],
    ["Porkbun .dev Domain", "Porkbun", "porkbun.com", 9.13, 15, "The lowest .dev pricing around with free WHOIS privacy, SSL and email forwarding included."],
  ],
  beauty: [
    ["CeraVe Foaming Facial Cleanser 16oz", "CeraVe", "cerave.com", 13, 17, "Developed with dermatologists — three essential ceramides and niacinamide gently cleanse without disrupting the skin barrier."],
    ["The Ordinary Niacinamide 10% + Zinc 1%", "The Ordinary", "theordinary.com", 6, 8, "The internet's favorite serum — visibly reduces blemishes and congestion at a price that broke the industry."],
    ["La Roche-Posay Anthelios SPF 60", "La Roche-Posay", "laroche-posay.us", 33, 40, "The #1 dermatologist-recommended sunscreen brand — melt-in milk texture with Cell-Ox Shield technology."],
    ["Olaplex No.3 Hair Perfector", "Olaplex", "olaplex.com", 22, 30, "The patented bond-building treatment that repairs damaged hair at a molecular level — used weekly at home."],
    ["Cetaphil Moisturizing Cream", "Cetaphil", "cetaphil.com", 12, 17, "Clinically proven 48-hour hydration for dry, sensitive skin — fragrance-free and non-comedogenic since 1947."],
    ["Neutrogena Hydro Boost Water Gel", "Neutrogena", "neutrogena.com", 15, 24, "Hyaluronic acid gel-cream that instantly quenches skin and keeps it hydrated all day — oil-free and award-winning."],
    ["Dyson Airwrap Multi-Styler Complete", "Dyson", "dyson.com", 499, 599, "Curl, shape, smooth and dry with Coanda airflow — no extreme heat damage. The most-wished-for styler on the market."],
    ["Philips OneBlade Pro 360", "Philips", "philips.com", 55, 80, "Trim, edge and shave any length of stubble with the 360° flexible blade — 120 minutes of cordless runtime."],
    ["Foreo Luna 4", "Foreo", "foreo.com", 199, 279, "T-Sonic facial cleansing with ultra-hygienic silicone touchpoints — 99.5% of dirt and oil removed in 2 minutes."],
    ["EltaMD UV Clear SPF 46", "EltaMD", "eltamd.com", 39, 44, "The dermatologist cult classic for acne-prone skin — niacinamide-infused, oil-free mineral-based sun protection."],
    ["Paula's Choice 2% BHA Liquid Exfoliant", "Paula's Choice", "paulaschoice.com", 32, 35, "One sold every 5 seconds worldwide — unclogs pores, smooths wrinkles and evens tone with salicylic acid."],
    ["Laneige Lip Sleeping Mask", "Laneige", "us.laneige.com", 19, 24, "The K-beauty phenomenon — Berry Fruit Complex and Moisture Wrap technology for baby-soft lips by morning."],
    ["Kiehl's Ultra Facial Cream", "Kiehl's", "kiehls.com", 35, 38, "24-hour hydration with squalane and glacial glycoprotein — Kiehl's #1 moisturizer since 1851's apothecary days."],
    ["Oral-B iO Series 5", "Oral-B", "oralb.com", 79, 120, "Revolutionary magnetic iO technology with AI brushing recognition — 100% healthier gums in one week."],
    ["Braun Series 9 Pro+", "Braun", "braun.com", 229, 329, "The world's most efficient shaver — 5 ProBlades, ProComfort head and a 60-minute Li-Ion battery."],
  ],
  home: [
    ["Dyson V15 Detect Absolute", "Dyson", "dyson.com", 569, 749, "Laser reveals microscopic dust, piezo sensor counts particles and the HEPA filtration captures 99.99% down to 0.1 microns."],
    ["iRobot Roomba j7+", "iRobot", "irobot.com", 399, 799, "PrecisionVision navigation avoids cords and pet waste (guaranteed), with a self-emptying Clean Base for 60 days of debris."],
    ["Nespresso Vertuo Next", "Nespresso", "nespresso.com", 129, 179, "Barista-grade coffee at the push of a button — Centrifusion extraction across 5 cup sizes, made from 54% recycled plastic."],
    ["Instant Pot Duo 7-in-1 (6 Qt)", "Instant Pot", "instantpot.com", 79, 99, "America's best-selling multicooker — pressure cooker, slow cooker, rice cooker, steamer and more with 13 one-touch programs."],
    ["Philips Hue White & Color Starter Kit", "Philips Hue", "philips-hue.com", 119, 199, "Three smart bulbs plus Bridge — 16 million colors, voice control and automations that transform any room."],
    ["Google Nest Learning Thermostat", "Google", "store.google.com", 89, 129, "Programs itself in a week and saves an average 10–12% on heating bills — now with Matter support."],
    ["Ring Video Doorbell (2nd Gen)", "Ring", "ring.com", 69, 99, "1080p HD video, improved motion detection and two-way talk — see and speak to visitors from anywhere."],
    ["Lodge 10.25\" Cast Iron Skillet", "Lodge", "lodgecastiron.com", 19, 34, "Pre-seasoned in America since 1896 — the last skillet you'll ever buy, from stovetop to campfire."],
    ["Ninja Air Fryer XL (5.5 Qt)", "Ninja", "ninjakitchen.com", 99, 139, "Air fry with up to 75% less fat, plus roast, reheat and dehydrate — family-sized capacity with dishwasher-safe basket."],
    ["Levoit Core 300S Air Purifier", "Levoit", "levoit.com", 129, 149, "Purifies 1,095 sq ft per hour with a 3-stage HEPA filter at whisper-quiet 22dB — app and voice controlled."],
    ["SodaStream Terra", "SodaStream", "sodastream.com", 69, 99, "Turn water into sparkling water in seconds — save up to 3,700 single-use bottles per year."],
    ["Vitamix 5200 Blender", "Vitamix", "vitamix.com", 349, 549, "The professional-grade legend — aircraft-grade blades blend hot soup from cold ingredients in 6 minutes, 7-year warranty."],
    ["Breville Barista Express", "Breville", "breville.com", 559, 749, "The best-selling home espresso machine — integrated conical burr grinder, precise 9-bar extraction and micro-foam steam wand."],
    ["Casper Original Pillow", "Casper", "casper.com", 45, 65, "Pillow-in-pillow design with a supportive inner core and plush outer layer — machine washable and hotel-soft."],
    ["KitchenAid Artisan Stand Mixer", "KitchenAid", "kitchenaid.com", 349, 449, "The countertop icon since 1919 — 10 speeds, 5-quart bowl and 10+ optional attachments from pasta maker to ice cream."],
  ],
};

/* physical-goods retailers per category */
const retailers = {
  electronics: [["Amazon", "amazon.com"], ["Best Buy", "bestbuy.com"], ["B&H Photo", "bhphotovideo.com"], ["Walmart", "walmart.com"], ["Target", "target.com"]],
  fashion: [["Nike.com", "nike.com"], ["Foot Locker", "footlocker.com"], ["Nordstrom", "nordstrom.com"], ["ASOS", "asos.com"], ["Amazon", "amazon.com"]],
  travel: [["Amazon", "amazon.com"], ["REI", "rei.com"], ["Away", "awaytravel.com"], ["Backcountry", "backcountry.com"]],
  beauty: [["Sephora", "sephora.com"], ["Ulta Beauty", "ulta.com"], ["Amazon", "amazon.com"], ["Target", "target.com"]],
  home: [["Amazon", "amazon.com"], ["Williams Sonoma", "williams-sonoma.com"], ["Best Buy", "bestbuy.com"], ["Target", "target.com"], ["Walmart", "walmart.com"]],
};

const catEmoji = { electronics: "🎧", fashion: "👟", "ai-tools": "🤖", marketing: "📈", finance: "💳", travel: "🧳", software: "💻", hosting: "☁️", beauty: "✨", home: "🏡" };
const badgePool = ["Editor's Choice", "Best Seller", "Trending", "Top Rated", null, null, null];

/* ------------------------------- products ------------------------------ */
export const products = [];
let pid = 1;
for (const cat of categories) {
  const items = catalog[cat.id];
  const pool = POOL_BY_CAT[cat.id];
  items.forEach(([name, brand, domain, price, originalPrice, description], i) => {
    const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const retail = retailers[cat.id];
    const [storeName, storeDomain] = retail ? retail[i % retail.length] : [brand, domain];
    products.push({
      id: `p-${pid}`,
      slug: slugify(name),
      name,
      brand,
      brandDomain: domain,
      logo: logoUrl(domain),
      category: cat.id,
      emoji: catEmoji[cat.id],
      gradient: cat.gradient,
      image: pool[i % pool.length],
      gallery: [pool[i % pool.length], pool[(i + 3) % pool.length], pool[(i + 5) % pool.length]],
      price,
      originalPrice,
      discount,
      rating: between(3.9, 5, 1),
      reviews: between(120, 48000),
      store: storeName,
      storeDomain,
      storeLogo: logoUrl(storeDomain),
      badge: pick(badgePool),
      trending: rand() > 0.72,
      featured: rand() > 0.62,
      affiliateUrl: `https://${storeDomain}`,
      description,
      specs: {
        Brand: brand,
        Category: cat.name,
        "Sold by": storeName,
        Warranty: cat.id === "software" || cat.id === "ai-tools" || cat.id === "marketing" || cat.id === "hosting" ? "Subscription — cancel anytime" : `${between(1, 3)} year manufacturer warranty`,
        "Best price via": storeName,
        Availability: rand() > 0.15 ? "In stock" : "Limited stock",
      },
      attributes: {
        Performance: between(7, 9.9, 1),
        Design: between(7, 9.9, 1),
        Value: between(6.5, 9.9, 1),
        Features: between(6.8, 9.9, 1),
        Support: between(6.5, 9.8, 1),
      },
      pros: [
        `${brand}'s build quality and reliability are class-leading`,
        "Strong performance in our hands-on testing",
        "Excellent value at the current tracked price",
      ],
      cons: ["Premium tiers and accessories cost extra", "High demand — price often returns to list quickly"],
    });
    pid += 1;
  });
}

/* ------------------------------- deals -------------------------------- */
const dealHooks = ["Lowest price ever tracked", "Exclusive Alphobia price", "Verified today by our deals team", "Bundle bonus included", "Member cashback boosted", "Price-match guaranteed"];
export const deals = products
  .filter((p) => p.discount > 0)
  .slice(0, 110)
  .map((p, i) => ({
    id: `d-${i + 1}`,
    productId: p.id,
    title: p.name,
    description: `${pick(dealHooks)} — ${p.description.split("—")[0].split(".")[0].trim()}.`,
    merchant: p.store,
    merchantLogo: p.storeLogo,
    brandLogo: p.logo,
    category: p.category,
    emoji: p.emoji,
    gradient: p.gradient,
    image: p.image,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    cashback: between(2, 12),
    expiresAt: futureDate(1, 45),
    rating: p.rating,
    reviews: p.reviews,
    claimed: between(12, 96),
    badge: i % 7 === 0 ? "Limited Offer" : i % 4 === 0 ? "Trending" : i % 9 === 0 ? "Hot" : null,
    exclusive: rand() > 0.7,
    slug: p.slug,
  }));

/* ------------------------------ coupons ------------------------------- */
const couponMerchants = [
  ["Amazon", "amazon.com", "electronics"], ["Best Buy", "bestbuy.com", "electronics"],
  ["Nike", "nike.com", "fashion"], ["Adidas", "adidas.com", "fashion"], ["ASOS", "asos.com", "fashion"],
  ["Sephora", "sephora.com", "beauty"], ["Ulta Beauty", "ulta.com", "beauty"],
  ["Booking.com", "booking.com", "travel"], ["Expedia", "expedia.com", "travel"],
  ["Hostinger", "hostinger.com", "hosting"], ["Namecheap", "namecheap.com", "hosting"],
  ["Adobe", "adobe.com", "software"], ["Canva", "canva.com", "ai-tools"],
  ["Udemy", "udemy.com", "software"], ["Semrush", "semrush.com", "marketing"],
  ["NordVPN", "nordvpn.com", "finance"], ["Target", "target.com", "home"],
  ["Walmart", "walmart.com", "home"], ["Coursera", "coursera.org", "software"],
  ["DoorDash", "doordash.com", "home"], ["Nespresso", "nespresso.com", "home"],
];
const couponVerbs = ["OFF", "SAVE", "DEAL", "EXTRA", "PRIME", "VIP"];
export const coupons = Array.from({ length: 84 }, (_, i) => {
  const [merchant, domain, catId] = couponMerchants[i % couponMerchants.length];
  const cat = categories.find((c) => c.id === catId);
  const pct = rand() > 0.3;
  const value = pct ? between(10, 60) : between(5, 100);
  return {
    id: `c-${i + 1}`,
    merchant,
    merchantDomain: domain,
    merchantLogo: logoUrl(domain),
    category: catId,
    gradient: cat.gradient,
    title: pct ? `${value}% off select ${cat.name.toLowerCase()} at ${merchant}` : `$${value} off orders over $${value * between(2, 4)} at ${merchant}`,
    code: `${merchant.replace(/[^A-Z]/gi, "").slice(0, 4).toUpperCase()}${pick(couponVerbs)}${value}`,
    discountLabel: pct ? `${value}%` : `$${value}`,
    expiresAt: futureDate(2, 60),
    verified: rand() > 0.25,
    exclusive: rand() > 0.75,
    usedCount: between(120, 18500),
    successRate: between(72, 99),
    avgSavings: between(8, 140),
  };
});

/* ------------------------------ reviews ------------------------------- */
const reviewers = [
  { name: "Maya Collins", role: "Senior Tech Editor" },
  { name: "Devon Reyes", role: "Consumer Lab Analyst" },
  { name: "Priya Sharma", role: "Software Review Lead" },
  { name: "Tomás Alvarez", role: "Gear & Lifestyle Editor" },
  { name: "Hana Sato", role: "AI Tools Specialist" },
  { name: "Liam O'Connor", role: "Finance & SaaS Critic" },
];
export const reviews = products.filter((_, i) => i % 3 === 0).slice(0, 50).map((p, i) => {
  const score = between(7.2, 9.8, 1);
  return {
    id: `r-${i + 1}`,
    productId: p.id,
    slug: `${p.slug}-review`,
    title: `${p.name} review: ${score >= 9 ? "a near-perfect pick" : score >= 8 ? "premium where it counts" : "great value with caveats"}`,
    excerpt: `We spent ${between(2, 6)} weeks testing the ${p.name}. ${p.description.split(".")[0]}. Here's whether it deserves your money.`,
    category: p.category,
    emoji: p.emoji,
    gradient: p.gradient,
    image: p.image,
    logo: p.logo,
    score,
    scores: { Design: between(7, 10, 1), Performance: between(7, 10, 1), Value: between(6.5, 10, 1), Features: between(7, 10, 1) },
    pros: p.pros,
    cons: p.cons,
    verdict: `The ${p.name} earns ${score >= 8.5 ? "an easy recommendation" : "a solid recommendation"} for most buyers. At its current ${p.discount}% discount it outclasses rivals costing considerably more.`,
    author: reviewers[i % reviewers.length],
    date: pastDate(2, 240),
    readTime: between(6, 14),
    featured: i % 6 === 0,
  };
});

/* ------------------------------- blogs -------------------------------- */
const blogTopics = [
  ["The 2026 guide to {cat} deals: when to buy and when to wait", "Buying Guides"],
  ["We tracked 1,400 {cat} prices — here's what we learned", "Data Studies"],
  ["10 {cat} picks our editors actually use every day", "Editor Picks"],
  ["How cashback really works on {cat} purchases", "Money Tips"],
  ["{cat} in 2026: trends that will change how you shop", "Trends"],
  ["Inside our lab: how we test {cat} products", "Behind the Scenes"],
];
const authors = ["Maya Collins", "Devon Reyes", "Priya Sharma", "Tomás Alvarez", "Hana Sato", "Liam O'Connor", "Sofia Marin", "Ethan Brooks"];
export const blogs = [];
let bid = 1;
for (const cat of categories) {
  const pool = POOL_BY_CAT[cat.id];
  blogTopics.forEach(([tpl, tag], i) => {
    blogs.push({
      id: `b-${bid}`,
      slug: slugify(tpl.replace("{cat}", cat.name) + "-" + bid),
      title: tpl.replace("{cat}", cat.name.toLowerCase()).replace(/^./, (c) => c.toUpperCase()),
      excerpt: `From verified price histories to insider timing windows, this deep dive unpacks everything we know about ${cat.name.toLowerCase()} right now — with data from the Alphobia deals engine.`,
      category: cat.id,
      tag,
      tags: [tag, cat.name, "Alphobia Research"],
      emoji: cat.emoji,
      gradient: cat.gradient,
      image: pool[(i + 2) % pool.length],
      author: authors[(bid + i) % authors.length],
      date: pastDate(1, 300),
      readTime: between(4, 15),
      trending: bid % 9 === 0,
      featured: bid % 13 === 1,
    });
    bid += 1;
  });
}

/* ------------------------------ services ------------------------------ */
export const services = [
  { id: "seo", icon: "Search", name: "SEO & Organic Growth", price: 899, description: "Technical audits, content strategy and authority building that compounds month over month.", deliverables: ["Full technical audit", "Keyword & content roadmap", "Authority link building", "Monthly growth reporting"], results: "+312% avg. organic traffic in 9 months" },
  { id: "ppc", icon: "Target", name: "PPC & Paid Media", price: 1200, description: "Full-funnel Google, Meta and LinkedIn campaigns engineered for efficient ROAS.", deliverables: ["Account restructure", "Creative testing sprints", "Bid & budget automation", "Weekly optimization"], results: "5.8x average blended ROAS" },
  { id: "social", icon: "Share2", name: "Social Media Marketing", price: 749, description: "Editorial calendars, community management and short-form content systems.", deliverables: ["Content calendar", "30 assets / month", "Community management", "Performance analytics"], results: "+180K organic reach / quarter" },
  { id: "webdev", icon: "Code2", name: "Web Development", price: 2400, description: "Conversion-first marketing sites built on modern stacks with obsessive performance budgets.", deliverables: ["UX & wireframes", "Design system", "CMS integration", "Core Web Vitals ≥ 95"], results: "1.2s median LCP across builds" },
  { id: "branding", icon: "PenTool", name: "Branding & Identity", price: 1800, description: "Positioning, visual identity and messaging frameworks that make brands unmistakable.", deliverables: ["Brand strategy workshop", "Logo & identity suite", "Voice & messaging guide", "Launch toolkit"], results: "40+ brands launched since 2019" },
  { id: "email", icon: "Mail", name: "Email & Lifecycle", price: 649, description: "Automated flows and campaigns that turn subscribers into repeat revenue.", deliverables: ["Flow architecture", "Template design system", "Segmentation strategy", "Deliverability care"], results: "38% avg. revenue from email" },
  { id: "analytics", icon: "BarChart3", name: "Analytics & CRO", price: 999, description: "Measurement frameworks, experimentation programs and dashboards your team will use.", deliverables: ["Tracking blueprint", "A/B testing program", "Executive dashboards", "Insights reviews"], results: "+27% avg. conversion lift" },
  { id: "landing", icon: "Layout", name: "Landing Pages", price: 549, description: "High-velocity landing page design and copy sprints for every campaign you run.", deliverables: ["Copywriting", "Design & build", "Speed optimization", "A/B variants"], results: "2-week average turnaround" },
  { id: "content", icon: "FileText", name: "Content Marketing", price: 799, description: "SEO-driven editorial engines: research, writing, and distribution handled end-to-end.", deliverables: ["Editorial strategy", "8 long-form pieces / mo", "Distribution playbook", "Refresh program"], results: "3.4x avg. content ROI" },
  { id: "influencer", icon: "Users", name: "Influencer & Affiliate", price: 1100, description: "Creator sourcing, negotiation and affiliate program management at scale.", deliverables: ["Creator vetting", "Campaign management", "Affiliate program setup", "Attribution reporting"], results: "900+ creators in network" },
  { id: "video", icon: "Video", name: "Video & Creative Studio", price: 1500, description: "Performance creative for paid social — hooks, edits and iteration systems.", deliverables: ["Creative strategy", "12 edits / month", "UGC sourcing", "Hook testing matrix"], results: "-31% avg. CPA from creative" },
  { id: "automation", icon: "Workflow", name: "Marketing Automation", price: 950, description: "CRM architecture, lead scoring and revenue ops that keep pipelines healthy.", deliverables: ["CRM setup & hygiene", "Lead scoring model", "Nurture sequences", "RevOps reporting"], results: "+44% MQL→SQL conversion" },
];

/* ---------------------------- testimonials ---------------------------- */
const testimonialTexts = [
  "Alphobia rebuilt our paid media program from scratch. ROAS went from 1.9x to 6.2x in a single quarter — the most efficient growth we've ever had.",
  "The deals engine is genuinely addictive. I've saved over $2,300 this year on software and gear I was going to buy anyway.",
  "Their SEO team is world-class. Organic signups tripled and we finally rank for every category keyword that matters to us.",
  "The review depth is unmatched. No fluff, real lab data, honest cons. It's the only site I trust before a big purchase.",
  "We sponsored a category takeover and saw a 4.1x return in tracked revenue within 30 days. The audience quality is real.",
  "From brand identity to launch campaign, everything shipped on time and above the bar. Felt like an in-house team.",
  "Coupon success rates are actually accurate here. 9 out of 10 codes I've tried worked on the first attempt.",
  "Their lifecycle flows now drive 41% of our revenue. Setup was surgical — segmentation, design, deliverability, all handled.",
  "The comparison tools saved our procurement team weeks. Side-by-side feature matrices with real scoring, not marketing copy.",
  "Best-in-class reporting. Our board finally understands marketing performance because the dashboards tell the story clearly.",
];
const tRoles = ["VP Growth", "Founder & CEO", "Head of Marketing", "E-commerce Director", "Performance Lead", "CMO", "Product Marketing Manager", "Growth Engineer"];
const tCompanies = ["Loopwork", "Fernwave", "Cartesian Labs", "Bluepine", "Mode Studio", "Stackline", "Juniper & Co", "Northbeam Retail", "Helio Systems", "Craftbase"];
const tNames = ["Sarah Whitmore", "James Park", "Anita Desai", "Marco Rossi", "Elena Petrova", "David Kim", "Fatima Noor", "Chris Taylor", "Ingrid Larsen", "Omar Haddad", "Grace Chen", "Lucas Meyer", "Nadia Osei", "Ryan Doyle", "Yuki Tanaka", "Isabella Fontana"];
export const testimonials = Array.from({ length: 32 }, (_, i) => ({
  id: `t-${i + 1}`,
  name: tNames[i % tNames.length],
  role: tRoles[i % tRoles.length],
  company: tCompanies[i % tCompanies.length],
  rating: i % 5 === 3 ? 4 : 5,
  text: testimonialTexts[i % testimonialTexts.length],
  color: ["#7C3AED", "#EC4899", "#F97316", "#3B82F6", "#22C55E", "#8B5CF6"][i % 6],
}));

/* -------------------- affiliate programs (real programs) ---------------- */
export const affiliatePrograms = [
  { id: "ap-1", name: "Shopify Affiliates", domain: "shopify.com", logo: logoUrl("shopify.com"), category: "E-commerce", commission: "Up to $150 / referral", cookie: "30-day cookie", rating: 4.9, payout: "$58 avg. payout", color: "#96BF48" },
  { id: "ap-2", name: "Hostinger Affiliates", domain: "hostinger.com", logo: logoUrl("hostinger.com"), category: "Web Hosting", commission: "60%+ per sale", cookie: "30-day cookie", rating: 4.8, payout: "$64 avg. payout", color: "#673DE6" },
  { id: "ap-3", name: "Canva Affiliates", domain: "canva.com", logo: logoUrl("canva.com"), category: "Design", commission: "Up to $36 / Pro signup", cookie: "30-day cookie", rating: 4.7, payout: "$41 avg. payout", color: "#8B3DFF" },
  { id: "ap-4", name: "HubSpot Affiliates", domain: "hubspot.com", logo: logoUrl("hubspot.com"), category: "CRM & Marketing", commission: "30% recurring (1 yr)", cookie: "180-day cookie", rating: 4.8, payout: "$276 avg. payout", color: "#FF7A59" },
  { id: "ap-5", name: "Adobe Affiliates", domain: "adobe.com", logo: logoUrl("adobe.com"), category: "Creative Suite", commission: "85% of first month", cookie: "30-day cookie", rating: 4.6, payout: "$52 avg. payout", color: "#FF0000" },
  { id: "ap-6", name: "Amazon Associates", domain: "amazon.com", logo: logoUrl("amazon.com"), category: "Marketplace", commission: "1–10% by category", cookie: "24-hour cookie", rating: 4.3, payout: "$23 avg. payout", color: "#FF9900" },
  { id: "ap-7", name: "Semrush Affiliates", domain: "semrush.com", logo: logoUrl("semrush.com"), category: "SEO Software", commission: "$200 / subscription", cookie: "120-day cookie", rating: 4.9, payout: "$164 avg. payout", color: "#FF642D" },
  { id: "ap-8", name: "NordVPN Affiliates", domain: "nordvpn.com", logo: logoUrl("nordvpn.com"), category: "Security", commission: "40–100% first payment", cookie: "30-day cookie", rating: 4.7, payout: "$71 avg. payout", color: "#4687FF" },
];

/* ---------------------- marketing tools (real tools) -------------------- */
export const marketingTools = [
  { id: "mt-1", name: "Semrush", domain: "semrush.com", logo: logoUrl("semrush.com"), tag: "SEO Suite", rating: 4.9, users: "10M+ marketers", color: "#FF642D" },
  { id: "mt-2", name: "Ahrefs", domain: "ahrefs.com", logo: logoUrl("ahrefs.com"), tag: "SEO & Backlinks", rating: 4.8, users: "Trusted by 44% of F500", color: "#054ADA" },
  { id: "mt-3", name: "Mailchimp", domain: "mailchimp.com", logo: logoUrl("mailchimp.com"), tag: "Email Marketing", rating: 4.5, users: "13M+ users", color: "#FFE01B" },
  { id: "mt-4", name: "HubSpot", domain: "hubspot.com", logo: logoUrl("hubspot.com"), tag: "CRM Platform", rating: 4.7, users: "248K+ customers", color: "#FF7A59" },
  { id: "mt-5", name: "Hootsuite", domain: "hootsuite.com", logo: logoUrl("hootsuite.com"), tag: "Social Media", rating: 4.4, users: "200K+ accounts", color: "#000000" },
  { id: "mt-6", name: "Klaviyo", domain: "klaviyo.com", logo: logoUrl("klaviyo.com"), tag: "E-commerce Email", rating: 4.8, users: "167K+ brands", color: "#232426" },
  { id: "mt-7", name: "Hotjar", domain: "hotjar.com", logo: logoUrl("hotjar.com"), tag: "CRO & Heatmaps", rating: 4.6, users: "1.3M+ websites", color: "#FF3C00" },
  { id: "mt-8", name: "Buffer", domain: "buffer.com", logo: logoUrl("buffer.com"), tag: "Social Publishing", rating: 4.5, users: "140K+ users", color: "#231F20" },
  { id: "mt-9", name: "Zapier", domain: "zapier.com", logo: logoUrl("zapier.com"), tag: "Automation", rating: 4.7, users: "2.2M+ companies", color: "#FF4F00" },
  { id: "mt-10", name: "Canva", domain: "canva.com", logo: logoUrl("canva.com"), tag: "Design", rating: 4.8, users: "190M+ monthly users", color: "#8B3DFF" },
];

/* ------------------ advertising platforms (real platforms) --------------- */
export const adPlatforms = [
  { id: "adp-1", name: "Google Ads", domain: "google.com", logo: logoUrl("google.com"), color: "#4285F4", reach: "90%+ of internet users" },
  { id: "adp-2", name: "Meta Ads", domain: "facebook.com", logo: logoUrl("facebook.com"), color: "#0081FB", reach: "3.9B monthly people" },
  { id: "adp-3", name: "Microsoft Ads", domain: "microsoft.com", logo: logoUrl("microsoft.com"), color: "#00A4EF", reach: "1.1B monthly reach" },
  { id: "adp-4", name: "Amazon Ads", domain: "amazon.com", logo: logoUrl("amazon.com"), color: "#FF9900", reach: "310M+ active customers" },
  { id: "adp-5", name: "LinkedIn Ads", domain: "linkedin.com", logo: logoUrl("linkedin.com"), color: "#0A66C2", reach: "1B+ professionals" },
  { id: "adp-6", name: "TikTok Ads", domain: "tiktok.com", logo: logoUrl("tiktok.com"), color: "#111111", reach: "1.6B monthly users" },
  { id: "adp-7", name: "Pinterest Ads", domain: "pinterest.com", logo: logoUrl("pinterest.com"), color: "#E60023", reach: "520M monthly users" },
  { id: "adp-8", name: "X Ads", domain: "x.com", logo: logoUrl("x.com"), color: "#111111", reach: "610M monthly users" },
  { id: "adp-9", name: "Reddit Ads", domain: "reddit.com", logo: logoUrl("reddit.com"), color: "#FF4500", reach: "430M weekly users" },
  { id: "adp-10", name: "Spotify Ads", domain: "spotify.com", logo: logoUrl("spotify.com"), color: "#1DB954", reach: "640M listeners" },
];

/* -------------------------------- stats ------------------------------- */
export const stats = {
  headline: [
    { label: "Deals Curated", value: 12400, suffix: "+" },
    { label: "Monthly Readers", value: 2.4, suffix: "M", decimals: 1 },
    { label: "Saved by Users", value: 18, suffix: "M+", prefix: "$" },
    { label: "Brand Partners", value: 640, suffix: "+" },
  ],
  clientResults: [
    { label: "Traffic Growth", value: 312, suffix: "%" },
    { label: "Leads Generated", value: 84000, suffix: "+" },
    { label: "Average ROAS", value: 5.8, suffix: "x", decimals: 1 },
    { label: "Revenue Influenced", value: 42, suffix: "M+", prefix: "$" },
    { label: "Projects Delivered", value: 380, suffix: "+" },
  ],
  trafficGrowth: [
    { month: "Jan", organic: 42, paid: 28 }, { month: "Feb", organic: 48, paid: 31 },
    { month: "Mar", organic: 61, paid: 35 }, { month: "Apr", organic: 74, paid: 41 },
    { month: "May", organic: 89, paid: 46 }, { month: "Jun", organic: 102, paid: 52 },
    { month: "Jul", organic: 121, paid: 58 }, { month: "Aug", organic: 138, paid: 61 },
    { month: "Sep", organic: 159, paid: 67 }, { month: "Oct", organic: 178, paid: 74 },
    { month: "Nov", organic: 204, paid: 82 }, { month: "Dec", organic: 231, paid: 90 },
  ],
  campaignPerformance: [
    { channel: "SEO", roas: 7.2 }, { channel: "Paid Search", roas: 5.4 },
    { channel: "Paid Social", roas: 4.6 }, { channel: "Email", roas: 8.9 },
    { channel: "Affiliate", roas: 6.1 }, { channel: "Influencer", roas: 3.8 },
  ],
  audience: [
    { label: "Monthly Pageviews", value: "8.2M" },
    { label: "Unique Visitors", value: "2.4M" },
    { label: "Email Subscribers", value: "410K" },
    { label: "Avg. Session", value: "4m 32s" },
    { label: "Purchase Intent", value: "76%" },
    { label: "Return Visitors", value: "58%" },
  ],
  audienceSplit: [
    { name: "Tech & Software", value: 34 }, { name: "Marketing Pros", value: 22 },
    { name: "Founders & SMB", value: 18 }, { name: "Finance", value: 14 }, { name: "Lifestyle", value: 12 },
  ],
};

/* ------------------------------ helpers ------------------------------- */
export const getCategory = (id) => categories.find((c) => c.id === id);
export const getProduct = (id) => products.find((p) => p.id === id || p.slug === id);
export const getReviewForProduct = (pid2) => reviews.find((r) => r.productId === pid2);
export const relatedProducts = (p, n = 4) => products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, n);
export const countByCategory = (list, catId) => list.filter((x) => x.category === catId).length;
