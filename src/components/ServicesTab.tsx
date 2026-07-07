import React, { useState } from 'react';
import { TabType, ServiceItem } from '../types';
import { SERVICES_LIST, BUSINESS_INFO } from '../data/appData';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  Wrench, 
  AlertTriangle, 
  Bath, 
  Pipette, 
  Flame, 
  Waves, 
  ShieldCheck,
  Phone,
  MessageCircle,
  ArrowRight,
  Search,
  X,
  Sparkles
} from 'lucide-react';

interface ServicesTabProps {
  setActiveTab: (tab: TabType) => void;
  setSelectedServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({ 
  setActiveTab, 
  setSelectedServiceForQuote 
}) => {
  const [filter, setFilter] = useState<string>('tous');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const categories = ['tous', 'Urgence 24/7', 'Sanitaire & Salle de bain', 'Canalisations & Forage', 'Confort & Pression', 'Assainissement'];

  const filteredServices = SERVICES_LIST.filter(service => {
    const matchesCategory = filter === 'tous' || service.category.toLowerCase().includes(filter.toLowerCase());
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      service.title.toLowerCase().includes(query) ||
      service.fullDesc.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      service.includedFeatures.some(f => f.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const quickSearchTags = ['Fuite', 'Débouchage', 'Chauffe-eau', 'Douche', 'Surpresseur', 'PPR', 'Robinet'];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertTriangle': return <AlertTriangle className="w-6 h-6 text-red-400" />;
      case 'Bath': return <Bath className="w-6 h-6 text-blue-400" />;
      case 'Pipette': return <Pipette className="w-6 h-6 text-cyan-400" />;
      case 'Flame': return <Flame className="w-6 h-6 text-amber-400" />;
      case 'Waves': return <Waves className="w-6 h-6 text-emerald-400" />;
      default: return <ShieldCheck className="w-6 h-6 text-purple-400" />;
    }
  };

  const handleRequestQuote = (service: ServiceItem) => {
    setSelectedServiceForQuote(service.title);
    setActiveTab('devis');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-3">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
          <Wrench className="w-3.5 h-3.5" />
          <span>Savoir-Faire & Prestations</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          👨‍🔧 Nos Services de Plomberie
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          De l'urgence fuite à 3h du matin jusqu'à l'équipement complet de votre nouvelle villa ou hôtel. Nous utilisons du matériel haute qualité avec garantie d'étanchéité à Foumbot, Bafoussam et Foumban.
        </p>
      </div>

      {/* Quick Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-blue-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une intervention : fuite, chauffe-eau, débouchage, PPR, douche..."
              className="w-full pl-12 pr-10 py-3.5 bg-slate-950 border-2 border-slate-800 focus:border-blue-500 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                title="Effacer la recherche"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="text-xs font-semibold text-blue-300 bg-blue-950/80 px-3.5 py-2 rounded-xl border border-blue-500/30 self-start sm:self-center">
              {filteredServices.length} {filteredServices.length > 1 ? 'interventions trouvées' : 'intervention trouvée'}
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 no-scrollbar text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Recherches rapides :
          </span>
          {quickSearchTags.map((tag) => {
            const isSelected = searchQuery.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                onClick={() => setSearchQuery(isSelected ? '' : tag)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30 font-semibold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-blue-500/50 hover:text-white'
                }`}
              >
                <span>{tag}</span>
                {isSelected && <X className="w-3 h-3 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'tous' ? '✨ Tous nos services' : cat}
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                whileHover={{ 
                  y: -6, 
                  borderColor: service.popular ? 'rgba(59, 130, 246, 0.6)' : 'rgba(148, 163, 184, 0.3)',
                  boxShadow: service.popular 
                    ? '0 20px 25px -5px rgba(59, 130, 246, 0.15), 0 8px 10px -6px rgba(59, 130, 246, 0.15)' 
                    : '0 20px 25px -5px rgba(148, 163, 184, 0.05), 0 8px 10px -6px rgba(148, 163, 184, 0.05)',
                }}
                transition={{ 
                  duration: 0.25, 
                  ease: 'easeOut',
                  layout: { duration: 0.25 }
                }}
                key={service.id}
                className={`group bg-slate-900 rounded-2xl border overflow-hidden ${
                  service.popular ? 'border-blue-500/40 shadow-lg shadow-blue-500/5' : 'border-slate-800'
                }`}
              >
                {/* Card Top */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 transition-all duration-300 group-hover:bg-blue-600/10 group-hover:border-blue-500/40 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-400">
                          {service.category}
                        </span>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-blue-300 transition-colors duration-200">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    {service.popular && (
                      <span className="bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shrink-0 animate-pulse">
                        Très demandé
                      </span>
                    )}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Meta details */}
                  <div className="grid grid-cols-2 gap-3 py-3 px-4 rounded-xl bg-slate-950/60 border border-slate-800/80 group-hover:border-slate-700/50 transition-all duration-300">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Estimation Durée</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{service.estimatedDuration}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Tarif Indicatif</span>
                      <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono mt-0.5 block">
                        {service.priceRange}
                      </span>
                    </div>
                  </div>

                  {/* Features Included List */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Ce qui est inclus dans notre prestation :
                    </h4>
                    <ul className="space-y-2">
                      {service.includedFeatures.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden space-y-2"
                          >
                            {service.includedFeatures.slice(3).map((feat, idx) => (
                              <div key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 pt-2 first:pt-0">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </ul>
                    {service.includedFeatures.length > 3 && (
                      <button
                        onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                        className="text-xs text-blue-400 hover:text-blue-300 font-medium pt-1 focus:outline-none flex items-center gap-1 cursor-pointer"
                      >
                        <span>
                          {isExpanded ? '▲ Réduire la liste' : `▼ Voir les ${service.includedFeatures.length - 3} autres points inclus`}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="bg-slate-950 px-6 py-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 group-hover:border-slate-700/50 transition-colors duration-300">
                  <button
                    onClick={() => handleRequestQuote(service)}
                    className="group/btn w-full sm:w-auto flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-blue-500/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Demander un devis en ligne</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Bonjour%20Major%20Plomberie%2C%20je%20souhaite%20un%20renseignement%20sur%20le%20service%20%3A%20${encodeURIComponent(service.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${BUSINESS_INFO.phoneFull}`}
                      className="flex-1 sm:flex-none bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Appeler</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredServices.length === 0 && (
        <div className="bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 text-slate-400 mx-auto flex items-center justify-center border border-slate-700">
            <Search className="w-8 h-8 text-blue-400" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              Aucune intervention trouvée pour "{searchQuery}"
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Pas d'inquiétude ! Nous réalisons tous types de travaux sanitaires et de plomberie sur mesure. N'hésitez pas à nous contacter directement.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setFilter('tous');
              }}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
            >
              🔄 Réinitialiser la recherche
            </button>
            <button
              onClick={() => {
                setSelectedServiceForQuote(searchQuery || 'Intervention sur mesure');
                setActiveTab('devis');
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Demander un devis sur mesure</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Payment Information Bottom Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Transparence & Assurance</span>
          <h3 className="font-display font-bold text-xl text-white">Règlement : Payé après service rendu !</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Chez Major Plomberie & Fils, vous payez uniquement lorsque l'intervention ou le chantier est terminé et vérifié par vos soins.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-orange-500/30 text-center">
            <span className="text-[10px] text-orange-400 uppercase font-bold block">Orange Money</span>
            <span className="font-mono font-bold text-sm sm:text-base text-white">640 321 535</span>
          </div>
          <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-yellow-500/30 text-center">
            <span className="text-[10px] text-yellow-400 uppercase font-bold block">MTN MoMo</span>
            <span className="font-mono font-bold text-sm sm:text-base text-white">651 017 585</span>
          </div>
        </div>
      </div>
    </div>
  );
};
