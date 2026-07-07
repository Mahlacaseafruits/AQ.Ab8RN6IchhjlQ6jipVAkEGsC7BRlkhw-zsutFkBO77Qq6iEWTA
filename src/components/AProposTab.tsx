import React from 'react';
import { BUSINESS_INFO } from '../data/appData';
import { ShieldCheck, Award, Users, Wrench, HeartHandshake, CheckCircle2, Sun, Moon, Settings, MonitorPlay } from 'lucide-react';

interface AProposTabProps {
  theme?: 'dark' | 'sun';
  setTheme?: (val: 'dark' | 'sun') => void;
}

export const AProposTab: React.FC<AProposTabProps> = ({ theme = 'dark', setTheme }) => {
  return (
    <div className="space-y-12 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>L'Excellence Artisanale au Cameroun</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            ⭐ À propos de Major Plomberie & Fils
          </h1>
          <p className="text-lg text-blue-300 font-medium italic">
            « Une entreprise familiale dévouée à la solidité de vos installations sanitaires à Foumbot, Bafoussam et Foumban. »
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fondée et dirigée par un artisan d'expérience assisté de ses fils formés aux techniques modernes de tuyauterie, <strong className="text-white">Major Plomberie & Fils</strong> s'est imposée comme la référence de fiabilité dans la région de l'Ouest du Cameroun.
          </p>
        </div>

        <div className="relative z-10 shrink-0 flex flex-col items-center">
          <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white p-2 shadow-2xl ring-4 ring-blue-500/50 flex items-center justify-center overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/images/logo_major_plomberie.jpg" 
              alt="Blason Major Plomberie & Fils" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="mt-3 text-xs font-bold font-display text-blue-300 uppercase tracking-widest bg-blue-950/80 px-3 py-1 rounded-full border border-blue-500/30">
            Blason Officiel Agrée
          </span>
        </div>
      </div>

      {/* App Parameters / Settings Section */}
      <section className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-slate-800/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Settings className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-white">⚙️ Paramètres d'Affichage & Terrain</h2>
            <p className="text-xs text-slate-400 mt-0.5">Optimisez l'application pour une visibilité maximale lors de vos interventions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Theme selection description */}
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pour s'adapter aux conditions de travail des plombiers et des clients, Major Plomberie & Fils propose deux thèmes visuels.
            </p>
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-400 space-y-2">
              <span className="font-bold text-amber-400 block">💡 Mode Plein Soleil (Clair Haute Lisibilité) :</span>
              <p className="leading-relaxed">
                Recommandé pour les chantiers en extérieur sous un soleil de plomb (Foumbot, marchés extérieurs de Bafoussam, châteaux d'eau de Foumban). Ce mode élimine les reflets gênants de l'écran et propose un contraste maximal.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
              <span>Version : v1.4.2 PRO</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Base de données en direct
              </span>
            </div>
          </div>

          {/* Theme selection toggles */}
          <div className="flex flex-col gap-3 justify-center">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Choisissez votre mode :</label>
            <div className="grid grid-cols-2 gap-3.5">
              {/* Option Dark */}
              <button
                onClick={() => setTheme && setTheme('dark')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-3 text-center transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-blue-600/10 border-blue-500 text-white shadow-lg ring-1 ring-blue-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-900 text-slate-500'}`}>
                  <Moon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold block">Sombre Nocturne</span>
                  <span className="text-[10px] text-slate-500 font-normal">Idéal en intérieur / soir</span>
                </div>
              </button>

              {/* Option Sun */}
              <button
                onClick={() => setTheme && setTheme('sun')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-3 text-center transition-all cursor-pointer ${
                  theme === 'sun'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-lg ring-1 ring-amber-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center ${theme === 'sun' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-900 text-slate-500'}`}>
                  <Sun className={`w-5 h-5 ${theme === 'sun' ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold block">Plein Soleil (Clair)</span>
                  <span className="text-[10px] text-slate-500 font-normal">Haute lisibilité terrain</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Technologie PPR & Soudure</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Nous avons abandonné les vieilles méthodes de tuyaux collés qui lâchent au bout de quelques années. Nous utilisons la thermofusion PPR : le tuyau et les raccords fondent ensemble pour devenir une pièce unique increvable.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Transmission & Famille</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Le nom « & Fils » n'est pas un hasard : c'est la garantie d'une transmission de savoir-faire rigoureux, du respect du client et d'une ponctualité exemplaire sur chaque chantier confié.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Honnêteté & Transparence</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Nous établissons toujours un diagnostic clair avant de commencer et nous ne facturons que ce qui est réellement nécessaire pour réparer ou installer vos sanitaires durablement.
          </p>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-8 border border-blue-500/30 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="font-display font-extrabold text-3xl sm:text-4xl text-blue-400">12+</div>
          <div className="text-xs sm:text-sm text-slate-300 mt-1">Années de pratique</div>
        </div>
        <div>
          <div className="font-display font-extrabold text-3xl sm:text-4xl text-emerald-400">850+</div>
          <div className="text-xs sm:text-sm text-slate-300 mt-1">Chantiers livrés</div>
        </div>
        <div>
          <div className="font-display font-extrabold text-3xl sm:text-4xl text-amber-400">100%</div>
          <div className="text-xs sm:text-sm text-slate-300 mt-1">Clients satisfaits</div>
        </div>
        <div>
          <div className="font-display font-extrabold text-3xl sm:text-4xl text-purple-400">24/7</div>
          <div className="text-xs sm:text-sm text-slate-300 mt-1">Disponibilité Urgence</div>
        </div>
      </div>

      {/* Checklist of commitments */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <h3 className="font-display font-bold text-xl text-white">
          🛠️ Nos 6 engagements sur tous vos travaux
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Respect strict des normes d'étanchéité et de pression d'eau",
            "Nettoyage complet de la pièce après intervention",
            "Utilisation exclusive de pièces de rechange d'origine certifiée",
            "Dépannage d'urgence assuré même les dimanches et jours fériés",
            "Conseil gratuit pour l'entretien de votre chauffe-eau et tuyauterie",
            "Devis écrit ou message WhatsApp récapitulatif avant tous travaux"
          ].map((point, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
