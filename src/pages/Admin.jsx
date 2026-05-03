import { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

export default function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]); // State for REAL database items
  const logout = useAuthStore((state) => state.logout);

  // Form Input States
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Cars');
  const [image, setImage] = useState('');
  const [specString, setSpecString] = useState('');

  // 1. GET: Fetch real data from Go
  const fetchProducts = () => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data || [])) // Fallback to empty array if DB is empty
      .catch(err => console.error("Failed to fetch:", err));
  };

  // 3. DELETE: Remove product from database
  const handleDeleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => {
      toast.success("Product deleted from database!");
      fetchProducts(); // Refresh the table so it disappears instantly
    })
    .catch(() => toast.error("Failed to delete product"));
  };

  // Run this once when the dashboard loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. POST: Send new product to Go
  const handleSaveProduct = () => {
    if (!itemName || !image) {
      toast.error("Name and Image are required!");
      return;
    }

    // Split the spec string (e.g., "Engine: V8") into label and value
    const [label, value] = specString.split(':').map(str => str.trim());

    const newProduct = {
      itemname: itemName,
      category: category,
      image: image,
      itemprops: label && value ? [{ label, value }] : []
    };

    fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    .then(res => res.json())
    .then(() => {
      toast.success("Product saved to database!");
      fetchProducts(); // Refresh the table!
      setShowForm(false); // Close the form
      
      // Reset inputs
      setItemName(''); setImage(''); setSpecString('');
    })
    .catch(() => toast.error("Failed to save product"));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-[180px_1fr] bg-surface border border-border rounded-xl overflow-hidden min-h-150 shadow-2xl">
        
        {/* ══ ADMIN SIDEBAR ══ */}
        <div className="bg-surface2 border-r border-border py-4 flex flex-col">
          <div className="px-4 pb-4 border-b border-border mb-3">
            <div className="font-serif text-sm text-accent font-bold tracking-widest">VAULTEX</div>
            <div className="text-[10px] text-gray-500 tracking-[0.2em] mt-0.5">ADMIN</div>
          </div>
          
          <nav className="flex flex-col flex-1">
            <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium bg-accent/10 text-accent border-r-2 border-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Products
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-cat-phones"></span> Enquiries
            </button>
            
            <div className="mt-auto">
              <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cat-cars"></span> Logout
              </button>
            </div>
          </nav>
        </div>

        {/* ══ ADMIN MAIN CONTENT ══ */}
        <div className="p-6 overflow-y-auto max-h-200">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-serif text-2xl font-bold">Products</h1>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-accent text-black px-4 py-2 rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors"
            >
              {showForm ? 'Cancel' : '+ Add product'}
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-surface2 border border-border rounded-lg p-4">
              <div className="font-serif text-2xl font-bold text-accent leading-none">{products.length}</div>
              <div className="text-[10px] text-gray-500 mt-1.5 tracking-wider uppercase">Real Items</div>
            </div>
          </div>

          {/* Add / Edit Form (Toggled) */}
          {showForm && (
            <div className="bg-surface2 border border-border rounded-lg p-5 mb-6 animate-in fade-in slide-in-from-top-4">
              <div className="text-sm font-medium mb-4 text-gray-200">Add a New Product to PostgreSQL</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 tracking-wider uppercase">Product name</label>
                  <input value={itemName} onChange={e => setItemName(e.target.value)} placeholder="e.g. Tesla Model S" className="bg-surface border border-gray-700 rounded-md px-3 py-2 text-xs focus:border-accent outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 tracking-wider uppercase">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="bg-surface border border-gray-700 rounded-md px-3 py-2 text-xs focus:border-accent outline-none appearance-none">
                    <option>Cars</option><option>Bikes</option><option>Phones</option><option>Computers</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 col-span-2">
                  <label className="text-[10px] text-gray-500 tracking-wider uppercase">Image URL</label>
                  <input value={image} onChange={e => setImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="bg-surface border border-gray-700 rounded-md px-3 py-2 text-xs focus:border-accent outline-none" />
                </div>
                <div className="flex flex-col gap-1.5 col-span-2">
                  <label className="text-[10px] text-gray-500 tracking-wider uppercase">Spec 1 (Format as Label: Value)</label>
                  <input value={specString} onChange={e => setSpecString(e.target.value)} placeholder="Engine: 5.0L V8" className="bg-surface border border-gray-700 rounded-md px-3 py-2 text-xs focus:border-accent outline-none" />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-700 text-gray-300 rounded-md text-xs hover:bg-surface transition-colors">Cancel</button>
                <button onClick={handleSaveProduct} className="px-4 py-2 bg-accent text-black rounded-md text-xs font-semibold hover:bg-accent/90 transition-colors">Save to Database</button>
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="overflow-x-auto border border-border rounded-lg bg-surface">
            {products.length === 0 ? (
              <div className="p-10 text-center text-sm text-gray-500">Database is empty. Add a product above!</div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-[10px] text-gray-500 tracking-wider uppercase py-3 px-4 border-b border-border text-left font-medium">Product</th>
                    <th className="text-[10px] text-gray-500 tracking-wider uppercase py-3 px-4 border-b border-border text-left font-medium">Category</th>
                    <th className="text-[10px] text-gray-500 tracking-wider uppercase py-3 px-4 border-b border-border text-left font-medium">Database ID</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, idx) => (
                    <tr key={idx} className="group hover:bg-surface2 transition-colors">
                      <td className="py-3 px-4 border-b border-border">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.itemname} className="w-10 h-7 object-cover rounded bg-surface" />
                          <div className="font-medium text-[13px] leading-tight">{item.itemname}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b border-border">
                        <span className="text-[10px] bg-surface2 border border-gray-800 px-2 py-1 rounded-md text-gray-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-border text-xs text-gray-500 font-mono">
                        #{item.id}
                      </td>
                      {/* NEW: The Actions Column */}
                      <td className="py-3 px-4 border-b border-border text-right">
                        <button 
                          onClick={() => handleDeleteProduct(item.id)} 
                          className="px-3 py-1 border border-gray-700 text-gray-400 rounded text-[11px] hover:border-red-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}