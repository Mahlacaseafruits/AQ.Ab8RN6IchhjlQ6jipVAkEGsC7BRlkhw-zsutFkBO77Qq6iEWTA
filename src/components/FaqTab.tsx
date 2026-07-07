import React, { useState } from 'react';
import { FAQ_ITEMS, BUSINESS_INFO } from '../data/appData';
import { HelpCircle, Search, ChevronDown, ChevronUp, MessageCircle, Phone, Wrench, ShieldCheck, Clock, DollarSign } from 'lucide-react';

export const FaqTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openAccordionIds, setOpenAccordionIds] = useState<string[]>(['faq-1', 'faq-2', 'faq-paiement']);

  const categories = [
    { id: 'all', label: 'Toutes les questions', icon: HelpCircle },
    { id: 'depannage', label: 'Dépannage & Urgence', icon: Wrench },
    { id: 'installation', label: 'Installation Sanitaire', icon: ShieldCheck },
    { id: 'tarifs', label: 'Tarifs & Devis', icon: DollarSign },
    { id: 'intervention', label: 'Délais & Zones', icon: Clock },
  ];

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header section - Clean Minimalism */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 border border-blue-500/30">
          <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
          <span>Foire Aux Questions (FAQ)</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Réponses à vos questions les plus fréquentes
        </h1>
        <p className="text-slate-200 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
          Retrouvez ici toutes les informations pratiques concernant nos prestations de plomberie, nos délais d'intervention à Foumbot, Bafoussam et Foumban, ainsi que nos garanties.
        </p>

        {/* Search Bar */}
        <div className="mt-6 relative max-w-xl">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une question (ex: fuite, devis, PPR, délais...)"
            className="w-full bg-slate-950/90 border border-slate-700 text-white placeholder-slate-400 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner font-normal"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded"
            >
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold ring-1 ring-blue-400'
                  : 'bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-10 text-center border border-slate-800 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-display font-semibold text-white text-base">Aucune question trouvée</h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto font-normal">
              Nous n'avons pas trouvé de réponse pour la recherche &laquo; {searchQuery} &raquo;. N'hésitez pas à nous contacter directement sur WhatsApp.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openAccordionIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-slate-900/95 rounded-2xl border border-slate-800 hover:border-slate-700 shadow-md overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isOpen ? 'bg-blue-600 text-white' : 'bg-slate-800 text-blue-400'
                    }`}>
                      ?
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white text-sm sm:text-base leading-snug">
                        {faq.question}
                      </h3>
                      <span className="inline-block mt-2 text-[11px] font-semibold uppercase tracking-wider text-blue-300 bg-blue-950/80 border border-blue-800/50 px-2.5 py-0.5 rounded-md">
                        {faq.category === 'depannage' && 'Dépannage & Urgence'}
                        {faq.category === 'installation' && 'Installation Sanitaire'}
                        {faq.category === 'tarifs' && 'Tarifs & Devis'}
                        {faq.category === 'intervention' && 'Délais & Zones'}
                      </span>
                    </div>
                  </div>
                  <div className={`p-1.5 rounded-lg shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-blue-600/20 text-blue-400' : 'text-slate-400 bg-slate-800/50'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-slate-800/80 bg-slate-950/60">
                    <div className="pl-9 text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Assistance Box */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-2 max-w-lg">
          <h3 className="font-display font-bold text-white text-base sm:text-lg">
            Vous ne trouvez pas la réponse à votre question ?
          </h3>
          <p className="text-slate-200 text-xs sm:text-sm font-normal leading-relaxed">
            Nos artisans plombiers sont disponibles 7j/7 pour vous conseiller, examiner des photos de vos tuyaux et vous proposer une solution adaptée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Bonjour%20Major%20Plomberie%2C%20j%27ai%20une%20question%20technique%20concernant%20vos%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Poser sur WhatsApp</span>
          </a>
          <a
            href={`tel:${BUSINESS_INFO.phoneFull}`}
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all border border-slate-700"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>Appeler le {BUSINESS_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
