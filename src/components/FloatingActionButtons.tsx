import React from 'react';
import { BUSINESS_INFO } from '../data/appData';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingActionButtons: React.FC = () => {
  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3 lg:bottom-6">
      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Bonjour%20Major%20Plomberie%2C%20je%20vous%20contacte%20depuis%20l%27application.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/40 hover:scale-110 active:scale-95 transition-all border-2 border-emerald-400/50 group relative"
        title="Discuter sur WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 text-xs font-semibold whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-emerald-500/30">
          WhatsApp : {BUSINESS_INFO.phoneDisplay}
        </span>
      </a>

      {/* Direct Call Floating Button */}
      <a
        href={`tel:${BUSINESS_INFO.phoneFull}`}
        className="w-13 h-13 sm:w-14 sm:h-14 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-600/40 hover:scale-110 active:scale-95 transition-all border-2 border-red-400/50 group relative animate-bounce"
        title="Appel Urgence"
      >
        <Phone className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-red-400 text-xs font-semibold whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-red-500/30">
          Appeler Urgence 24/7
        </span>
      </a>
    </div>
  );
};
