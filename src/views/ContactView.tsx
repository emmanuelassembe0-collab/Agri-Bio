import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Clock
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+237 ');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Partenariat / Renseignement');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setSubmitted(true);
    showToast('Votre message a été transmis à l’équipe Agri Bio !', 'success');
  };

  const faqs = [
    {
      q: 'Comment s’effectue le paiement des récoltes ?',
      a: 'Le paiement est effectué directement entre l’acheteur et le producteur sans commission abusive, principalement par Orange Money ou MTN Mobile Money (MoMo) au moment du chargement ou à la livraison constatée. Les grands acheteurs (hôtels, meuneries) peuvent également convenir de virements bancaires.'
    },
    {
      q: 'Comment acheminer les récoltes depuis l’Ouest ou le Littoral vers Yaoundé / Douala ?',
      a: 'Trois options principales sont courantes sur Agri Bio : 1) Le retrait direct sur champ par l’acheteur disposant de son propre camion ; 2) L’expédition par agences de transport interurbain agréées (Général Express, Buca Voyages, Touristique Express, etc.) ; 3) Le groupage organisé par les coopératives avec des transporteurs partenaires.'
    },
    {
      q: 'Qu’est-ce qui garantit que les produits sont « Bio » ou agroécologiques ?',
      a: 'Les producteurs partenaires d’Agri Bio s’engagent à respecter une charte agroécologique (zéro pesticide de synthèse résiduel, engrais de fiente compostée, rotation des cultures). Les coopératives certifiées et les IGP reconnues (comme le Poivre de Penja ou le Miel d’Oku) font l’objet de vérifications de conformité.'
    },
    {
      q: 'Je suis président d’un GIC ou d’une coopérative, comment inscrire nos membres ?',
      a: 'Vous pouvez créer immédiatement un compte producteur dans l’espace dédié ou contacter notre équipe d’assistance pour enregistrer l’ensemble de vos membres et mutualiser vos annonces de récoltes.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          À votre écoute
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif-title">
          Contact & Assistance Agri Bio
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Une question sur une commande, un besoin d'assistance logistique ou un partenariat avec votre coopérative ? Notre équipe est disponible.
        </p>
      </div>

      {/* Grid: Coordinates & Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left: Contact Info */}
        <div className="md:col-span-5 space-y-6">
          
          <div className="p-6 rounded-3xl bg-emerald-950 text-white space-y-6 shadow-md">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Liaison directe
              </span>
              <h3 className="text-xl font-bold font-serif-title mt-1">
                Coordination Nationale
              </h3>
            </div>

            <div className="space-y-4 text-xs text-emerald-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Bureaux régionaux :</strong>
                  <span>Yaoundé (Quartier Bastos / Mokolo) & Douala (Akwa)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Téléphone direct :</strong>
                  <span>+237 677 45 12 34 / +237 699 23 88 10</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">WhatsApp Support :</strong>
                  <span>+237 677 45 12 34</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Courriel :</strong>
                  <span>contact@agribio.cm</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Horaires d'assistance :</strong>
                  <span>Du Lundi au Samedi : 07h00 – 19h00 (Heure du Cameroun)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-800">
              <a
                href="https://wa.me/237677451234?text=Bonjour%20Agri%20Bio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuter avec l'équipe sur WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right: Interactive Form */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-serif-title">
                Message envoyé avec succès !
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Merci {name}. Un conseiller de l'équipe Agri Bio vous recontactera sur le numéro <strong>{phone}</strong> dans les plus brefs délais.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-serif-title">
                Formulaire de contact rapide
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Paul Kemajou"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Téléphone (Cameroun) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+237 6XX XX XX XX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Adresse email (optionnel)
                  </label>
                  <input
                    type="email"
                    placeholder="nom@exemple.cm"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Objet de votre demande
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="Partenariat / Renseignement">Partenariat / Renseignement</option>
                    <option value="Inscription d'une coopérative">Inscription d'une coopérative agricole</option>
                    <option value="Assistance sur une commande">Assistance sur une commande</option>
                    <option value="Groupage & Transport">Groupage logistique & Transport</option>
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Votre message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Décrivez votre besoin, les volumes recherchés ou la localisation de vos champs..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Transmettre mon message</span>
              </button>
            </form>
          )}

        </div>

      </div>

      {/* FAQ Accordion */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Foire Aux Questions
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-serif-title">
            Questions fréquentes des utilisateurs
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
