import { Link } from 'react-router-dom';

const categoryColors = {
  Cars: 'bg-cat-cars text-white',
  Bikes: 'bg-cat-bikes text-white',
  Phones: 'bg-cat-phones text-white',
  Computers: 'bg-cat-computers text-white'
};

export default function ProductCard({ item }) {
  // Create a URL-friendly slug from the item name
  const slug = item.itemname.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/product/${slug}`} className="group block bg-surface border border-border rounded-xl overflow-hidden hover:-translate-y-1 hover:border-gray-600 transition-all duration-300 relative">
      <div className="h-48 overflow-hidden bg-surface2 relative">
        <img 
          src={item.image} 
          alt={item.itemname} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
        />
        <div className={`absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md ${categoryColors[item.category]}`}>
          {item.category}
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
      <div className="absolute bottom-4 right-4 w-7 h-7 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 group-hover:border-accent group-hover:text-accent transition-colors">
        →
      </div>
    </Link>
  );
}