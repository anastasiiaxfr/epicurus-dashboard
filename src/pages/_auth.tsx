import React, { useEffect, useState, createContext } from "react";
import * as fb from "./_firebase";
// import { useAuthState } from 'react-firebase-hooks/auth'

import LoadingModal from "../framework/presentation/components/modules/Loading/Modal";
import Preloader from "../framework/presentation/components/modules/Preloader";

export const AuthContext = createContext({});

type FirebaseObject = {
  auth: any;
  onAuthStateChanged: any;
  onIdTokenChanged: any;
};

export default function AuthProvider({ children }: any) {
  // const [user] = useAuthState(auth)
  // const userID = user?.uid

  const { auth, onAuthStateChanged, onIdTokenChanged }: FirebaseObject = fb;

  const [currentUser, setCurrentUser] = useState(false);
  const [currentToken, setCurrentToken] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const [pending, setPending] = useState(true);

  // const queryParams = new URLSearchParams(window.location.search);
  // const token = queryParams.get("token");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //alert(`test ${userToken}`);
    setTimeout(() => setLoading(false), 1500);
  }, []);
  // useEffect(() => {
  //   if(token){
  //       signInWithCustomToken(auth, token)
  //       .then((userCredential) => {
  //         // User is now signed in on Site A
  //         alert("Sign In");
  //       })
  //       .catch((error) => {
  //         console.error("Error verifying token:", error);
  //       });
  //   }
  // }, [token]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user: any) => {
      //if(user){alert(user)}
      if (user) {
        // User is signed in.
        const uid = user.uid;
        setCurrentUser(user);
        setCurrentToken(user.accessToken);
        setPending(false);
      } else {
        setCurrentUser(false);
        setPending(true);
      }
    });

    onIdTokenChanged(auth, async (user: any) => {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          // Use the refreshed token for API calls or update it in your app's state.
          setCurrentUser(user);
          setCurrentToken(user.accessToken);
          setPending(false);
        } catch (error) {
          // Handle the token refresh error.
          setCurrentUser(false);
          setPending(true);
        }
      }
    });
  }, []);

  //console.log(userToken);
  //console.log(currentUser)
  //if(currentUser){alert(`currentUser ${currentUser}`)}

  useEffect(() => {
    currentUser === false ? setUserToken(null) : null;
  }, [currentUser]);
  //if(userToken){ alert(userToken) }

  return (
    <>
      {loading && <Preloader />}

      {userToken === null ||
      userToken === undefined || currentUser === false ? (
        <AuthContext.Provider
          value={{
            auth,
            currentUser,
            currentToken,
          }}
        >
          <LoadingModal setUserToken={setUserToken} />
        </AuthContext.Provider>
      ) : (
        <AuthContext.Provider
          value={{
            auth,
            currentUser,
            currentToken,
            userToken,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
}