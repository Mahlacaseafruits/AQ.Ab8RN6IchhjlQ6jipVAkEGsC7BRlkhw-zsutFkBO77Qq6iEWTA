import React, { useState, useEffect, useRef } from 'react';
import { TabType } from '../types';
import { BUSINESS_INFO, SERVICES_LIST, TESTIMONIALS } from '../data/appData';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Wrench, 
  Droplets, 
  Sparkles,
  Star,
  Zap,
  Lightbulb,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Quote,
  BadgeCheck,
  X,
  TrendingUp
} from 'lucide-react';

interface AccueilTabProps {
  setActiveTab: (tab: TabType) => void;
}

interface LiveJob {
  id: string;
  city: 'Foumbot' | 'Bafoussam' | 'Foumban';
  type: string;
  time: string;
}

// High performance 60fps count-up hook using requestAnimationFrame
function useCountUp(target: number, duration: number = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration]);
  return count;
}

export const AccueilTab: React.FC<AccueilTabProps> = ({ setActiveTab }) => {
  const [selectedCity, setSelectedCity] = useState<'Tous' | 'Foumbot' | 'Bafoussam' | 'Foumban'>('Tous');
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1); // 1 for next, -1 for prev
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const [liveOffset, setLiveOffset] = useState<number>(0);
  const [liveJobs, setLiveJobs] = useState<LiveJob[]>([
    { id: '1', city: 'Foumbot', type: 'Dépannage surpresseur de château d\'eau', time: 'Il y a 10 min' },
    { id: '2', city: 'Bafoussam', type: 'Pose de WC moderne suspendu', time: 'Il y a 2h' },
    { id: '3', city: 'Foumban', type: 'Soudure collecteur PPR haute résistance', time: 'Il y a 5h' },
    { id: '4', city: 'Foumbot', type: 'Installation évier inox double bac', time: 'Il y a 1 jour' }
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalChantiersBase = useCountUp(542, 2000);
  const totalChantiers = totalChantiersBase + liveOffset;

  const totalUrgences = useCountUp(218, 1800);
  const totalTuyaux = useCountUp(1380, 2200);
  const satisfactionRate = useCountUp(100, 1500);

  // Auto increment & mock live activity
  useEffect(() => {
    const jobTypes = [
      'Maîtrise d\'une fuite de vanne d\'arrêt principale',
      'Débouchage express de collecteur d\'évacuation PVC',
      'Installation de robinetterie laiton haut de gamme',
      'Soudure PPR de tuyauterie d\'alimentation principale',
      'Remplacement de robinet flotteur de WC moderne',
      'Raccordement de pompe de surpresseur d\'eau',
      'Rénovation complète d\'évacuation sous évier'
    ];
    const cities: ('Foumbot' | 'Bafoussam' | 'Foumban')[] = ['Foumbot', 'Bafoussam', 'Foumban'];

    const interval = setInterval(() => {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
      const newJob: LiveJob = {
        id: String(Date.now()),
        city: randomCity,
        type: randomType,
        time: 'À l\'instant'
      };

      setLiveOffset(prev => prev + 1);
      setLiveJobs(prev => [newJob, ...prev.slice(0, 3)]);
      setToastMessage(`🎉 Nouveau chantier réussi à ${randomCity} : ${randomType} !`);
      
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const triggerManualJob = () => {
    const jobTypes = [
      'Soudure PPR de collecteur d\'alimentation d\'eau potable',
      'Installation d\'un WC moderne avec réservoir à double touche',
      'Remplacement de flexible d\'alimentation sous évier inox',
      'Débouchage complet d\'évacuation bouchée en PVC',
      'Montage et réglage d\'un surpresseur automatique',
      'Pose de robinetterie mélangeuse thermostatique'
    ];
    const cities: ('Foumbot' | 'Bafoussam' | 'Foumban')[] = ['Foumbot', 'Bafoussam', 'Foumban'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    
    const newJob: LiveJob = {
      id: String(Date.now()),
      city: randomCity,
      type: randomType,
      time: 'À l\'instant'
    };

    setLiveOffset(prev => prev + 1);
    setLiveJobs(prev => [newJob, ...prev.slice(0, 3)]);
    setToastMessage(`🎉 Chantier réussi ajouté ! Intervention à ${randomCity} : ${randomType}`);
    
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const filteredTestimonials = TESTIMONIALS.filter((t) => {
    if (selectedCity === 'Tous') return true;
    return t.location.toLowerCase().includes(selectedCity.toLowerCase());
  });

  // Reset index when city changes
  useEffect(() => {
    setActiveReviewIndex(0);
  }, [selectedCity]);

  useEffect(() => {
    if (isCarouselHovered || filteredTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      setSlideDirection(1);
      setActiveReviewIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isCarouselHovered, filteredTestimonials.length]);

  const handleNextReview = () => {
    if (filteredTestimonials.length <= 1) return;
    setSlideDirection(1);
    setActiveReviewIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrevReview = () => {
    if (filteredTestimonials.length <= 1) return;
    setSlideDirection(-1);
    setActiveReviewIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const currentReview = filteredTestimonials[activeReviewIndex] || filteredTestimonials[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-blue-500/20 shadow-2xl p-6 sm:p-10 lg:p-12">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-blue-500/30">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Artisan Agrée • Foumbot, Bafoussam & Foumban</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Major Plomberie <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">& Fils</span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 font-medium border-l-4 border-blue-500 pl-4 py-1 italic bg-blue-950/40 rounded-r-xl">
              « {BUSINESS_INFO.slogan} »
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Spécialistes reconnus dans la région de l'Ouest du Cameroun. Nous intervenons rapidement pour toutes vos urgences de fuites d'eau, débouchages, installations de salles de bain modernes, réseaux PPR thermosoudés et chauffe-eau.
            </p>

            {/* Emergency Action Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneFull}`}
                className="flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95 border border-red-400/40"
              >
                <Phone className="w-5 h-5 fill-current animate-bounce" />
                <span>Appeler : {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Bonjour%20Major%20Plomberie%2C%20j%27ai%20besoin%20d%27un%20plombier.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 border border-emerald-400/40"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp Express</span>
              </a>

              <button
                onClick={() => setActiveTab('devis')}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-3.5 rounded-2xl border border-slate-700 transition-all hover:border-blue-500/50"
              >
                <span>📝 Demander un devis</span>
              </button>
            </div>

            {/* Payment Guarantee Pill */}
            <div className="mt-4 bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/15 border border-amber-500/40 rounded-2xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs shadow-md">
              <span className="font-bold flex items-center gap-1.5 text-amber-300">
                <span>🛡️ Règlement : Payé après service rendu !</span>
              </span>
              <span className="font-mono font-semibold bg-slate-950 px-3 py-1 rounded-xl border border-amber-500/30 text-white shadow-inner">
                OM : 640 321 535 | MoMo : 651 017 585
              </span>
            </div>

            {/* Quick stats badge */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-center">
                <div className="text-blue-400 font-display font-bold text-lg sm:text-2xl">+12 ans</div>
                <div className="text-[11px] sm:text-xs text-slate-400">d'expérience PRO</div>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-center">
                <div className="text-emerald-400 font-display font-bold text-lg sm:text-2xl">3 Villes</div>
                <div className="text-[11px] sm:text-xs text-slate-400">Foumbot • Bafoussam • Foumban</div>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-center">
                <div className="text-amber-400 font-display font-bold text-lg sm:text-2xl">100%</div>
                <div className="text-[11px] sm:text-xs text-slate-400">Garantie Qualité</div>
              </div>
            </div>
          </div>

          {/* Right Hero Image / Mobile App Mockup Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 p-3 border-2 border-slate-700/80 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 left-0 h-8 bg-slate-800 flex items-center justify-between px-4 z-20">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono">MajorPlomberie.apk</span>
              </div>
              
              <div className="mt-6 rounded-2xl overflow-hidden relative aspect-4/3">
                <img 
                  src="/images/collecteur_ppr.jpg" 
                  alt="Installation sanitaire Major Plomberie Foumbot" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-white/95 p-1.5 rounded-full shadow-lg border border-blue-500 flex items-center gap-2 pr-3">
                  <img 
                    src="/images/logo_major_plomberie.jpg" 
                    alt="Logo" 
                    className="w-8 h-8 rounded-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-bold text-slate-900 font-display">Major Plomberie</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-white text-sm">Chantier Foumbot</h4>
                      <p className="text-xs text-blue-300">Collecteur PPR & Vannes Encastrées</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('galerie')}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <span>Galerie</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions / Navigation Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div 
          onClick={() => setActiveTab('services')}
          className="bg-slate-900/80 hover:bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-300 transition-colors">
              👨‍🔧 Nos 6 Services Spécialisés
            </h3>
            <p className="text-sm text-slate-400">
              Découvrez nos tarifs pour le dépannage d'urgence, l'installation sanitaire complète, la soudure PPR et les chauffe-eau.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
            <span>Explorer le catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('galerie')}
          className="bg-slate-900/80 hover:bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
              🖼️ Galerie Photos & Vidéo
            </h3>
            <p className="text-sm text-slate-400">
              Consultez les images de nos réalisations à Foumbot, Bafoussam et Foumban, le comparateur Avant/Après et notre vidéo de chantier.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-emerald-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
            <span>Voir les chantiers</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('carte')}
          className="bg-slate-900/80 hover:bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
              📍 Zones d'Intervention
            </h3>
            <p className="text-sm text-slate-400">
              Basés à Foumbot, nous nous déplaçons rapidement dans toute la ville ainsi qu'à Bafoussam et Foumban.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-amber-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
            <span>Consulter la carte</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* Conseils & Astuces Spotlight Banner */}
      <section 
        onClick={() => setActiveTab('conseils')}
        className="bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 rounded-3xl p-6 sm:p-8 border border-blue-500/30 hover:border-blue-400/60 transition-all cursor-pointer group shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2.5 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Nouveau : Espace Conseils & Astuces</span>
          </div>
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white group-hover:text-blue-300 transition-colors">
            💡 Guide Pratique : Entretien des Canalisations, Fuites & Économies d'Eau
          </h3>
          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
            Découvrez nos articles courts et faciles pour éviter les bouchons d'évier, détecter une fuite invisible, économiser 30% d'eau chaque mois et tester notre outil de diagnostic rapide !
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-blue-600 group-hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-all group-hover:scale-105">
          <BookOpen className="w-4 h-4" />
          <span>Lire nos astuces</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <span>⚡ Services Populaires</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Savoir-faire garanti pour les urgences et grands projets
            </p>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Voir tous nos services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_LIST.slice(0, 3).map((service) => (
            <div 
              key={service.id}
              className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-blue-500/40 transition-all shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400">
                    {service.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    {service.priceRange}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-white">{service.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{service.shortDesc}</p>
                
                <ul className="space-y-1.5 pt-2 border-t border-slate-800">
                  {service.includedFeatures.slice(0, 3).map((feat, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setActiveTab('devis')}
                className="mt-6 w-full bg-slate-800 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Demander ce devis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Real-time Statistics Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Tableau de bord de l'activité en temps réel</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              📊 Notre Expertise en Chiffres Réels
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Chantiers réussis, dépannages express et interventions quotidiennes à Foumbot, Bafoussam et Foumban.
            </p>
          </div>

          <button
            onClick={triggerManualJob}
            className="self-start md:self-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/30 active:scale-95 flex items-center gap-2 border border-blue-400/20 cursor-pointer"
            title="Simuler une intervention plomberie réussie"
          >
            <TrendingUp className="w-4 h-4 animate-bounce" />
            <span>Simuler un chantier réussi</span>
          </button>
        </div>

        {/* Dynamic Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Chantiers Réussis */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800/80 hover:border-blue-500/30 transition-all shadow-xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-bold font-mono animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                En direct
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight select-none">
                  {totalChantiers}
                </span>
                <span className="text-blue-400 font-bold text-lg">+</span>
              </div>
              <h3 className="text-sm font-bold text-slate-200">Chantiers Réussis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interventions sanitaires et chantiers de plomberie finalisés avec succès dans la région de l'Ouest.
              </p>
            </div>
          </div>

          {/* Card 2: Dépannages Urgents */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800/80 hover:border-red-500/30 transition-all shadow-xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-red-500/10 transition-colors" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400 font-semibold">
                &lt; 30 min
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight select-none">
                  {totalUrgences}
                </span>
                <span className="text-red-400 font-bold text-lg">+</span>
              </div>
              <h3 className="text-sm font-bold text-slate-200">Urgences Résolues</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fuites d'eau majeures colmatées, canalisations débouchées et pannes de surpresseur résolues.
              </p>
            </div>
          </div>

          {/* Card 3: Canalisations PPR posées */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800/80 hover:border-emerald-500/30 transition-all shadow-xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400 font-semibold font-mono">
                Thermosoudé
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight select-none">
                  {totalTuyaux}
                </span>
                <span className="text-emerald-400 font-semibold text-xs uppercase tracking-wider font-mono">mètres</span>
              </div>
              <h3 className="text-sm font-bold text-slate-200">Tuyaux PPR Posés</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Canalisations d'alimentation principale assemblées par fusion thermique, garanties anti-fuites.
              </p>
            </div>
          </div>

          {/* Card 4: Taux de Satisfaction */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800/80 hover:border-purple-500/30 transition-all shadow-xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400 font-semibold">
                Certifié
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight select-none">
                  {satisfactionRate}
                </span>
                <span className="text-purple-400 font-bold text-lg">%</span>
              </div>
              <h3 className="text-sm font-bold text-slate-200">Taux de Satisfaction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Artisan plomberie à l'écoute : nos clients nous recommandent pour notre sérieux et la clarté des devis.
              </p>
            </div>
          </div>
        </div>

        {/* Live feed of last completed interventions */}
        <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-3xl space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Activités de chantier récemment finalisées :
              </h3>
            </div>
            <span className="text-[10px] text-slate-500 italic font-mono">Actualisation automatique</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {liveJobs.map((job, idx) => (
              <div
                key={job.id}
                className={`bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-start gap-2.5 hover:border-slate-700 transition-all ${
                  idx === 0 ? 'ring-1 ring-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.06)]' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800">
                  <span className="text-sm">
                    {job.city === 'Foumbot' ? '📍' : job.city === 'Bafoussam' ? '🏢' : '🕌'}
                  </span>
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-xs font-bold text-white block truncate">{job.city}</span>
                    <span className="text-[9px] text-slate-500 font-mono shrink-0">{job.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 leading-normal" title={job.type}>
                    {job.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Major Plomberie */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Pourquoi faire confiance à Major Plomberie & Fils ?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Un travail d'artisan rigoureux, des matériaux de haute qualité et le respect des engagements pris avec nos clients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
            <h4 className="font-display font-bold text-white">Matériel Haute Résistance</h4>
            <p className="text-xs text-slate-400">
              Utilisation exclusive de tuyaux PPR thermosoudés incassables et de robinetterie certifiée pour éviter toute fuite.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <Clock className="w-8 h-8 text-emerald-400" />
            <h4 className="font-display font-bold text-white">Rapidité d'Intervention</h4>
            <p className="text-xs text-slate-400">
              Basés à Foumbot, nous intervenons en 30 minutes sur place pour limiter les dégâts d'eau urgents.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <Zap className="w-8 h-8 text-amber-400" />
            <h4 className="font-display font-bold text-white">Devis & Prix Transparents</h4>
            <p className="text-xs text-slate-400">
              Aucune mauvaise surprise : nous évaluons le diagnostic et convenons du tarif avant de démarrer le travail.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-purple-400" />
            <h4 className="font-display font-bold text-white">Travail Soigné & Garanti</h4>
            <p className="text-xs text-slate-400">
              Finitions esthétiques pour vos salles de bains et propreté totale du chantier après notre passage.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-4xl mx-auto">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/20 mb-2">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span>Avis clients 100% vérifiés</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ⭐ Témoignages de nos clients
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              La confiance se mérite sur le terrain à Foumbot, Bafoussam et Foumban. Découvrez les retours d'expérience.
            </p>
          </div>
          
          {/* Note moyenne Summary Badge */}
          <div className="shrink-0 bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center gap-3.5 shadow-md">
            <div className="bg-amber-500/10 text-amber-400 font-display font-extrabold text-2xl px-3 py-1 rounded-xl border border-amber-500/20">
              5.0<span className="text-xs text-amber-500/80">/5</span>
            </div>
            <div className="text-xs">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-slate-400 mt-0.5 font-medium">{filteredTestimonials.length} avis affichés</p>
            </div>
          </div>
        </div>

        {/* City Filters */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
          {(['Tous', 'Foumbot', 'Bafoussam', 'Foumban'] as const).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`flex-1 min-w-[90px] text-xs font-bold py-2 px-3 rounded-xl transition-all cursor-pointer ${
                selectedCity === city
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {city === 'Tous' ? 'Tous les avis' : city}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
        >
          {filteredTestimonials.length > 0 ? (
            <div className="relative min-h-[340px] sm:min-h-[260px] flex items-center overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
                <motion.div
                  key={`${selectedCity}-${activeReviewIndex}`}
                  custom={slideDirection}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? 100 : -100,
                      opacity: 0,
                      scale: 0.98
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      transition: {
                        x: { type: 'spring', stiffness: 260, damping: 28 },
                        opacity: { duration: 0.2 }
                      }
                    },
                    exit: (dir: number) => ({
                      x: dir < 0 ? 100 : -100,
                      opacity: 0,
                      scale: 0.98,
                      transition: {
                        x: { type: 'spring', stiffness: 260, damping: 28 },
                        opacity: { duration: 0.2 }
                      }
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-800/80 shadow-2xl relative flex flex-col justify-between gap-6 overflow-hidden"
                >
                  {/* Huge Watermark Quote Icon */}
                  <Quote className="absolute right-6 top-6 w-32 h-32 text-slate-800/15 pointer-events-none -scale-x-100" />

                  <div className="space-y-4 relative z-10">
                    {/* Rating + Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(currentReview.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px] font-bold px-2.5 py-1 rounded-full">
                        <BadgeCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Prestation validée</span>
                      </div>
                    </div>

                    {/* Comment */}
                    <p className="text-base sm:text-lg md:text-xl text-slate-100 italic leading-relaxed font-normal">
                      « {currentReview.comment} »
                    </p>
                  </div>

                  {/* Profile detail */}
                  <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold font-display text-lg shadow-inner">
                        {currentReview.name.charAt(3) || currentReview.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm sm:text-base">{currentReview.name}</h4>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-400" />
                          <span>{currentReview.location}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-400 font-mono text-[11px]">{currentReview.date}</span>
                        </p>
                      </div>
                    </div>

                    <div className="self-start sm:self-auto">
                      <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                        Service : {currentReview.serviceUsed}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 p-12 rounded-3xl text-center text-slate-400">
              Aucun avis trouvé pour cette ville.
            </div>
          )}

          {/* Manual Arrow Controls */}
          {filteredTestimonials.length > 1 && (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 z-20">
                <button
                  onClick={handlePrevReview}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="Avis précédent"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 z-20">
                <button
                  onClick={handleNextReview}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="Avis suivant"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Carousel Dots & Autoplay state */}
        {filteredTestimonials.length > 1 && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSlideDirection(index > activeReviewIndex ? 1 : -1);
                    setActiveReviewIndex(index);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === activeReviewIndex 
                      ? 'w-8 bg-blue-500' 
                      : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                  }`}
                  aria-label={`Aller à l'avis numéro ${index + 1}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              {isCarouselHovered ? '⏱️ Défilement en pause' : 'Défilement automatique actif'}
            </span>
          </div>
        )}
      </section>

      {/* Real-time Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 z-50 max-w-sm w-full bg-slate-950/95 backdrop-blur-md border border-blue-500/30 rounded-2xl p-4 shadow-2xl shadow-blue-500/10 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-0.5">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Expertise en Direct</h4>
              <p className="text-xs text-slate-200 leading-normal">{toastMessage}</p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
