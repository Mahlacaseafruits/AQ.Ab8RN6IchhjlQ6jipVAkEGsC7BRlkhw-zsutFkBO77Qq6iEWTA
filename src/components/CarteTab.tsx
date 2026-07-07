import React, { useState } from 'react';
import { INTERVENTION_ZONES, BUSINESS_INFO } from '../data/appData';
import { MapPin, Navigation, Clock, ShieldCheck, Phone, ExternalLink, Compass } from 'lucide-react';

export const CarteTab: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('Foumbot (Siège)');

  const currentZoneInfo = INTERVENTION_ZONES.find(z => z.name === selectedZone) || INTERVENTION_ZONES[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Région de l'Ouest • Rayon d'action de 40 km</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          📍 Carte & Zones d'Intervention
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Basés au cœur de <strong className="text-white">Foumbot</strong>, nous intervenons avec nos camionnettes équipées dans tout le département du Noun et de la Mifi, notamment à <strong className="text-white">Bafoussam</strong> et <strong className="text-white">Foumban</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Map Canvas / Visualizer */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span>🗺️ Carte Interactive du Secteur Ouest</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              ● Camionnettes Prêtes
            </span>
          </div>

          {/* Styled Map Container */}
          <div className="relative w-full aspect-16/11 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-2xl border border-slate-700/80 p-6 overflow-hidden shadow-inner flex items-center justify-center">
            {/* Background Grid & Rivers */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 50,300 Q 150,220 250,250 T 450,180 T 650,120" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6,4" />
            </svg>

            {/* Map Roads lines between Foumbot, Bafoussam, and Foumban */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Route Foumbot -> Bafoussam */}
              <line x1="50%" y1="55%" x2="25%" y2="65%" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4" className="animate-pulse" />
              {/* Route Foumbot -> Foumban */}
              <line x1="50%" y1="55%" x2="78%" y2="30%" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4" />
            </svg>

            {/* City Pin 1: Bafoussam (Left / South-West) */}
            <button
              onClick={() => setSelectedZone('Bafoussam')}
              className={`absolute top-[58%] left-[18%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all z-20 ${
                selectedZone === 'Bafoussam' ? 'scale-125' : 'hover:scale-110 opacity-85 hover:opacity-100'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/50 ring-4 ring-blue-400/30">
                <MapPin className="w-5 h-5 fill-current" />
              </div>
              <span className="mt-1.5 bg-slate-900 px-2.5 py-1 rounded-lg text-xs font-bold text-white border border-blue-500/50 shadow-md whitespace-nowrap">
                📍 Bafoussam
              </span>
              <span className="text-[9px] text-slate-400 font-mono">~35 min</span>
            </button>

            {/* City Pin 2: Foumbot (Center HQ) */}
            <button
              onClick={() => setSelectedZone('Foumbot (Siège)')}
              className={`absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all z-30 ${
                selectedZone === 'Foumbot (Siège)' ? 'scale-125' : 'hover:scale-110'
              }`}
            >
              <div className="relative">
                <span className="absolute -inset-2 rounded-full bg-amber-400/30 animate-ping" />
                <div className="w-13 h-13 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-xl shadow-amber-500/50 ring-4 ring-amber-300">
                  <Navigation className="w-6 h-6 fill-current" />
                </div>
              </div>
              <span className="mt-2 bg-amber-500 text-slate-950 px-3 py-1 rounded-lg text-xs font-extrabold shadow-lg whitespace-nowrap border border-amber-300">
                🏠 FOUMBOT (Siège)
              </span>
              <span className="text-[10px] text-amber-300 font-bold font-mono">Intervention 15-30 min</span>
            </button>

            {/* City Pin 3: Foumban (Right / North-East) */}
            <button
              onClick={() => setSelectedZone('Foumban')}
              className={`absolute top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all z-20 ${
                selectedZone === 'Foumban' ? 'scale-125' : 'hover:scale-110 opacity-85 hover:opacity-100'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/50 ring-4 ring-emerald-400/30">
                <MapPin className="w-5 h-5 fill-current" />
              </div>
              <span className="mt-1.5 bg-slate-900 px-2.5 py-1 rounded-lg text-xs font-bold text-white border border-emerald-500/50 shadow-md whitespace-nowrap">
                📍 Foumban
              </span>
              <span className="text-[9px] text-slate-400 font-mono">~35 min</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400 italic">
              Cliquez sur une ville sur la carte ci-dessus pour afficher ses détails d'intervention.
            </span>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent('Foumbot Cameroun')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <span>Ouvrir dans Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Selected Zone Details Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-blue-500/30 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">Secteur Sélectionné</span>
                <h3 className="font-display font-extrabold text-2xl text-white mt-1">{currentZoneInfo.name}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {currentZoneInfo.desc}
            </p>

            <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Délai d'arrivée moyen :</span>
                </span>
                <span className="text-emerald-400 font-bold font-mono">{currentZoneInfo.approxResponseTime}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Chantiers récents réalisés :</span>
                </span>
                <span className="text-white font-bold">{currentZoneInfo.activeChantiersCount} projets</span>
              </div>
            </div>

            {/* Zone Selector Pills */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Changer de ville :</span>
              <div className="grid grid-cols-3 gap-2">
                {INTERVENTION_ZONES.map((z) => (
                  <button
                    key={z.name}
                    onClick={() => setSelectedZone(z.name)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all truncate ${
                      selectedZone === z.name
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {z.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={`tel:${BUSINESS_INFO.phoneFull}`}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/30"
            >
              <Phone className="w-4 h-4 fill-current animate-bounce" />
              <span>Appeler une équipe pour {currentZoneInfo.name.split(' ')[0]}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
