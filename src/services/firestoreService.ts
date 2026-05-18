import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

// LocalStorage Helper functions
const getLocalData = (key: string): any[] => {
  try {
    const data = localStorage.getItem(`antima_db_${key}`);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(`Error reading LocalStorage for ${key}:`, e);
    return [];
  }
};

const saveLocalData = (key: string, data: any[]) => {
  try {
    localStorage.setItem(`antima_db_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing LocalStorage for ${key}:`, e);
  }
};

// Seed initial default mock data if localStorage is empty
const seedDefaultData = () => {
  const recordsKey = 'antima_db_records';
  const contactsKey = 'antima_db_contacts';

  try {
    if (!localStorage.getItem(recordsKey)) {
      const defaultRecords = [
        {
          id: 'mock_rec_1',
          ownerId: 'guest_user',
          deceasedName: 'Late Sh. Ramesh Kumar',
          dateOfPassing: '2026-05-10',
          religion: 'Cremation',
          ceremonyInfo: {
            type: 'Cremation',
            date: '2026-05-12',
            time: '10:00',
            venue: 'Nigambodh Ghat, New Delhi'
          },
          status: 'completed',
          createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString()
        },
        {
          id: 'mock_rec_2',
          ownerId: 'guest_user',
          deceasedName: 'Late Smt. Savitri Devi',
          dateOfPassing: '2026-05-17',
          religion: 'Final Prayers',
          ceremonyInfo: {
            type: 'Final Prayers',
            date: '2026-05-20',
            time: '16:00',
            venue: 'Arya Samaj Mandir, Sector 15, Gurugram'
          },
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(recordsKey, JSON.stringify(defaultRecords));
      console.log("Prepopulated LocalStorage with default deceased records.");
    }

    if (!localStorage.getItem(contactsKey)) {
      const defaultContacts = [
        {
          id: 'mock_con_1',
          ownerId: 'guest_user',
          name: 'Anil Kumar (Brother)',
          phone: '+91 98101 23456',
          email: 'anil.kumar@example.com',
          group: 'Close Family',
          createdAt: new Date().toISOString()
        },
        {
          id: 'mock_con_2',
          ownerId: 'guest_user',
          name: 'Sita Rani (Sister)',
          phone: '+91 98765 43210',
          email: 'sita.rani@example.com',
          group: 'Close Family',
          createdAt: new Date().toISOString()
        },
        {
          id: 'mock_con_3',
          ownerId: 'guest_user',
          name: 'Rahul Sharma (Cousin)',
          phone: '+91 99999 88888',
          email: 'rahul.sharma@example.com',
          group: 'Relatives',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(contactsKey, JSON.stringify(defaultContacts));
      console.log("Prepopulated LocalStorage with default contacts.");
    }
  } catch (e) {
    console.error("Failed to seed default data:", e);
  }
};

// Trigger seeding immediately on module load
if (typeof window !== 'undefined') {
  seedDefaultData();
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Swapped/Fallback: ', JSON.stringify(errInfo));
}

// Records operations
export const saveDeceasedRecord = async (data: any) => {
  const path = 'records';
  const currentUser = auth.currentUser;
  const localId = 'local_record_' + Date.now() + Math.random().toString(36).substr(2, 5);

  const localRecord = {
    id: localId,
    ...data,
    ownerId: currentUser?.uid || 'guest_user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Always save locally first as reliable backup & offline storage
  const localRecords = getLocalData(path);
  localRecords.unshift(localRecord);
  saveLocalData(path, localRecords);

  if (!currentUser) {
    console.log("Local guest session - record saved locally:", localId);
    return localId;
  }

  try {
    const docRef = await addDoc(collection(db, path), {
      ...data,
      ownerId: currentUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Record synced to Firestore successfully:", docRef.id);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return localId; // Return localId as fallback
  }
};

export const getUserRecords = async () => {
  const path = 'records';
  const currentUser = auth.currentUser;
  const localRecords = getLocalData(path);

  if (!currentUser) {
    console.log("Local guest session - loading records from LocalStorage.");
    return localRecords;
  }

  try {
    const q = query(collection(db, path), where('ownerId', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);
    const dbDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Merge Firestore docs and any local storage docs created under this user
    const filteredLocal = localRecords.filter(lr => lr.ownerId === currentUser.uid || lr.ownerId === 'guest_user');
    const combined: any[] = [...dbDocs];
    filteredLocal.forEach((lr: any) => {
      if (!combined.some((c: any) => c.id === lr.id || (c.deceasedName === lr.deceasedName && c.dateOfPassing === lr.dateOfPassing))) {
        combined.push(lr);
      }
    });
    return combined;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return localRecords; // Fallback entirely to local storage on Firestore errors
  }
};

// Contacts operations
export const saveContact = async (data: any) => {
  const path = 'contacts';
  const currentUser = auth.currentUser;
  const localId = 'local_contact_' + Date.now() + Math.random().toString(36).substr(2, 5);

  const localContact = {
    id: localId,
    ...data,
    ownerId: currentUser?.uid || 'guest_user',
    createdAt: new Date().toISOString()
  };

  // Always save locally first as reliable backup
  const localContacts = getLocalData(path);
  localContacts.unshift(localContact);
  saveLocalData(path, localContacts);

  if (!currentUser) {
    console.log("Local guest session - contact saved locally:", localId);
    return localId;
  }

  try {
    const docRef = await addDoc(collection(db, path), {
      ...data,
      ownerId: currentUser.uid,
      createdAt: serverTimestamp()
    });
    console.log("Contact synced to Firestore successfully:", docRef.id);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return localId;
  }
};

export const getUserContacts = async () => {
  const path = 'contacts';
  const currentUser = auth.currentUser;
  const localContacts = getLocalData(path);

  if (!currentUser) {
    console.log("Local guest session - loading contacts from LocalStorage.");
    return localContacts;
  }

  try {
    const q = query(collection(db, path), where('ownerId', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);
    const dbDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Merge Firestore contacts and any local storage contacts
    const filteredLocal = localContacts.filter(lc => lc.ownerId === currentUser.uid || lc.ownerId === 'guest_user');
    const combined: any[] = [...dbDocs];
    filteredLocal.forEach((lc: any) => {
      if (!combined.some((c: any) => c.id === lc.id || (c.name === lc.name && c.phone === lc.phone))) {
        combined.push(lc);
      }
    });
    return combined;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return localContacts; // Fallback entirely to local storage on Firestore errors
  }
};

// Logs operations
export const logNotification = async (data: any) => {
  const path = 'notification_logs';
  const currentUser = auth.currentUser;
  const localId = 'local_log_' + Date.now() + Math.random().toString(36).substr(2, 5);

  const localLog = {
    id: localId,
    ...data,
    ownerId: currentUser?.uid || 'guest_user',
    timestamp: new Date().toISOString()
  };

  // Save to local storage
  const localLogs = getLocalData(path);
  localLogs.unshift(localLog);
  saveLocalData(path, localLogs);

  if (!currentUser) {
    console.log("Local guest session - notification logged locally:", localId);
    return;
  }

  try {
    await addDoc(collection(db, path), {
      ...data,
      ownerId: currentUser.uid,
      timestamp: serverTimestamp()
    });
    console.log("Notification synced to Firestore successfully.");
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};
