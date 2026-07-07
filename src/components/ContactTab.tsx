import React from 'react';
import { BUSINESS_INFO, FAQ_ITEMS } from '../data/appData';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldAlert, CheckCircle2, HelpCircle, Wallet } from 'lucide-react';

export const ContactTab: React.FC = () => {
  return (
    <div className="space-y-12 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-3">
        <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Disponibilité Immédiate 7j/7</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          📞 Contact Direct & WhatsApp
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Pour une intervention immédiate ou un conseil technique à Foumbot, Bafoussam ou Foumban, contactez directement Major Plomberie par téléphone ou WhatsApp.
        </p>
      </div>

      {/* Main Contact Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Direct Call Card */}
        <div className="bg-gradient-to-br from-red-950/60 to-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-red-500/40 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/40">
              <Phone className="w-7 h-7 fill-current animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Appel Vocal Direct</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
                {BUSINESS_INFO.phoneDisplay}
              </h3>
            </div>
            <p className="text-sm text-slate-300">
              Idéal en cas de grosse fuite d'eau, canalisation bouchée en urgence ou si vous souhaitez parler directement au chef d'équipe Major.
            </p>
          </div>

          <a
            href={`tel:${BUSINESS_INFO.phoneFull}`}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-base py-4 px-6 rounded-2xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 transition-all hover:scale-102 active:scale-98 border border-red-400/50"
          >
            <Phone className="w-5 h-5 fill-current" />
            <span>Lancer l'appel direct (+237 640 321 535)</span>
          </a>
        </div>

        {/* Direct WhatsApp Card */}
        <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/40 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40">
              <MessageCircle className="w-7 h-7 fill-current" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Chat WhatsApp 24h/24</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
                {BUSINESS_INFO.phoneDisplay}
              </h3>
            </div>
            <p className="text-sm text-slate-300">
              Envoyez-nous des photos ou vidéos de votre fuite ou salle de bain à rénover. Réponse garantie avec estimation rapide !
            </p>
          </div>

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Bonjour%20Major%20Plomberie%2C%20je%20souhaite%20vous%20contacter%20pour%20des%20travaux%20de%20plomberie.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-3 transition-all hover:scale-102 active:scale-98 border border-emerald-400/50"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Ouvrir la discussion WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Quick WhatsApp Templates */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span>⚡ Messages WhatsApp rapides à cliquer :</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "🚨 Urgence Fuite d'eau", msg: "Bonjour Major, j'ai une urgence de fuite d'eau chez moi à Foumbot. Pouvez-vous passer ?" },
            { label: "🚿 Devis Salle de Bain", msg: "Bonjour Major, je souhaite un devis pour installer une douche italienne et WC." },
            { label: "🔥 Réparation Chauffe-eau", msg: "Bonjour Major, mon chauffe-eau électrique a un problème de pression et de chaleur." },
          ].map((t, idx) => (
            <a
              key={idx}
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(t.msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-950 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 p-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-emerald-300 transition-all flex items-center gap-2"
            >
              <span>{t.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Payment Policy Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/40 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Politique de Paiement Major Plomberie</span>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              Règlement après service rendu !
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Pour une transparence totale et votre sérénité, vous payez uniquement après la réalisation de votre dépannage ou de votre installation et la vérification du travail bien fait.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-2xl border border-orange-500/40 flex items-center justify-between shadow-md">
            <div>
              <span className="text-xs font-bold text-orange-400 block uppercase tracking-wide">Orange Money</span>
              <span className="font-mono font-extrabold text-lg sm:text-xl text-white">640 321 535</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 font-extrabold text-xs border border-orange-500/30">
              OM
            </div>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-yellow-500/40 flex items-center justify-between shadow-md">
            <div>
              <span className="text-xs font-bold text-yellow-400 block uppercase tracking-wide">MTN Mobile Money (MoMo)</span>
              <span className="font-mono font-extrabold text-lg sm:text-xl text-white">651 017 585</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-extrabold text-xs border border-yellow-500/30">
              MTN
            </div>
          </div>
        </div>
      </div>

      {/* Other Info Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
          <Mail className="w-6 h-6 text-blue-400" />
          <h4 className="font-bold text-white text-sm">Adresse E-mail</h4>
          <a href={`mailto:${BUSINESS_INFO.email}`} className="text-xs text-blue-400 hover:underline break-all block">
            {BUSINESS_INFO.email}
          </a>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
          <MapPin className="w-6 h-6 text-amber-400" />
          <h4 className="font-bold text-white text-sm">Ville Siège</h4>
          <p className="text-xs text-slate-300">
            Foumbot, Région de l'Ouest, Cameroun
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
          <Clock className="w-6 h-6 text-emerald-400" />
          <h4 className="font-bold text-white text-sm">Horaires d'ouverture</h4>
          <p className="text-xs text-slate-300">
            Lun - Sam : 07h00 - 19h00<br />
            Urgence 24h/24 & 7j/7
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            <span>Questions Fréquentes (Aperçu)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQ_ITEMS.slice(0, 4).map((faq, idx) => (
            <div key={idx} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
              <h4 className="font-bold text-white text-sm">{faq.question || faq.q}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">{faq.answer || faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
