import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  TrendingUp, 
  AlertOctagon, 
  Lightbulb, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Scale, 
  Leaf, 
  HeartHandshake 
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView, navigateToDashboard } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero / Vision */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
          <Sprout className="w-3.5 h-3.5 text-emerald-700" />
          <span>Piste 1 — Transformation structurelle de l'économie</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-serif-title tracking-tight leading-tight">
          Notre Mission : Transformer l'agriculture <br className="hidden sm:inline" />
          camerounaise en valorisant chaque récolte
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          <strong>Agri Bio</strong> est née d'un constat alarmant : des tonnes de vivres précieux périssent chaque jour le long des pistes rurales du Cameroun, tandis que les familles et restaurateurs urbains font face à la cherté de la vie.
        </p>
      </div>

      {/* Le Drame des Pertes Post-Récolte au Cameroun */}
      <div className="rounded-3xl bg-amber-500/10 border border-amber-600/20 p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-3 text-amber-900">
          <AlertOctagon className="w-6 h-6 text-amber-700" />
          <h2 className="text-xl sm:text-2xl font-bold font-serif-title">
            Le défi critique des pertes post-récolte au Cameroun
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700 text-sm">
          <div className="space-y-2">
            <span className="text-3xl font-extrabold text-amber-800 font-serif-title">35% à 45%</span>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Des récoltes périssables perdues</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tomates du Noun, plantains du Moungo, manioc de la Lekié et légumes verts pourrissent fréquemment sur place faute d'acheteurs immédiats ou de chambres froides.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-3xl font-extrabold text-amber-800 font-serif-title">x3 à x4</span>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Multiplication des prix en ville</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Les chaînes d'intermédiaires spéculatifs (« coxers ») captent jusqu'à 70% de la valeur ajoutée au détriment direct du paysan qui produit à la sueur de son front.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-3xl font-extrabold text-amber-800 font-serif-title">Insécurité</span>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Précarité des revenus ruraux</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Faute d'anticipation commerciale, les producteurs sont contraints de brader leurs récoltes au premier venu sous la menace du pourrissement.
            </p>
          </div>
        </div>
      </div>

      {/* Le Rôle d'Agri Bio : La Solution Numérique */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Notre Réponse Concrète
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-title">
            Comment Agri Bio opère la transformation structurelle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif-title">
              Visibilité Numérique Immédiate
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chaque agriculteur ou coopérative dispose d'une vitrine numérique accessible depuis n'importe quel smartphone avec ses stocks réels en temps réel.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif-title">
              Vente Anticipée (Pré-commandes)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Les acheteurs de Douala et Yaoundé réservent les récoltes avant la coupe. Le camion de groupage est organisé à l'avance : zéro perte sur le carreau.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif-title">
              Juste Rémunération & Bio
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              En éliminant les intermédiaires superflus, les producteurs augmentent leur marge nette de 40%, incitant à l'agroécologie sans pesticides dangereux.
            </p>
          </div>

        </div>
      </div>

      {/* Nos Engagements */}
      <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 space-y-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 font-serif-title text-center">
          Les 4 piliers de la charte éthique Agri Bio
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="flex gap-3">
            <Scale className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Équité des échanges</h4>
              <p className="text-xs text-slate-600 mt-1">Transparence totale des prix bord champ affichés au vu et au su de tous.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Leaf className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Promotion de l'agro-écologie</h4>
              <p className="text-xs text-slate-600 mt-1">Encouragement des intrants biologiques (fiente, compost, biopesticides locaux).</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Users className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Soutien aux femmes rurales & coopératives</h4>
              <p className="text-xs text-slate-600 mt-1">Valorisation de la transformation locale (manioc en bâtons, séchage, huileries artisanales).</p>
            </div>
          </div>

          <div className="flex gap-3">
            <HeartHandshake className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Paiement Mobile Money direct</h4>
              <p className="text-xs text-slate-600 mt-1">Transactions rapides de gré à gré sans retenues arbitraires.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-xl font-bold text-slate-900 font-serif-title">
          Participez à la transformation agricole du Cameroun
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-md transition-colors"
          >
            Découvrir le catalogue des récoltes
          </button>
          <button
            onClick={() => navigateToDashboard()}
            className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors"
          >
            Accéder à l'espace producteur
          </button>
        </div>
      </div>

    </div>
  );
};
