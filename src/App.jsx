import Navbar from "./components/Navbar";
import { Footer } from "./components/NewsletterFooter";
import { useRoute } from "./router";
import Home from "./pages/Home";
import DigitalMarketing from "./pages/DigitalMarketing";
import AffiliateMarketing from "./pages/AffiliateMarketing";
import AdvertisingPrograms from "./pages/AdvertisingPrograms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import Industries from "./pages/Industries";
import Insights from "./pages/Insights";
import InsightDetail from "./pages/InsightDetail";

const PAGES = {
  home: Home,
  "digital-marketing": DigitalMarketing,
  "affiliate-marketing": AffiliateMarketing,
  "advertising-programs": AdvertisingPrograms,
  about: About,
  contact: Contact,
  "case-studies": CaseStudies,
  industries: Industries,
  insights: Insights,
  insight: InsightDetail
};

function App() {
  const { route, id } = useRoute();
  const Page = PAGES[route] ?? Home;

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      {/* Dynamic Background shader on the main wrapper or nested inside sections */}
      <Navbar />
      <main key={route + (id ?? "")} className="relative z-10">
        <Page id={id} />
      </main>
      <Footer />
    </div>
  );
}

export {
  App as default
};
