import React, { useEffect, useState, useContext, createContext } from "react";
import * as fb from "./_firebase";

import { AuthContext } from "./_auth";

export const ProductContext = createContext();

export default function ProductProvider({ children }: any) {
  const { ref, database, onValue } = fb;

  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const [newApiKey, setNewApiKey] = useState([]);
  const [newTrustManagement, setNewTrustManagement] = useState([]);
  const [newRoboticTrading, setNewRoboticTrading] = useState([]);
  const [newWallet, setNewWallet] = useState([]);
  const [newDeposit, setNewDeposit] = useState([]);


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
            api_start_date: item?.api_start_date,
            api_status: item.api_status,
            api_enable: item.api_enable
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
      const dbTM = ref(database, "trust-management/" + userID);

      const handleDataChangeTM = (snapshot) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log('trustManagement', data);
          const items = Object?.entries(data).map(([id, item]) => ({
            id,
            tm_name: item.tm_name,
            tm_start_date: item.tm_start_date,
            tm_period: item.tm_period,
            tm_sum_first: item.tm_sum_first,
            tm_sum: item.tm_sum,
            api_key_name: item.api_key_name,
            api_key_id: item.api_key_id,
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
      //alert(userID)

      const dbWallets = ref(database, "wallet/" + userID);

      const handleDataWallets = (snapshot) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log('apiKey', data);
          const items = Object?.entries(data).map(([id, item]) => ({
            id,
            wallet: item.wallet,
          }));
          setNewWallet(items);
        } else {
          setNewWallet([]);
        }
      };

      onValue(dbWallets, handleDataWallets, handleError);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      //alert(userID)

      const dbDeposits = ref(database, "deposit/" + userID);

      const handleDataDeposit = (snapshot) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log('apiKey', data);
          const items = Object?.entries(data).map(([id, item]) => ({
            id,
            deposit_name: item.deposit_type
              .replace("Deposit", "")
              .toLocaleLowerCase()
              .trim(),
            deposit_type: item.deposit_type,
            deposit_percent: item.deposit_percent,
            deposit_wallet: item.deposit_wallet,
            deposit_sum: item.deposit_sum,
            deposit_period: item.deposit_period,
            deposit_network: item.deposit_network,
          }));
          setNewDeposit(items);
        } else {
          setNewDeposit([]);
        }
      };

      onValue(dbDeposits, handleDataDeposit, handleError);
    }
  }, [currentUser]);

 
  useEffect(() => {
    if (currentUser) {
      //alert(userID)

      const dbRT = ref(database, "robotic-trading/" + userID);

      const handleDataRT = (snapshot) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log('apiKey', data);
          const items = Object?.entries(data).map(([id, item]) => ({
            id,
            rt_name: item.rt_name,
            rt_start_date: item.rt_start_date,
            subscription_period: item.subscription_period,
            subscription_sum: item.subscription_sum,
            rt_sum_first: item.rt_sum_first,
            rt_sum: item.rt_sum,
            api_key_name: item.api_key_name,
            api_key_id: item.api_key_id,
            hash_code: item.hash_code,
            payment_network: item.payment_network,
            payment_sum: item.payment_sum
          }));
          setNewRoboticTrading(items);
        } else {
          setNewRoboticTrading([]);
        }
      };

      onValue(dbRT, handleDataRT, handleError);
    }
  }, [currentUser]);


  
  const totalDepositBalance = newDeposit.reduce((sum, item) => sum + +item.deposit_sum, 0);

  const allDepositSum = (totalDepositBalance || 0).toFixed(2);

  const totalTMBalanceSum = newTrustManagement.reduce((sum, item) => +sum + +item.tm_sum, 0);
  const totalTMBalance = (totalTMBalanceSum.toFixed(2));

  const totalRTBalanceSum = newRoboticTrading.reduce((sum, item) => +sum + +item.rt_sum, 0);
  const totalRTBalance = (totalRTBalanceSum.toFixed(2));

  return (
    <>
      <ProductContext.Provider
        value={{
          newApiKey,
          newTrustManagement,
          newRoboticTrading,
          newWallet,
          newDeposit,
          allDepositSum,
          totalDepositBalance,
          totalTMBalance,
          totalRTBalance
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  );
}
