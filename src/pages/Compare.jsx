import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import useStore from '../store/UseStore';
import toast from 'react-hot-toast';

export default function Compare() {
  const compareList = useStore((state) => state.compareList);
  const removeFromCompare = useStore((state) => state.removeFromCompare);

  const handleRemove = (itemname) => {
    removeFromCompare(itemname);
    toast(`${itemname} removed from compare.`, { icon: '✕' });
  };

  // Dynamically extract all unique property labels from the selected items
  // This ensures the table adapts whether comparing phones or cars
  const allProps = Array.from(
    new Set(compareList.flatMap(item => item.itemprops.map(prop => prop.label)))
  );

  if (compareList.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h1 className="font-serif text-4xl font-bold mb-6">Compare Products</h1>
        <div className="py-24 border border-dashed border-border rounded-2xl">
          <p className="text-gray-500 mb-4">You haven't selected any items to compare.</p>
          <Link to="/" className="text-accent hover:underline">Browse Catalog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl font-bold mb-8">Compare Products</h1>
      
      {/* Compare Status Bar */}
      <div className="bg-surface border border-border rounded-xl p-4 flex items-center gap-3 mb-8 flex-wrap">
        <span className="text-xs text-gray-500 tracking-wider uppercase">Comparing</span>
        {compareList.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-surface2 border border-gray-800 px-3 py-1.5 rounded-lg">
            <span className="text-xs font-medium">{item.itemname}</span>
            <button onClick={() => handleRemove(item.itemname)} className="text-gray-500 hover:text-red-500 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Compare Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="bg-surface2 p-4 text-xs font-semibold tracking-wider uppercase text-gray-500 border-b border-border w-32">
                Spec
              </th>
              {compareList.map((item, idx) => (
                <th key={idx} className="bg-surface2 p-4 border-b border-border min-w-[150px]">
                  <div className="flex flex-col gap-2">
                    <img src={item.image} alt={item.itemname} className="w-16 h-12 object-cover rounded-md bg-surface" />
                    <span className="text-xs font-semibold text-gray-300">{item.itemname}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Standard Category Row */}
            <tr>
              <td className="p-4 border-b border-border text-xs text-gray-500 font-medium">Category</td>
              {compareList.map((item, idx) => (
                <td key={idx} className="p-4 border-b border-border text-sm text-gray-300">
                  {item.category}
                </td>
              ))}
            </tr>
            
            {/* Dynamic Specification Rows */}
            {allProps.map((propLabel, idx) => (
              <tr key={idx} className="last:border-none">
                <td className="p-4 border-b border-border text-xs text-gray-500 font-medium">{propLabel}</td>
                {compareList.map((item, itemIdx) => {
                  const prop = item.itemprops.find(p => p.label === propLabel);
                  return (
                    <td key={itemIdx} className="p-4 border-b border-border text-sm text-gray-300">
                      {prop ? prop.value : <span className="text-gray-700 font-light">--</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add More Button (max 3 allowed by Zustand store) */}
      {compareList.length < 3 && (
        <Link to="/" className="block w-full border border-dashed border-gray-700 text-gray-500 text-center py-4 rounded-xl mt-4 hover:border-accent hover:text-accent transition-colors text-sm font-medium">
          + Add another item to compare
        </Link>
      )}
    </div>
  );
}