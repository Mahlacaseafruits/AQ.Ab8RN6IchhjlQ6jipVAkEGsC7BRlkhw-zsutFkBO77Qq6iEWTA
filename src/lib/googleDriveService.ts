import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, Auth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

// Configure Google OAuth Provider with specified scopes
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive');
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.addScope('https://www.googleapis.com/auth/drive.metadata.readonly');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize Auth Listener and restore token if cached in session
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  // Try restoring from sessionStorage to prevent re-login on page refresh (user convenience)
  const savedToken = sessionStorage.getItem('drive_access_token');
  if (savedToken) {
    cachedAccessToken = savedToken;
  }

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      sessionStorage.removeItem('drive_access_token');
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Handle standard popup sign in
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth credential');
    }

    cachedAccessToken = credential.accessToken;
    sessionStorage.setItem('drive_access_token', cachedAccessToken);
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken || sessionStorage.getItem('drive_access_token');
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  sessionStorage.removeItem('drive_access_token');
};

// ==========================================
// GOOGLE DRIVE API INTEGRATIONS
// ==========================================

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime: string;
  webViewLink?: string;
  iconLink?: string;
}

/**
 * List files from the connected Google Drive
 */
export const listDriveFiles = async (searchQuery?: string): Promise<DriveFile[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Drive');

  // Build query to list files (exclude trashed, focus on files created/used by app if preferred or list overall)
  let q = "trashed = false";
  if (searchQuery) {
    q += ` and name contains '${searchQuery.replace(/'/g, "\\'")}'`;
  }

  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&orderBy=createdTime%20desc&fields=files(id,name,mimeType,size,createdTime,webViewLink,iconLink)&pageSize=40`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur Drive list: ${errText}`);
  }

  const data = await response.json();
  return data.files || [];
};

/**
 * Helper to convert base64 data to blob
 */
export const base64ToBlob = (base64Data: string, contentType: string): Blob => {
  const byteCharacters = atob(base64Data.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

/**
 * Upload a text file (like plumbing quotes) to Google Drive
 */
export const uploadTextFile = async (
  fileName: string,
  content: string,
  description?: string
): Promise<DriveFile> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Drive');

  const metadata = {
    name: fileName,
    mimeType: 'text/plain',
    description: description || 'Sauvegarde Major Plomberie',
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([content], { type: 'text/plain' }));

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur d'importation sur Google Drive: ${errText}`);
  }

  return response.json();
};

/**
 * Upload an image (like plumbing intervention photo) to Google Drive
 */
export const uploadImageFile = async (
  fileName: string,
  base64Data: string
): Promise<DriveFile> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Drive');

  const mimeType = base64Data.split(';')[0].split(':')[1] || 'image/jpeg';
  const blob = base64ToBlob(base64Data, mimeType);

  const metadata = {
    name: fileName,
    mimeType: mimeType,
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', blob);

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur d'upload image Google Drive: ${errText}`);
  }

  return response.json();
};

/**
 * Delete a file with explicit user confirmation
 */
export const deleteDriveFile = async (fileId: string): Promise<void> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Drive');

  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur suppression Google Drive: ${errText}`);
  }
};

/**
 * Rename a file
 */
export const renameDriveFile = async (fileId: string, newName: string): Promise<DriveFile> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Drive');

  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: newName }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur modification nom: ${errText}`);
  }

  return response.json();
};

/**
 * Fetch raw content of a text file from Google Drive
 */
export const fetchFileContent = async (fileId: string): Promise<string> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté');

  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Impossible de récupérer le contenu du fichier: ${errText}`);
  }

  return response.text();
};
