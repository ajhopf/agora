import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { initializeApp, getApps, getApp, FirebaseError, FirebaseApp  } from 'firebase/app';
import { getAuth, Auth, onAuthStateChanged, User } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';


const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Database | null; // Include database if needed
  isLoading: boolean;
  error: FirebaseError | null;
  user: User | null
}

const FirebaseContext = createContext<FirebaseContextValue>({
  app: null,
  auth: null,
  db: null,
  isLoading: true,
  error: null,
  user: null
});
export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firebaseData, setFirebaseData] = useState<FirebaseContextValue>({
    app: null,
    auth: null,
    db: null,
    isLoading: true,
    error: null,
    user: null
  });

  useEffect(() => {
    if (firebaseData.auth) {
      const unsubscribe = onAuthStateChanged(firebaseData.auth, (user) => {
        setFirebaseData((prevData) => ({ ...prevData, user }));
      });

      return () => unsubscribe();
    }
  }, [firebaseData.auth]);

  useEffect(() => {
    const initFirebase = async () => {
      try {
        const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        const auth: Auth = getAuth(app);
        const db: Database = getDatabase(app); // Initialize database if needed

        setFirebaseData({ app, auth, db, isLoading: false, error: null, user: null });
      } catch (error) {
        setFirebaseData({ ...firebaseData, isLoading: false, error: error as FirebaseError });
      }
    };

    initFirebase();
  }, []);

  return (
    <FirebaseContext.Provider value={firebaseData}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
