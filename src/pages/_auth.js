import React, { useEffect, useState, createContext } from "react";
import * as fb from "./_firebase";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// import { useAuthState } from 'react-firebase-hooks/auth'

import LoadingModal from "../components/Loading/Modal";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // const [user] = useAuthState(auth)
  // const userID = user?.uid

  const {
    app,
    auth,
    onAuthStateChanged,
    onIdTokenChanged,
    signOut
    
  } = fb;
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true,
      });
    }
  }, []);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        const uid = user.uid;
        setCurrentUser(user);
        setPending(false);
      } else {
        setCurrentUser(false);
        setPending(true);
      }
    });
    onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          // Use the refreshed token for API calls or update it in your app's state.
          setCurrentUser(user);
          setPending(false);
        } catch (error) {
          // Handle the token refresh error.
          setCurrentUser(false);
          setPending(true);
        }
      }
    });
  }, []);

  if (pending) {
    return (
      <AuthContext.Provider
        value={{
          auth,
          currentUser,
        }}
      >
        <LoadingModal />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
