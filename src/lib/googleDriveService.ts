import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */

// Configure Google OAuth Provider with specified scopes
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive');
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.addScope('https://www.googleapis.com/auth/drive.metadata.readonly');
provider.addScope('https://www.googleapis.com/auth/contacts');
provider.addScope('https://www.googleapis.com/auth/user.emails.read');
provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read');
provider.addScope('https://mail.google.com/');
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
provider.addScope('https://www.googleapis.com/auth/gmail.modify');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/tasks');

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

// ==========================================
// GOOGLE CONTACTS (PEOPLE API) INTEGRATIONS
// ==========================================

export interface ContactPerson {
  resourceName: string;
  etag: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
}

/**
 * List contacts using the Google People API
 */
export const listContacts = async (): Promise<ContactPerson[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Contacts');

  // Fetch connections with names, emailAddresses, phoneNumbers, and organizations
  const url = 'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,organizations&pageSize=100';

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur Contacts list: ${errText}`);
  }

  const data = await response.json();
  const connections = data.connections || [];

  return connections.map((conn: any) => {
    const nameObj = conn.names?.[0];
    const emailObj = conn.emailAddresses?.[0];
    const phoneObj = conn.phoneNumbers?.[0];
    const orgObj = conn.organizations?.[0];

    return {
      resourceName: conn.resourceName,
      etag: conn.etag,
      name: nameObj?.displayName || nameObj?.givenName || 'Contact sans nom',
      email: emailObj?.value || '',
      phone: phoneObj?.value || '',
      organization: orgObj?.name || '',
    };
  });
};

/**
 * Create a new contact in Google Contacts
 */
export const createContact = async (
  name: string,
  email: string,
  phone: string,
  organization?: string
): Promise<ContactPerson> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Contacts');

  const url = 'https://people.googleapis.com/v1/people:createContact';

  const body = {
    names: [
      {
        givenName: name,
      }
    ],
    emailAddresses: email ? [{ value: email }] : [],
    phoneNumbers: phone ? [{ value: phone }] : [],
    organizations: organization ? [{ name: organization, title: 'Client' }] : [
      { name: 'Major Plomberie & Fils', title: 'Client' }
    ]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur création contact: ${errText}`);
  }

  const conn = await response.json();
  const nameObj = conn.names?.[0];
  const emailObj = conn.emailAddresses?.[0];
  const phoneObj = conn.phoneNumbers?.[0];
  const orgObj = conn.organizations?.[0];

  return {
    resourceName: conn.resourceName,
    etag: conn.etag,
    name: nameObj?.displayName || nameObj?.givenName || 'Contact créé',
    email: emailObj?.value || '',
    phone: phoneObj?.value || '',
    organization: orgObj?.name || '',
  };
};

/**
 * Delete a contact from Google Contacts (with double confirmation on client side)
 */
export const deleteContact = async (resourceName: string): Promise<void> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Contacts');

  const url = `https://people.googleapis.com/v1/${resourceName}:deleteContact`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur suppression contact: ${errText}`);
  }
};

// ==========================================
// GOOGLE SHEETS API INTEGRATIONS
// ==========================================

export interface SpreadsheetInfo {
  spreadsheetId: string;
  spreadsheetUrl: string;
  title: string;
}

export const createSpreadsheet = async (title: string): Promise<SpreadsheetInfo> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté');

  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: { title },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur de création de feuille Google Sheets: ${errText}`);
  }

  const data = await response.json();
  return {
    spreadsheetId: data.spreadsheetId,
    spreadsheetUrl: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
    title: data.properties.title,
  };
};

export const appendRowToSpreadsheet = async (
  spreadsheetId: string,
  range: string,
  row: string[]
): Promise<any> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté');

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [row],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur d'écriture Google Sheets: ${errText}`);
  }

  return response.json();
};

export const getSpreadsheetValues = async (
  spreadsheetId: string,
  range: string
): Promise<string[][]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté');

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur de lecture Google Sheets: ${errText}`);
  }

  const data = await response.json();
  return data.values || [];
};

// ==========================================
// GMAIL API INTEGRATIONS
// ==========================================

export interface GmailMessage {
  id: string;
  threadId: string;
  snippet?: string;
  from?: string;
  subject?: string;
  date?: string;
  body?: string;
}

export const listGmailMessages = async (query?: string): Promise<GmailMessage[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Gmail');

  let url = 'https://gmail.googleapis.com/v1/users/me/messages?maxResults=15';
  if (query) {
    url += `&q=${encodeURIComponent(query)}`;
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur de liste Gmail: ${errText}`);
  }

  const data = await response.json();
  const messagesList = data.messages || [];

  const detailedMessages = await Promise.all(
    messagesList.map(async (msg: { id: string }) => {
      try {
        const detailUrl = `https://gmail.googleapis.com/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`;
        const detailRes = await fetch(detailUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!detailRes.ok) return { id: msg.id, threadId: msg.id, snippet: 'Message indisponible' };
        
        const detailData = await detailRes.json();
        const headers = detailData.payload?.headers || [];
        const from = headers.find((h: any) => h.name === 'From' || h.name === 'from')?.value || 'Inconnu';
        const subject = headers.find((h: any) => h.name === 'Subject' || h.name === 'subject')?.value || 'Sans objet';
        const date = headers.find((h: any) => h.name === 'Date' || h.name === 'date')?.value || '';

        return {
          id: msg.id,
          threadId: detailData.threadId,
          snippet: detailData.snippet || '',
          from,
          subject,
          date,
        };
      } catch (err) {
        return { id: msg.id, threadId: msg.id, snippet: 'Erreur lors du chargement' };
      }
    })
  );

  return detailedMessages;
};

export const sendGmailMessage = async (
  to: string,
  subject: string,
  bodyText: string
): Promise<any> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Gmail');

  const emailLines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    bodyText,
  ];
  const emailStr = emailLines.join('\r\n');
  const base64SafeUrlRaw = btoa(unescape(encodeURIComponent(emailStr)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: base64SafeUrlRaw,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur d'envoi Gmail: ${errText}`);
  }

  return response.json();
};

export const deleteGmailMessage = async (messageId: string): Promise<void> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté');

  const response = await fetch(`https://gmail.googleapis.com/v1/users/me/messages/${messageId}/trash`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur lors de la mise à la corbeille de l'e-mail: ${errText}`);
  }
};

// ==========================================
// GOOGLE TASKS API INTEGRATIONS
// ==========================================

export interface TaskList {
  id: string;
  title: string;
  updated: string;
}

export interface GoogleTask {
  id: string;
  title: string;
  notes?: string;
  status: 'needsAction' | 'completed';
  due?: string;
  completed?: string;
}

export const listTaskLists = async (): Promise<TaskList[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Tasks');

  const response = await fetch('https://tasks.googleapis.com/v1/users/@me/tasklists', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur de liste des listes de tâches: ${errText}`);
  }

  const data = await response.json();
  return data.items || [];
};

export const listTasks = async (taskListId: string): Promise<GoogleTask[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Tasks');

  const response = await fetch(`https://tasks.googleapis.com/v1/lists/${taskListId}/tasks?showCompleted=true&showHidden=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur de liste des tâches: ${errText}`);
  }

  const data = await response.json();
  return data.items || [];
};

export const createGoogleTask = async (
  taskListId: string,
  title: string,
  notes?: string,
  due?: string
): Promise<GoogleTask> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Tasks');

  const body: any = { title };
  if (notes) body.notes = notes;
  if (due) body.due = due;

  const response = await fetch(`https://tasks.googleapis.com/v1/lists/${taskListId}/tasks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur de création de tâche Google: ${errText}`);
  }

  return response.json();
};

export const updateGoogleTaskStatus = async (
  taskListId: string,
  taskId: string,
  status: 'completed' | 'needsAction'
): Promise<GoogleTask> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Tasks');

  const response = await fetch(`https://tasks.googleapis.com/v1/lists/${taskListId}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur de mise à jour de la tâche Google: ${errText}`);
  }

  return response.json();
};

export const deleteGoogleTask = async (taskListId: string, taskId: string): Promise<void> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Utilisateur non connecté à Google Tasks');

  const response = await fetch(`https://tasks.googleapis.com/v1/lists/${taskListId}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur de suppression de la tâche Google: ${errText}`);
  }
};


