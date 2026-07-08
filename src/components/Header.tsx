import React from 'react';
import { TabType } from '../types';
import { BUSINESS_INFO } from '../data/appData';
import { 
  Phone, 
  MessageCircle, 
  Wrench, 
  Sparkles,
  Home,
  Image as ImageIcon,
  FileText,
  MapPin,
  HelpCircle,
  Award,
  PhoneCall,
  Lightbulb,
  Sun,
  Moon,
  Cloud
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isAndroidView: boolean;
  setIsAndroidView: (val: boolean) => void;
  theme?: 'dark' | 'sun';
  setTheme?: (val: 'dark' | 'sun') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isAndroidView,
  setIsAndroidView,
  theme = 'dark',
  setTheme
}) => {
  const navTabs = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'services', label: 'Nos services', icon: Wrench },
    { id: 'galerie', label: 'Galerie & Vidéo', icon: ImageIcon },
    { id: 'devis', label: 'Demander un devis', icon: FileText },
    { id: 'conseils', label: 'Conseils & Astuces', icon: Lightbulb },
    { id: 'carte', label: 'Carte & Zones', icon: MapPin },
    { id: 'faq', label: 'Questions FAQ', icon: HelpCircle },
    { id: 'apropos', label: 'À propos', icon: Award },
    { id: 'contact', label: 'Contact direct', icon: PhoneCall },
    { id: 'drive', label: 'Google Drive', icon: Cloud },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Android Status Bar Simulation Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 px-3 py-1.5 text-[11px] text-blue-200 flex justify-between items-center border-b border-blue-800/40 font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-emerald-300">DISPONIBLE 24/7</span>
          <span className="hidden xs:inline text-slate-400">|</span>
          <span className="hidden xs:inline text-slate-300">Urgence Plomberie : {BUSINESS_INFO.zonesIntervention.join(' • ')}</span>
        </div>
        <div className="flex items-center gap-2.5">
          {/* Quick Theme Toggle */}
          <button 
            onClick={() => setTheme && setTheme(theme === 'dark' ? 'sun' : 'dark')}
            className={`flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-sans transition-all border border-blue-500/30 cursor-pointer ${theme === 'sun' ? 'bg-amber-500/20 border-amber-500/40 text-amber-200' : ''}`}
            title={theme === 'sun' ? "Passer en Mode Sombre" : "Passer en Mode Plein Soleil (Clair)"}
          >
            {theme === 'sun' ? (
              <>
                <Sun className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Soleil Activé</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-slate-400" />
                <span>Mode Sombre</span>
              </>
            )}
          </button>

          <button 
            onClick={() => setIsAndroidView(!isAndroidView)}
            className="flex items-center gap-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-sans transition-colors border border-blue-500/30 cursor-pointer"
            title="Basculer entre vue mobile Android et vue tablette/bureau complète"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{isAndroidView ? "Mode Web" : "Mode App"}</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div 
          onClick={() => setActiveTab('accueil')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-lg shadow-blue-600/30 overflow-hidden ring-2 ring-blue-400 group-hover:scale-105 transition-transform shrink-0">
            <img 
              src="/images/logo_major_plomberie.jpg" 
              alt="Major Plomberie & Fils Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight flex items-center gap-1.5">
                Major Plomberie <span className="text-blue-400">& Fils</span>
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md border border-blue-500/30 hidden sm:inline-block">
                Artisan PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans line-clamp-1 hidden md:block">
              {BUSINESS_INFO.slogan}
            </p>
          </div>
        </div>

        {/* Action Call Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${BUSINESS_INFO.phoneFull}`}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl shadow-md shadow-red-600/20 transition-all active:scale-95 border border-red-400/30 animate-pulse"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">Urgence :</span>
            <span>{BUSINESS_INFO.phoneDisplay}</span>
          </a>

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Bonjour%20Major%20Plomberie%20%26%20Fils%2C%20j%27ai%20besoin%20d%27une%20intervention%20en%20plomberie.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95 border border-emerald-400/30"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Desktop Navigation Tabs (Hidden on mobile when using bottom bar) */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar border-t border-slate-800/80 bg-slate-900/80 hidden lg:flex">
        <div className="flex space-x-1.5 py-2.5">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
