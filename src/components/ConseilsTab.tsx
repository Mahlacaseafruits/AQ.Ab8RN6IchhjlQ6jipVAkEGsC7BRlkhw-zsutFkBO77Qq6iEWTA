/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, AdviceArticle } from '../types';
import { CONSEILS_ARTICLES } from '../data/conseilsData';
import { BUSINESS_INFO } from '../data/appData';
import { 
  Lightbulb, 
  Search, 
  Droplets, 
  ShieldCheck, 
  Zap, 
  Wrench, 
  BookOpen, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  X, 
  Info,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface ConseilsTabProps {
  setActiveTab: (tab: TabType) => void;
}

export const ConseilsTab: React.FC<ConseilsTabProps> = ({ setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<AdviceArticle | null>(null);

  // Interactive Diagnostic state
  const [diagnosticProblem, setDiagnosticProblem] = useState<string>('');

  const categories = [
    { id: 'all', label: "Toutes les astuces", icon: Lightbulb },
    { id: 'canalisations', label: "Entretien Canalisations", icon: Droplets },
    { id: 'fuites', label: "Prévention Fuites", icon: ShieldCheck },
    { id: 'economies', label: "Économies d'Eau", icon: Zap },
    { id: 'urgence', label: "Réflexes Urgence", icon: Wrench },
    { id: 'materiaux', label: "PPR & Matériaux", icon: BookOpen },
  ];

  const filteredArticles = CONSEILS_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.some((para) => para.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Diagnostic options
  const diagnosticOptions = [
    {
      id: 'evacuation-lente',
      title: "L'eau de mon évier ou lavabo s'évacue très lentement (glouglou)",
      solution: "Un bouchon de graisse, marc ou cheveux commence à se former dans le siphon.",
      action: "Astuce : Versez 3 cuillères de bicarbonate + vinaigre blanc, laissez agir 15 min puis rincez à l'eau très chaude. Si ça persiste, démontez le siphon avec un seau ou appelez-nous pour un débouchage haute pression.",
      urgency: 'normale'
    },
    {
      id: 'chasse-coule',
      title: "Ma chasse d'eau coule sans arrêt dans la cuvette du WC",
      solution: "Le flotteur est déréglé ou le joint du clapet de vidage est entartré/usé.",
      action: "Astuce : Fermez le petit robinet d'arrêt sur le côté du WC pour stopper le gaspillage. Retirez le couvercle et détartrez le joint au vinaigre. Si le clapet est percé, nous le remplaçons en 20 minutes.",
      urgency: 'urgente'
    },
    {
      id: 'tache-humidite',
      title: "Tache d'humidité ou carrelage mouillé sans raison apparente",
      solution: "Forte suspicion de micro-fuite sur canalisation encastrée ou sous-dalle.",
      action: "Réflexe : Faites le test du relevé de compteur d'eau le soir. Si le compteur tourne robinets fermés, fermez votre vanne générale et contactez Major Plomberie d'urgence pour une détection.",
      urgency: 'immédiate'
    },
    {
      id: 'faible-pression',
      title: "Pression d'eau très faible au robinet de la cuisine ou douche",
      solution: "Mousseur entartré par le calcaire ou souci sur le surpresseur du château d'eau.",
      action: "Astuce : Dévissez l'embout (mousseur) au bout de votre robinet et trempez-le dans du vinaigre blanc pendant 30 minutes. S'il est propre et que la pression reste faible sur toute la maison, c'est votre pompe ou régulateur qu'il faut vérifier.",
      urgency: 'normale'
    }
  ];

  return (
    <div className="space-y-10 pb-16 max-w-6xl mx-auto">
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-500/20 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-blue-500/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Guide Pratique • Astuces d'Artisan Plombier</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Conseils & Astuces pour vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Canalisations & Sanitaires</span>
          </h1>

          <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-normal">
            Découvrez nos articles courts et faciles à comprendre pour entretenir vos tuyauteries au quotidien, éviter le gaspillage d'eau et réagir efficacement en cas d'imprévu avant l'arrivée de nos artisans à Foumbot, Bafoussam ou Foumban.
          </p>

          {/* Search Bar */}
          <div className="pt-2 relative max-w-xl">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une astuce (ex: bouchon, vinaigre, fuite, compteur, PPR...)"
              className="w-full bg-slate-950/80 border border-slate-700 text-white placeholder-slate-400 text-sm rounded-2xl pl-11 pr-10 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded-md"
              >
                Effacer
              </button>
            )}
          </div>
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
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold scale-[1.02] ring-1 ring-blue-400'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <span>📚 Articles & Bonnes Pratiques</span>
            <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full">
              {filteredArticles.length} {filteredArticles.length > 1 ? 'articles' : 'article'}
            </span>
          </h2>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-12 text-center border border-slate-800 space-y-4">
            <Lightbulb className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-display font-semibold text-white text-lg">Aucune astuce trouvée</h3>
            <p className="text-slate-200 text-sm max-w-md mx-auto font-normal">
              Nous n'avons pas trouvé d'article correspondant à &laquo; {searchQuery} &raquo;. N'hésitez pas à poser votre question directement à nos plombiers sur WhatsApp !
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              Afficher toutes les astuces
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/50 transition-all shadow-md flex flex-col justify-between cursor-pointer group hover:-translate-y-1 duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/20">
                      {article.categoryLabel}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      ⏱️ {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-300 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-3 font-normal">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                  <span className="flex items-center gap-1">
                    <span>Lire le guide complet</span>
                  </span>
                  <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Quick Diagnostic Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Outil Diagnostic Gratuit</span>
            </div>
            <h3 className="font-display font-bold text-xl text-white">
              🛠️ Diagnostic Rapide : Quel est votre symptôme ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-normal">
              Sélectionnez votre problème ci-dessous pour obtenir immédiatement le bon geste à faire.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {diagnosticOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setDiagnosticProblem(diagnosticProblem === opt.id ? '' : opt.id)}
              className={`p-4 rounded-2xl text-left transition-all border flex items-start justify-between gap-3 ${
                diagnosticProblem === opt.id
                  ? 'bg-blue-950/60 border-blue-500/60 text-white ring-1 ring-blue-500/40 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="font-semibold text-sm text-white leading-snug">{opt.title}</div>
                <div className="text-[11px] text-slate-200 font-normal">{opt.solution}</div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                diagnosticProblem === opt.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {diagnosticProblem === opt.id ? '✓' : '?'}
              </div>
            </button>
          ))}
        </div>

        {diagnosticProblem && (
          <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-5 sm:p-6 animate-fadeIn space-y-4 shadow-xl">
            {(() => {
              const selectedOpt = diagnosticOptions.find(o => o.id === diagnosticProblem);
              if (!selectedOpt) return null;
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Conseil de l'Artisan Plombier
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded font-semibold ${
                      selectedOpt.urgency === 'immédiate' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      Urgence : {selectedOpt.urgency}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed bg-slate-950/90 p-4 rounded-xl border border-slate-700 shadow-inner">
                    {selectedOpt.action}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
                    <span className="text-xs text-slate-200 font-medium">
                      Vous préférez qu'un professionnel s'en charge sur place ?
                    </span>
                    <div className="flex items-center gap-3">
                      <a
                        href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Bonjour%2C%20j%27ai%20un%20souci%20%3A%20${encodeURIComponent(selectedOpt.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Aide WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setActiveTab('devis')}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all shadow-md"
                      >
                        <span>Demander un devis</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Article Detail Modal / Drawer */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 pr-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {selectedArticle.categoryLabel}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ⏱️ {selectedArticle.readTime}
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                {selectedArticle.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-blue-100 font-medium bg-blue-950/80 p-4 rounded-2xl border border-blue-500/50 leading-relaxed shadow-sm">
              « {selectedArticle.summary} »
            </p>

            <div className="space-y-4">
              <h3 className="font-display font-semibold text-white text-base sm:text-lg flex items-center gap-2">
                <span>📋 Les étapes & conseils clés</span>
              </h3>
              <div className="space-y-3">
                {selectedArticle.content.map((para, i) => (
                  <div key={i} className="flex items-start gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-700/80">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      {i + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                      {para}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {selectedArticle.tipBox && (
              <div className="bg-emerald-950/80 border border-emerald-500/60 rounded-2xl p-4 sm:p-5 space-y-1.5 text-xs sm:text-sm shadow-sm">
                <div className="font-bold text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Astuce Pro Major Plomberie</span>
                </div>
                <p className="text-emerald-100 font-normal leading-relaxed pl-6">
                  {selectedArticle.tipBox}
                </p>
              </div>
            )}

            {selectedArticle.warningBox && (
              <div className="bg-amber-950/80 border border-amber-500/60 rounded-2xl p-4 sm:p-5 space-y-1.5 text-xs sm:text-sm shadow-sm">
                <div className="font-bold text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Attention / Précaution</span>
                </div>
                <p className="text-amber-100 font-normal leading-relaxed pl-6">
                  {selectedArticle.warningBox}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition-colors"
              >
                Fermer l'astuce
              </button>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={`tel:${BUSINESS_INFO.phoneFull}`}
                  className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  <span>Urgence Plombier</span>
                </a>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    setActiveTab('devis');
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1 transition-all shadow-md"
                >
                  <span>Demander un devis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Assistance Callout */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-2 max-w-xl">
          <h3 className="font-display font-bold text-lg sm:text-xl text-white">
            Besoin d'une intervention concrète à Foumbot, Bafoussam ou Foumban ?
          </h3>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
            Même avec les meilleures astuces, une fuite sous-dalle ou une installation sanitaire complète requiert le matériel et l'expertise d'un artisan agréé.
          </p>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-end gap-3 shrink-0">
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Bonjour%20Major%20Plomberie%2C%20j%27ai%20lu%20vos%20conseils%20et%20j%27aimerais%20une%20intervention.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Assistance WhatsApp</span>
          </a>
          <button
            onClick={() => setActiveTab('devis')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md"
          >
            <span>Devis Gratuit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
