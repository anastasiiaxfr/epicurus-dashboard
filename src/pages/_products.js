import React, { useEffect, useState, useContext, createContext } from "react";
import * as fb from "./_firebase";

import { AuthContext } from "./_auth";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const { ref, database, onValue } = fb;

  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const [newApiKey, setNewApiKey] = useState([]);
  const [newTrustManagement, setNewTrustManagement] = useState([]);
  const [newRoboticTrading, setNewRoboticTrading] = useState([]);
  const [newWallet, setNewWallet] = useState([]);


  const handleError = (error) => {
    console.error("Error reading data:", error);
  };

  useEffect(() => {
    if (currentUser) {
      //alert(userID)

      const dbApiKeys = ref(database, "apiKey/" + userID);

      const handleDataChangeApiKeys = (snapshot) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log('apiKey', data);
          const items = Object?.entries(data).map(([id, item]) => ({
            id,
            api_name: item.api_name,
            api_key: item.api_key,
            api_secret: item.api_secret,
          }));
          setNewApiKey(items);
        } else {
          setNewApiKey([]);
        }
      };
    
      onValue(dbApiKeys, handleDataChangeApiKeys, handleError);
    }
    
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {

      const dbTM = ref(database, "trustManagement/" + userID);

      const handleDataChangeTM = (snapshot) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log('trustManagement', data);
          const items = Object?.entries(data).map(([id, item]) => ({
            id,
            api_name: item.api_name,
            api_key: item.api_key,
            api_secret: item.api_secret,
          }));
          setNewTrustManagement(items);
        } else {
          setNewTrustManagement([]);
        }
      };

      onValue(dbTM, handleDataChangeTM, handleError);
    }
    
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {

      const dbRT = ref(database, "roboticTrading/" + userID);

      const handleDataChangeRT = (snapshot) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log(data);
          const items = Object?.entries(data).map(([id, item]) => ({
            id,
            api_name: item.api_name,
            api_key: item.api_key,
            api_secret: item.api_secret,
          }));
          setNewRoboticTrading(items);
        } else {
          setNewRoboticTrading([]);
        }
      };

      onValue(dbRT, handleDataChangeRT, handleError);
    }
    
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      //alert(userID)

      const dbWallets = ref(database, "wallet/" + userID);

      const handleDataWallets = (snapshot) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log('apiKey', data);
          const items = Object?.entries(data).map(([id, item]) => ({
            wallet: item.wallet
          }));
          setNewWallet(items);
        } else {
          setNewWallet([]);
        }
      };
    
      onValue(dbWallets, handleDataWallets, handleError);
    }
    
  }, [currentUser]);

  return (
    <>
      <ProductContext.Provider
        value={{
          newApiKey, newTrustManagement, newRoboticTrading, newWallet
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  );
}
