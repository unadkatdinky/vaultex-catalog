import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import data from '../data.json';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const product = data.find(item => item.itemname.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!product) {
    return <div className="text-center py-20">Product not found. <Link to="/" className="text-accent hover:underline">Go home</Link></div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-400 hover:text-accent mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to catalog
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="rounded-2xl overflow-hidden border border-border bg-surface relative">
          <img 
            src={product.image} 
            alt={product.itemname} 
            className="w-full aspect-4/3 object-cover"
          />
        </div>

        <div>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-2">
            {product.category}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-8">{product.itemname}</h1>
          
          <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Specifications</h3>
          <div className="border-t border-border">
            {product.itemprops.map((prop, idx) => (
              <div key={idx} className="flex justify-between py-4 border-b border-border text-sm">
                <span className="text-gray-400">{prop.label}</span>
                <span className="font-medium text-gray-100">{prop.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4">
            <button className="bg-accent text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#e8c98e] transition-colors">
              Enquire Now
            </button>
            <button className="border border-gray-600 text-white px-6 py-3 rounded-lg font-medium text-sm hover:border-gray-400 transition-colors">
              Save to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}