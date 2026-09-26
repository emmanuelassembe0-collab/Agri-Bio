import React from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, Phone, Mail, MapPin, RefreshCw, ShieldCheck, Heart } from 'lucide-react';
import { REGIONS_CAMEROON } from '../data/mockData';

export const Footer: React.FC = () => {
  const { setCurrentView, resetToDemoData, setSelectedRegion } = useApp();

  const handleRegionClick = (region: any) => {
    setSelectedRegion(region);
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100/90 pt-16 pb-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-800/60">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-serif-title">
                Agri<span className="text-emerald-400">Bio</span>
              </span>
            </div>
            
            <p className="text-sm text-emerald-200/80 leading-relaxed max-w-md">
              Plateforme agricole de référence au Cameroun dédiée à la <strong>Piste 1 — Transformation structurelle de l'économie</strong>. 
              Nous supprimons les intermédiaires spéculatifs pour relier directement les producteurs locaux aux marchés urbains et industriels, 
              réduisant ainsi les pertes post-récolte.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs text-emerald-300/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Siège national : Yaoundé & Douala, République du Cameroun</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline Producteurs & Acheteurs : +237 677 45 12 34 / +237 699 23 88 10</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>contact@agribio.cm</span>
              </div>
            </div>
          </div>

          {/* Navigation Rapide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li>
                <button 
                  onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Catalogue des récoltes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('producer-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Espace Producteur
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Mission & Lutte anti-gaspillage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Contact & Assistance
                </button>
              </li>
            </ul>
          </div>

          {/* Bassins de Production */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Bassins Agricoles
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {REGIONS_CAMEROON.slice(0, 7).map(region => (
                <button
                  key={region}
                  onClick={() => handleRegionClick(region)}
                  className="px-2 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors"
                >
                  {region}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-emerald-300/60 pt-2">
              Réseaux de coopératives paysannes actives dans le Noun, la Lekié, le Moungo, Santa, et les hauts plateaux.
            </p>
          </div>

          {/* Sécurité & Reset */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Environnement Démo
            </h4>
            <div className="p-3 rounded-lg bg-emerald-900/40 border border-emerald-800 text-xs text-emerald-200/80 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Simulation interactive</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Les ajouts et modifications sont enregistrés dans votre navigateur.
              </p>
              <button
                onClick={resetToDemoData}
                className="w-full mt-2 py-1.5 px-2.5 rounded bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Réinitialiser les données démo</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p>
            © {new Date().getFullYear()} <strong>Agri Bio Cameroun</strong>. Développé pour la transformation de l’agriculture camerounaise.
          </p>
          <div className="flex items-center gap-1 text-emerald-300/70">
            <span>Cultivé avec fierté pour le Cameroun</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </div>
        </div>

      </div>
    </footer>
  );
};
