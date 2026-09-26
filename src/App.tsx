import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ProductDetailView } from './views/ProductDetailView';
import { ProducerProfileView } from './views/ProducerProfileView';
import { ProducerDashboardView } from './views/ProducerDashboardView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <main className="min-h-[calc(100vh-80px-350px)]">
      {currentView === 'home' && <HomeView />}
      {currentView === 'products' && <ProductsView />}
      {currentView === 'product-detail' && <ProductDetailView />}
      {currentView === 'producer-profile' && <ProducerProfileView />}
      {currentView === 'producer-dashboard' && <ProducerDashboardView />}
      {currentView === 'about' && <AboutView />}
      {currentView === 'contact' && <ContactView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-slate-800">
        <Header />
        <MainContent />
        <Footer />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
