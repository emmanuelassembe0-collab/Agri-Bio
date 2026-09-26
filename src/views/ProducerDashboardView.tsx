import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductCategory, CameroonRegion, InquiryStatus } from '../types';
import { CATEGORIES_LIST, REGIONS_CAMEROON, PHOTO_PRESETS } from '../data/mockData';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Package, 
  Inbox, 
  User, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Check, 
  Clock, 
  XCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  DollarSign,
  X,
  Layers,
  Image as ImageIcon,
  CheckCheck
} from 'lucide-react';

export const ProducerDashboardView: React.FC = () => {
  const { 
    products, 
    producers, 
    inquiries, 
    currentProducer, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateInquiryStatus, 
    updateProducerProfile,
    switchActiveProducer,
    navigateToProductDetail 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries' | 'profile'>('listings');
  
  // Product Modal State (for both create and edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  // Form fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('légumes');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState<number>(10000);
  const [formUnit, setFormUnit] = useState('Cageot de 35 kg');
  const [formQuantity, setFormQuantity] = useState<number>(50);
  const [formMinOrder, setFormMinOrder] = useState<number>(1);
  const [formLocality, setFormLocality] = useState(currentProducer.locality.split('(')[0].trim());
  const [formRegion, setFormRegion] = useState<CameroonRegion>(currentProducer.region);
  const [formImageUrl, setFormImageUrl] = useState(PHOTO_PRESETS[0].url);
  const [formIsOrganic, setFormIsOrganic] = useState(true);
  const [formDeliveryOption, setFormDeliveryOption] = useState('Retrait direct sur le champ et expédition agence');

  // Delete confirmation
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Profile Edit fields
  const [profileName, setProfileName] = useState(currentProducer.name);
  const [profileCoop, setProfileCoop] = useState(currentProducer.cooperativeName || '');
  const [profilePhone, setProfilePhone] = useState(currentProducer.phone);
  const [profileWhatsapp, setProfileWhatsapp] = useState(currentProducer.whatsapp);
  const [profileRegion, setProfileRegion] = useState<CameroonRegion>(currentProducer.region);
  const [profileLocality, setProfileLocality] = useState(currentProducer.locality);
  const [profileBio, setProfileBio] = useState(currentProducer.bio);

  // Active producer's products
  const myProducts = products.filter(p => p.producerId === currentProducer.id);
  
  // Active producer's inquiries
  const myInquiries = inquiries.filter(inq => inq.producerId === currentProducer.id);
  const pendingInquiries = myInquiries.filter(inq => inq.status === 'en_attente');

  // Total estimated stock value
  const totalStockValue = myProducts.reduce((sum, p) => sum + (p.price * p.quantityAvailable), 0);

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingProductId(null);
    setFormName('');
    setFormCategory('légumes');
    setFormDescription('');
    setFormPrice(12000);
    setFormUnit('Sac de 50 kg');
    setFormQuantity(30);
    setFormMinOrder(1);
    setFormLocality(currentProducer.locality.split('(')[0].trim());
    setFormRegion(currentProducer.region);
    setFormImageUrl(PHOTO_PRESETS[0].url);
    setFormIsOrganic(true);
    setFormDeliveryOption('Retrait direct bord champ et camionnage gare');
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (product: Product) => {
    setEditingProductId(product.id);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormDescription(product.description);
    setFormPrice(product.price);
    setFormUnit(product.unit);
    setFormQuantity(product.quantityAvailable);
    setFormMinOrder(product.minOrderQuantity || 1);
    setFormLocality(product.locality);
    setFormRegion(product.region);
    setFormImageUrl(product.imageUrl);
    setFormIsOrganic(product.isOrganicCertified);
    setFormDeliveryOption(product.deliveryOptions?.join(', ') || 'Retrait direct sur champ');
    setIsModalOpen(true);
  };

  // Submit product create or update
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice || !formQuantity) return;

    const deliveryOpts = formDeliveryOption.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: formName,
        category: formCategory,
        description: formDescription,
        price: Number(formPrice),
        unit: formUnit,
        quantityAvailable: Number(formQuantity),
        minOrderQuantity: Number(formMinOrder),
        locality: formLocality,
        region: formRegion,
        imageUrl: formImageUrl,
        isOrganicCertified: formIsOrganic,
        deliveryOptions: deliveryOpts.length > 0 ? deliveryOpts : ['Retrait direct sur le champ'],
      });
    } else {
      addProduct({
        name: formName,
        category: formCategory,
        description: formDescription,
        price: Number(formPrice),
        unit: formUnit,
        quantityAvailable: Number(formQuantity),
        minOrderQuantity: Number(formMinOrder),
        locality: formLocality,
        region: formRegion,
        imageUrl: formImageUrl,
        isOrganicCertified: formIsOrganic,
        deliveryOptions: deliveryOpts.length > 0 ? deliveryOpts : ['Retrait direct sur le champ'],
      });
    }

    setIsModalOpen(false);
  };

  // Save profile changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProducerProfile({
      name: profileName,
      cooperativeName: profileCoop,
      phone: profilePhone,
      whatsapp: profileWhatsapp,
      region: profileRegion,
      locality: profileLocality,
      bio: profileBio,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner with Producer Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <img
            src={currentProducer.avatarUrl}
            alt={currentProducer.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Espace Producteur Agricole
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold text-slate-500">
                {currentProducer.locality} ({currentProducer.region})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-title mt-0.5">
              {currentProducer.name}
            </h1>
            {currentProducer.cooperativeName && (
              <p className="text-xs text-emerald-700 font-medium">
                {currentProducer.cooperativeName}
              </p>
            )}
          </div>
        </div>

        {/* Switch session helper for evaluation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="text-xs">
            <span className="block text-[10px] uppercase font-bold text-slate-400">
              Basculer de compte producteur :
            </span>
            <select
              value={currentProducer.id}
              onChange={e => {
                switchActiveProducer(e.target.value);
                const p = producers.find(x => x.id === e.target.value);
                if (p) {
                  setProfileName(p.name);
                  setProfileCoop(p.cooperativeName || '');
                  setProfilePhone(p.phone);
                  setProfileWhatsapp(p.whatsapp);
                  setProfileRegion(p.region);
                  setProfileLocality(p.locality);
                  setProfileBio(p.bio);
                }
              }}
              aria-label="Basculer de producteur"
              className="mt-0.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-[#fcfbf7] text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {producers.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.locality})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Publier un produit</span>
          </button>
        </div>

      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Mes annonces</span>
            <Package className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-title">
            {myProducts.length}
          </p>
          <span className="text-[11px] text-slate-500">Récoltes en ligne</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Demandes reçues</span>
            <Inbox className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-title">
            {myInquiries.length}
          </p>
          <span className="text-[11px] text-slate-500">Contacts acheteurs</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">En attente</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-amber-700 font-serif-title">
            {pendingInquiries.length}
          </p>
          <span className="text-[11px] text-amber-800/80 font-medium">À traiter d'urgence</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Valeur du stock</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg sm:text-xl font-bold text-emerald-800 font-serif-title truncate">
            {totalStockValue.toLocaleString()} <span className="text-xs font-normal text-slate-500">FCFA</span>
          </p>
          <span className="text-[11px] text-slate-500">Potentiel de vente</span>
        </div>

      </div>

      {/* DASHBOARD TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
            activeTab === 'listings'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Mes Annonces ({myProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`relative px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
            activeTab === 'inquiries'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Demandes reçues ({myInquiries.length})</span>
          {pendingInquiries.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 font-bold text-[10px]">
              {pendingInquiries.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
            activeTab === 'profile'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Mon Profil Producteur</span>
        </button>
      </div>

      {/* TAB CONTENT: MES ANNONCES */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-serif-title">
              Mes récoltes actuellement publiées
            </h2>
            <button
              onClick={handleOpenCreateModal}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un autre produit</span>
            </button>
          </div>

          {myProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                Vous n'avez pas encore publié de récolte
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Commencez par ajouter votre premier produit agricole pour toucher les acheteurs du Cameroun.
              </p>
              <button
                onClick={handleOpenCreateModal}
                className="mt-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Publier un produit maintenant</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 bg-slate-100">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-emerald-950/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded capitalize">
                        {product.category}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] px-2 py-0.5 rounded">
                        {product.locality}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-slate-900 line-clamp-1 font-serif-title">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Prix</span>
                          <span className="font-extrabold text-emerald-800">
                            {product.price.toLocaleString()} FCFA
                          </span>
                          <span className="text-slate-500 text-[10px]"> / {product.unit}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block uppercase">Stock</span>
                          <span className="font-bold text-slate-800">
                            {product.quantityAvailable} {product.unit}s
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => navigateToProductDetail(product.id)}
                      className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-emerald-800 font-semibold flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Aperçu</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-emerald-800 text-xs font-semibold flex items-center gap-1"
                        title="Modifier"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Modifier</span>
                      </button>

                      <button
                        onClick={() => setProductToDelete(product)}
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: DEMANDES REÇUES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-serif-title">
              Demandes et commandes des acheteurs
            </h2>
            <span className="text-xs text-slate-500">
              {myInquiries.length} demande(s) au total
            </span>
          </div>

          {myInquiries.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-2">
              <Inbox className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                Aucune demande reçue pour l'instant
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Lorsque des acheteurs commanderont vos produits sur Agri Bio, leurs coordonnées et messages apparaîtront ici.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {myInquiries.map(inq => {
                const isPending = inq.status === 'en_attente';
                const isConfirmed = inq.status === 'confirmée';
                const isDelivered = inq.status === 'livrée';
                const isRejected = inq.status === 'rejetée';

                const whatsappNumber = inq.buyerPhone.replace(/\D/g, '');
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Bonjour ${inq.buyerName}, je vous recontacte concernant votre commande de ${inq.productName} sur Agri Bio.`)}`;

                return (
                  <div
                    key={inq.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-base font-serif-title">
                            {inq.buyerName}
                          </h3>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isPending
                              ? 'bg-amber-100 text-amber-800'
                              : isConfirmed
                              ? 'bg-blue-100 text-blue-800'
                              : isDelivered
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {inq.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Produit : <strong>{inq.productName}</strong> • Reçue le {new Date(inq.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>

                      <div className="text-right sm:self-start">
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">Montant estimé</span>
                        <span className="text-base font-extrabold text-emerald-800">
                          {inq.totalEstimatedPrice.toLocaleString()} FCFA
                        </span>
                        <span className="text-xs text-slate-500 block">
                          pour {inq.quantityRequested} unité(s)
                        </span>
                      </div>
                    </div>

                    {/* Details Box */}
                    <div className="p-3.5 rounded-xl bg-[#fcfbf7] border border-slate-200/70 text-xs space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                        <div>
                          <span className="text-slate-400 font-semibold block text-[10px] uppercase">Destination</span>
                          <span className="font-medium">{inq.buyerCity}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-semibold block text-[10px] uppercase">Téléphone acheteur</span>
                          <span className="font-semibold text-emerald-900">{inq.buyerPhone}</span>
                        </div>
                      </div>

                      {inq.message && (
                        <div className="pt-2 border-t border-slate-200/60">
                          <span className="text-slate-400 font-semibold block text-[10px] uppercase">Message</span>
                          <p className="text-slate-600 italic">« {inq.message} »</p>
                        </div>
                      )}
                    </div>

                    {/* Actions and Status update */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      
                      {/* Contact buyer directly */}
                      <div className="flex items-center gap-2">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Contacter sur WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${inq.buyerPhone}`}
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Appeler</span>
                        </a>
                      </div>

                      {/* Status Buttons */}
                      <div className="flex items-center gap-1.5">
                        {isPending && (
                          <>
                            <button
                              onClick={() => updateInquiryStatus(inq.id, 'confirmée')}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Confirmer la commande</span>
                            </button>
                            <button
                              onClick={() => updateInquiryStatus(inq.id, 'rejetée')}
                              className="px-2.5 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold"
                            >
                              Rejeter
                            </button>
                          </>
                        )}

                        {isConfirmed && (
                          <button
                            onClick={() => updateInquiryStatus(inq.id, 'livrée')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>Marquer comme livrée & payée</span>
                          </button>
                        )}

                        {isDelivered && (
                          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Livraison et encaissement terminés</span>
                          </span>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MON PROFIL PRODUCTEUR */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-serif-title">
              Modifier mon profil d'agriculteur
            </h2>
            <p className="text-xs text-slate-500">
              Ces informations sont affichées sur toutes vos annonces publiques et permettent aux acheteurs de vous contacter en toute confiance.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nom complet du producteur *
                </label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nom de la coopérative ou GIC
                </label>
                <input
                  type="text"
                  placeholder="Ex: Coopérative Maraîchère du Noun"
                  value={profileCoop}
                  onChange={e => setProfileCoop(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Région du Cameroun *
                </label>
                <select
                  value={profileRegion}
                  onChange={e => setProfileRegion(e.target.value as any)}
                  aria-label="Région du producteur"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                >
                  {REGIONS_CAMEROON.map(reg => (
                    <option key={reg} value={reg}>Région du {reg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Localité / Bassin de production *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Foumbot, Sa'a, Njombé, Santa"
                  value={profileLocality}
                  onChange={e => setProfileLocality(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Numéro de téléphone d'appel direct *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+237 6XX XX XX XX"
                  value={profilePhone}
                  onChange={e => setProfilePhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Numéro WhatsApp (avec indicatif +237) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+2376XXXXXXXX"
                  value={profileWhatsapp}
                  onChange={e => setProfileWhatsapp(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Présentation de l'exploitation & engagement qualité
              </label>
              <textarea
                rows={4}
                value={profileBio}
                onChange={e => setProfileBio(e.target.value)}
                placeholder="Parlez de votre expérience, vos méthodes de culture (bio, compost naturel), et vos garanties de fraîcheur..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Enregistrer les modifications
              </button>
            </div>

          </form>
        </div>
      )}

      {/* MODAL: AJOUTER / MODIFIER UN PRODUIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
            
            {/* Header */}
            <div className="bg-emerald-950 p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                  {editingProductId ? 'Édition d’annonce' : 'Nouvelle offre agricole'}
                </span>
                <h3 className="text-xl font-bold font-serif-title mt-0.5">
                  {editingProductId ? 'Modifier la récolte' : 'Publier une récolte sur Agri Bio'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-emerald-300 hover:text-white p-1"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tomates fraîches de Foumbot (Cobra)"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Filière / Catégorie *
                  </label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    aria-label="Filière ou catégorie"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white capitalize"
                  >
                    {CATEGORIES_LIST.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Quantity & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Prix unitaire en FCFA *
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    step={100}
                    value={formPrice}
                    onChange={e => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Unité de vente *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cageot de 35 kg, Sac 100 kg, Régime"
                    value={formUnit}
                    onChange={e => setFormUnit(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quantité totale disponible *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formQuantity}
                    onChange={e => setFormQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Location & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Localité / Marché de collecte *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Foumbot, Bafoussam, Sa'a, Njombé"
                    value={formLocality}
                    onChange={e => setFormLocality(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Région *
                  </label>
                  <select
                    value={formRegion}
                    onChange={e => setFormRegion(e.target.value as any)}
                    aria-label="Région de collecte"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    {REGIONS_CAMEROON.map(reg => (
                      <option key={reg} value={reg}>Région du {reg}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photo Preset Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Photo de la récolte (Choisir un modèle ou entrer une URL) *</span>
                </label>
                
                {/* Visual Preset Thumbnails */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {PHOTO_PRESETS.slice(0, 10).map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormImageUrl(preset.url)}
                      className={`relative rounded-lg overflow-hidden h-14 border-2 transition-all ${
                        formImageUrl === preset.url
                          ? 'border-emerald-700 ring-2 ring-emerald-500 scale-95'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-white text-[8px] truncate px-1">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>

                <input
                  type="url"
                  required
                  placeholder="URL directe de l'image (https://...)"
                  value={formImageUrl}
                  onChange={e => setFormImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description détaillée de la récolte
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="État de maturité, date estimée de cueillette, calibre, conservation..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Options de retrait / livraison (séparées par une virgule)
                </label>
                <input
                  type="text"
                  value={formDeliveryOption}
                  onChange={e => setFormDeliveryOption(e.target.value)}
                  placeholder="Retrait sur champ, Expédition par camion gare, Livraison Douala"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsOrganic}
                    onChange={e => setFormIsOrganic(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    Produit cultivé selon des normes biologiques / agro-écologiques (sans pesticides de synthèse)
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-md transition-colors"
                >
                  {editingProductId ? 'Mettre à jour l’annonce' : 'Publier mon produit'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900 font-serif-title">
                Supprimer cette annonce ?
              </h3>
              <p className="text-xs text-slate-500">
                Êtes-vous sûr de vouloir retirer « <strong>{productToDelete.name}</strong> » de la plateforme Agri Bio ?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  deleteProduct(productToDelete.id);
                  setProductToDelete(null);
                }}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
