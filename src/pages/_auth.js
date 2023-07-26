import React, { useEffect, useState, createContext } from "react";
import * as fb from "./_firebase";
// import { useAuthState } from 'react-firebase-hooks/auth'

import LoadingModal from "../components/Loading/Modal";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // const [user] = useAuthState(auth)
  // const userID = user?.uid

  const { auth, onAuthStateChanged, onIdTokenChanged, signOut, signInWithCustomToken } = fb;

  const [currentUser, setCurrentUser] = useState(true);
  const [pending, setPending] = useState(true);

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if(token){
        signInWithCustomToken(auth, token)
        .then((userCredential) => {
          // User is now signed in on Site A
          alert("Sign In");
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
        });
    }
  }, [token]);

  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      //if(user){alert(user)}

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
