import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Producer, OrderInquiry, ProductCategory, CameroonRegion, ActiveView, InquiryStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_PRODUCERS, INITIAL_INQUIRIES } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  products: Product[];
  producers: Producer[];
  inquiries: OrderInquiry[];
  currentProducer: Producer;
  currentView: ActiveView;
  selectedProductId: string | null;
  selectedProducerId: string | null;
  searchQuery: string;
  selectedCategory: ProductCategory | 'all';
  selectedRegion: CameroonRegion | 'all';
  toasts: Toast[];
  
  // Actions
  setCurrentView: (view: ActiveView) => void;
  navigateToProductDetail: (productId: string) => void;
  navigateToProducerProfile: (producerId: string) => void;
  navigateToDashboard: () => void;
  navigateToProductsWithCategory: (category: ProductCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  setSelectedRegion: (region: CameroonRegion | 'all') => void;
  
  // Product management
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'producerId' | 'producerName'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Inquiry management
  sendInquiry: (inquiry: Omit<OrderInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (inquiryId: string, status: InquiryStatus) => void;
  
  // Producer management
  updateProducerProfile: (data: Partial<Producer>) => void;
  switchActiveProducer: (producerId: string) => void;
  
  // Utilities
  resetToDemoData: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'agribio_products_v1',
  PRODUCERS: 'agribio_producers_v1',
  INQUIRIES: 'agribio_inquiries_v1',
  ACTIVE_PROD: 'agribio_active_producer_id_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [producers, setProducers] = useState<Producer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCERS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCERS;
    } catch {
      return INITIAL_PRODUCERS;
    }
  });

  const [inquiries, setInquiries] = useState<OrderInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [activeProducerId, setActiveProducerId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROD);
      return saved || 'prod-1';
    } catch {
      return 'prod-1';
    }
  });

  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProducerId, setSelectedProducerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<CameroonRegion | 'all'>('all');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Storage error for products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCERS, JSON.stringify(producers));
    } catch (e) {
      console.error('Storage error for producers', e);
    }
  }, [producers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Storage error for inquiries', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PROD, activeProducerId);
    } catch (e) {
      console.error('Storage error for active producer', e);
    }
  }, [activeProducerId]);

  // Current active producer object
  const currentProducer = producers.find(p => p.id === activeProducerId) || producers[0];

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateToProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProducerProfile = (producerId: string) => {
    setSelectedProducerId(producerId);
    setCurrentView('producer-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDashboard = () => {
    setCurrentView('producer-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProductsWithCategory = (category: ProductCategory | 'all') => {
    setSelectedCategory(category);
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'producerId' | 'producerName'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: 'prod-item-' + Date.now(),
      producerId: currentProducer.id,
      producerName: currentProducer.name,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setProducts(prev => [newProduct, ...prev]);
    showToast(`Produit « ${newProduct.name} » publié avec succès !`, 'success');
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            ...updatedFields,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        }
        return p;
      })
    );
    showToast('Annonce modifiée avec succès !', 'success');
  };

  const deleteProduct = (id: string) => {
    const itemToDelete = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(
      itemToDelete
        ? `L'annonce « ${itemToDelete.name} » a été supprimée.`
        : 'Annonce supprimée.',
      'info'
    );
  };

  const sendInquiry = (inquiryData: Omit<OrderInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: OrderInquiry = {
      ...inquiryData,
      id: 'inq-' + Date.now(),
      status: 'en_attente',
      createdAt: new Date().toISOString(),
    };
    setInquiries(prev => [newInquiry, ...prev]);
    showToast('Votre demande a été transmise directement au producteur !', 'success');
  };

  const updateInquiryStatus = (inquiryId: string, status: InquiryStatus) => {
    setInquiries(prev =>
      prev.map(inq => {
        if (inq.id === inquiryId) {
          return { ...inq, status };
        }
        return inq;
      })
    );
    const label = status === 'confirmée' ? 'confirmée' : status === 'livrée' ? 'marquée comme livrée' : 'mise à jour';
    showToast(`Commande ${label} avec succès.`, 'info');
  };

  const updateProducerProfile = (data: Partial<Producer>) => {
    setProducers(prev =>
      prev.map(p => {
        if (p.id === currentProducer.id) {
          return { ...p, ...data };
        }
        return p;
      })
    );
    showToast('Profil producteur mis à jour avec succès !', 'success');
  };

  const switchActiveProducer = (producerId: string) => {
    setActiveProducerId(producerId);
    showToast('Session producteur changée.', 'info');
  };

  const resetToDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setProducers(INITIAL_PRODUCERS);
    setInquiries(INITIAL_INQUIRIES);
    setActiveProducerId('prod-1');
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCERS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROD);
    showToast('Données de démonstration réinitialisées avec succès.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        producers,
        inquiries,
        currentProducer,
        currentView,
        selectedProductId,
        selectedProducerId,
        searchQuery,
        selectedCategory,
        selectedRegion,
        toasts,
        setCurrentView,
        navigateToProductDetail,
        navigateToProducerProfile,
        navigateToDashboard,
        navigateToProductsWithCategory,
        setSearchQuery,
        setSelectedCategory,
        setSelectedRegion,
        addProduct,
        updateProduct,
        deleteProduct,
        sendInquiry,
        updateInquiryStatus,
        updateProducerProfile,
        switchActiveProducer,
        resetToDemoData,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
