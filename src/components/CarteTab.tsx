import React, { useState, useEffect } from 'react';
import { INTERVENTION_ZONES, BUSINESS_INFO, SERVICES_LIST } from '../data/appData';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  Phone, 
  ExternalLink, 
  Compass, 
  CreditCard, 
  Plus, 
  Coins, 
  Eye, 
  EyeOff, 
  Check, 
  Sparkles, 
  Download, 
  RefreshCw, 
  Smartphone, 
  Wallet, 
  QrCode, 
  TrendingUp,
  Receipt,
  ArrowRight,
  Info
} from 'lucide-react';

// Custom interfaces for transaction history
interface Transaction {
  id: string;
  date: string;
  serviceName: string;
  originalPrice: number;
  discountPrice: number;
  discountAmount: number;
}

export const CarteTab: React.FC = () => {
  // Main Tab selector: 'visa' or 'map'. Default to 'visa' to fulfill user intent immediately
  const [activeMode, setActiveMode] = useState<'visa' | 'map'>('visa');

  // --- STATE FOR ORIGINAL GEOGRAPHIC MAP ---
  const [selectedZone, setSelectedZone] = useState<string>('Foumbot (Siège)');
  const currentZoneInfo = INTERVENTION_ZONES.find(z => z.name === selectedZone) || INTERVENTION_ZONES[0];

  // --- STATE FOR VISA CARD GENERATOR ---
  const [cardholder, setCardholder] = useState<string>(() => {
    return localStorage.getItem('mp-visa-holder') || 'MAHAMAT ALIOU';
  });
  
  const [cardTier, setCardTier] = useState<'classic' | 'gold' | 'platinum' | 'infinite'>(() => {
    return (localStorage.getItem('mp-visa-tier') as any) || 'gold';
  });

  const [cardNumber, setCardNumber] = useState<string>(() => {
    return localStorage.getItem('mp-visa-number') || '4152 4899 3012 5678';
  });

  const [cardCvv, setCardCvv] = useState<string>(() => {
    return localStorage.getItem('mp-visa-cvv') || '482';
  });

  const [cardExpiry, setCardExpiry] = useState<string>(() => {
    return localStorage.getItem('mp-visa-expiry') || '08/31';
  });

  const [cardBalance, setCardBalance] = useState<number>(() => {
    const saved = localStorage.getItem('mp-visa-balance');
    return saved ? Number(saved) : 25000; // Starting default balance
  });

  // Card Flip and CVV view status
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showCvv, setShowCvv] = useState<boolean>(false);

  // Recharge Modal/Form Status
  const [rechargeProvider, setRechargeProvider] = useState<'om' | 'momo'>('om');
  const [rechargePhone, setRechargePhone] = useState<string>('640321535');
  const [rechargeAmount, setRechargeAmount] = useState<string>('15000');
  const [rechargeStep, setRechargeStep] = useState<'idle' | 'ussd_push' | 'success'>('idle');
  const [rechargePin, setRechargePin] = useState<string>('');
  const [isProcessingRecharge, setIsProcessingRecharge] = useState<boolean>(false);

  // Payment Simulation Status
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_LIST[0]?.id || '');
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [receiptDetails, setReceiptDetails] = useState<any | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Transaction history simulation
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('mp-visa-txs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'TX-4921',
        date: '02 Juil 2026',
        serviceName: "Achat de raccord PPR & vannes à Foumbot",
        originalPrice: 8500,
        discountPrice: 7650,
        discountAmount: 850
      }
    ];
  });

  // Save Visa state in local storage whenever they change
  useEffect(() => {
    localStorage.setItem('mp-visa-holder', cardholder);
    localStorage.setItem('mp-visa-tier', cardTier);
    localStorage.setItem('mp-visa-number', cardNumber);
    localStorage.setItem('mp-visa-cvv', cardCvv);
    localStorage.setItem('mp-visa-expiry', cardExpiry);
    localStorage.setItem('mp-visa-balance', String(cardBalance));
    localStorage.setItem('mp-visa-txs', JSON.stringify(transactions));
  }, [cardholder, cardTier, cardNumber, cardCvv, cardExpiry, cardBalance, transactions]);

  // Card Tiers Definitions
  const TIER_DETAILS = {
    classic: {
      label: 'Visa Classic Privilège',
      discount: 0.05,
      discountPercent: '5%',
      colorName: 'Bleu Royal Métallique',
      gradient: 'linear-gradient(135deg, #1d4ed8 0%, #1e1b4b 100%)',
      textColor: 'text-blue-100',
      accentColor: 'text-blue-300',
      borderColor: 'border-blue-400/30',
      badgeBg: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
      initialBalance: 5000,
      chipColor: 'from-amber-200 to-amber-500'
    },
    gold: {
      label: 'Visa Gold Premium',
      discount: 0.10,
      discountPercent: '10%',
      colorName: 'Or Brossé',
      gradient: 'linear-gradient(135deg, #b45309 0%, #f59e0b 50%, #78350f 100%)',
      textColor: 'text-amber-100',
      accentColor: 'text-yellow-300',
      borderColor: 'border-amber-400/40',
      badgeBg: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      initialBalance: 25000,
      chipColor: 'from-yellow-100 via-yellow-300 to-amber-600'
    },
    platinum: {
      label: 'Visa Platinum VIP',
      discount: 0.15,
      discountPercent: '15%',
      colorName: 'Acier Sidéral',
      gradient: 'linear-gradient(135deg, #334155 0%, #475569 45%, #0f172a 100%)',
      textColor: 'text-slate-100',
      accentColor: 'text-cyan-300',
      borderColor: 'border-slate-500/30',
      badgeBg: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
      initialBalance: 50000,
      chipColor: 'from-slate-100 via-slate-300 to-slate-500'
    },
    infinite: {
      label: 'Visa Infinite Excellence',
      discount: 0.25,
      discountPercent: '25%',
      colorName: 'Carbone Black & Or',
      gradient: 'linear-gradient(135deg, #020617 0%, #1e293b 45%, #020617 100%)',
      textColor: 'text-amber-400',
      accentColor: 'text-slate-300',
      borderColor: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/30 text-amber-400 border border-amber-500/30',
      initialBalance: 100000,
      chipColor: 'from-yellow-200 via-yellow-400 to-amber-600'
    }
  };

  const selectedService = SERVICES_LIST.find(s => s.id === selectedServiceId) || SERVICES_LIST[0];

  // Helper: extract starting numerical price from string e.g. "À partir de 15 000 FCFA" -> 15000
  const getNumericalPrice = (priceStr: string): number => {
    const cleanStr = priceStr.replace(/[^0-9]/g, '');
    const val = parseInt(cleanStr, 10);
    return isNaN(val) ? 45000 : val; // default to 45000 if "Sur devis"
  };

  const servicePrice = getNumericalPrice(selectedService.priceRange);
  const discountRate = TIER_DETAILS[cardTier].discount;
  const finalPrice = Math.round(servicePrice * (1 - discountRate));
  const savedAmount = servicePrice - finalPrice;

  // Custom inline styles for perspective and cards
  const cardContainerStyle: React.CSSProperties = {
    perspective: '1000px',
    width: '100%',
    maxWidth: '400px',
    height: '240px',
    position: 'relative'
  };

  const cardInnerStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
  };

  const cardFaceCommonStyle = (gradient: string): React.CSSProperties => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '1.5rem',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: gradient,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.1) inset',
    border: cardTier === 'infinite' ? '1.5px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden'
  });

  const cardBackStyle = (gradient: string): React.CSSProperties => ({
    ...cardFaceCommonStyle(gradient),
    transform: 'rotateY(180deg)'
  });

  // Action: Generate new random Card Info
  const handleRegenerateCard = () => {
    const randomSuffix = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
    const formatted = `4152 4899 ${randomSuffix.slice(0, 4)} ${randomSuffix.slice(4)}`;
    const randomCvv = String(Math.floor(100 + Math.random() * 900));
    setCardNumber(formatted);
    setCardCvv(randomCvv);
  };

  // Action: Change Card Tier (updates default balance as starting gift)
  const handleSelectTier = (tier: 'classic' | 'gold' | 'platinum' | 'infinite') => {
    setCardTier(tier);
    setCardBalance(TIER_DETAILS[tier].initialBalance);
  };

  // Action: Process simulated Orange Money / MoMo Reload
  const handleInitReload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rechargePhone || !rechargeAmount || Number(rechargeAmount) <= 0) return;
    setRechargeStep('ussd_push');
    setRechargePin('');
  };

  const handleConfirmUSSD = () => {
    setIsProcessingRecharge(true);
    setTimeout(() => {
      setIsProcessingRecharge(false);
      setCardBalance(prev => prev + Number(rechargeAmount));
      setRechargeStep('success');
      
      // Add transaction to history
      const now = new Date();
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
      const formattedDate = `${now.getDate().toString().padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`;
      
      const newTx: Transaction = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        date: formattedDate,
        serviceName: `Rechargement de carte via ${rechargeProvider === 'om' ? 'Orange Money' : 'MTN MoMo'}`,
        originalPrice: Number(rechargeAmount),
        discountPrice: Number(rechargeAmount),
        discountAmount: 0
      };
      setTransactions(prev => [newTx, ...prev]);
    }, 1800);
  };

  // Action: Process Simulated Plumbing Service Payment with the Visa Card
  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardBalance < finalPrice) return; // Guard

    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setCardBalance(prev => prev - finalPrice);
      setPaymentSuccess(true);

      const now = new Date();
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
      const formattedDate = `${now.getDate().toString().padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`;
      const recId = `FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const newTx: Transaction = {
        id: recId,
        date: formattedDate,
        serviceName: `Facture payée : ${selectedService.title}`,
        originalPrice: servicePrice,
        discountPrice: finalPrice,
        discountAmount: savedAmount
      };

      setTransactions(prev => [newTx, ...prev]);
      
      setReceiptDetails({
        id: recId,
        date: formattedDate,
        holderName: cardholder || 'MEMBRE VIP',
        cardNumber: cardNumber,
        serviceName: selectedService.title,
        originalPrice: servicePrice,
        discountPercent: TIER_DETAILS[cardTier].discountPercent,
        discountAmount: savedAmount,
        paidPrice: finalPrice,
        newBalance: cardBalance - finalPrice
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Dynamic Sub-Tab Selector (Sliding style) */}
      <div className="flex justify-center">
        <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex gap-1 w-full max-w-lg shadow-xl">
          <button
            onClick={() => setActiveMode('visa')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'visa'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>💳 Carte Visa Privilège</span>
            <span className="hidden xs:inline-block text-[10px] bg-amber-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded-md animate-pulse">VIP</span>
          </button>
          
          <button
            onClick={() => setActiveMode('map')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'map'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>📍 Zone d'Intervention</span>
          </button>
        </div>
      </div>

      {/* ==================== VIEW 1: VISA CARD CREATOR / LOYALTY ENGINE ==================== */}
      {activeMode === 'visa' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <CreditCard className="w-32 h-32 text-blue-500" />
            </div>
            
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Programme de Fidélité Elite & Remises Immédiates</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              💳 Carte Visa Privilège Major Plomberie
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Générez votre <strong className="text-white">Carte Visa VIP nominative</strong>. Bénéficiez de remises immédiates allant de <strong className="text-emerald-400">5% à 25%</strong> sur toutes nos prestations sanitaires et tuyauteries au Cameroun. Alimentez votre solde et simulez des règlements instantanés !
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 3D Visa Card & Customizer */}
            <div className="lg:col-span-7 space-y-6 flex flex-col items-center lg:items-stretch">
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 w-full flex flex-col items-center space-y-6">
                <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                    <span>💳 Votre Carte Visa en Temps Réel</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="text-xs bg-slate-850 hover:bg-slate-800 text-blue-300 font-semibold px-3 py-1.5 rounded-lg border border-slate-700/60 transition-colors"
                    >
                      🔄 Tourner la carte
                    </button>
                    <button
                      onClick={() => setShowCvv(!showCvv)}
                      className="text-xs bg-slate-850 hover:bg-slate-800 text-slate-300 p-1.5 rounded-lg border border-slate-700/60 transition-colors"
                      title={showCvv ? "Masquer le CVV" : "Afficher le CVV"}
                    >
                      {showCvv ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* --- Interactive 3D Card --- */}
                <div style={cardContainerStyle} className="group cursor-pointer select-none">
                  {/* Subtle hover effect on card wrapper */}
                  <div 
                    style={cardInnerStyle} 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] rounded-[1.5rem]"
                  >
                    {/* CARD FRONT FACE */}
                    <div style={cardFaceCommonStyle(TIER_DETAILS[cardTier].gradient)}>
                      {/* Reflection overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-60 pointer-events-none" />
                      
                      {/* Top Row: Business and Visa Level */}
                      <div className="flex justify-between items-start relative z-10">
                        <div>
                          <span className="font-display font-black text-sm tracking-tight text-white block">
                            MAJOR PLOMBERIE
                          </span>
                          <span className="text-[9px] tracking-widest text-white/70 uppercase">
                            & Fils • Artisan Pro
                          </span>
                        </div>
                        <div className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${TIER_DETAILS[cardTier].textColor} bg-white/10 backdrop-blur-md`}>
                          VIP MEMBER
                        </div>
                      </div>

                      {/* Middle Row: Gold Chip & Contactless Sign */}
                      <div className="flex items-center gap-3 relative z-10 my-1">
                        {/* Realistic Card Chip */}
                        <div className={`w-11 h-8 rounded-md bg-gradient-to-br ${TIER_DETAILS[cardTier].chipColor} border border-slate-950/20 shadow-inner flex flex-col justify-around p-1 relative overflow-hidden`}>
                          <div className="w-full h-px bg-slate-950/20" />
                          <div className="w-full h-px bg-slate-950/20" />
                          <div className="w-px h-full bg-slate-950/20 absolute left-1/3" />
                          <div className="w-px h-full bg-slate-950/20 absolute left-2/3" />
                          <div className="w-3.5 h-3 rounded-sm bg-yellow-400/20 border border-slate-900/10 self-center" />
                        </div>
                        {/* Contactless symbol */}
                        <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 8a6 6 0 0 1 0 8M8 5a10 10 0 0 1 0 14M11 2a14 14 0 0 1 0 20" />
                        </svg>
                      </div>

                      {/* Card Number */}
                      <div className="font-mono text-lg sm:text-xl text-white tracking-[0.16em] font-medium text-shadow relative z-10">
                        {cardNumber}
                      </div>

                      {/* Bottom Row: Expiration, Holder Name, Visa Logo */}
                      <div className="flex justify-between items-end relative z-10">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[7px] text-white/60 font-mono uppercase leading-none">VALID<br/>THRU</span>
                            <span className="text-[11px] font-mono text-white font-bold leading-none">{cardExpiry}</span>
                          </div>
                          <div className="text-[11px] font-mono tracking-wider font-extrabold text-white truncate max-w-[210px]">
                            {cardholder ? cardholder.toUpperCase() : 'MEMBRE PRIVILÈGE'}
                          </div>
                        </div>

                        {/* VISA Branding Logo */}
                        <div className="flex flex-col items-end">
                          <span className="text-2xl font-black italic text-white leading-none tracking-tight">
                            VISA
                          </span>
                          <span className={`text-[8px] font-extrabold tracking-widest uppercase ${TIER_DETAILS[cardTier].accentColor}`}>
                            {cardTier}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CARD BACK FACE */}
                    <div style={cardBackStyle(TIER_DETAILS[cardTier].gradient)}>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none" />
                      
                      {/* Black Magnetic Strip */}
                      <div className="w-full h-11 bg-slate-950 -mx-6 mt-1" />

                      {/* CVV panel */}
                      <div className="space-y-1 my-3">
                        <span className="text-[7px] text-white/50 uppercase block font-mono">Signature autorisée / CVV :</span>
                        <div className="flex items-center">
                          <div className="w-3/4 h-8 bg-slate-100 flex items-center justify-end px-3 font-mono text-slate-700 italic font-semibold rounded-l-md text-sm bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[size:10px_100%]">
                            Major Plomberie Cam
                          </div>
                          <div className="w-1/4 h-8 bg-white text-slate-900 border-l border-slate-300 font-mono text-sm font-black flex items-center justify-center rounded-r-md">
                            {showCvv ? cardCvv : '•••'}
                          </div>
                        </div>
                      </div>

                      {/* Legal notice and instructions */}
                      <p className="text-[7px] text-white/60 leading-tight">
                        Cette carte est virtuelle, nominative et exclusive au réseau Major Plomberie & Fils Cameroun (Foumbot, Bafoussam, Foumban). Les avantages et remises de {TIER_DETAILS[cardTier].discountPercent} s'appliquent immédiatement sur présentation lors de la facturation. Payé après service. L'utilisation frauduleuse expose à des poursuites. Assistance : +237 640 321 535.
                      </p>

                      {/* Back Logo */}
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[8px] text-white/40 font-mono">ID: MP-{cardCvv}</span>
                        <span className="text-sm font-bold italic text-white/80">VISA</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 italic text-center">
                  💡 Cliquez sur la carte ci-dessus pour la retourner et voir le code de sécurité CVV !
                </p>
              </div>

              {/* CARD CUSTOMIZER CONTROLS */}
              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 w-full space-y-6">
                <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Personnaliser ma carte Visa</span>
                </h4>

                <div className="space-y-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Nom complet du Titulaire :
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardholder}
                        onChange={(e) => setCardholder(e.target.value.substring(0, 22))}
                        placeholder="Ex: MAHAMAT ALIOU"
                        className="w-full bg-slate-950 text-white font-semibold text-sm px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-500/80 outline-none transition-colors uppercase"
                      />
                    </div>
                  </div>

                  {/* Tier Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Niveau de Privilège (Tier) :
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {(Object.keys(TIER_DETAILS) as Array<keyof typeof TIER_DETAILS>).map((tierKey) => {
                        const tier = TIER_DETAILS[tierKey];
                        const isActive = cardTier === tierKey;
                        return (
                          <button
                            key={tierKey}
                            type="button"
                            onClick={() => handleSelectTier(tierKey)}
                            className={`py-2 px-1.5 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer ${
                              isActive
                                ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <span className="capitalize">{tierKey}</span>
                            <span className="text-[10px] opacity-80">{tier.discountPercent} Remise</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Regenerate details action */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleRegenerateCard}
                      className="flex-1 bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs py-3 px-4 rounded-xl border border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4 text-cyan-400" />
                      <span>Changer de numéros de carte</span>
                    </button>
                    
                    <div className="px-4 py-3 bg-slate-950/50 border border-slate-800/80 rounded-xl text-xs text-slate-400 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Le niveau choisi modifie votre solde initial de bienvenue !</span>
                    </div>
                  </div>
                </div>

                {/* Benefits Explanation Box */}
                <div className={`p-4 rounded-2xl border ${TIER_DETAILS[cardTier].borderColor} bg-slate-950/70 space-y-2`}>
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <div className={`p-1.5 rounded-lg ${TIER_DETAILS[cardTier].badgeBg}`}>
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span>Avantages de votre {TIER_DETAILS[cardTier].label}</span>
                  </div>
                  
                  <ul className="space-y-1.5 text-xs text-slate-300 font-sans pl-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Remise immédiate de <strong className="text-emerald-400">{TIER_DETAILS[cardTier].discountPercent}</strong> sur tous les chantiers (apparents ou encastrés PPR).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Garantie prolongée de <strong className="text-white">12 mois supplémentaires</strong> sur les tuyauteries sanitaires.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Prise en charge prioritaire : arrivée sous <strong className="text-white">20 minutes</strong> à Foumbot.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Wallet Balance, Refills & Payment Simulators */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* WALLET BALANCE PANEL */}
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">Solde Actuel Visa</span>
                    <h2 className="font-mono text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2">
                      <span>{cardBalance.toLocaleString('fr-FR')}</span>
                      <span className="text-sm font-bold text-blue-400 font-sans">FCFA</span>
                    </h2>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/20 flex items-center justify-center">
                    <Wallet className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400">Niveau de remise :</span>
                  <span className={`font-bold ${TIER_DETAILS[cardTier].badgeBg} px-2.5 py-0.5 rounded-full`}>
                    -{TIER_DETAILS[cardTier].discountPercent} sur facture
                  </span>
                </div>

                {/* --- MOCK RECHARGE STATION --- */}
                <div className="border-t border-slate-800/80 pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Coins className="w-4 h-4 text-emerald-400" />
                      <span>Recharger mon solde instantanément</span>
                    </h4>
                  </div>

                  {rechargeStep === 'idle' && (
                    <form onSubmit={handleInitReload} className="space-y-3.5">
                      {/* Provider Select */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setRechargeProvider('om');
                            setRechargePhone('640321535');
                          }}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            rechargeProvider === 'om'
                              ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                              : 'bg-slate-950 border-slate-850 text-slate-500 hover:border-slate-800'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                          <span>Orange Money</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => {
                            setRechargeProvider('momo');
                            setRechargePhone('651017585');
                          }}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            rechargeProvider === 'momo'
                              ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500'
                              : 'bg-slate-950 border-slate-850 text-slate-500 hover:border-slate-800'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0" />
                          <span>MTN MoMo</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Phone input */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">N° Téléphone :</span>
                          <input
                            type="text"
                            value={rechargePhone}
                            onChange={(e) => setRechargePhone(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Ex: 6xxxxxxxx"
                            className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Amount select */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">Montant (FCFA) :</span>
                          <select
                            value={rechargeAmount}
                            onChange={(e) => setRechargeAmount(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                          >
                            <option value="5000">5 000 FCFA</option>
                            <option value="15000">15 000 FCFA</option>
                            <option value="30000">30 000 FCFA</option>
                            <option value="75000">75 000 FCFA</option>
                            <option value="150000">150 000 FCFA</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Créer la demande de rechargement</span>
                      </button>
                    </form>
                  )}

                  {rechargeStep === 'ussd_push' && (
                    <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 text-center space-y-4">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto animate-bounce">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      
                      <div className="space-y-1">
                        <h5 className="font-bold text-xs text-white">Confirmation Mobile USSD</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Un message push de paiement a été envoyé sur votre téléphone <strong className="text-white">{rechargePhone}</strong>. Entrez votre code secret pour approuver.
                        </p>
                      </div>

                      <div className="max-w-[180px] mx-auto space-y-2">
                        <input
                          type="password"
                          value={rechargePin}
                          onChange={(e) => setRechargePin(e.target.value.substring(0, 4))}
                          placeholder="Code secret PIN (Simulé)"
                          maxLength={4}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-center text-xs text-white outline-none font-mono tracking-widest placeholder:tracking-normal"
                          required
                        />
                        
                        <button
                          type="button"
                          onClick={handleConfirmUSSD}
                          disabled={rechargePin.length < 4 || isProcessingRecharge}
                          className="w-full bg-amber-500 text-slate-950 disabled:bg-slate-800 disabled:text-slate-500 font-extrabold text-xs py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {isProcessingRecharge ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Validation...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Valider le dépôt</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {rechargeStep === 'success' && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                      
                      <div className="space-y-1">
                        <h5 className="font-bold text-xs text-emerald-400">Rechargement Réussi !</h5>
                        <p className="text-[11px] text-slate-300">
                          Votre carte Visa Major Plomberie a été créditée de <strong className="text-white">{Number(rechargeAmount).toLocaleString('fr-FR')} FCFA</strong>.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setRechargeStep('idle')}
                        className="text-[11px] bg-slate-950 hover:bg-slate-850 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-slate-800 transition-colors cursor-pointer"
                      >
                        Faire un nouveau dépôt
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* DIRECT INVOICE PAYMENT SIMULATOR */}
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Receipt className="w-5 h-5 text-blue-400" />
                  <h3 className="font-display font-bold text-base text-white">Simuler le Paiement d'une Prestation</h3>
                </div>

                {!paymentSuccess ? (
                  <form onSubmit={handleProcessPayment} className="space-y-4">
                    {/* Select service */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase block">Sélectionner la Prestation :</label>
                      <select
                        value={selectedServiceId}
                        onChange={(e) => {
                          setSelectedServiceId(e.target.value);
                          setPaymentSuccess(false);
                        }}
                        className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-3 py-3 text-xs text-white outline-none focus:border-blue-500"
                      >
                        {SERVICES_LIST.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title} ({service.priceRange})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price summary billing calculation */}
                    <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Prix public original :</span>
                        <span className="text-slate-200 font-mono font-bold">{servicePrice.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                      
                      <div className="flex justify-between text-emerald-400 border-b border-slate-800/80 pb-2">
                        <span>Remise carte ({TIER_DETAILS[cardTier].discountPercent}) :</span>
                        <span className="font-mono font-bold">-{savedAmount.toLocaleString('fr-FR')} FCFA</span>
                      </div>

                      <div className="flex justify-between items-center pt-1">
                        <span className="text-white font-bold">Total VIP à payer :</span>
                        <span className="text-blue-400 text-lg font-mono font-black">{finalPrice.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                    </div>

                    {/* Status warning if balance is low */}
                    {cardBalance < finalPrice && (
                      <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-start gap-2 animate-pulse">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-bold">Solde insuffisant !</p>
                          <p className="text-[11px] text-slate-300 leading-normal">
                            Il vous manque {Math.round(finalPrice - cardBalance).toLocaleString('fr-FR')} FCFA. Utilisez le module ci-dessus pour recharger via Mobile Money.
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={cardBalance < finalPrice || isProcessingPayment}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-850 disabled:text-slate-500 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isProcessingPayment ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Paiement sécurisé en cours...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Payer {finalPrice.toLocaleString('fr-FR')} FCFA</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* DIGITAL RECEIPT */
                  <div className="bg-white text-slate-900 rounded-2xl p-5 border-4 border-slate-200 font-mono shadow-2xl relative overflow-hidden text-xs space-y-4">
                    {/* Stamp effect */}
                    <div className="absolute top-2 right-2 border-4 border-dashed border-emerald-600 text-emerald-600 font-black text-sm uppercase px-3 py-1 rounded-md rotate-12 select-none">
                      PAYÉ / VALIDÉ
                    </div>

                    <div className="text-center border-b-2 border-dashed border-slate-300 pb-3 space-y-1">
                      <h4 className="font-display font-black text-sm tracking-tight">MAJOR PLOMBERIE & FILS</h4>
                      <p className="text-[10px] text-slate-500">Foumbot • Bafoussam • Foumban</p>
                      <p className="text-[9px] text-slate-400">Cameroon • Tel: 640 321 535</p>
                    </div>

                    <div className="space-y-2 border-b border-dashed border-slate-300 pb-3 text-[11px]">
                      <div className="flex justify-between">
                        <span>Reçu N° :</span>
                        <span className="font-bold">{receiptDetails?.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date :</span>
                        <span>{receiptDetails?.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Client :</span>
                        <span className="font-bold">{receiptDetails?.holderName.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Règlement :</span>
                        <span className="font-bold">Visa VIP (•{receiptDetails?.cardNumber.slice(-4)})</span>
                      </div>
                    </div>

                    <div className="space-y-2 border-b-2 border-dashed border-slate-300 pb-3">
                      <div className="font-bold">PRESTATION :</div>
                      <p className="text-slate-700 italic leading-snug">{receiptDetails?.serviceName}</p>
                      
                      <div className="flex justify-between pt-2">
                        <span>Prix standard :</span>
                        <span>{receiptDetails?.originalPrice.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Remise VIP ({receiptDetails?.discountPercent}) :</span>
                        <span>-{receiptDetails?.discountAmount.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center font-bold text-sm bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span>TOTAL PAYÉ :</span>
                      <span className="text-blue-700">{receiptDetails?.paidPrice.toLocaleString('fr-FR')} FCFA</span>
                    </div>

                    <p className="text-center text-[9px] text-slate-400 italic">
                      Merci pour votre confiance. Garantie de prestation active.
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => {
                          setPaymentSuccess(false);
                          setReceiptDetails(null);
                        }}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Nouveau test</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          alert(`[MOCK] Reçu ${receiptDetails?.id} enregistré en image.`);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Télécharger</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* TRANSACTION HISTORY COMPONENT */}
              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
                <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span>Historique des transactions</span>
                </h4>

                <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
                  {transactions.length === 0 ? (
                    <p className="text-xs text-slate-500 italic text-center py-4">Aucune transaction enregistrée.</p>
                  ) : (
                    transactions.map((tx) => (
                      <div key={tx.id} className="bg-slate-950/70 border border-slate-850/60 rounded-xl p-3 flex justify-between items-center gap-3 text-xs">
                        <div className="space-y-1 min-w-0">
                          <p className="font-semibold text-white truncate">{tx.serviceName}</p>
                          <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <span>{tx.date}</span>
                            <span>•</span>
                            <span>{tx.id}</span>
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          {tx.serviceName.includes('Rechargement') ? (
                            <span className="text-emerald-400 font-bold font-mono">+{tx.originalPrice.toLocaleString('fr-FR')} FCFA</span>
                          ) : (
                            <div className="space-y-0.5">
                              <p className="text-blue-400 font-bold font-mono">-{tx.discountPrice.toLocaleString('fr-FR')} FCFA</p>
                              {tx.discountAmount > 0 && (
                                <p className="text-[9px] text-emerald-500 font-semibold font-mono">Écon. : -{tx.discountAmount.toLocaleString('fr-FR')}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {transactions.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Voulez-vous effacer l\'historique des transactions ?')) {
                        setTransactions([]);
                      }
                    }}
                    className="w-full text-center text-[10px] text-slate-500 hover:text-red-400 transition-colors py-1 block cursor-pointer"
                  >
                    Effacer l'historique
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ==================== VIEW 2: MAP & INTERVENTION ZONES (ORIGINAL) ==================== */}
      {activeMode === 'map' && (
        <div className="space-y-8 animate-fadeIn">
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
                  <line x1="50%" y1="55%" x2="25%" y2="65%" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4" className="animate-pulse" />
                  <line x1="50%" y1="55%" x2="78%" y2="30%" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4" />
                </svg>

                {/* City Pin 1: Bafoussam (Left / South-West) */}
                <button
                  onClick={() => setSelectedZone('Bafoussam')}
                  className={`absolute top-[58%] left-[18%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all z-20 cursor-pointer ${
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
                  className={`absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all z-30 cursor-pointer ${
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
                  className={`absolute top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all z-20 cursor-pointer ${
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
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all truncate cursor-pointer ${
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
      )}
    </div>
  );
};
