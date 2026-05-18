import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextType {
  user: any; // Support standard Firebase User and Demo User
  loading: boolean;
  signIn: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  signInAsDemo: (email: string, name?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within FirebaseProvider');
  return context;
};

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have a demo session stored locally
    const savedDemoUser = localStorage.getItem('antima_demo_user');
    if (savedDemoUser) {
      setUser(JSON.parse(savedDemoUser));
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // If we signed in as demo user, don't overwrite it with null
      const isDemo = localStorage.getItem('antima_demo_user');
      if (isDemo && !currentUser) {
        return;
      }

      if (currentUser) {
        // Sync user to Firestore
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userDocRef);
          
          if (!userSnap.exists()) {
            await setDoc(userDocRef, {
              displayName: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              createdAt: serverTimestamp(),
              religionPreference: '',
              regionPreference: ''
            });
          }
        } catch (err) {
          console.warn("Firestore sync skipped or failed (likely offline/local):", err);
        }
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      localStorage.removeItem('antima_demo_user');
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    localStorage.removeItem('antima_demo_user');
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    setUser(userCredential.user);
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    localStorage.removeItem('antima_demo_user');
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(userCredential.user, { displayName: name });
    
    // Sync to firestore
    try {
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        displayName: name,
        email: email,
        photoURL: '',
        createdAt: serverTimestamp(),
        religionPreference: '',
        regionPreference: ''
      });
    } catch (err) {
      console.warn("Firestore sync skipped (offline/local):", err);
    }
    
    setUser(userCredential.user);
  };

  const signInAsDemo = (email: string, name?: string) => {
    const demoUser = {
      uid: 'demo_user_' + Math.random().toString(36).substr(2, 9),
      displayName: name || email.split('@')[0],
      email: email,
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      isDemo: true
    };
    localStorage.setItem('antima_demo_user', JSON.stringify(demoUser));
    setUser(demoUser);
  };

  const logout = async () => {
    try {
      localStorage.removeItem('antima_demo_user');
      setUser(null);
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithEmail, signUpWithEmail, signInAsDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
