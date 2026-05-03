import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  // Fetch products from the Go database on load
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(json => setProducts(json || []))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  // Dynamically generate categories from the database items
  const categories = ['All', ...new Set(products.map(item => item.category))];

  // Derived state for filtering
  const filteredData = useMemo(() => {
    return products.filter(item => {
      const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
      const matchesSearch = item.itemname.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 bg-linear-to-br from-white via-accent to-gray-500 text-transparent bg-clip-text">
          The Premium <br /> Product Catalog
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto">Curated collection of the world's finest automobiles, motorcycles, smartphones & computers.</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface border border-gray-800 rounded-full py-3 pl-12 pr-6 text-sm outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeFilter === cat 
                ? 'border-accent text-accent bg-accent/10' 
                : 'border-gray-800 text-gray-400 hover:border-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((item, idx) => (
            <ProductCard key={idx} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}