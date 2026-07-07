import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS, BUSINESS_INFO } from '../data/appData';
import { 
  MapPin, 
  Play, 
  SlidersHorizontal, 
  Calendar, 
  X, 
  Maximize2,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

export const GalerieTab: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [beforeAfterToggle, setBeforeAfterToggle] = useState<Record<string, boolean>>({});

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === filter);

  const toggleBeforeAfter = (id: string) => {
    setBeforeAfterToggle(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Réalisations & Chantiers Vérifiés</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
            <span>🖼️ Galerie Photos & Vidéo de nos Chantiers</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Découvrez en images la qualité de nos installations de salles de bains, soudures de tuyaux PPR, chauffe-eau et nos interventions sur Foumbot, Bafoussam et Foumban.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-blue-500/30 shrink-0">
          <img 
            src="/images/logo_major_plomberie.jpg" 
            alt="Logo" 
            className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-400 bg-white" 
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="font-display font-bold text-white text-sm">Photos Authentiques</div>
            <div className="text-xs text-blue-300">Major Plomberie & Fils</div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: 'all', label: '✨ Tout voir' },
          { id: 'sanitaire', label: '🛁 Sanitaires & Douches' },
          { id: 'tuyauterie', label: '🔧 Tuyauterie PPR' },
          { id: 'depannage', label: '🚨 Dépannages & Avant/Après' },
          { id: 'chauffe-eau', label: '🔥 Chauffe-eau' },
          { id: 'video', label: '🎥 Vidéos en direct' },
        ].map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isAfter = beforeAfterToggle[item.id];

          return (
            <div
              key={item.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden group flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-lg"
            >
              <div className="relative aspect-16/10 bg-slate-950 overflow-hidden">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={item.videoPoster || item.url}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all ring-4 ring-blue-400/40 animate-pulse"
                      >
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </button>
                    </div>
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                      <Play className="w-3 h-3 fill-current" /> Vidéo Chantier
                    </span>
                  </div>
                ) : item.type === 'before-after' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={isAfter ? item.afterUrl : item.beforeUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <button
                        onClick={() => toggleBeforeAfter(item.id)}
                        className={`text-xs font-bold px-3 py-1 rounded-lg shadow-md transition-all ${
                          !isAfter ? 'bg-red-600 text-white' : 'bg-slate-800/80 text-slate-300'
                        }`}
                      >
                        ⛔ AVANT
                      </button>
                      <button
                        onClick={() => toggleBeforeAfter(item.id)}
                        className={`text-xs font-bold px-3 py-1 rounded-lg shadow-md transition-all ${
                          isAfter ? 'bg-emerald-600 text-white' : 'bg-slate-800/80 text-slate-300'
                        }`}
                      >
                        ✅ APRÈS
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-slate-900/90 text-[10px] text-slate-300 px-2 py-1 rounded border border-slate-700">
                      Cliquez pour comparer
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 hover:bg-slate-800"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Floating "Certifiée & Locale" Badge */}
                <div className="absolute top-3 right-3 bg-blue-600/95 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1 border border-blue-400/30 z-10 select-none">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                  <span>Entreprise Certifiée & Locale</span>
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/80 flex items-center gap-1 text-[11px] font-semibold text-slate-200">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Description */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                    <span className="uppercase text-emerald-400 font-bold">{item.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.type === 'before-after' && (
                  <button
                    onClick={() => toggleBeforeAfter(item.id)}
                    className="w-full mt-3 py-2 bg-slate-800 hover:bg-slate-750 text-blue-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Basculer vue {isAfter ? 'Avant réparation' : 'Après notre travail'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Zoom or Video Player */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-800/80 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">
                  {selectedItem.category}
                </span>
                <h3 className="font-display font-bold text-white text-sm sm:text-base truncate max-w-md">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 bg-slate-950 flex flex-col items-center">
              {selectedItem.type === 'video' ? (
                <div className="w-full aspect-16/9 bg-black rounded-xl overflow-hidden relative shadow-inner">
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full max-h-[60vh] flex items-center justify-center overflow-hidden rounded-xl">
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
                  />
                </div>
              )}

              <div className="mt-4 w-full text-left space-y-2">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                  <span>📍 {selectedItem.location}</span>
                  <span>📅 {selectedItem.date}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {selectedItem.description}
                </p>
                <div className="pt-3 flex justify-end">
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Bonjour%20Major%2C%20j%27ai%20vu%20votre%20réalisation%20%22${encodeURIComponent(selectedItem.title)}%22%20et%20je%20souhaite%20un%20travail%20similaire.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-2"
                  >
                    <span>Je veux ce type de réalisation</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
