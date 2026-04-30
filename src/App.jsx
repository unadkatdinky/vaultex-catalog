import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Heart, Scale } from "lucide-react"; // New icons
import useStore from "./store/UseStore"; // Import your store
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist"; // We will build this next
import Compare from "./pages/Compare";
import EnquiryModal from "./pages/EnquiryModal";
// We will build this next
// import data from './data.json';

function App() {
  // Pull the lengths from Zustand
  const wishlistCount = useStore((state) => state.wishlist.length);
  const compareCount = useStore((state) => state.compareList.length);

  return (
    <Router>
      <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-6">
        <Link
          to="/"
          className="font-serif text-xl font-bold text-accent tracking-widest leading-none"
        >
          VAULTEX
          <span className="block font-sans text-[10px] text-gray-400 font-normal tracking-[0.3em] mt-1">
            CATALOG
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/compare"
            className="flex items-center text-xs font-medium text-gray-400 hover:text-accent transition-colors"
          >
            <Scale className="w-4 h-4 mr-2" />
            Compare{" "}
            {compareCount > 0 && (
              <span className="ml-1 bg-surface2 px-2 py-0.5 rounded-full text-white">
                {compareCount}
              </span>
            )}
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center text-xs font-medium text-gray-400 hover:text-accent transition-colors"
          >
            <Heart className="w-4 h-4 mr-2" />
            Wishlist{" "}
            {wishlistCount > 0 && (
              <span className="ml-1 bg-surface2 px-2 py-0.5 rounded-full text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#f0ede8",
            border: "1px solid #333",
          },
        }}
      />
      <EnquiryModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </Router>
  );
}

export default App;
