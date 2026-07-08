import React, { useState, useEffect } from 'react';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  listDriveFiles, 
  uploadTextFile, 
  uploadImageFile, 
  deleteDriveFile, 
  renameDriveFile, 
  fetchFileContent,
  DriveFile 
} from '../lib/googleDriveService';
import { User } from 'firebase/auth';
import { 
  Cloud, 
  Upload, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Search, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  FileText, 
  Image as ImageIcon, 
  Eye, 
  X, 
  LogOut,
  FolderOpen,
  Plus,
  ArrowRight,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DriveTab: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Create state variables for forms
  const [uploadText, setUploadText] = useState<string>('');
  const [uploadTitle, setUploadTitle] = useState<string>('Rapport_Intervention_Foumbot.txt');
  const [uploadingText, setUploadingText] = useState<boolean>(false);
  
  // Image upload
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string>('Chantier_Plomberie.jpg');
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  
  // File viewing
  const [viewingFile, setViewingFile] = useState<DriveFile | null>(null);
  const [viewingContent, setViewingContent] = useState<string>('');
  const [loadingContent, setLoadingContent] = useState<boolean>(false);

  // Success notifications
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Initialize Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setLoading(false);
        fetchFiles();
      },
      () => {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Fetch file list
  const fetchFiles = async (query?: string) => {
    setLoading(true);
    setError(null);
    try {
      const driveFiles = await listDriveFiles(query);
      setFiles(driveFiles);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Erreur lors du chargement des fichiers Google Drive.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFiles(searchQuery);
  };

  // Trigger Google Login
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setSuccessMsg('Connexion Google Drive réussie !');
        setTimeout(() => setSuccessMsg(null), 4000);
        // Load initial files
        const driveFiles = await listDriveFiles();
        setFiles(driveFiles);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'La connexion a échoué. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger Logout
  const handleLogout = async () => {
    const confirmLogout = window.confirm('Voulez-vous vraiment vous déconnecter de Google Drive ?');
    if (!confirmLogout) return;
    
    setLoading(true);
    try {
      await logout();
      setUser(null);
      setToken(null);
      setFiles([]);
      setSuccessMsg('Déconnexion réussie.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError('Erreur lors de la déconnexion.');
    } finally {
      setLoading(false);
    }
  };

  // Handle uploading custom report/devis backup
  const handleUploadText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadText.trim()) return;
    setUploadingText(true);
    setError(null);
    try {
      const newFile = await uploadTextFile(
        uploadTitle.endsWith('.txt') ? uploadTitle : `${uploadTitle}.txt`,
        uploadText,
        'Rapport de plomberie généré par Major Plomberie & Fils'
      );
      setSuccessMsg(`Fichier "${newFile.name}" sauvegardé avec succès sur votre Google Drive !`);
      setUploadText('');
      setTimeout(() => setSuccessMsg(null), 5000);
      fetchFiles();
    } catch (err: any) {
      setError(err?.message || "Erreur d'importation de fichier texte.");
    } finally {
      setUploadingText(false);
    }
  };

  // Handle image import/capture
  const handleImagePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelectedImageBase64(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload plumbing photo to Google Drive
  const handleUploadImage = async () => {
    if (!selectedImageBase64) return;
    setUploadingImage(true);
    setError(null);
    try {
      const newFile = await uploadImageFile(selectedImageName, selectedImageBase64);
      setSuccessMsg(`Photo "${newFile.name}" sauvegardée avec succès sur Google Drive !`);
      setSelectedImageBase64(null);
      setTimeout(() => setSuccessMsg(null), 5000);
      fetchFiles();
    } catch (err: any) {
      setError(err?.message || "Erreur d'upload photo.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Read content of a text file from Google Drive inside modal
  const handleViewFile = async (file: DriveFile) => {
    setViewingFile(file);
    setViewingContent('');
    setLoadingContent(true);
    try {
      if (file.mimeType.startsWith('text/') || file.mimeType === 'application/octet-stream') {
        const text = await fetchFileContent(file.id);
        setViewingContent(text);
      } else {
        setViewingContent("La prévisualisation en direct n'est disponible que pour les rapports textuels (.txt). Pour ce fichier, utilisez le bouton d'ouverture externe Google Drive.");
      }
    } catch (err: any) {
      setViewingContent(`Impossible de charger le contenu: ${err?.message}`);
    } finally {
      setLoadingContent(false);
    }
  };

  // Rename a file
  const handleRenameFile = async (fileId: string, currentName: string) => {
    const newName = window.prompt('Entrez le nouveau nom pour ce fichier :', currentName);
    if (!newName || newName.trim() === '' || newName === currentName) return;

    setLoading(true);
    try {
      await renameDriveFile(fileId, newName.trim());
      setSuccessMsg('Fichier renommé avec succès !');
      setTimeout(() => setSuccessMsg(null), 3000);
      fetchFiles();
    } catch (err: any) {
      setError(err?.message || 'Erreur lors du renommage.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a file WITH EXPLICIT DOUBLE CONFIRMATION DIALOG (Mandatory)
  const handleDeleteFile = async (fileId: string, fileName: string) => {
    const confirmed = window.confirm(`[ATTENTION] Êtes-vous absolument sûr de vouloir SUPPRIMER le fichier "${fileName}" de votre Google Drive ? Cette action est définitive.`);
    if (!confirmed) return;

    const doubleConfirmed = window.confirm(`Veuillez confirmer une seconde fois que vous souhaitez supprimer définitivement "${fileName}".`);
    if (!doubleConfirmed) return;

    setLoading(true);
    try {
      await deleteDriveFile(fileId);
      setSuccessMsg(`Le fichier "${fileName}" a été supprimé de Google Drive.`);
      setTimeout(() => setSuccessMsg(null), 4000);
      fetchFiles();
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la suppression.');
    } finally {
      setLoading(false);
    }
  };

  // Prep template quote to make it easy to write one
  const handleLoadSampleQuote = () => {
    const text = `================================================
DEVISS MAJOR PLOMBERIE & FILS - FOUMBOT
================================================
Date : ${new Date().toLocaleDateString('fr-FR')}
Artisan : Major Plomberie & Fils
Zones d'intervention : Foumbot, Bafoussam, Foumban
Contact : (+237) 694 245 423 / 675 306 914

CLIENT :
Nom : M. Kamdem
Ville : Bafoussam
Téléphone : 651 017 585

DETAIL DES TRAVAUX :
- Pose d'un surpresseur d'eau sanitaire (Château Foumbot)
- Raccordement tuyauterie PPR haute pression
- Installation évacuation PVC robinetterie laiton

MONTANT ESTIME :
Tuyauterie & Pose : 125 000 FCFA
Déplacement Bafoussam : 5 000 FCFA
TOTAL INDICATIF : 130 000 FCFA

PAIEMENT : Orange Money (640 321 535) ou MTN MoMo (651 017 585)
Garantie : Tuyaux et joints garantis 10 ans.
================================================`;
    setUploadTitle(`Devis_Kamdem_${Date.now()}.txt`);
    setUploadText(text);
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto" id="google-drive-portal">
      {/* Tab Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
          <Cloud className="w-3.5 h-3.5 animate-pulse" />
          <span>Espace Cloud & Sauvegardes</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>📁 Espace Client Google Drive</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Connectez votre compte Google Drive pour sauvegarder en toute sécurité vos fiches d'intervention plomberie, vos devis personnalisés, et vos photos de chantiers prises sur le terrain.
        </p>
      </div>

      {/* Connection Section */}
      {!user ? (
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center space-y-6 max-w-xl mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
            <Cloud className="w-8 h-8 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-xl font-bold text-white">Connexion Google Drive Requise</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pour accéder aux sauvegardes, fiches d'intervention, et dossiers chantiers, veuillez vous connecter de manière sécurisée avec votre compte Google. Vos données sont protégées.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex gap-2 items-center justify-center">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Official Google Brand Styled Button */}
          <div className="flex justify-center pt-2">
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-600 to-cyan-500 group-hover:from-blue-600 group-hover:to-cyan-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-800 cursor-pointer disabled:opacity-50"
            >
              <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-slate-950 text-white rounded-md group-hover:bg-opacity-0 font-bold flex items-center gap-3">
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                )}
                <span>Se connecter avec Google</span>
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: UPLOADER & BACKUP GENERATOR */}
          <div className="lg:col-span-5 space-y-6">
            {/* Authenticated User Status */}
            <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img 
                    src={user.photoURL || '/images/logo_major_plomberie.jpg'} 
                    alt={user.displayName || 'Client'} 
                    className="w-11 h-11 rounded-full border-2 border-blue-500 shadow object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white line-clamp-1">{user.displayName || 'Client Major Plomberie'}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{user.email}</p>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="p-2 bg-slate-950 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl border border-slate-800 hover:border-red-500/20 transition-colors cursor-pointer"
                title="Se déconnecter"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions / Document creator */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-5">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>Enregistrer un Rapport / Devis</span>
                </h3>
                <button
                  type="button"
                  onClick={handleLoadSampleQuote}
                  className="text-[10px] text-blue-400 font-bold hover:underline cursor-pointer"
                >
                  Charger exemple
                </button>
              </div>

              <form onSubmit={handleUploadText} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 block">Nom du fichier (.txt)</label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="Ex: Devis_Installation.txt"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 block">Contenu textuel du rapport / devis</label>
                  <textarea
                    rows={6}
                    required
                    value={uploadText}
                    onChange={(e) => setUploadText(e.target.value)}
                    placeholder="Ecrivez votre rapport de dépannage ou de raccordement ici pour le stocker sur Google Drive..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploadingText || !uploadText.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {uploadingText ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>Sauvegarder dans Google Drive</span>
                </button>
              </form>
            </div>

            {/* Photo Importer to Google Drive */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
              <h3 className="font-display font-bold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Uploader une Photo de Chantier</span>
              </h3>
              
              <div className="space-y-3.5">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Envoyez les photos avant/après de vos chantiers (surpresseur, tuyaux, robinetterie laiton) directement sur votre stockage Google Drive.
                </p>

                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-500 hover:text-slate-400 transition-all p-4">
                    <div className="flex flex-col items-center justify-center pt-2 pb-3 text-center">
                      <Upload className="w-6 h-6 mb-2 text-slate-500" />
                      <p className="text-xs font-bold mb-1">Sélectionner ou prendre photo</p>
                      <p className="text-[9px] text-slate-500 truncate max-w-[200px]">
                        {selectedImageName ? selectedImageName : 'Fichiers PNG, JPG'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImagePickerChange}
                    />
                  </label>
                </div>

                {selectedImageBase64 && (
                  <div className="space-y-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <img 
                        src={selectedImageBase64} 
                        alt="Aperçu upload" 
                        className="w-12 h-12 rounded object-cover border border-slate-700" 
                      />
                      <div className="flex-1 min-w-0">
                        <label className="text-[10px] font-bold text-slate-400 block">Nom de l'image</label>
                        <input
                          type="text"
                          value={selectedImageName}
                          onChange={(e) => setSelectedImageName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleUploadImage}
                      disabled={uploadingImage}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold text-xs py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5" />
                      )}
                      <span>Importer la photo</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DRIVE EXPLORER LIST */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6">
              {/* Explorer Head */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-amber-400" />
                    <span>Explorateur Google Drive</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Vos fichiers enregistrés sur le cloud Google Drive
                  </p>
                </div>
                
                <button
                  onClick={() => fetchFiles()}
                  className="self-start sm:self-auto p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Actualiser</span>
                </button>
              </div>

              {/* Status alerts */}
              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs rounded-xl flex gap-2 items-center"
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </motion.div>
              )}

              {error && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex gap-2 items-center">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher des rapports, devis, images..."
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Rechercher
                </button>
              </form>

              {/* Drive File List */}
              {loading ? (
                <div className="min-h-[250px] flex flex-col items-center justify-center text-slate-400 space-y-2">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  <span className="text-xs">Interrogation des serveurs Google Drive...</span>
                </div>
              ) : files.length === 0 ? (
                <div className="min-h-[250px] border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center p-8 space-y-3">
                  <Database className="w-10 h-10 text-slate-600" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-300">Aucun fichier trouvé</p>
                    <p className="text-[11px] text-slate-500 max-w-sm">
                      Vous n'avez pas de rapports ou devis enregistrés sur ce compte Google Drive pour l'instant. Utilisez le formulaire de gauche pour en créer un.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {files.map((file) => {
                    const isText = file.mimeType.startsWith('text/') || file.name.endsWith('.txt');
                    const isImage = file.mimeType.startsWith('image/');
                    
                    return (
                      <div 
                        key={file.id} 
                        className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850/80 hover:border-slate-700/60 transition-all flex items-center justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* MimeType Icon Wrapper */}
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isText ? 'bg-blue-500/10 text-blue-400' : isImage ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-400'
                          }`}>
                            {isText ? (
                              <FileText className="w-4 h-4" />
                            ) : isImage ? (
                              <ImageIcon className="w-4 h-4" />
                            ) : (
                              <Cloud className="w-4 h-4" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate max-w-[240px] sm:max-w-xs" title={file.name}>
                              {file.name}
                            </h4>
                            <div className="flex items-center gap-2.5 text-[10px] text-slate-400 mt-0.5">
                              <span>{new Date(file.createdTime).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: '2-digit' })}</span>
                              {file.size && (
                                <>
                                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                                  <span>{Math.round(parseInt(file.size) / 1024) || 1} Ko</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* File Action Row */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Inner preview (text file only) */}
                          {isText && (
                            <button
                              onClick={() => handleViewFile(file)}
                              className="p-1.5 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 rounded-lg transition-colors cursor-pointer"
                              title="Lire le contenu"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Open external link */}
                          {file.webViewLink && (
                            <a
                              href={file.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 rounded-lg transition-colors"
                              title="Ouvrir dans Google Drive"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Rename */}
                          <button
                            onClick={() => handleRenameFile(file.id, file.name)}
                            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="Renommer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete with confirmation */}
                          <button
                            onClick={() => handleDeleteFile(file.id, file.name)}
                            className="p-1.5 hover:bg-red-500/15 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                            title="Supprimer définitivement"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TEXT PREVIEW MODAL */}
      <AnimatePresence>
        {viewingFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingFile(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Content box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 rounded-3xl border border-slate-800 w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[85vh]"
            >
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-sm text-white truncate max-w-sm sm:max-w-md">
                      {viewingFile.name}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      ID: {viewingFile.id}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setViewingFile(null)}
                  className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Text Body */}
              <div className="p-6 overflow-y-auto flex-1 bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap select-text">
                {loadingContent ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-2">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    <span>Chargement du contenu...</span>
                  </div>
                ) : (
                  viewingContent
                )}
              </div>

              <div className="p-4 border-t border-slate-800 flex justify-end gap-2 bg-slate-900/50">
                <button
                  onClick={() => setViewingFile(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Fermer
                </button>
                {viewingFile.webViewLink && (
                  <a
                    href={viewingFile.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ouvrir dans Google Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
