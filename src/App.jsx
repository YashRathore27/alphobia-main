import { HashRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./hooks";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Deals from "./pages/Deals";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Coupons from "./pages/Coupons";
import Reviews from "./pages/Reviews";
import Compare from "./pages/Compare";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Advertise from "./pages/Advertise";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SearchPage from "./pages/SearchPage";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<Categories />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
