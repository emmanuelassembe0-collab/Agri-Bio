import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST, REGIONS_CAMEROON } from '../data/mockData';
import { Product, ProductCategory, CameroonRegion } from '../types';
import { InquiryModal } from '../components/InquiryModal';
import { 
  Search, 
  MapPin, 
  Filter, 
  X, 
  RotateCcw, 
  SlidersHorizontal,
  Leaf,
  ArrowUpDown,
  ShoppingBag
} from 'lucide-react';

export const ProductsView: React.FC = () => {
  const { 
    products, 
    producers, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    selectedRegion,
    setSelectedRegion,
    navigateToProductDetail 
  } = useApp();

  const [sortBy, setSortBy] = useState<'recent' | 'price_asc' | 'price_desc' | 'qty_desc'>('recent');
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<Product | null>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Region filter
      if (selectedRegion !== 'all' && product.region !== selectedRegion) {
        return false;
      }

      // Organic filter
      if (onlyOrganic && !product.isOrganicCertified) {
        return false;
      }

      // Search text filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesLoc = product.locality.toLowerCase().includes(query);
        const matchesProducer = product.producerName.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);

        if (!matchesName && !matchesDesc && !matchesLoc && !matchesProducer && !matchesCat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'qty_desc') return b.quantityAvailable - a.quantityAvailable;
      // Default: recent
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    });
  }, [products, selectedCategory, selectedRegion, onlyOrganic, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRegion('all');
    setOnlyOrganic(false);
    setSortBy('recent');
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedCategory !== 'all' || 
    selectedRegion !== 'all' || 
    onlyOrganic || 
    sortBy !== 'recent';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Marché agricole en direct
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif-title mt-1">
            Produits et récoltes disponibles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Achetez directement aux agriculteurs et coopératives du Cameroun. Tarifs bord champ sans commission intermédiaire.
          </p>
        </div>

        {/* Counter */}
        <div className="text-xs font-semibold text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm shrink-0 self-start md:self-auto">
          <strong className="text-emerald-800 text-sm font-bold">{filteredProducts.length}</strong> {filteredProducts.length > 1 ? 'produits disponibles' : 'produit disponible'}
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="space-y-4">
        
        {/* Search Input & Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search bar */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher (tomate, manioc, plantain, Dschang...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region dropdown */}
          <div className="md:col-span-3 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value as any)}
              aria-label="Filtrer par région du Cameroun"
              className="w-full pl-10 pr-8 py-2.5 bg-white text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer shadow-sm appearance-none"
            >
              <option value="all">Toutes les régions</option>
              {REGIONS_CAMEROON.map(reg => (
                <option key={reg} value={reg}>Région du {reg}</option>
              ))}
            </select>
          </div>

          {/* Sort dropdown */}
          <div className="md:col-span-2 relative">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              aria-label="Trier les résultats"
              className="w-full pl-9 pr-6 py-2.5 bg-white text-xs font-medium text-slate-700 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer shadow-sm appearance-none"
            >
              <option value="recent">Plus récents</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
              <option value="qty_desc">Plus grand stock</option>
            </select>
          </div>

          {/* Organic checkbox toggle */}
          <div className="md:col-span-2 flex items-center">
            <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors w-full shadow-sm">
              <input
                type="checkbox"
                checked={onlyOrganic}
                onChange={e => setOnlyOrganic(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                Bio certifié
              </span>
            </label>
          </div>

        </div>

        {/* Interactive Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Toutes les filières ({products.length})
          </button>

          {CATEGORIES_LIST.map(cat => {
            const count = products.filter(p => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg shrink-0 flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="capitalize">{cat.label}</span>
                <span className={`text-[10px] ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active filters summary */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Filtres actifs appliqués</span>
            </div>
            <button
              onClick={resetAllFilters}
              className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Effacer tous les filtres</span>
            </button>
          </div>
        )}

      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-4 my-10">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 font-serif-title">
              Aucun produit agricole ne correspond à vos critères
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Essayez de modifier votre mot-clé, de sélectionner une autre région camerounaise ou d'effacer les filtres.
            </p>
          </div>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser les filtres</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const producer = producers.find(p => p.id === product.producerId);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-emerald-600/30 transition-all flex flex-col group"
              >
                {/* Product Photo */}
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
                      Bio certifié
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{product.locality}</span>
                  </div>
                </div>

                {/* Card Content */}
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

                  {/* Action buttons */}
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
      )}

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
