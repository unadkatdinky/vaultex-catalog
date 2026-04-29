import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import useStore from '../store/UseStore';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);

  const handleRemove = (item) => {
    toggleWishlist(item);
    toast(`${item.itemname} removed.`, { icon: '✕' });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-sm text-gray-400">{wishlist.length} saved items</p>
        </div>
        <button className="bg-accent text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-accent/80 transition-colors">
          Share list
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border rounded-2xl">
          <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link to="/" className="text-accent hover:underline">Browse Catalog</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlist.map((item, idx) => (
            <div key={idx} className="bg-surface border border-border rounded-xl overflow-hidden relative group">
              <div className="h-32 bg-surface2 relative">
                <img src={item.image} alt={item.itemname} className="w-full h-full object-cover" />
                <button 
                  onClick={() => handleRemove(item)}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/70 border border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:border-red-500 hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-serif text-sm font-semibold truncate mb-1">{item.itemname}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.category}</p>
              </div>
            </div>
          ))}
          
          <Link to="/" className="border border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center min-h-50 text-gray-500 hover:border-accent hover:text-accent transition-colors">
            <span className="text-2xl mb-2">+</span>
            <span className="text-xs font-medium">Browse catalog</span>
          </Link>
        </div>
      )}
    </div>
  );
}