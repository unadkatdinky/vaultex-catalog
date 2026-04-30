import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import useUIStore from '../store/useUIStore';

export default function EnquiryModal() {
  const { isEnquiryModalOpen, enquiryProduct, closeEnquiryModal } = useUIStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isEnquiryModalOpen || !enquiryProduct) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here is where you would normally send data to your Go backend!
    setIsSubmitted(true);
    
    // Auto-close after 3 seconds
    setTimeout(() => {
      closeEnquiryModal();
      setIsSubmitted(false); // reset for next time
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="font-serif text-xl font-bold">Send Enquiry</h2>
          <button 
            onClick={closeEnquiryModal}
            className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Product Banner */}
        <div className="p-4 bg-surface2 border-b border-border flex items-center gap-4">
          <img 
            src={enquiryProduct.image} 
            alt={enquiryProduct.itemname} 
            className="w-16 h-12 object-cover rounded-md bg-surface"
          />
          <div>
            <div className="font-medium text-sm text-gray-100">{enquiryProduct.itemname}</div>
            <div className="text-[11px] text-gray-400 uppercase tracking-widest mt-0.5">{enquiryProduct.category}</div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="text-green-500 font-medium mb-1">Enquiry Sent!</h3>
              <p className="text-sm text-gray-400">Our team will be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5">First Name</label>
                  <input required type="text" placeholder="John" className="w-full bg-surface2 border border-gray-800 rounded-lg px-3 py-2.5 text-sm focus:border-accent outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5">Last Name</label>
                  <input required type="text" placeholder="Doe" className="w-full bg-surface2 border border-gray-800 rounded-lg px-3 py-2.5 text-sm focus:border-accent outline-none transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                <input required type="email" placeholder="john@example.com" className="w-full bg-surface2 border border-gray-800 rounded-lg px-3 py-2.5 text-sm focus:border-accent outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5">Message</label>
                <textarea required rows="3" placeholder="I'm interested in this product..." className="w-full bg-surface2 border border-gray-800 rounded-lg px-3 py-2.5 text-sm focus:border-accent outline-none transition-colors resize-none"></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={closeEnquiryModal} className="flex-1 py-2.5 border border-gray-700 rounded-lg text-sm font-medium hover:bg-surface2 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-accent text-black rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors">
                  Send Enquiry
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}