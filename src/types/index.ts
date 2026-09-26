export type ProductCategory = 
  | 'céréales'
  | 'fruits'
  | 'légumes'
  | 'tubercules'
  | 'légumineuses'
  | 'produits transformés'
  | 'autres produits agricoles';

export type CameroonRegion =
  | 'Centre'
  | 'Littoral'
  | 'Ouest'
  | 'Nord-Ouest'
  | 'Sud-Ouest'
  | 'Sud'
  | 'Est'
  | 'Adamaoua'
  | 'Nord'
  | 'Extrême-Nord';

export interface Producer {
  id: string;
  name: string;
  cooperativeName?: string;
  region: CameroonRegion;
  locality: string;
  phone: string;
  whatsapp: string;
  email?: string;
  bio: string;
  avatarUrl: string;
  certifiedBio: boolean;
  memberSince: string;
  rating: number;
  totalReviews: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number; // in FCFA (XAF)
  unit: string; // kg, sac 50kg, sac 100kg, régime, cageot, carton, bouteille, litre
  quantityAvailable: number;
  minOrderQuantity?: number;
  locality: string;
  region: CameroonRegion;
  producerId: string;
  producerName: string;
  imageUrl: string;
  harvestDate?: string;
  deliveryOptions: string[];
  isOrganicCertified: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type InquiryStatus = 'en_attente' | 'confirmée' | 'livrée' | 'rejetée';

export interface OrderInquiry {
  id: string;
  productId: string;
  productName: string;
  producerId: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  buyerCity: string;
  quantityRequested: number;
  totalEstimatedPrice: number;
  deliveryPreference: 'livraison_domicile' | 'retrait_gare' | 'retrait_exploitation';
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export type ActiveView = 
  | 'home' 
  | 'products' 
  | 'product-detail' 
  | 'producer-profile' 
  | 'producer-dashboard' 
  | 'about' 
  | 'contact';
