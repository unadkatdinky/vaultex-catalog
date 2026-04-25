import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import data from './data.json';

function App() {
  return (
    <Router>
      <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-6">
        <Link to="/" className="font-serif text-xl font-bold text-accent tracking-widest leading-none">
          VAULTEX<span className="block font-sans text-[10px] text-gray-400 font-normal tracking-[0.3em] mt-1">CATALOG</span>
        </Link>
        <div className="text-xs text-gray-500 font-medium">
          {data.length} curated items
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;