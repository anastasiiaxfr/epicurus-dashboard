import React, { useEffect, useState, useContext, createContext } from "react";
import * as fb from "./_firebase";

import { AuthContext } from "./_auth";

export const ProductContext = createContext({});

export default function ProductProvider({ children }: any) {
  const { ref, database, onValue } = fb;

  const { currentUser, userToken }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const [newApiKey, setNewApiKey] = useState<any[]>([]);
  const [newTrustManagement, setNewTrustManagement] = useState<any[]>([]);
  const [newRoboticTrading, setNewRoboticTrading] = useState<any[]>([]);
  const [newWallet, setNewWallet] = useState<any[]>([]);
  const [newDeposit, setNewDeposit] = useState<any[]>([]);


  const handleError = (error: any) => {
    console.error("Error reading data:", error);
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     //alert(userID)

  //     const dbApiKeys = ref(database, "apiKey/" + userID);

  //     const handleDataChangeApiKeys = (snapshot: any) => {
  //       const data = snapshot.val();
  //       if (data !== null && data !== undefined) {
  //         //console.log('apiKey', data);
  //         const items = Object?.entries(data).map(([id, item]) => ({
  //           id,
  //           api_name: (item as any).api_name,
  //           api_key: (item as any).api_key,
  //           api_secret: (item as any).api_secret,
  //           api_start_date: (item as any)?.api_start_date,
  //           api_status: (item as any).api_status,
  //           api_enable: (item as any).api_enable
  //         }));
  //         setNewApiKey(items);
  //       } else {
  //         setNewApiKey([]);
  //       }
  //     };

  //     onValue(dbApiKeys, handleDataChangeApiKeys, handleError);
  //   }
  // }, [currentUser]);

  useEffect(() => {
    if (currentUser !== undefined) {
      //alert(userID)

      const URL = 'https://6054-176-36-35-141.ngrok-free.app/v1';
      //alert(userToken);
      if (userToken !== undefined) {
        fetch(`${URL}/key/list`, {
          method: "GET",
          headers: { Authorization: `Bearer ${userToken}` }
        }).then(response => {
          if (!response.ok) {
            console.log(`Request failed with status: ${response.status}`);
          } else {
            response.json().then(res => {
              console.log('Response data:', res);
              // Handle the response data as needed.
            //   const items = res.response.map(([id, item]: any) => ({
            //     id,
            //     api_name: (item as any).title,
            //     api_key: (item as any).key,
            //     api_secret: (item as any).secret,
            //     api_start_date: (item as any)?.expired_at,
            //     api_status: (item as any).is_active,
            //     api_enable: (item as any).is_active
            //  }));
            //  setNewApiKey(items);
            });
          }
        }).catch(error => {
          console.error('Fetch error:', error);
        });
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const dbTM = ref(database, "trust-management/" + userID);

      const handleDataChangeTM = (snapshot: any) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log('trustManagement', data);
          const items = Object?.entries(data).map(([id, item]) => ({
            id,
            tm_name: (item as any).tm_name,
            tm_start_date: (item as any).tm_start_date,
            tm_period: (item as any).tm_period,
            tm_sum_first: (item as any).tm_sum_first,
            tm_sum: (item as any).tm_sum,
            api_key_name: (item as any).api_key_name,
            api_key_id: (item as any).api_key_id,
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

      const handleDataWallets = (snapshot: any) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log('apiKey', data);
          const items = Object?.entries(data).map(([id, item]) => ({
            id,
            wallet: (item as any).wallet,
            wallet_id: (item as any).wallet_id,
            wallet_status: (item as any).wallet_status
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

      const handleDataDeposit = (snapshot: any) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log('apiKey', data);
          const items = Object?.entries(data).map(([id, item]) => ({
            id,
            deposit_name: (item as any).deposit_type
              .replace("Deposit", "")
              .toLocaleLowerCase()
              .trim(),
            deposit_type: (item as any).deposit_type,
            deposit_percent: (item as any).deposit_percent,
            deposit_wallet: (item as any).deposit_wallet,
            deposit_wallet_id: (item as any).deposit_wallet_id,
            deposit_sum: (item as any).deposit_sum,
            deposit_period: (item as any).deposit_period,
            deposit_network: (item as any).deposit_network,
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

      const handleDataRT = (snapshot: any) => {
        const data = snapshot.val();
        if (data !== null && data !== undefined) {
          //console.log('apiKey', data);
          const items = Object?.entries(data).map(([id, item]) => ({
            id,
            rt_name: (item as any).rt_name,
            rt_start_date: (item as any).rt_start_date,
            subscription_period: (item as any).subscription_period,
            subscription_sum: (item as any).subscription_sum,
            rt_sum_first: (item as any).rt_sum_first,
            rt_sum: (item as any).rt_sum,
            api_key_name: (item as any).api_key_name,
            api_key_id: (item as any).api_key_id,
            hash_code: (item as any).hash_code,
            payment_network: (item as any).payment_network,
            payment_sum: (item as any).payment_sum
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
