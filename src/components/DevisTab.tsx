import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QuoteRequest } from '../types';
import { BUSINESS_INFO, SERVICES_LIST } from '../data/appData';
import { Calculator, Send, MessageCircle, CheckCircle, Clock, AlertTriangle, Sparkles, WifiOff, Camera, Trash2, RefreshCw, X } from 'lucide-react';

interface DevisTabProps {
  initialService?: string;
}

export const DevisTab: React.FC<DevisTabProps> = ({ initialService }) => {
  const [formData, setFormData] = useState<QuoteRequest>({
    clientName: '',
    phone: '',
    email: '',
    city: 'Foumbot',
    serviceType: initialService || SERVICES_LIST[0].title,
    urgency: 'normale',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });

  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Callback ref to play the video as soon as the element mounts
  const videoRefCallback = useCallback((node: HTMLVideoElement | null) => {
    if (node) {
      videoRef.current = node;
      if (streamRef.current) {
        node.srcObject = streamRef.current;
        node.play().catch(err => console.error("Video play failed:", err));
      }
    } else {
      videoRef.current = null;
    }
  }, []);

  // Start the camera stream
  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(err => console.error("Video play error:", err));
      }
    } catch (err: any) {
      console.warn("Camera access failed, falling back to file input", err);
      setIsCameraActive(false);
      // Fallback to native system camera/album trigger
      document.getElementById('camera-file-picker')?.click();
    }
  };

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Capture frame as base64 JPEG
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setPhoto(dataUrl);
      setFormData(prev => ({ ...prev, photo: dataUrl }));
    }
    stopCamera();
  };

  // File picker handler for native system camera
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhoto(reader.result);
          setFormData(prev => ({ ...prev, photo: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  const handleChange = (field: keyof QuoteRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Instant calculation estimator based on selection
  const calculateEstimatedRange = () => {
    const service = SERVICES_LIST.find(s => s.title === formData.serviceType);
    let base = 25000;
    if (service) {
      if (service.id === 'depannage-urgence') base = 15000;
      if (service.id === 'installation-sanitaire') base = 85000;
      if (service.id === 'tuyauterie-adduction') base = 120000;
      if (service.id === 'chauffe-eau-pompe') base = 40000;
      if (service.id === 'assainissement-evacuation') base = 60000;
    }
    
    // City modifier
    if (formData.city === 'Bafoussam' || formData.city === 'Foumban') {
      base += 5000; // frais de déplacement
    }
    // Urgency modifier
    if (formData.urgency === 'urgente') base *= 1.15;
    if (formData.urgency === 'immédiate') base *= 1.35;

    const min = Math.round(base);
    const max = Math.round(base * 1.5);
    return `${min.toLocaleString('fr-FR')} à ${max.toLocaleString('fr-FR')} FCFA`;
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOffline) {
      alert("Votre connexion internet est inactive. Veuillez vous reconnecter pour pouvoir envoyer votre devis par WhatsApp.");
      return;
    }
    if (!formData.clientName || !formData.phone) {
      alert("Veuillez indiquer votre nom et numéro de téléphone.");
      return;
    }

    const message = `🛠️ *DEMANDE DE DEVIS - MAJOR PLOMBERIE*\n\n` +
      `👤 *Nom :* ${formData.clientName}\n` +
      `📞 *Téléphone :* ${formData.phone}\n` +
      `📍 *Ville :* ${formData.city}\n` +
      `👨‍🔧 *Prestation :* ${formData.serviceType}\n` +
      `⏱️ *Urgence :* ${formData.urgency.toUpperCase()}\n` +
      `💬 *Détails :* ${formData.description || 'Non précisé'}\n` +
      `📸 *Photo jointe :* ${photo ? 'Oui (prise via l\'appareil photo)' : 'Non'}\n\n` +
      `📊 *Estimation auto :* ~${calculateEstimatedRange()}\n` +
      `💳 *Paiement :* Payé après service par OM (640 321 535) ou MoMo (651 017 585)`;

    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOffline) {
      alert("Votre connexion internet est inactive. Veuillez vous reconnecter pour pouvoir enregistrer votre devis en ligne.");
      return;
    }
    if (!formData.clientName || !formData.phone) {
      alert("Veuillez indiquer votre nom et numéro de téléphone.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-3">
        <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
          <Calculator className="w-3.5 h-3.5" />
          <span>Devis Gratuit & Sans Engagement</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          📝 Demande de Devis en Ligne
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Calculez immédiatement une estimation indicative et transmettez votre demande à Major Plomberie & Fils. Réponse en moins de 2 heures !
        </p>
      </div>

      {submitted ? (
        <div className="bg-slate-900 rounded-3xl p-8 border border-emerald-500/50 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Demande enregistrée avec succès !
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
            Merci <strong className="text-white">{formData.clientName}</strong>. Notre équipe à Foumbot examine vos besoins et va vous contacter sur le <strong className="text-emerald-400 font-mono">{formData.phone}</strong>.
          </p>
          {photo && (
            <div className="max-w-xs mx-auto rounded-2xl overflow-hidden border border-slate-800 p-2 bg-slate-950 shadow-inner">
              <span className="text-[10px] text-slate-500 block mb-1.5 text-center">Illustration de panne reçue :</span>
              <img src={photo} alt="Illustration de la panne" className="w-full max-h-48 object-cover rounded-xl" />
            </div>
          )}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md mx-auto text-xs text-slate-400">
            En cas d'extrême urgence, n'attendez pas et appelez directement au{' '}
            <a href={`tel:${BUSINESS_INFO.phoneFull}`} className="text-red-400 font-bold underline">
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
          <button
            onClick={() => {
              setPhoto(null);
              setSubmitted(false);
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Faire une autre demande
          </button>
        </div>
      ) : (
        <form onSubmit={handleStandardSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Fields */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white border-b border-slate-800 pb-3">
              1. Informations sur le chantier
            </h3>

            {/* Service Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Type de prestation souhaitée *</label>
              <select
                value={formData.serviceType}
                onChange={(e) => handleChange('serviceType', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {SERVICES_LIST.map(s => (
                  <option key={s.id} value={s.title}>{s.title} ({s.category})</option>
                ))}
                <option value="Autre prestation sur mesure">Autre prestation sur mesure</option>
              </select>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Ville / Secteur d'intervention *</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Foumbot', 'Bafoussam', 'Foumban'] as const).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleChange('city', city)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      formData.city === city
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    📍 {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Niveau d'urgence *</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'normale', label: 'Normale (48h)', icon: Clock, color: 'border-blue-500 text-blue-400' },
                  { id: 'urgente', label: 'Urgente (24h)', icon: Sparkles, color: 'border-amber-500 text-amber-400' },
                  { id: 'immédiate', label: 'Immédiate (Fuite)', icon: AlertTriangle, color: 'border-red-500 text-red-400' },
                ].map((u) => {
                  const isSel = formData.urgency === u.id;
                  const Icon = u.icon;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleChange('urgency', u.id)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition-all ${
                        isSel
                          ? 'bg-slate-800 text-white border-blue-400 ring-2 ring-blue-500/30'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSel ? 'text-white' : ''}`} />
                      <span className="text-[11px]">{u.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Détails du problème ou projet</label>
              <textarea
                rows={3}
                placeholder="Ex : Fuite sous le lavabo de la salle de bain, ou souhait d'installer un chauffe-eau électrique..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
              />
            </div>

            {/* Section Prendre une photo pour illustrer la fuite ou panne */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-slate-300 block flex items-center justify-between">
                <span>Illustration photo de la fuite ou panne (Optionnel)</span>
                {photo && (
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Photo ajoutée
                  </span>
                )}
              </label>

              {!photo && !isCameraActive && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="flex-1 flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/50 text-slate-200 hover:text-white px-4 py-3.5 rounded-xl text-sm font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-blue-400" />
                    <span>Prendre une photo</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => document.getElementById('camera-file-picker')?.click()}
                    className="sm:flex-none flex items-center justify-center gap-2 bg-slate-950/40 hover:bg-slate-800/60 border border-dashed border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 px-4 py-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    Choisir un fichier
                  </button>
                </div>
              )}

              {/* Hidden file input for fallback/album picker */}
              <input
                type="file"
                id="camera-file-picker"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePhotoFileChange}
              />

              {/* Active Live Camera Stream */}
              {isCameraActive && (
                <div className="relative bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                  <video
                    ref={videoRefCallback}
                    autoPlay
                    playsInline
                    className="w-full aspect-[4/3] object-cover"
                  />
                  
                  {/* Grid lines helper */}
                  <div className="absolute inset-0 border-2 border-dashed border-white/20 pointer-events-none rounded-2xl m-4" />
                  
                  {/* Camera overlay bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="bg-slate-900/80 hover:bg-slate-800 text-white p-2.5 rounded-full transition-colors border border-slate-800 cursor-pointer"
                      title="Annuler"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="bg-white hover:bg-slate-200 text-slate-950 font-bold p-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center ring-4 ring-white/20 cursor-pointer"
                      title="Prendre la photo"
                    >
                      <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse" />
                    </button>

                    <button
                      type="button"
                      onClick={() => document.getElementById('camera-file-picker')?.click()}
                      className="bg-slate-900/80 hover:bg-slate-800 text-white p-2.5 rounded-full transition-colors border border-slate-800 cursor-pointer"
                      title="Importer depuis l'album"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Display Captured/Selected Photo Preview */}
              {photo && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/50 p-3 flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-slate-700 shadow-inner shrink-0 bg-slate-900">
                    <img src={photo} alt="Panne" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <h5 className="text-xs font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Image prête pour l'envoi
                    </h5>
                    <p className="text-[10px] text-slate-400 leading-normal max-w-sm">
                      Cette photo aide nos plombiers à identifier la pièce nécessaire pour réparer votre fuite ou votre panne rapidement.
                    </p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="p-2 bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-blue-300 rounded-xl border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reprendre</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhoto(null);
                        setFormData(prev => ({ ...prev, photo: undefined }));
                      }}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl border border-red-500/20 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <h3 className="font-display font-bold text-lg sm:text-xl text-white border-b border-slate-800 pb-3 pt-4">
              2. Vos coordonnées
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Votre nom complet *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : M. Njoya"
                  value={formData.clientName}
                  onChange={(e) => handleChange('clientName', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Numéro Téléphone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex : 6xx xxx xxx"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Sidebar Estimator & Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-6 border-2 border-blue-500/30 shadow-2xl space-y-6 sticky top-24">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block">
                  Simulateur Intelligent
                </span>
                <h4 className="font-display font-bold text-xl text-white">Estimation indicative</h4>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Prestation :</span>
                  <span className="text-slate-200 font-semibold truncate max-w-[160px]">{formData.serviceType}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Ville :</span>
                  <span className="text-emerald-400 font-bold">{formData.city}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Délai :</span>
                  <span className="text-amber-400 font-semibold uppercase">{formData.urgency}</span>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Fourchette estimée</span>
                  <div className="font-mono font-extrabold text-xl sm:text-2xl text-emerald-400 mt-1">
                    {calculateEstimatedRange()}
                  </div>
                  <span className="text-[10px] text-slate-500 italic block mt-1">
                    * Hors pièces d'exception, affiné sur place par Major.
                  </span>
                </div>
              </div>

              {isOffline && (
                <div className="p-3.5 bg-red-500/10 rounded-2xl border border-red-500/30 text-xs text-red-300 space-y-1.5 animate-pulse">
                  <div className="font-bold flex items-center gap-1.5 text-red-400">
                    <WifiOff className="w-4 h-4" />
                    <span>Mode Hors Ligne</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-slate-300">
                    Connexion internet perdue. Reconnectez-vous pour transmettre cette demande de devis en temps réel.
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  disabled={isOffline}
                  className={`w-full font-bold text-sm py-3.5 px-4 rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition-all border ${
                    isOffline 
                      ? 'bg-slate-800 text-slate-500 border-slate-700/50 cursor-not-allowed shadow-none opacity-60' 
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400/40 shadow-emerald-600/30 hover:scale-102 active:scale-98 cursor-pointer'
                  }`}
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Envoyer direct par WhatsApp</span>
                </button>

                <button
                  type="submit"
                  disabled={isOffline}
                  className={`w-full font-bold text-sm py-3 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${
                    isOffline 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Enregistrer ma demande en ligne</span>
                </button>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/30 text-[11px] text-slate-300 space-y-1.5">
                <div className="font-bold text-amber-400">
                  💳 Règlement : Payé après service
                </div>
                <div className="text-[10px] text-slate-300 leading-normal">
                  Paiement sécurisé après vérification par <strong className="text-orange-400">Orange Money (640 321 535)</strong> ou <strong className="text-yellow-400">MTN MoMo (651 017 585)</strong>.
                </div>
              </div>

              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-[11px] text-blue-200 text-center">
                🔒 Vos informations sont transmises directement et en toute confidentialité à Major Plomberie & Fils.
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
