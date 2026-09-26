import React, { useState } from 'react';
import { Product, Producer } from '../types';
import { useApp } from '../context/AppContext';
import { X, Send, Phone, MessageSquare, Check, Truck, AlertTriangle } from 'lucide-react';

interface InquiryModalProps {
  product: Product;
  producer?: Producer;
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  product,
  producer,
  isOpen,
  onClose,
}) => {
  const { sendInquiry } = useApp();

  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('+237 ');
  const [buyerCity, setBuyerCity] = useState('');
  const [quantity, setQuantity] = useState(product.minOrderQuantity || 1);
  const [deliveryPref, setDeliveryPref] = useState<'livraison_domicile' | 'retrait_gare' | 'retrait_exploitation'>('livraison_domicile');
  const [message, setMessage] = useState(
    `Bonjour ${producer?.name || product.producerName}, je suis intéressé(e) par votre offre de ${product.name} disponible à ${product.locality}. Merci de me recontacter pour finaliser la commande.`
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalEstimated = quantity * product.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim() || !buyerCity.trim()) {
      return;
    }

    sendInquiry({
      productId: product.id,
      productName: product.name,
      producerId: product.producerId,
      buyerName,
      buyerPhone,
      buyerCity,
      quantityRequested: Number(quantity),
      totalEstimatedPrice: totalEstimated,
      deliveryPreference: deliveryPref,
      message,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  const whatsappPhone = producer?.whatsapp ? producer.whatsapp.replace(/\D/g, '') : '237677451234';
  const whatsappText = encodeURIComponent(
    `Bonjour ${producer?.name || product.producerName}, je vous contacte depuis la plateforme Agri Bio au sujet de votre produit "${product.name}" (${quantity} ${product.unit} à ${product.price.toLocaleString()} FCFA). Pouvons-nous échanger sur les modalités ?`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappText}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-700/50 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            Mise en relation directe bord champ
          </span>
          <h3 className="text-xl font-bold font-serif-title mt-0.5">
            Commander / Contacter le producteur
          </h3>
          <p className="text-xs text-emerald-200/80 mt-1">
            Produit : <strong>{product.name}</strong> • Récolte de {product.locality} ({product.region})
          </p>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Demande envoyée !</h4>
            <p className="text-sm text-slate-600 max-w-xs mx-auto">
              Le producteur <strong>{producer?.name || product.producerName}</strong> a reçu votre demande dans son espace et a été notifié.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-slate-800">
            
            {/* Product summary card */}
            <div className="p-3 rounded-xl bg-[#fcfbf7] border border-emerald-900/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-bold text-slate-900 line-clamp-1">{product.name}</p>
                  <p className="text-slate-500">
                    {product.price.toLocaleString()} FCFA / {product.unit}
                  </p>
                  <p className="text-emerald-700 font-medium">
                    Stock disponible : {product.quantityAvailable} {product.unit}s
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Total estimé</span>
                <p className="text-base font-extrabold text-emerald-800">
                  {totalEstimated.toLocaleString()} <span className="text-xs font-semibold">FCFA</span>
                </p>
              </div>
            </div>

            {/* Quick WhatsApp Alternative */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <div className="text-xs">
                <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  Besoin d'un contact immédiat ?
                </span>
                <span className="text-emerald-700 text-[11px]">
                  Échangez en direct sur WhatsApp avec {producer?.name || product.producerName}
                </span>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Buyer information form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Votre Nom ou Nom de votre commerce *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Restaurant La Grace, Douala"
                  value={buyerName}
                  onChange={e => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Numéro de téléphone (Cameroun) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+237 6XX XX XX XX"
                  value={buyerPhone}
                  onChange={e => setBuyerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quantité souhaitée ({product.unit}s) *
                </label>
                <input
                  type="number"
                  min={product.minOrderQuantity || 1}
                  max={product.quantityAvailable}
                  required
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
                {product.minOrderQuantity && product.minOrderQuantity > 1 && (
                  <span className="text-[10px] text-amber-700 font-medium">
                    Min. de commande : {product.minOrderQuantity}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ville / Quartier de destination *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Yaoundé (Mvan) ou Douala (Akwa)"
                  value={buyerCity}
                  onChange={e => setBuyerCity(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mode de livraison souhaité
              </label>
              <select
                value={deliveryPref}
                onChange={e => setDeliveryPref(e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
              >
                <option value="livraison_domicile">Livraison au commerce / domicile (par transporteur partenaire)</option>
                <option value="retrait_gare">Envoi en agence de voyage / gare routière</option>
                <option value="retrait_exploitation">Retrait direct sur le champ à {product.locality}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message pour le producteur
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              />
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 text-[11px] text-amber-800 border border-amber-200/60">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Le paiement se fait directement entre vous et le producteur (Orange Money, MTN Mobile Money ou espèces à réception). Agri Bio ne prélève aucune commission abusive.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-emerald-900/10 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirmer ma demande ({totalEstimated.toLocaleString()} FCFA)</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
