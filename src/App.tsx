/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from './types';
import { BUSINESS_INFO } from './data/appData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FloatingActionButtons } from './components/FloatingActionButtons';
import { AccueilTab } from './components/AccueilTab';
import { ServicesTab } from './components/ServicesTab';
import { GalerieTab } from './components/GalerieTab';
import { DevisTab } from './components/DevisTab';
import { CarteTab } from './components/CarteTab';
import { AProposTab } from './components/AProposTab';
import { ContactTab } from './components/ContactTab';
import { FaqTab } from './components/FaqTab';
import { ConseilsTab } from './components/ConseilsTab';
import { Smartphone, ShieldCheck, Wrench, MapPin, Phone, Loader2, Wifi, WifiOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('accueil');
  const [targetTab, setTargetTab] = useState<TabType>('accueil');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);
  const [isAndroidView, setIsAndroidView] = useState<boolean>(false);

  // High visibility 'sun' mode or standard 'dark' mode state
  const [theme, setTheme] = useState<'dark' | 'sun'>(() => {
    return (typeof window !== 'undefined' ? localStorage.getItem('app-theme') : 'dark') as 'dark' | 'sun' || 'dark';
  });

  React.useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });
  const [showReconnectToast, setShowReconnectToast] = useState<boolean>(false);

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnectToast(true);
      const timer = setTimeout(() => {
        setShowReconnectToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowReconnectToast(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const TAB_DETAILS: Record<TabType, { label: string; icon: string; subtitle: string }> = {
    accueil: { label: "Accueil & Vue d'ensemble", icon: '🏠', subtitle: 'Chargement des services et du diagnostic...' },
    services: { label: 'Nos Services Sanitaires', icon: '👨‍🔧', subtitle: 'Préparation du catalogue et des interventions...' },
    galerie: { label: 'Galerie Chantiers & Réalisations', icon: '🖼️', subtitle: 'Chargement des photos avant/après...' },
    devis: { label: 'Devis Express Gratuit', icon: '📝', subtitle: 'Initialisation du formulaire en ligne...' },
    conseils: { label: 'Conseils & Astuces Pratiques', icon: '💡', subtitle: "Chargement des guides et de l'outil diagnostic..." },
    carte: { label: "Carte & Zones d'Intervention", icon: '📍', subtitle: 'Localisation de nos agences au Cameroun...' },
    faq: { label: 'Foire Aux Questions (FAQ)', icon: '❓', subtitle: 'Récupération des réponses aux questions...' },
    apropos: { label: 'À Propos de Major Plomberie', icon: '🏆', subtitle: 'Affichage de nos certifications et garanties...' },
    contact: { label: 'Contact Direct 24h/24', icon: '📞', subtitle: 'Connexion aux lignes urgence et WhatsApp...' },
  };

  // Scroll to top and trigger transition on tab switch
  const handleSetTab = (tab: TabType) => {
    if (tab === activeTab && !isTransitioning) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTargetTab(tab);
    setIsTransitioning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 360);
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'accueil':
        return <AccueilTab setActiveTab={handleSetTab} />;
      case 'services':
        return (
          <ServicesTab
            setActiveTab={handleSetTab}
            setSelectedServiceForQuote={setSelectedServiceForQuote}
          />
        );
      case 'galerie':
        return <GalerieTab />;
      case 'devis':
        return <DevisTab initialService={selectedServiceForQuote} />;
      case 'conseils':
        return <ConseilsTab setActiveTab={handleSetTab} />;
      case 'carte':
        return <CarteTab />;
      case 'faq':
        return <FaqTab />;
      case 'apropos':
        return <AProposTab theme={theme} setTheme={setTheme} />;
      case 'contact':
        return <ContactTab />;
      default:
        return <AccueilTab setActiveTab={handleSetTab} />;
    }
  };

  const mainAppContent = (
    <div className={`min-h-screen flex flex-col ${theme === 'sun' ? 'theme-sun bg-white' : 'bg-slate-950'} text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative`}>
      {/* Top progress indicator during tab switch */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 h-1 z-[100] bg-slate-900 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Header
        activeTab={isTransitioning ? targetTab : activeTab}
        setActiveTab={handleSetTab}
        isAndroidView={isAndroidView}
        setIsAndroidView={setIsAndroidView}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20 relative">
        <AnimatePresence mode="wait">
          {isTransitioning ? (
            <motion.div
              key="tab-transition-loader"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600/30 via-slate-900 to-cyan-500/20 border border-blue-500/40 flex items-center justify-center shadow-2xl shadow-blue-500/20 relative z-10 animate-pulse">
                  <span className="text-4xl select-none">{TAB_DETAILS[targetTab]?.icon || '🔧'}</span>
                </div>
                <div className="absolute -inset-2 rounded-3xl bg-blue-500/15 blur-xl animate-pulse" />
                <div className="absolute inset-0 rounded-3xl border border-blue-400/40 animate-ping" style={{ animationDuration: '1.4s' }} />
              </div>

              <div className="space-y-2.5 max-w-md">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold shadow-sm">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>Chargement en cours</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                  {TAB_DETAILS[targetTab]?.label || 'Chargement...'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  {TAB_DETAILS[targetTab]?.subtitle}
                </p>
              </div>

              <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-6 border border-slate-700/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderActiveContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-10 px-4 sm:px-6 mb-14 lg:mb-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img 
                src="/images/logo_major_plomberie.jpg" 
                alt="Logo Major Plomberie" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/50 bg-white"
                referrerPolicy="no-referrer"
              />
              <span className="font-display font-bold text-white text-lg">
                Major Plomberie & Fils
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {BUSINESS_INFO.slogan} Entreprise d'installation sanitaire et de réparation plomberie agrée au Cameroun.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Zones d'Intervention</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Foumbot (Siège)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Bafoussam (Chef-lieu Ouest)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Foumban (Cité des Arts)</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Navigation Rapide</h4>
            <div className="grid grid-cols-2 gap-1 text-xs text-slate-400">
              <button onClick={() => handleSetTab('accueil')} className="text-left hover:text-white py-1">🏠 Accueil</button>
              <button onClick={() => handleSetTab('services')} className="text-left hover:text-white py-1">👨‍🔧 Services</button>
              <button onClick={() => handleSetTab('conseils')} className="text-left hover:text-white py-1 text-blue-400 font-medium">💡 Conseils & Astuces</button>
              <button onClick={() => handleSetTab('devis')} className="text-left hover:text-white py-1">📝 Devis</button>
              <button onClick={() => handleSetTab('galerie')} className="text-left hover:text-white py-1">🖼️ Galerie</button>
              <button onClick={() => handleSetTab('faq')} className="text-left hover:text-white py-1">❓ FAQ</button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Assistance Urgence</h4>
            <div className="text-xs text-slate-300">
              Disponibilité 24h/24 par GSM et WhatsApp au :
            </div>
            <a
              href={`tel:${BUSINESS_INFO.phoneFull}`}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-md transition-all"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <div className="text-[11px] text-amber-400 font-medium pt-1">
              💳 Payé après service : OM (640 321 535) • MoMo (651 017 585)
            </div>
            <div className="text-[11px] text-slate-500 pt-0.5">
              E-mail : {BUSINESS_INFO.email}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <span>© {new Date().getFullYear()} Major Plomberie & Fils • Foumbot, Cameroun. Tous droits réservés.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> Tuyauterie PPR Garantie
            </span>
          </div>
        </div>
      </footer>

      <BottomNav activeTab={isTransitioning ? targetTab : activeTab} setActiveTab={handleSetTab} />
      <FloatingActionButtons />

      {/* Toasts de connexion réseau */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            key="offline-toast"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`${
              isAndroidView ? 'absolute bottom-24' : 'fixed bottom-24 md:bottom-8 md:right-8'
            } left-4 right-4 md:left-auto md:w-96 z-50 bg-slate-900/95 backdrop-blur-md border border-red-500/35 rounded-2xl p-4 shadow-2xl shadow-red-500/10 flex gap-3.5 items-start`}
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0 text-red-400 animate-pulse">
              <WifiOff className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <span>Connexion perdue</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vous êtes actuellement hors ligne. Reconnectez-vous pour envoyer vos demandes de devis et nous contacter.
              </p>
            </div>
          </motion.div>
        )}

        {showReconnectToast && (
          <motion.div
            key="reconnect-toast"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`${
              isAndroidView ? 'absolute bottom-24' : 'fixed bottom-24 md:bottom-8 md:right-8'
            } left-4 right-4 md:left-auto md:w-96 z-50 bg-slate-900/95 backdrop-blur-md border border-emerald-500/35 rounded-2xl p-4 shadow-2xl shadow-emerald-500/10 flex gap-3.5 items-start`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <Wifi className="w-5 h-5 animate-bounce" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <span>Connexion rétablie</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vous êtes de nouveau en ligne ! Vos demandes de devis peuvent maintenant être transmises normalement.
              </p>
            </div>
            <button 
              onClick={() => setShowReconnectToast(false)}
              className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isAndroidView) {
    return (
      <div className={`min-h-screen ${theme === 'sun' ? 'bg-slate-100' : 'bg-slate-950'} flex flex-col items-center justify-center p-2 sm:p-6 transition-colors`}>
        <div className={`w-full max-w-5xl mb-4 flex items-center justify-between ${theme === 'sun' ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-slate-900 border-slate-800 text-blue-300'} p-3 rounded-2xl border`}>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Smartphone className="w-5 h-5 text-blue-400" />
            <span>Simulation d'Application Mobile Android (APK Major Plomberie)</span>
          </div>
          <button
            onClick={() => setIsAndroidView(false)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-colors shadow-md"
          >
            Quitter le mode Smartphone
          </button>
        </div>

        {/* Smartphone Bezel */}
        <div className={`w-full max-w-[430px] h-[860px] ${theme === 'sun' ? 'bg-white border-slate-300 ring-slate-200' : 'bg-slate-900 border-slate-800 ring-slate-900/50'} rounded-[50px] p-3 shadow-2xl border-4 ring-8 flex flex-col relative overflow-hidden transition-all`}>
          {/* Top Notch / Speaker Bar */}
          <div className="w-32 h-6 bg-slate-950 absolute top-3 left-1/2 -translate-x-1/2 rounded-b-2xl z-50 flex items-center justify-center">
            <div className="w-12 h-1.5 bg-slate-800 rounded-full" />
          </div>

          <div className={`flex-1 w-full ${theme === 'sun' ? 'theme-sun bg-white' : 'bg-slate-950'} rounded-[38px] overflow-y-auto no-scrollbar relative flex flex-col`}>
            {mainAppContent}
          </div>
        </div>
      </div>
    );
  }

  return mainAppContent;
}

