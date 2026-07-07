import React from 'react';
import { TabType } from '../types';
import { 
  Home, 
  Wrench, 
  Image as ImageIcon, 
  FileText, 
  MapPin, 
  HelpCircle, 
  Award, 
  PhoneCall,
  Lightbulb
} from 'lucide-react';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'accueil', icon: Home, label: 'Accueil' },
    { id: 'services', icon: Wrench, label: 'Services' },
    { id: 'galerie', icon: ImageIcon, label: 'Galerie' },
    { id: 'devis', icon: FileText, label: 'Devis' },
    { id: 'conseils', icon: Lightbulb, label: 'Conseils' },
    { id: 'carte', icon: MapPin, label: 'Carte' },
    { id: 'faq', icon: HelpCircle, label: 'FAQ' },
    { id: 'apropos', icon: Award, label: 'À propos' },
    { id: 'contact', icon: PhoneCall, label: 'Contact' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 lg:hidden shadow-2xl">
      <div className="flex items-center justify-between overflow-x-auto no-scrollbar max-w-xl mx-auto px-1.5 py-2 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all min-w-[54px] shrink-0 ${
                isActive
                  ? 'text-blue-400 bg-blue-500/15 scale-105 font-bold shadow-sm ring-1 ring-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 transition-transform ${isActive ? 'scale-110 text-blue-400' : 'text-slate-400'}`} />
              <span className={`text-[10px] tracking-tight leading-none truncate ${isActive ? 'text-blue-300 font-semibold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

