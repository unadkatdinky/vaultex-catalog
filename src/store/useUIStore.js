import { create } from 'zustand';

const useUIStore = create((set) => ({
  isEnquiryModalOpen: false,
  enquiryProduct: null, // Stores the specific product the user wants to enquire about

  openEnquiryModal: (product) => set({ isEnquiryModalOpen: true, enquiryProduct: product }),
  closeEnquiryModal: () => set({ isEnquiryModalOpen: false, enquiryProduct: null }),
}));

export default useUIStore;