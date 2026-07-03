# Amplify — Performance Marketing & Deal Discovery Platform

## Brand Overview

**Amplify** is a premium performance marketing platform that combines deal discovery, product reviews, coupon aggregation, and growth marketing services under one roof. The brand positions itself as "the trust layer for smarter buying" — combining a rigorous review lab, a deal-verification engine that tracks 40,000+ prices daily, and a performance marketing team that delivers 5.8x average ROAS.

### Target Audience
- Smart shoppers looking for verified deals, working coupon codes, and honest product reviews
- Marketers and business owners seeking vetted affiliate programs, marketing tools, and advertising platforms
- Brands wanting to advertise to an audience of 2.4M monthly readers with high purchase intent

### Brand Personality
Refined, minimal, and authoritative. The brand presents itself with quiet confidence — no loud colors, no excessive decoration. Every element has a purpose. The tone is direct, transparent, and sophisticated.

### Design Guidelines
- **Primary color**: #1a1a1a (Dark Charcoal) — used for all primary text, button backgrounds, key interactive elements, and focus rings. Provides maximum contrast and authority.
- **Background**: #ffffff (White) — dominant background for all page sections, cards, and content areas. Creates a clean, gallery-like canvas.
- **Background Secondary**: #f1f2f4 (Light Gray) — subtle section background variations, gentle visual separation from the main white canvas.
- **Background Accent**: #f5f0e6 (Warm Beige) — used sparingly for accent sections or decorative elements. Adds a touch of warmth and sophistication without relying on color.
- **Background Input**: #faf8f5 (Off-White) — specifically for input fields, creating a subtle tactile distinction.
- **Background Dark**: #0e1116 (Deep Black) — for hero sections, footer, and prominent dark areas. Creates dramatic, high-impact contrast.
- **Text Primary**: #1a1a1a (Dark Charcoal) — all headings, body copy, primary information. AAA contrast on white.
- **Text Secondary**: #6f6f6f (Medium Gray) — secondary information, descriptions, less emphasized text.
- **Text Muted**: #999999 (Light Gray) — subtle metadata, small labels (use sparingly — fails AA on white).
- **Text Inverse**: #ffffff (White) — text on dark backgrounds (buttons, dark sections).
- **Accent Gold**: #e8b23a — used sparingly for achievement highlights (e.g. award badges).
- **Accent Brown**: #792a08, **Accent Green**: #3b695e, **Accent Purple**: #9f86bb — product-specific accents for variant selectors and imagery. Do NOT use these as UI colors.
- **Border Light**: #e9e9e9 — subtle borders on cards, input fields, dividers.
- **Border Subtle**: #f0ece6 — warm beige border used in inset shadows for delicate structural lines.
- **Focus Ring**: #1a1a1a — focus ring color for all interactive elements.
- **Font**: 'Symbol Regular', sans-serif for all content. 'Poppins', sans-serif exclusively for navigation.
- **Spacing scale**: 4px base. Values: 0, 4, 8, 12, 16, 24, 32, 40, 48px. Never deviate from this scale.
- **Border radius**: sm=2px (badges), md=6px (buttons, cards, inputs), lg=10px (containers), full=50px (circular elements).
- **Depth**: Inset borders instead of drop shadows. Cards use `inset 0 1px 0 0 #f0ece6, inset -1px 0 0 0 #f0ece6`. Hover uses `inset 0 0 0 1px #1a1a1a`.
- **Motion**: All transitions 0.2s ease-in-out. Buttons scale(0.98) on active. Opacity 0.65 on hover for links.
- **Dark mode**: Not supported. This is a light-mode-only refined aesthetic. If needed, use a separate dark theme.

**Every page must:**
- Use a strictly monochrome-and-beige palette — no blue, no purple, no rainbow colors. The only permitted accent colors are gold (#e8b23a) for award badges and product-specific brown/green/purple for variant selectors only.
- Feature generous whitespace (48px section padding) with a clean, uncluttered gallery-like presentation
- Use inset borders for card depth, never external drop shadows
- Prioritize typographic hierarchy with Symbol Regular 700 for headings
- Use Poppins 16px 500 capitalize for all navigation links
- Look like a refined, minimal luxury brand — think Aesop meets Monocle meets a premium gallery
- Have clear visual hierarchy based on typographic weight and spacing, not color

---

## Site Architecture (15 Pages)

The platform uses a HashRouter with a shared layout (Navbar + Footer) wrapping all page content. Global state includes: wishlist (Set of product IDs), compare list (max 3 products), and toast notifications. The design is light-mode-only with a refined neutral palette.

---

### Page 1: Home (Landing Page)
**Purpose**: The primary entry point and conversion hub. Must showcase the platform's value proposition immediately with a refined, editorial aesthetic.

**Sections (in order)**:
1. **Hero** — Dark section (bg #0e1116). Two-column layout. Left: eyebrow, H1 headline, subtext, two CTAs, search bar. Right: A clean white "Dashboard Preview" card with analytics KPIs, sparkline chart, campaign rows. No gradients, no glassmorphism, no blur.
2. **Trust Bar** — Full-width section bg #f1f2f4 with stat counters and auto-scrolling brand logo marquee.
3. **Categories** — 10 category cards in responsive grid. White bg, border, hover inset.
4. **Featured Deals** — 6 deal cards (3 cols) with image, discount badge, pricing, "Get Deal" CTA.
5. **Affiliate Programs** — 4-col grid of program cards with commission details.
6. **Marketing Tools** — 5-col grid of tool cards.
7. **Ad Platforms** — 5-col grid of platform cards.
8. **Deals Carousel** — Swiper with horizontal cards.
9. **Comparison Banner** — Dark section bg #0e1116. Two product cards, "VS" badge, CTA.
10. **Reviews + News** — Two-col. Review cards + blog entries.
11. **Testimonials** — Swiper carousel of simple bordered cards.
12. **Newsletter CTA** — bg #f5f0e6 warm beige section with email input.

---

### Page 2: Deals (Listing & Filtering)
**Purpose**: Filterable, sortable directory of all live discounted deals.

**Layout**: Sticky sidebar (280px) + main content area.
- **Hero**: Breadcrumb, eyebrow, title, subtitle with live deal count.
- **Sidebar filters**: Category pills, Price radio, Store dropdown, Rating toggle, Cashback toggle.
- **Toolbar**: Result count, mobile filter toggle, Sort dropdown.
- **Grid**: 3 columns, first item spans 2 cols.
- **States**: Loading (skeleton), empty (no matches + reset), paginated.

---

### Page 3: Products (Catalog + Discovery)
**Purpose**: Product catalog with advanced filtering, search, and grid/list view toggle.

- **Hero**: With embedded search input.
- **Horizontal category pills** + Sort dropdown + Grid/List toggle.
- **Expandable filter panel**: Brand, Store, Price, Rating dropdowns.
- **Grid/List view**: 4-column grid or single-column list.
- **States**: Loading, empty, paginated.

---

### Page 4: Product Details
**Purpose**: Single product deep-dive with gallery, specs, pros/cons, alternatives, and expert review.

- **Breadcrumb** + Gallery (main image + thumbnails) + Info column.
- **Pricing card** with "Get Best Price" CTA, wishlist, compare.
- **Attribute score bars** (animated on scroll).
- **Tabs**: Specifications, Pros & Cons, Alternatives.
- **Expert review section**, Similar products grid.
- **Error state**: Product not found.

---

### Page 5: Coupons
**Purpose**: Directory of verified coupon codes with machine-tested success rates.

- **Hero**: 4 stat cards (active codes, success rate, avg savings, monthly usage) with animated counts.
- **Tabs**: All codes / Verified / Exclusive.
- **Category pills** + Sort dropdown.
- **Grid**: 3-col coupon cards with code copy button, success rate, expiry countdown.

---

### Page 6: Reviews
**Purpose**: Expert product reviews directory.

- **Category pills** + Sort (Most recent, Highest score).
- **Grid**: 3-col, first review spans 2 cols.
- **Cards**: Image with score badge, excerpt, author info, "Read review" link.

---

### Page 7: Compare
**Purpose**: Side-by-side product comparison tool (max 3 products).

- **Sticky table** with feature rows (Price, Rating, 5 attribute scores, Discount, CTA).
- **Winner detection**: Overall winner label, "Best" labels per row.
- **Add product modal**: Search + select from results.
- **Fallback**: 3 default sample products if none selected.

---

### Page 8: Services
**Purpose**: Marketing services / agency landing page.

- **Dark hero** (#0e1116) with two CTAs.
- **Trust bar**, Services grid (3-col), Process timeline (4-step cards).
- **Pricing table**: 3 tiers (Starter $990, Growth $2,490, Scale $5,900).
- **Client Results section**: Animated stats, Recharts charts (grey tones).
- **Testimonials carousel**, FAQ accordion, Final CTA.

---

### Page 9: Blog
**Purpose**: Content hub for articles, guides, research.

- **Hero** with search.
- **Featured article** (large) + Trending sidebar.
- **Category pills** + Tag pills + Article grid (3-col).
- **States**: Loading, empty, paginated.

---

### Page 10: Advertise (Media Kit)
**Purpose**: Convince brands to advertise on Amplify with audience data.

- **Dark hero** (#0e1116) with two CTAs.
- **Audience stats** (3-col grid) + Donut chart (grey tones).
- **Package cards**: 4 offerings with feature checklists.
- **Contact form**: Two-column with benefit cards + styled form.

---

### Page 11: About
**Purpose**: Company story, mission, team.

- **Dark hero** (#0e1116) with headline stats.
- **Values** (3 cards), **Timeline** (alternating 2019–2026), **Team** (8 members in 4-col grid).
- **Trust bar**, **Testimonials**, **Newsletter CTA**.

---

### Page 12: Contact
**Purpose**: General contact with multiple touchpoints.

- **Left**: 4 contact info cards + map placeholder (clean grey bg, no gradient).
- **Right**: Contact form with subject dropdown (6 options).
- **FAQ accordion** below.

---

### Page 13: Categories
**Purpose**: Two states — category hub or single category filtered content.

- **All categories**: Masonry grid with featured cards (spanning 2x2).
- **Single category**: Hero + sections for deals, products, coupons, blog posts.

---

### Page 14: Search
**Purpose**: Global search across all content types.

- **Hero** with auto-focused search (URL-synced).
- **Tab bar** with counts per type.
- **Results sections** per content type.
- **States**: No query, no results, loading.

---

### Page 15: Not Found (404)
**Purpose**: Witty, on-brand error page.

- Large "404" in #1a1a1a weight 700 with spring animation.
- Witty headline about expired deals.
- Three CTAs: Back home, Browse deals, Search.

---

## Global Components

- **Navbar**: Fixed top, bg #ffffff, border-bottom 1px solid #e9e9e9, height 73px. Logo, Poppins nav links (capitalize), search with ⌘K shortcut, compare counter (just a number, no colored badge), "Sign in" ghost button, "Get Free Audit" primary button (#1a1a1a bg, #ffffff text, 6px radius). No glassmorphism. No dark mode toggle. Mobile: hamburger into drawer at <768px.
- **Footer**: Background #0e1116, text #ffffff. Logo + tagline, newsletter input (bg transparent, border #ffffff/30), social icons (#ffffff), 4 link columns, trust badge.
- **Toast notifications**: Fixed bottom-center, auto-dismissing stack. Flat design, #1a1a1a bg, #ffffff text, 6px radius.
- **Design system**: Container (max-width 880px or full), Button (primary #1a1a1a bg white text, secondary transparent #1a1a1a border, ghost transparent), Badge (tone variants using bg color), Rating (star display), Skeleton, EmptyState, Modal, Pagination, Tabs, Accordion, Select, SearchInput, Breadcrumb, Reveal (scroll fade-in-up), CountUpStat.

---

# Design Prompt

Below is the master prompt to feed into any AI UI generation tool (Google Stitch, v0, Framer AI, etc.) to generate premium, industry-standard page layouts for **all 15 pages**. Each prompt is detailed enough to generate images that feel like real, production websites — not generic AI dumps.

---

## Master Context Prompt (Use with Every Page)

```
You are generating a UI layout for "Amplify" — a premium performance marketing & deal discovery platform. The brand is refined, minimal, and authoritative — like a luxury gallery, not a typical SaaS.

COLOR PALETTE (STRICT — do not deviate):
- Primary: #1a1a1a (dark charcoal) — all text, buttons, focus rings, interactive elements
- Background: #ffffff (white) — main page and card backgrounds
- Background Secondary: #f1f2f4 (light gray) — subtle section background variations
- Background Accent: #f5f0e6 (warm beige) — accent sections, decorative warmth
- Background Input: #faf8f5 (off-white) — input field backgrounds
- Background Dark: #0e1116 (deep black) — hero sections, footer, dark contrast areas
- Text Primary: #1a1a1a (dark charcoal) — all headings and body copy
- Text Secondary: #6f6f6f (medium gray) — descriptions, secondary info
- Text Muted: #999999 (light gray) — subtle metadata, small labels
- Text Inverse: #ffffff (white) — text on dark backgrounds
- Accent Gold: #e8b23a — award badges and achievement highlights ONLY
- Accent Brown: #792a08, Accent Green: #3b695e, Accent Purple: #9f86bb — product variant selectors ONLY
- Border Light: #e9e9e9 (light gray) — card borders, input borders, dividers
- Border Subtle: #f0ece6 (warm beige) — inset shadow borders
- Focus Ring: #1a1a1a (dark charcoal) — input and interactive focus

TYPOGRAPHY:
- Content: 'Symbol Regular', sans-serif (all headings, body, buttons, captions)
- Navigation: 'Poppins', sans-serif (exclusively for nav links)
- Hierarchy: Display 72px 700 → H1 34px 700 → H2 28px 700 → H3 22px 500 → Body 16px 400 → Caption 13px 400
- Button text: 16px 700 UPPERCASE
- Nav link text: 16px 500 capitalize

STYLE RULES:
- Cards have: bg #ffffff, border 1px solid #e9e9e9, border-radius 6px, padding 24px
- Card hover: inset 0 0 0 1px #1a1a1a (inset border, NO drop shadow)
- Card default inset: 0 1px 0 0 #f0ece6, -1px 0 0 0 #f0ece6
- All borders use #e9e9e9. Dividers between sections use background-secondary #f1f2f4.
- Border radius scale: sm=2px (badges), md=6px (buttons/cards/inputs), lg=10px (containers), full=50px (circular)
- Spacing scale (STRICT — never deviate): 0, 4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px
- Section vertical padding: 48px. Container max-width: 880px for content, or full-width for immersive sections.
- NO drop shadows on cards — use the inset border technique only
- NO rounded-full on cards or buttons (6px only). Only variant swatches use 50px.
- NO colored backgrounds for buttons (only #1a1a1a primary or transparent secondary with #1a1a1a border)
- NO gradient text or gradient backgrounds (except the dark section at #0e1116)
- Glassmorphism: do NOT use. This is a flat, refined aesthetic.
- Section heading pattern: eyebrow in text-muted #999999 uppercase tracking → H2 title → optional subtitle in text-secondary
- Every page uses a PageHero with breadcrumbs, eyebrow, title, subtitle. Decorative blur orbs: do NOT use.
- Scroll-triggered reveal animations: fade-in-up with 0.3s duration
- This is a LIGHT MODE ONLY design. Dark backgrounds only for dedicated dark sections (hero, footer) at #0e1116.
- NO rainbow colors — only the defined neutral palette
- NO generic templates — make it look like a refined luxury brand. Think: Aesop, Monocle, Muji, or a high-end gallery.
- Layouts should feel editorial and product-focused with generous whitespace and typographic hierarchy
```

---

## Page-Specific Prompts

---

### 1. HOME PAGE

```
Using the master context above, design the HOME page layout for Amplify. This is the primary landing page and must feel refined, editorial, and premium — like a luxury brand gallery.

STRUCTURE (12 sections in order):

1. HERO SECTION:
- Full-width hero with bg #0e1116 (deep black). Two-column layout (1fr 1fr).
- LEFT COLUMN: Small eyebrow label in text-muted #999999 uppercase tracking → H1 headline in #ffffff weight 700 size 34px → body text in #ffffff/70 weight 400 → two CTAs stacked or side by side (primary button: bg #1a1a1a text #ffffff, secondary button: transparent border #ffffff text #ffffff) → search bar with bg transparent, border #ffffff/30, rounded 6px → popular search term links in #ffffff/60 hover #ffffff
- RIGHT COLUMN: A "Dashboard Preview" card with bg #ffffff, border 1px solid #e9e9e9, radius 6px. MacOS traffic dots → "Campaign Overview" label → 3 mini KPI cards (Revenue $84.2K, ROAS 5.8x, Clicks 412K) → sparkline area chart in grey tones → campaign rows. The card sits inside the dark hero as a clean white focal point.
- No blur orbs, no gradients, no glassmorphism.

2. TRUST BAR:
- Full-width section bg #f1f2f4 (background secondary), border-y 1px solid #e9e9e9
- 4-column grid of stat counters (2.4M, 640+, 5.8x, $10M) in #1a1a1a, labels in #6f6f6f
- Below: auto-scrolling marquee of brand logos

3. CATEGORIES SECTION:
- Section heading: eyebrow in #999999 → H2 "Explore by category" → subtitle in #6f6f6f → "All categories" link
- Grid of category cards: each is a link with white bg, border 1px #e9e9e9, radius 6px, padding 24px. Shows emoji, category name bold, item count in #6f6f6f. Hover: inset 0 0 0 1px #1a1a1a.

4. FEATURED DEALS SECTION:
- Same card pattern: 3-column grid, each card with image (no gradient overlay, just clean crop), discount badge (bg #f0ece6 text #1a1a1a), brand logo, title, price, countdown, "Get Deal" button

5. AFFILIATE PROGRAMS SECTION:
- 4-column grid. Cards with brand logo, rating stars, name, commission/cookie details in a bordered section, "Join program" secondary button

6. MARKETING TOOLS SECTION:
- bg #f1f2f4 section background. 5-column centered grid of tool logo cards with name, tagline, rating

7. ADVERTISING PLATFORMS SECTION:
- 5-column grid centered, logo + name + reach, simple bordered cards

8. DEALS CAROUSEL SECTION:
- bg #f1f2f4 background. Swiper carousel with horizontal slide cards showing discount, merchant, title, countdown, "Claim" button

9. COMPARISON BANNER:
- Dark section bg #0e1116 with two-column layout. Left: editorial headline in #ffffff, subtext in #ffffff/70, "Compare products" primary button. Right: two product cards with "VS" divider. Clean, minimal, high contrast.

10. REVIEWS & NEWS SECTION:
- Two-column grid. LEFT: review cards with image, score badge (bg #e9e9e9 text #1a1a1a), excerpt. RIGHT: "The latest" stacked blog entries with thumbnail in a bordered card.

11. TESTIMONIALS:
- Swiper carousel. Cards are simple bordered containers with quote text, author name/role in #6f6f6f, star rating. No glassmorphism, no decorative elements.

12. NEWSLETTER CTA:
- bg #f5f0e6 (warm beige) section. Simple layout: heading in #1a1a1a, email input with bg #faf8f5 border #e9e9e9, primary subscribe button. Refined and understated.
```

---

### 2. DEALS PAGE

```
Using the master context, design a refined DEALS LISTING page.

PAGE HERO: Breadcrumb, eyebrow in #999999, title "Today's verified deals", subtitle with deal count. Clean white bg with subtle bottom border #e9e9e9. No blur orbs, no decorative elements.

LAYOUT: Sticky sidebar (280px) + main content area. Both with white bg.

SIDEBAR:
- Each filter group separated by a thin border-top #e9e9e9
- Category pills: border 1px #e9e9e9, radius 6px, active: bg #1a1a1a text #ffffff
- Price radio group: simple radio inputs with labels
- Store: custom Select with chevron
- Min rating / Cashback: toggle buttons with border, active = bg #1a1a1a

TOOLBAR:
- Left: result count in #6f6f6f
- Right: "Filters" mobile toggle + Sort Select dropdown

GRID: 3-column responsive. First card spans 2 cols. Each DealCard: white bg, border 1px #e9e9e9, radius 6px. Image (clean, no gradient overlays), discount badge (bg #f0ece6), brand logo, title, pricing (primary text #1a1a1a, strikethrough #999999), progress bar (bg #e9e9e9, fill #1a1a1a), "Get Deal" primary button.

STATES: Loading (6 skeleton), Empty (with reset), Pagination
```

---

### 3. PRODUCTS PAGE

```
Using the master context, design a refined PRODUCT CATALOG page.

PAGE HERO: Clean hero with breadcrumbs, eyebrow, title, subtitle. Search input with bg #faf8f5 border #e9e9e9 radius 6px.

TOOLBAR:
- "Filters" toggle button (secondary style)
- Horizontal scrollable category pills: border 1px #e9e9e9 radius 6px, active = bg #1a1a1a text #ffffff
- Sort Select dropdown
- Grid/List view toggle (simple icon buttons with border)

EXPANDABLE FILTERS: 4-column grid of Select dropdowns (Brand, Store, Price, Rating)

GRID VIEW: 4-column grid. ProductCard: white bg, border 1px #e9e9e9, radius 6px. Image, discount badge (bg #f0ece6), brand logo, wishlist heart (outline icon), compare icon, rating stars, name, price (bold #1a1a1a, strikethrough #999999).

LIST VIEW: Single column horizontal cards, same styling.

STATES: Loading (8 skeleton), Empty, Paginated
```

---

### 4. PRODUCT DETAILS PAGE

```
Using the master context, design a refined PRODUCT DETAIL page.

BREADCRUMB: Products > Category > Product name in #6f6f6f

TWO-COLUMN LAYOUT:

LEFT COLUMN:
- Large product image in a container with border 1px #e9e9e9, radius 6px. No gradient fallback, just clean image with bg #f1f2f4.
- Discount and badge overlays positioned absolutely
- Thumbnail gallery row below: 4 small images with border, active state has inset 0 0 0 1px #1a1a1a

RIGHT COLUMN:
- Brand name in #6f6f6f uppercase small
- Product name H1 #1a1a1a
- Star rating + review count in #6f6f6f + "Expert score X/10" badge (border 1px #e9e9e9)
- Description text in #6f6f6f

PRICING CARD:
- Large price #1a1a1a, strikethrough original #999999, "You save $X" (text #1a1a1a, no colored badge)
- "Best price via [store]" in #6f6f6f
- Three buttons: primary "Get Best Price" (#1a1a1a), wishlist heart (secondary border), compare (secondary border)
- Affiliate disclosure in #999999 caption

ATTRIBUTE SCORE BARS:
- 5 attribute labels with score number and animated progress bar (bg #e9e9e9, fill #1a1a1a)

TABS: Three tabs with underline indicator. Specs (key-value table), Pros & Cons (two bordered cards), Alternatives (stacked list with image, name, rating, price, arrow)

EXPERT REVIEW: Full review card with score, verdict, author

SIMILAR PRODUCTS: 4-column grid. Error state if not found.
```

---

### 5. COUPONS PAGE

```
Using the master context, design a refined COUPON CODES page.

PAGE HERO: Breadcrumb, eyebrow, title "Copy. Paste. Save.", subtitle. Below: 4-column stat cards (active codes, success rate, avg savings, monthly usage) — each is a simple bordered card with icon, count-up number, label.

TOOLBAR: Tabs (All codes / Verified / Exclusive) + Sort dropdown

CATEGORY PILLS: Horizontal scroll row of bordered pills

COUPON GRID: 3-column grid. CouponCard: bordered card with merchant logo, discount label, coupon code with copy button, "Verified" label, success rate, expiry countdown (plain text, no colored badges), "Show code" button.

STATES: Loading (6 skeleton), Empty, Paginated
```

---

### 6. REVIEWS PAGE

```
Using the master context, design a refined EXPERT REVIEWS page.

PAGE HERO: Clean hero. Eyebrow, title "Honest reviews, tested in our lab", subtitle.

TOOLBAR: Category pills + Sort (Most recent, Highest score)

REVIEWS GRID: 3-column grid. First review spans 2 cols. ReviewCard: bordered card with image, score badge (bg #f0ece6 text #1a1a1a), title, excerpt, author, read time, "Read review" link.

STATES: Loading, Empty, Paginated
```

---

### 7. COMPARE PAGE

```
Using the master context, design a refined PRODUCT COMPARISON page.

PAGE HERO: Clean hero. Title "Compare products, side by side", subtitle.

TOOLBAR: "Comparing X products" text + "Add product" secondary button.

COMPARISON TABLE: Bordered table (1px #e9e9e9, radius 6px). Sticky first column. Each product column shows: image, "Overall winner" label (just text, no colored badge), name, brand. Rows: Price, Rating, 5 attributes with score + progress bar (#e9e9e9 fill #1a1a1a, "Best" label as plain text), Discount status, "View product" button.

ADD PRODUCT MODAL: Search input, product list with image/name/rating/price + icon.

States: 0 selected → show 3 defaults
```

---

### 8. SERVICES PAGE

```
Using the master context, design a refined SERVICES / AGENCY page.

PAGE HERO: Dark bg #0e1116 with breadcrumbs in #999999, title in #ffffff, subtitle in #ffffff/70. Two CTAs: primary (#1a1a1a bg #ffffff text) and secondary (transparent border #ffffff).

TRUSTED COMPANIES: Marquee in bg #f1f2f4 section.

SERVICES GRID: 3-column grid of ServiceCards with icon, title, description, results stat, price.

PROCESS SECTION: 4-column process cards (01-04) with bg #ffffff, border #e9e9e9. Large translucent step number, title, description.

PRICING SECTION: 3 pricing tiers. Starter $990, Growth $2,490 ("Most popular" — just text label, no colored badge), Scale $5,900. Each card: white bg, border 1px #e9e9e9, radius 6px, price, feature checklist with check icons, CTA button.

CLIENT RESULTS: Dark section bg #0e1116 with white stat counters, Recharts area/bar charts in grey tones.

TESTIMONIALS: Swiper carousel.

FAQ: Accordion.

FINAL CTA: bg #0e1116 section with headline, subtext, white CTA.
```

---

### 9. BLOG PAGE

```
Using the master context, design a refined BLOG page.

PAGE HERO: Clean hero with search input. Eyebrow, title "Research, guides & data studies", subtitle.

FEATURED + TRENDING: Two-column. LEFT: large featured article card with image, tag, title, excerpt, author, date. RIGHT: "Trending now" sidebar with stacked article links in bordered card.

CATEGORY PILLS: Horizontal bordered pills.

TAG PILLS: Secondary row of hashtag pills.

ARTICLE GRID: 3-column grid of BlogCards: image, tag, title, excerpt, author + date + read time.

STATES: Loading, Empty, Paginated
```

---

### 10. ADVERTISE / MEDIA KIT PAGE

```
Using the master context, design a refined ADVERTISING MEDIA KIT page.

PAGE HERO: Dark bg #0e1116 with breadcrumbs, title, subtitle, two CTAs.

TRUSTED COMPANIES: Marquee.

AUDIENCE SECTION: Two-column. LEFT: 3-col grid of audience stat cards. RIGHT: Donut/pie chart (Recharts, grey tones) with legend.

PACKAGES SECTION: 2-col grid of package cards (Sponsored Content, Display & Banners, Category Takeover, Newsletter Sponsorship). Each card: icon in circle (no gradient), price label, feature checklist, "Enquire" button.

CONTACT FORM: Two-column. LEFT: benefit cards. RIGHT: styled form with name, email, company, budget dropdown, message textarea, "Send enquiry" primary button.
```

---

### 11. ABOUT PAGE

```
Using the master context, design a refined ABOUT page.

PAGE HERO: Dark bg #0e1116 with stat counters in white, title, subtitle.

VALUES SECTION: 3-column cards — mission, vision, promise. Each with icon in circle (no gradient), title, description.

TIMELINE: Alternating vertical timeline with center line in #e9e9e9. Cards for 2019-2026 with year badge, title, text. Clean, editorial feel.

TEAM SECTION: 4-column grid of 8 team cards. Each: avatar (initials in circle, bg #f1f2f4), name, role, bio. Hover: inset border. "We're hiring" CTA below.

TRUSTED COMPANIES, TESTIMONIALS, NEWSLETTER CTA sections.
```

---

### 12. CONTACT PAGE

```
Using the master context, design a refined CONTACT page.

PAGE HERO: Clean hero. Title "Say hello — we actually reply", subtitle.

TWO-COLUMN LAYOUT:
- LEFT: 4 contact info cards stacked — each with icon, label, value, sub-text. Map placeholder with grid pattern, no gradient, just clean grey bg with pin.
- RIGHT: Form card — name + email (side by side), subject dropdown, message textarea, "Send message" primary button. Privacy note in #999999.

FAQ section below with accordion.
```

---

### 13. CATEGORIES PAGE

```
Using the master context, design a refined CATEGORY HUB page with two states.

STATE 1 — ALL CATEGORIES: Page hero with title "Browse by category". Masonry grid with 10 CategoryCards in varying sizes (some spanning 2 cols/rows). Each card: bg #ffffff, border 1px #e9e9e9, radius 6px, emoji, name, item count. Hover: inset border #1a1a1a.

STATE 2 — SINGLE CATEGORY: Page hero with category name/description. Content sections shown only if items exist: deals grid (3-col), products grid (4-col), coupons grid (3-col), blog grid (3-col). Each with heading and "All" link.

ERROR STATE: Invalid category → EmptyState.
```

---

### 14. SEARCH PAGE

```
Using the master context, design a refined GLOBAL SEARCH page.

PAGE HERO: Clean hero with auto-focused search input (synced with ?q= param). Title shows "Results for '[query]'" or "Search everything". Subtitle with match count.

TABS: Tab bar with counts per type (All, Products, Deals, Coupons, Reviews, Articles). Simple underline indicator.

RESULTS: Each content type in its own section with heading. Products (4-col), Deals (3-col), Coupons (3-col), Reviews (3-col), Articles (3-col). In "All" tab, sections stack vertically.

STATES: No query (hint text), No results (clear button), Loading (skeleton), Results.
```

---

### 15. NOT FOUND / 404 PAGE

```
Using the master context, design a refined 404 page.

Min-height 70vh, centered. Clean white bg with subtle border-top.

Large "404" text in #1a1a1a weight 700, no gradient. Spring entrance animation.

HEADLINE: "This deal has expired… and so has this page." in #1a1a1a.

SUBTEXT: "The page you're looking for was moved, renamed or never existed. The savings, however, are very real." in #6f6f6f.

THREE CTAs: "Back home" primary, "Browse deals" secondary, "Search" ghost.
```

---

### 8. SERVICES PAGE

```
Using the master context, design a premium MARKETING SERVICES / AGENCY page.

PAGE HERO: Breadcrumb, eyebrow "Marketing Services", title "The growth engine behind Amplify — for your brand", subtitle with engagement stats, two CTAs side by side (accent "Get Free Marketing Audit" + outline "View pricing").

TRUSTED COMPANIES: Auto-scrolling marquee with label "Growth partners to category leaders"

SERVICES GRID (section heading + 3-col grid):
- ServiceCards with icon, title, description, results stat, price

PROCESS SECTION (bg #f1f2f4):
- Section heading "From audit to scale in four moves"
- 4-column animated process cards: 01 Discovery & Audit → 02 Strategy Sprint → 03 Launch & Learn → 04 Scale What Works
- Each card has large translucent step number in background, step number badge, title, description

PRICING SECTION (id="pricing"):
- Section heading "Transparent plans, zero lock-in"
- 3-column pricing cards:
  - Starter ($990/mo): 5 features, outline CTA
  - Growth ($2,490/mo): "Most popular" label, primary border, 6 features, primary CTA
  - Scale ($5,900/mo): 6 features (unlimited channels), outline CTA
- Each has: name, blurb, price/month, feature checklist with check marks, full-width CTA

CLIENT RESULTS SECTION (dark bg #0e1116, full-width):
- Animated stat counters in white
- Recharts charts in grey tones

TESTIMONIALS: Swiper carousel

FAQ: Accordion component (5 Q&A pairs)

FINAL CTA: Dark section bg #0e1116 with headline, subtext, white "Get Free Marketing Audit" button
```

---

### 9. BLOG PAGE

```
Using the master context, design a premium BLOG / CONTENT HUB page.

PAGE HERO: Simple hero with embedded search input. Eyebrow "The Amplify Blog", title "Research, guides & data studies", subtitle with article count.

TWO-COLUMN FEATURED + TRENDING (shown only when no filters/search active):
- LEFT: Large featured BlogCard — full-width image, tag badge, title, excerpt, author avatar + name, date, read time. This card is visually dominant.
- RIGHT: "Trending now" sidebar card with flame icon header. Stacked list of 5 trending article links with compact layout.

CATEGORY PILLS: Horizontal scrollable — "All categories" + each category with emoji

TAG PILLS: Secondary row of hashtag pills — "# All topics" + each unique tag

ARTICLE GRID: 3-column responsive grid. BlogCards show: image, tag badge, title, excerpt, author + date + read time.

STATES: Loading (6 skeleton), Empty (with search term or filter reset), Paginated
```

---

### 10. ADVERTISE / MEDIA KIT PAGE

```
Using the master context, design a premium ADVERTISING MEDIA KIT page.

PAGE HERO: Breadcrumb, eyebrow "Advertise · Media Kit", title "Reach 2.4M buyers at the moment of decision", subtitle about purchase intent, two CTAs (accent "Request media kit" + outline "View packages").

TRUSTED COMPANIES: Marquee with label "Brands that grow with Amplify"

AUDIENCE SECTION:
- Section heading "An audience that converts"
- Two-column layout:
  - LEFT: 3-column grid of audience stat cards (2.4M readers, 640+ partners, 410K subs, 52% open rate, 4.1x ROI, 76% purchase intent)
  - RIGHT: Donut/pie chart (Recharts) showing audience split by interest with custom tooltip, color legend below

PACKAGES SECTION (bg #f1f2f4):
- Section heading "Four ways to show up"
- 2-column grid of package cards:
  - Sponsored Content (From $2,900): Newspaper icon in circle, 4 checkmark features
  - Display & Banners (From $1,400/mo): Layout icon, 4 features
  - Category Takeover (From $6,500): Megaphone icon, 4 features
  - Newsletter Sponsorship (From $3,200): Mail icon, 4 features
- Each card has: icon in circle, price badge, blurb, feature list, "Enquire" button

CONTACT FORM SECTION:
- Two-column layout
- LEFT: Section heading "Tell us about your campaign", 3 benefit cards with emojis (media kit, custom targeting, dedicated manager)
- RIGHT: Styled form card — name, email (side by side), company, budget dropdown, message textarea, "Send enquiry" primary button (full-width)
```

---

### 11. ABOUT PAGE

```
Using the master context, design a refined ABOUT page.

PAGE HERO: Dark bg #0e1116 with 4-column headline stat grid in white, eyebrow in #999999, title in #ffffff, subtitle in #ffffff/70.

VALUES SECTION:
- 3-column grid of mission/vision/promise cards
- Each has icon in circle (bg #f1f2f4, no gradient), title #1a1a1a, description #6f6f6f

TIMELINE SECTION (bg #f1f2f4):
- Section heading "The Story", subtitle "From spreadsheet to platform"
- Alternating vertical timeline with center line in #e9e9e9
- 6 timeline cards (2019→2026) alternating left/right
- Each card: year in circle badge, year label in #1a1a1a, title bold, text in #6f6f6f
- Cards have border 1px #e9e9e9, radius 6px, hover inset 0 0 0 1px #1a1a1a

TEAM SECTION:
- Section heading, 4-column grid of 8 team member cards
- Each card: avatar initials in circle (bg #f1f2f4 text #1a1a1a), name, role in #999999 uppercase, bio in #6f6f6f
- Hover: inset border on card
- "We're hiring" secondary CTA below

TRUSTED COMPANIES marquee
TESTIMONIALS carousel
NEWSLETTER CTA
```

---

### 12. CONTACT PAGE

```
Using the master context, design a refined CONTACT page.

PAGE HERO: Clean hero. "Contact" eyebrow, title "Say hello — we actually reply", subtitle.

TWO-COLUMN LAYOUT:

LEFT COLUMN:
- 4 contact info cards stacked — each: icon in circle (bg #f1f2f4, no gradient), label in #999999 uppercase, value in #1a1a1a bold, sub-text in #6f6f6f
- Map placeholder: grey bg #f1f2f4 with grid pattern, border 1px #e9e9e9, radius 6px, "Amplify HQ" label with pin icon

RIGHT COLUMN:
- Form card with heading and icon
- Fields: Name + Email (side by side), Subject dropdown, Message textarea
- "Send message" primary button, privacy note in #999999

FAQ section below: accordion with 5 Q&A pairs
```

---

### 13. CATEGORIES PAGE

```
Using the master context, design a refined CATEGORY HUB page with two states.

STATE 1 — ALL CATEGORIES:

PAGE HERO: "Browse by category" heading.

MASONRY GRID:
- 4-column grid with auto-rows. Cards in varying sizes (some span 2x2).
- Each CategoryCard: white bg, border 1px #e9e9e9, radius 6px, emoji, category name bold, item count #6f6f6f. Hover: inset 0 0 0 1px #1a1a1a. No gradient overlays.

STATE 2 — SINGLE CATEGORY (with category ID):

PAGE HERO: Breadcrumb (Categories > Name), title = category name, subtitle.

CONTENT SECTIONS (shown only if items exist):
- Deals grid (3-col), Products grid (4-col), Coupons grid (3-col), Blog grid (3-col)
- Each has heading + "All" link

ERROR STATE: EmptyState
```

---

### 14. SEARCH PAGE

```
Using the master context, design a refined GLOBAL SEARCH page.

PAGE HERO: Clean hero with auto-focused search input (synced with ?q=). Title shows "Results for '[query]'" or "Search everything". Subtitle with match count.

TABS: Underline tabs with counts per type (All, Products, Deals, Coupons, Reviews, Articles).

RESULTS: Each type in its own section with heading. Products (4-col), Deals (3-col), Coupons (3-col), Reviews (3-col), Articles (3-col). In "All" tab, sections stack vertically.

STATES: No query (hint text), No results (clear button), Loading (skeleton), Results.
```

---

### 15. NOT FOUND / 404 PAGE

```
Using the master context, design a refined 404 page.

Min-height 70vh, centered. Clean white bg with subtle border-top #e9e9e9.

Large "404" in #1a1a1a weight 700 size 8rem, spring animation (scale + bounce). No gradient.

HEADLINE: "This deal has expired… and so has this page." in #1a1a1a.

SUBTEXT: "The page you're looking for was moved, renamed or never existed. The savings, however, are very real." in #6f6f6f.

THREE CTAs:
1. "Back home" primary button (#1a1a1a)
2. "Browse deals" secondary button (border #1a1a1a)
3. "Search" ghost button
```

---

## Global Layout Elements (Apply to Every Page)

### Navbar (Fixed Top, White Background)
- Logo: "Amplify." in #1a1a1a, no gradient
- Desktop nav links: Deals, Products, Coupons, Reviews, Compare, Services, Blog, Advertise — Poppins 16px 500 capitalize, #1a1a1a color. Active state: text #1a1a1a weight 500. Hover: opacity 0.65.
- Right side: search toggle (magnifying glass icon), compare counter (just a number in parentheses), "Sign in" ghost button, "Get Free Audit" primary button (bg #1a1a1a text #ffffff radius 6px)
- Mobile: hamburger into full-screen drawer at <768px
- Height: 73px, bg #ffffff, border-bottom 1px solid #e9e9e9. Sticky top. No glassmorphism. No dark mode toggle.

### Footer (Dark Background #0e1116)
- Top row: Logo in #ffffff → email input (bg transparent, border #ffffff/30, radius 6px) with subscribe button → social icons in #ffffff
- Middle: 4 columns of links in #ffffff/70, headings in #ffffff
- Bottom: trust badge + copyright text in #ffffff/50
- Padding: 48px vertical

### PageHero Component (Used on Every Inner Page)
- Breadcrumb row in #6f6f6f with chevron separators
- Eyebrow in #999999 uppercase tracking-widest, size 13px
- Title in #1a1a1a, H1 weight 700, size 34px
- Subtitle in #6f6f6f, max-w-2xl
- Optional children slot below subtitle
- No decorative background, no blur orbs, no gradients
- Bottom border 1px solid #e9e9e9, padding 48px 0

### Design System Primitives
All components use these primitives:
- **Container**: max-width 880px for content sections, or full-width immersive. Padding 24px horizontal on mobile.
- **Button**: 3 variants only — primary (bg #1a1a1a text #ffffff), secondary (transparent bg, border 1px #1a1a1a, text #1a1a1a), ghost (transparent, text #1a1a1a). All radius 6px, padding 10px 24px, text-transform uppercase, 16px 700 Symbol Regular.
- **Badge**: Simple bordered container with caption text. Tones: default (#f0ece6 bg), dark (#1a1a1a bg white text). Radius 2px, padding 4px 8px. Text-transform capitalize.
- **Rating**: Star display with filled/empty states in #1a1a1a, numeric value alongside.
- **Skeleton/SkeletonCard**: Shimmer loading placeholder, bg #f1f2f4.
- **EmptyState**: Centered icon + title + subtitle + action button.
- **Modal**: Overlay with bg #ffffff, border 1px #e9e9e9, radius 6px. Close on Escape. No backdrop blur.
- **Pagination**: Page numbers bordered, prev/next arrows.
- **Tabs**: Underline style tabs, no pill background.
- **Accordion**: Q&A with thin border-bottom, animate height.
- **Select**: Custom dropdown with chevron, border 1px #e9e9e9, radius 6px, bg #faf8f5.
- **SearchInput**: Input with magnifying glass icon, bg #faf8f5, border 1px #e9e9e9, radius 6px.
- **Breadcrumb**: Items in #6f6f6f with chevron separator.
- **Reveal**: Scroll-triggered fade-in-up, 0.3s duration.
- **CountUpStat**: Animated number counter on scroll.
- **BrandLogo**: Favicon or letter-initial fallback.
- **Visual**: Image container with bg #f1f2f4 fallback, border radius 6px.
- **Avatar**: Initials in circle, bg #f1f2f4, text #1a1a1a.

---

## Important Design Notes

1. **No rainbow colors** — stick strictly to the neutral palette: #1a1a1a, #ffffff, #f1f2f4, #f5f0e6, #faf8f5, #0e1116, #6f6f6f, #999999, #e9e9e9, #f0ece6. Gold #e8b23a only for award badges.
2. **Every card**: white bg, border 1px #e9e9e9, radius 6px, padding 24px. Hover: inset 0 0 0 1px #1a1a1a. NO drop shadows, NO translate-y, NO lift effects.
3. **No dark mode** — this is a light-mode-only refined aesthetic. Dark backgrounds only for dedicated sections (hero, footer) at #0e1116.
4. **No gradient text or backgrounds** — flat colors only. The only gradient is the absence thereof.
5. **No rounded-full on buttons or cards** — 6px radius for everything except badges (2px), circular elements (50px).
6. **Spacing scale discipline**: only use values from [0, 4, 8, 12, 16, 24, 32, 40, 48]px. Never introduce arbitrary spacing.
7. **Typography discipline**: Symbol Regular for all content. Poppins ONLY for navigation links. Never mix them.
8. **Button text must be UPPERCASE** (16px 700). Nav link text must be capitalize (16px 500).
9. **Whitespace is the primary design element** — generous 48px section padding, clean layouts, content that breathes.
10. **Micro-interactions**: 0.2s ease-in-out transitions on hover states. Buttons scale(0.98) on active. Links fade to opacity 0.65 on hover.
11. **No glassmorphism, no blur, no decorative orbs** — this is a flat, refined, editorial aesthetic.
12. **The layout should feel like a luxury brand website** — think Aesop, Monocle, Muji, or a high-end gallery. Not a SaaS template.
