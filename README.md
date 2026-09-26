# Agri Bio Cameroun 🇨🇲🌾

> **« Connecter les producteurs aux marchés »**  
> Plateforme agricole camerounaise dédiée à la **Piste 1 — Transformation structurelle de l'économie**, facilitant la commercialisation directe des récoltes bord champ et réduisant drastiquement les pertes post-récolte.

---

## 🌟 Fonctionnalités Clés

### 👩‍🌾 Pour les Producteurs Agricoles
- **Profil Producteur & Coopérative** : Présentation du bassin agricole (Foumbot, Sa'a, Njombé, Santa, Oku...), contact direct WhatsApp et appel téléphonique.
- **Publication d'Annonces** : Ajout rapide de récoltes avec photos haute résolution, prix en FCFA, quantité disponible, unité de mesure, localité et label bio/agro-écologique.
- **Tableau de Bord Complet** :
  - Suivi des récoltes en ligne et valeur estimée du stock
  - Modification et suppression d'annonces
  - Gestion des commandes acheteurs avec changement de statut (*En attente*, *Confirmée*, *Livrée*, *Rejetée*)
  - Mise à jour du profil de l'exploitation

### 🛒 Pour les Acheteurs (Ménages, Restaurants, Grossistes)
- **Catalogue & Marché Agricole en Direct** : Découverte des récoltes fraîches récoltées le jour même.
- **Recherche & Filtres Avancés** :
  - Recherche textuelle instantanée (nom, localité, producteur)
  - Filtre par 7 filières : *Céréales*, *Fruits*, *Légumes*, *Tubercules*, *Légumineuses*, *Produits transformés*, *Autres produits agricoles*
  - Filtre par région administrative du Cameroun (Centre, Littoral, Ouest, Nord-Ouest, etc.)
  - Filtre par certification bio
  - Tri par prix croissant/décroissant, stock disponible ou récence
- **Fiche Détaillée & Contact** : Modalités de retrait (champ, gare routière, livraison), contact instantané via bouton WhatsApp ou formulaire de commande direct.

---

## 🚀 Démarrage Rapide

### 1. Prérequis
- [Node.js](https://nodejs.org/) version 18 ou supérieure
- `npm` ou `pnpm` ou `yarn`

### 2. Installation des dépendances
```bash
npm install
```

### 3. Lancer en local (Développement)
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:3000`.

### 4. Compiler pour la production
```bash
npm run build
```
Le dossier optimisé `dist/` est généré.

---

## 🌐 Déploiement sur Vercel

Le projet est configuré pour un déploiement Vercel immédiat sans configuration complexe :

1. Poussez le dépôt sur votre compte **GitHub**.
2. Connectez-vous sur [Vercel](https://vercel.com/) et cliquez sur **« Add New Project »**.
3. Importez votre dépôt GitHub `agri-bio-cameroun`.
4. Paramètres de compilation détectés automatiquement :
   - **Framework Preset** : `Vite`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`
5. Cliquez sur **Deploy**.

> Le fichier `vercel.json` inclus gère nativement la réécriture des routes SPA pour éviter toute erreur 404 lors du rafraîchissement.

---

## 📁 Arborescence du Projet

```text
├── index.html                  # Point d'entrée HTML avec meta tags et typographie
├── metadata.json               # Métadonnées et permissions de l'application
├── package.json                # Dépendances et scripts npm
├── vercel.json                 # Configuration des réécritures SPA pour Vercel
├── vite.config.ts              # Configuration Vite & Tailwind CSS
├── tsconfig.json               # Configuration TypeScript
├── src/
│   ├── main.tsx                # Point de montage React
│   ├── App.tsx                 # Composant racine et routage interne
│   ├── index.css               # Styles Tailwind CSS et polices
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript (Product, Producer, OrderInquiry)
│   ├── data/
│   │   └── mockData.ts         # Données réalistes camerounaises (Ouest, Centre, Littoral...)
│   ├── context/
│   │   └── AppContext.tsx      # Gestion d'état global avec persistance localStorage
│   ├── components/
│   │   ├── Header.tsx          # Barre de navigation responsive avec logo et actions
│   │   ├── Footer.tsx          # Pied de page avec bassins agricoles et reset démo
│   │   ├── InquiryModal.tsx    # Modal de commande et contact direct WhatsApp
│   │   └── ToastContainer.tsx  # Système de notifications visuelles
│   └── views/
│       ├── HomeView.tsx        # Page d'accueil, métriques d'impact et filières
│       ├── ProductsView.tsx    # Catalogue filtrable des produits agricoles
│       ├── ProductDetailView.tsx # Fiche complète produit et coordonnées producteur
│       ├── ProducerProfileView.tsx # Profil public du producteur et ses offres
│       ├── ProducerDashboardView.tsx # Tableau de bord CRUD producteur et commandes
│       ├── AboutView.tsx       # Mission Piste 1 et réduction des pertes post-récolte
│       └── ContactView.tsx     # Formulaire de contact et FAQ Cameroun (MoMo, transport)
```

---

## 🛡️ Données de Démonstration
Les données initiales couvrent des localités camerounaises réelles (Foumbot, Sa'a, Njombé, Penja, Dschang, Santa, Oku). Les modifications et ajouts sont automatiquement stockés dans le `localStorage` de votre navigateur. Un bouton **« Réinitialiser les données démo »** est disponible dans le pied de page à tout moment.
