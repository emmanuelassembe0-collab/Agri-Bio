import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InquiryModal } from '../components/InquiryModal';
import { Product } from '../types';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  Star, 
  Sprout, 
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';

export const ProducerProfileView: React.FC = () => {
  const { 
    selectedProducerId, 
    producers, 
    products, 
    setCurrentView, 
    navigateToProductDetail 
  } = useApp();

  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<Product | null>(null);

  const producer = producers.find(p => p.id === selectedProducerId) || producers[0];
  const producerProducts = products.filter(p => p.producerId === producer?.id);

  if (!producer) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Producteur introuvable</h2>
        <button
          onClick={() => setCurrentView('products')}
          className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
        >
          Retour aux produits
        </button>
      </div>
    );
  }

  const whatsappPhone = producer.whatsapp ? producer.whatsapp.replace(/\D/g, '') : '237677451234';
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Bonjour ${producer.name}, je vous contacte depuis la plateforme Agri Bio.`)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
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
          <span>Retour aux produits</span>
        </button>
      </div>

      {/* Hero Profile Card */}
      <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        
        {/* Cover banner */}
        <div className="h-36 sm:h-48 bg-gradient-to-r from-emerald-800 via-emerald-900 to-emerald-950 relative">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute top-4 right-4 bg-emerald-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-medium flex items-center gap-1.5 border border-emerald-700/50">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Producteur vérifié Agri Bio</span>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 sm:px-10 pb-8 pt-0 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            
            {/* Avatar & Main Identity */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <img
                src={producer.avatarUrl}
                alt={producer.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-title">
                    {producer.name}
                  </h1>
                  <span title="Producteur vérifié">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </span>
                </div>
                {producer.cooperativeName && (
                  <p className="text-sm font-semibold text-emerald-800">
                    {producer.cooperativeName}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    {producer.locality} ({producer.region})
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Membre depuis {producer.memberSince}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-semibold text-amber-700">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {producer.rating} ({producer.totalReviews} avis)
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp direct</span>
              </a>

              <a
                href={`tel:${producer.phone}`}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 shadow-sm flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>{producer.phone}</span>
              </a>
            </div>

          </div>

          {/* Bio & Agricultural Commitments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                À propos de l'exploitation & Pratiques culturales
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {producer.bio}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcfbf7] border border-slate-200/80 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Garanties du producteur</span>
              </h4>
              <ul className="space-y-1.5 text-slate-600 pt-1">
                <li>• Zéro intermédiaire dans la négociation</li>
                <li>• Respect des dates de récolte convenues</li>
                <li>• Emballage soigné pour le transport interurbain</li>
                <li>• Modalités de paiement transparentes (MoMo / OM)</li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Catalog of this Producer */}
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Disponibilité en direct
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-serif-title mt-0.5">
              Récoltes publiées par {producer.name} ({producerProducts.length})
            </h2>
          </div>
        </div>

        {producerProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500">
            Ce producteur n'a aucune annonce active pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {producerProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div 
                    onClick={() => navigateToProductDetail(product.id)}
                    className="relative h-44 overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                      {product.locality}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="text-xs text-slate-500 capitalize">
                      {product.category}
                    </div>

                    <h3 
                      onClick={() => navigateToProductDetail(product.id)}
                      className="text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer font-serif-title"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                      <div className="text-base font-extrabold text-emerald-800">
                        {product.price.toLocaleString()} FCFA <span className="text-xs font-normal text-slate-500">/ {product.unit}</span>
                      </div>
                      <span className="text-xs font-medium text-slate-600">
                        Stock : {product.quantityAvailable}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigateToProductDetail(product.id)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold text-center transition-colors"
                  >
                    Détails
                  </button>
                  <button
                    onClick={() => setSelectedProductForInquiry(product)}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold text-center transition-colors shadow-sm"
                  >
                    Commander
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Inquiry Modal */}
      {selectedProductForInquiry && (
        <InquiryModal
          product={selectedProductForInquiry}
          producer={producer}
          isOpen={!!selectedProductForInquiry}
          onClose={() => setSelectedProductForInquiry(null)}
        />
      )}

    </div>
  );
};
