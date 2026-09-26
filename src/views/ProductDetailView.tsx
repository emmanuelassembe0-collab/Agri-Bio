import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InquiryModal } from '../components/InquiryModal';
import { 
  ArrowLeft, 
  MapPin, 
  Truck, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Leaf, 
  Calendar, 
  UserCheck, 
  Star, 
  Share2, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    producers, 
    setCurrentView, 
    navigateToProducerProfile, 
    navigateToProductDetail,
    showToast 
  } = useApp();

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const product = products.find(p => p.id === selectedProductId) || products[0];
  const producer = producers.find(p => p.id === product?.producerId);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Produit introuvable</h2>
        <button
          onClick={() => setCurrentView('products')}
          className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
        >
          Retour aux produits
        </button>
      </div>
    );
  }

  // Similar products in same category
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Découvrez "${product.name}" sur Agri Bio Cameroun (${product.price} FCFA)`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Lien du produit copié dans le presse-papiers !', 'info');
    }
  };

  const whatsappPhone = producer?.whatsapp ? producer.whatsapp.replace(/\D/g, '') : '237677451234';
  const whatsappText = encodeURIComponent(
    `Bonjour ${producer?.name || product.producerName}, je vous contacte depuis Agri Bio au sujet de votre produit "${product.name}" (${product.price.toLocaleString()} FCFA / ${product.unit}). Est-il toujours disponible ?`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappText}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => {
            setCurrentView('products');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au catalogue des produits</span>
        </button>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left column: Photo & Key Specs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md aspect-4/3">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isOrganicCertified && (
              <div className="absolute top-4 left-4 bg-emerald-900/90 text-emerald-100 text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1.5 shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Agriculture Biologique & Agroécologique</span>
              </div>
            )}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-xl backdrop-blur-sm shadow-sm transition-colors"
              title="Partager cette annonce"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery & Transport Info Box */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>Modalités de retrait & expédition de la récolte</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {product.deliveryOptions && product.deliveryOptions.length > 0 ? (
                product.deliveryOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#fcfbf7] border border-slate-200/60">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{opt}</span>
                  </div>
                ))
              ) : (
                <div className="text-slate-500">Retrait direct sur l'exploitation agricole.</div>
              )}
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * Les frais d'expédition (agences de voyage type Général Express, Touristique, ou camions de groupage) sont convenus directement entre l'acheteur et le producteur.
            </p>
          </div>
        </div>

        {/* Right column: Purchase details & Producer card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            
            {/* Category · Region · Harvest date */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="capitalize font-semibold text-emerald-800">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                {product.locality} ({product.region})
              </span>
              {product.harvestDate && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    Récolté le {product.harvestDate}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-title leading-snug">
              {product.name}
            </h1>

            {/* Price block */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                  Prix bord champ direct
                </span>
                <div className="text-3xl font-black text-emerald-900 font-serif-title">
                  {product.price.toLocaleString()} <span className="text-base font-semibold">FCFA</span>
                </div>
                <span className="text-xs text-emerald-800/80 font-medium">
                  par {product.unit}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Stock disponible
                </span>
                <span className="text-base font-extrabold text-slate-800">
                  {product.quantityAvailable} {product.unit}s
                </span>
                {product.minOrderQuantity && product.minOrderQuantity > 1 && (
                  <span className="text-[10px] text-amber-800 block font-semibold">
                    (Min. {product.minOrderQuantity} {product.unit}s)
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Description de la récolte
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-900/15 flex items-center justify-center gap-2 transition-colors"
              >
                <span>Contacter le producteur & Commander</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  <span>WhatsApp direct</span>
                </a>

                {producer?.phone && (
                  <a
                    href={`tel:${producer.phone}`}
                    className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span>Appel direct</span>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Producer Summary Card */}
          {producer && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Fiche du producteur
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-700">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{producer.rating} ({producer.totalReviews} avis)</span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={producer.avatarUrl}
                  alt={producer.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-serif-title flex items-center gap-1.5">
                    <span>{producer.name}</span>
                    <span title="Producteur vérifié">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </span>
                  </h4>
                  {producer.cooperativeName && (
                    <p className="text-xs text-emerald-800 font-medium">
                      {producer.cooperativeName}
                    </p>
                  )}
                  <p className="text-xs text-slate-500">
                    {producer.locality} • Région du {producer.region}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {producer.bio}
              </p>

              <button
                onClick={() => navigateToProducerProfile(producer.id)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Voir le profil complet & ses autres récoltes</span>
                <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Même filière
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-serif-title mt-0.5">
                Autres récoltes dans la catégorie {product.category}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {similarProducts.map(sim => (
              <div
                key={sim.id}
                onClick={() => navigateToProductDetail(sim.id)}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={sim.imageUrl}
                    alt={sim.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                    {sim.locality}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 font-serif-title">
                    {sim.name}
                  </h4>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-emerald-800">
                      {sim.price.toLocaleString()} FCFA
                    </span>
                    <span className="text-xs text-slate-500">
                      / {sim.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {isInquiryOpen && (
        <InquiryModal
          product={product}
          producer={producer}
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
        />
      )}

    </div>
  );
};
