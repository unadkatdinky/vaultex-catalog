import { Link } from 'react-router-dom';
import { Heart, Scale } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../store/UseStore';

const categoryColors = {
  Cars: 'bg-cat-cars text-white',
  Bikes: 'bg-cat-bikes text-white',
  Phones: 'bg-cat-phones text-white',
  Computers: 'bg-cat-computers text-white'
};

export default function ProductCard({ item }) {
  const slug = item.itemname.toLowerCase().replace(/\s+/g, '-');
  
  // Zustand hooks
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addToCompare = useStore((state) => state.addToCompare);
  const isWishlisted = useStore((state) => state.wishlist.some(p => p.itemname === item.itemname));

  const handleWishlist = (e) => {
    e.preventDefault(); // Prevents the Link from clicking
    toggleWishlist(item);
    if (!isWishlisted) {
      toast.success(`${item.itemname} saved to wishlist!`, { icon: '🤍' });
    } else {
      toast(`${item.itemname} removed.`, { icon: '✕' });
    }
  };

  const handleCompare = (e) => {
    e.preventDefault();
    const result = addToCompare(item);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(`${item.itemname} added to compare.`);
    }
  };

  return (
    <Link to={`/product/${slug}`} className="group block bg-surface border border-border rounded-xl overflow-hidden hover:-translate-y-1 hover:border-gray-600 transition-all duration-300 relative">
      <div className="h-48 overflow-hidden bg-surface2 relative">
        <img 
          src={item.image} 
          alt={item.itemname} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md ${categoryColors[item.category]}`}>
          {item.category}
        </div>
        
        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleWishlist} className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-gray-600 hover:border-accent hover:text-accent transition-colors text-white">
            <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          <button onClick={handleCompare} className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-gray-600 hover:border-accent hover:text-accent transition-colors text-white">
            <Scale className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold mb-3">{item.itemname}</h3>
        <div className="flex flex-wrap gap-2">
          {item.itemprops.slice(0, 3).map((prop, idx) => (
            <div key={idx} className="bg-[#222] border border-border rounded-md px-2 py-1 text-xs text-gray-300 font-medium">
              <span className="text-gray-500 mr-1">{prop.label}:</span>
              {prop.value}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}