import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, ShoppingBag, LayoutDashboard, Menu, X, ArrowRight, UserCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentView, setCurrentView, currentProducer, inquiries, navigateToDashboard } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Count pending inquiries for this producer
  const pendingInquiriesCount = inquiries.filter(
    inq => inq.producerId === currentProducer.id && inq.status === 'en_attente'
  ).length;

  const handleNavClick = (view: any) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcfbf7]/90 backdrop-blur-md border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-emerald-950 font-serif-title">
                  Agri<span className="text-emerald-600">Bio</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-emerald-100/80 text-emerald-800">
                  Cameroun
                </span>
              </div>
              <span className="text-[11px] font-medium text-emerald-800/80 hidden sm:block tracking-normal">
                Connecter les producteurs aux marchés
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-sm font-semibold transition-colors duration-150 ${
                currentView === 'home'
                  ? 'text-emerald-700 underline decoration-2 underline-offset-8'
                  : 'text-slate-600 hover:text-emerald-800'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className={`text-sm font-semibold transition-colors duration-150 ${
                currentView === 'products'
                  ? 'text-emerald-700 underline decoration-2 underline-offset-8'
                  : 'text-slate-600 hover:text-emerald-800'
              }`}
            >
              Produits agricoles
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-sm font-semibold transition-colors duration-150 ${
                currentView === 'about'
                  ? 'text-emerald-700 underline decoration-2 underline-offset-8'
                  : 'text-slate-600 hover:text-emerald-800'
              }`}
            >
              À propos & Vision
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-sm font-semibold transition-colors duration-150 ${
                currentView === 'contact'
                  ? 'text-emerald-700 underline decoration-2 underline-offset-8'
                  : 'text-slate-600 hover:text-emerald-800'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('products')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              Acheter des récoltes
            </button>

            <button
              onClick={() => navigateToDashboard()}
              className={`relative px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-all duration-200 ${
                currentView === 'producer-dashboard'
                  ? 'bg-emerald-800 text-white ring-2 ring-emerald-600 ring-offset-2'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white hover:shadow-md'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Espace Producteur</span>
              {pendingInquiriesCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-bold text-[10px] flex items-center justify-center">
                  {pendingInquiriesCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => navigateToDashboard()}
              className="p-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5"
              title="Espace Producteur"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-[11px]">Producteur</span>
              {pendingInquiriesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-900 font-bold text-[9px] flex items-center justify-center">
                  {pendingInquiriesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-900 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-950/10 bg-[#fcfbf7] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3">
            <div className="py-2 px-3 rounded-lg bg-emerald-50/80 border border-emerald-100 flex items-center justify-between text-xs text-emerald-900 font-medium">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                Session active : <strong>{currentProducer.name}</strong>
              </span>
              <span className="text-[10px] bg-emerald-200/80 px-1.5 py-0.5 rounded text-emerald-900">
                {currentProducer.locality}
              </span>
            </div>

            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'home' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'products' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Explorer les Produits
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'about' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              À propos (Piste 1 & Pertes post-récolte)
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'contact' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Contact & Assistance
            </button>

            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  navigateToDashboard();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Accéder au Tableau de bord Producteur</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
