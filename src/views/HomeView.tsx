import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST, REGIONS_CAMEROON } from '../data/mockData';
import { Product, ProductCategory, CameroonRegion } from '../types';
import { InquiryModal } from '../components/InquiryModal';
import { 
  Sprout, 
  Search, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  ChevronRight,
  UserCheck,
  PlusCircle,
  ShoppingBag
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    products, 
    producers, 
    setCurrentView, 
    navigateToProductDetail, 
    navigateToDashboard,
    navigateToProductsWithCategory,
    setSearchQuery,
    setSelectedRegion,
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [localRegion, setLocalRegion] = useState<CameroonRegion | 'all'>('all');
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<Product | null>(null);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setSelectedRegion(localRegion);
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Top 6 featured products
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Subtle background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/60 via-emerald-50/20 to-transparent rounded-3xl -z-10 blur-2xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          {/* Editorial Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/5 text-emerald-800 border border-emerald-800/10 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Piste 1 — Transformation structurelle de l'économie camerounaise</span>
          </div>

          {/* Main Slogan & Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 font-serif-title leading-[1.15]">
            Connecter les producteurs <br className="hidden sm:inline" />
            aux marchés agricoles au <span className="text-emerald-700 italic font-normal">Cameroun</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            La plateforme nationale qui met directement en lien les coopératives et agriculteurs locaux avec les ménages, 
            restaurants et grossistes urbains. Moins d'intermédiaires, des prix équitables et une réduction radicale des pertes post-récolte.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setCurrentView('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-lg shadow-emerald-900/15 flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Découvrir les produits</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateToDashboard()}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-emerald-950 font-semibold text-sm border border-slate-200 shadow-sm flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span>Publier un produit agricole</span>
            </button>
          </div>

          {/* Quick Search Card */}
          <div className="pt-6 max-w-3xl mx-auto">
            <form 
              onSubmit={handleHeroSearch}
              className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex-1 w-full flex items-center gap-2 px-3 py-2">
                <Search className="w-5 h-5 text-emerald-700 shrink-0" />
                <input
                  type="text"
                  placeholder="Que recherchez-vous ? (Tomates, Plantain, Manioc, Maïs...)"
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  className="w-full text-sm placeholder:text-slate-400 focus:outline-none bg-transparent"
                />
              </div>

              <div className="w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-200 px-3 py-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={localRegion}
                  onChange={e => setLocalRegion(e.target.value as any)}
                  aria-label="Région du Cameroun"
                  className="w-full text-xs font-semibold text-slate-700 focus:outline-none bg-transparent cursor-pointer py-1.5"
                >
                  <option value="all">Toutes régions du Cameroun</option>
                  {REGIONS_CAMEROON.map(reg => (
                    <option key={reg} value={reg}>Région du {reg}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
              >
                Rechercher
              </button>
            </form>
          </div>

        </div>

        {/* DEMO METRICS BAR */}
        <div className="max-w-5xl mx-auto mt-16 pt-10 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif-title">
                850+
              </span>
              <p className="text-xs font-medium text-slate-600">
                Producteurs & Coopératives
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif-title">
                1 420 t
              </span>
              <p className="text-xs font-medium text-slate-600">
                Récoltes commercialisées
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif-title">
                -35%
              </span>
              <p className="text-xs font-medium text-slate-600">
                De pertes post-récolte
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif-title">
                10
              </span>
              <p className="text-xs font-medium text-slate-600">
                Régions interconnectées
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Filières agricoles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-title mt-1">
              Explorer par catégorie
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            <span>Voir tout le catalogue</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {CATEGORIES_LIST.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigateToProductsWithCategory(cat.id)}
              className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-emerald-600/50 hover:shadow-md transition-all text-left flex flex-col justify-between group"
            >
              <span className="text-3xl mb-3">{cat.icon}</span>
              <div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Disponibles maintenant
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-title mt-1">
              Récoltes fraîches en direct des plantations
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            <span>Explorer les {products.length} annonces</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => {
            const producer = producers.find(p => p.id === product.producerId);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-emerald-600/30 transition-all flex flex-col group"
              >
                {/* Product Image */}
                <div 
                  onClick={() => navigateToProductDetail(product.id)}
                  className="relative h-48 w-full overflow-hidden cursor-pointer bg-slate-100"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.isOrganicCertified && (
                    <div className="absolute top-3 left-3 bg-emerald-900/90 text-emerald-100 text-[10px] font-semibold px-2 py-1 rounded backdrop-blur-sm">
                      Bio & Agroécologique
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{product.locality}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Category and region text - Zero Pill rule */}
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="capitalize">{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Région du {product.region}</span>
                    </div>

                    <h3 
                      onClick={() => navigateToProductDetail(product.id)}
                      className="text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer font-serif-title"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Stock & Price */}
                  <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Prix bord champ
                      </span>
                      <div className="text-lg font-extrabold text-emerald-800">
                        {product.price.toLocaleString()} <span className="text-xs font-semibold">FCFA</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        / {product.unit}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Stock dispo
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {product.quantityAvailable} {product.unit}s
                      </span>
                    </div>
                  </div>

                  {/* Producer attribution */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={producer?.avatarUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80'}
                        alt={product.producerName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-semibold text-slate-700 line-clamp-1">
                        {product.producerName}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => navigateToProductDetail(product.id)}
                      className="w-full py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors text-center"
                    >
                      Voir le produit
                    </button>
                    <button
                      onClick={() => setSelectedProductForInquiry(product)}
                      className="w-full py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors text-center shadow-sm"
                    >
                      Commander
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY AGRI BIO — AVANTAGES */}
      <section className="bg-emerald-900/5 py-16 px-4 sm:px-6 lg:px-8 border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Valeur Ajoutée
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-title">
              Pourquoi choisir Agri Bio Cameroun ?
            </h2>
            <p className="text-sm text-slate-600">
              Une plateforme pensée pour les réalités du terroir camerounais, répondant aux défis logistiques et commerciaux des producteurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif-title">
                Zéro intermédiaire abusif
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Les marges reviennent aux agriculteurs et les acheteurs profitent de tarifs équitables sans surenchère spéculative des revendeurs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif-title">
                Lutte anti-gaspillage
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vendez ou achetez vos récoltes avant maturité excessive. Réduisons ensemble les 35% de pertes post-récolte au Cameroun.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif-title">
                Logistique locale adaptée
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Retrait bord champ, agences de transport interurbain ou livraison directe dans les grands marchés de Douala et Yaoundé.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif-title">
                Paiement Mobile Money direct
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paiement direct et sécurisé entre vous via MTN Mobile Money ou Orange Money à la confirmation de la cargaison.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Fonctionnement simple
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-title">
            Comment fonctionne Agri Bio ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Côté Producteur */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif-title">
                  Pour les Producteurs & Coopératives
                </h3>
                <p className="text-xs text-slate-500">Commercialiser ses récoltes sans tracas</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">1. Créez votre profil en 1 minute</h4>
                  <p className="text-xs text-slate-600">Indiquez votre localité, coopérative et coordonnées directes (WhatsApp & Appel).</p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">2. Publiez vos produits agricoles</h4>
                  <p className="text-xs text-slate-600">Ajoutez le nom, photo, prix en FCFA, quantité disponible et options de livraison.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">3. Recevez directement les commandes</h4>
                  <p className="text-xs text-slate-600">Gérez les demandes des acheteurs dans votre tableau de bord et encaissez sans délai.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateToDashboard()}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Accéder à mon espace producteur</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Côté Acheteur */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif-title">
                  Pour les Acheteurs & Commerçants
                </h3>
                <p className="text-xs text-slate-500">Ménages, restaurateurs, grossistes et transformateurs</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">1. Recherchez parmi les récoltes disponibles</h4>
                  <p className="text-xs text-slate-600">Filtrez par catégorie de produit, région ou niveau de certification bio.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">2. Consultez la fiche et le profil du paysan</h4>
                  <p className="text-xs text-slate-600">Vérifiez les avis, le stock disponible, la date de récolte et le lieu de culture.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">3. Commandez ou contactez en 1 clic</h4>
                  <p className="text-xs text-slate-600">Envoyez une demande formelle ou conversez immédiatement sur WhatsApp.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentView('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Parcourir les récoltes disponibles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* TÉMOIGNAGES DE TERRAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Retours d'expérience
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-title">
            Ils transforment leur quotidien avec Agri Bio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <p className="text-xs text-slate-600 italic leading-relaxed">
              « Auparavant, je perdais jusqu'à 30% de mes cageots de tomates à Foumbot lorsque les acheteurs tardaient à venir. Avec Agri Bio, mes récoltes sont réservées 48h avant la cueillette. »
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80"
                alt="Tagne Emmanuel"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Tagne Emmanuel</h4>
                <p className="text-[11px] text-slate-500">Maraîcher bio à Foumbot (Ouest)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <p className="text-xs text-slate-600 italic leading-relaxed">
              « Pour notre restaurant à Yaoundé Bastos, trouver du manioc très frais et du plantain sans défauts était une bataille. Aujourd'hui nous nous approvisionnons directement auprès de la coopérative de Sa'a. »
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                alt="Mme Mballa Chantal"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Mireille Eyenga</h4>
                <p className="text-[11px] text-slate-500">Chef cuisinière à Yaoundé</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <p className="text-xs text-slate-600 italic leading-relaxed">
              « Les acheteurs de Douala savent exactement d'où viennent leurs ananas et le miel blanc d'Oku. C'est la traçabilité et le respect du producteur qui manquaient sur nos marchés. »
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                alt="Kamga Jean-Paul"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Kamga Jean-Paul</h4>
                <p className="text-[11px] text-slate-500">Producteur de fruits dans le Moungo</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Rejoignez le mouvement Agri Bio
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-title">
              Vous êtes producteur agricole au Cameroun ?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Publiez vos récoltes dès aujourd'hui et trouvez des acheteurs fiables à Douala, Yaoundé, Bafoussam et dans toutes les régions sans commission intermédiaire.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => navigateToDashboard()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs shadow-md transition-colors"
            >
              Publier un produit maintenant
            </button>
            <button
              onClick={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-emerald-400/40 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors"
            >
              En savoir plus sur la mission
            </button>
          </div>
        </div>
      </section>

      {/* Inquiry modal if clicked */}
      {selectedProductForInquiry && (
        <InquiryModal
          product={selectedProductForInquiry}
          producer={producers.find(p => p.id === selectedProductForInquiry.producerId)}
          isOpen={!!selectedProductForInquiry}
          onClose={() => setSelectedProductForInquiry(null)}
        />
      )}

    </div>
  );
};
