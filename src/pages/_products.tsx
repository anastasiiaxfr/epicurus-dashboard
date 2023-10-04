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
  const [newApiKeyUpdated, setNewApiKeyUpdated] = useState(false);

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

      const URL = 'https://epicurus-railway-production.up.railway.app/v1';
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
              const items = res.map((item: any) => ({
                id: item.id,
                api_name: item.title,
                api_key: item.key,
                api_secret: item.secret,
                api_end_date: item?.expired_at?.split(' ')[0],
                api_status: item.is_active ? 'Enable' : 'Disable',
                api_balance: item.balance,
             }));
             setNewApiKey(items);
            });
          }
        }).catch(error => {
          console.error('Fetch error:', error);
        });
      }
    }
  }, [currentUser, newApiKeyUpdated]);

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


  const [depositAllSum, setDepositAllSum] = useState(0);
  const [depositTotalPnl, setDepositTotalPnl] = useState(0);
  const [depositTotalStatus, setDepositTotalStatus] = useState(false);
  const [rtAllSum, setRtAllSum] = useState(0);
  const [rtTotalPnl, setRtTotalPnl] = useState(0);
  const [rtTotalStatus, setRtTotalStatus] = useState(false);
  const [rtPnlPerDay, setRtPnlPerDay] = useState(0);
  const [tmAllSum, setTmAllSum] = useState(0);
  const [tmTmTotalPnl, setTmTotalPnl] = useState(0);
  const [tmTotalStatus, setTmTotalStatus] = useState(false);

  useEffect(() => {
    if (currentUser) {
      //alert(userID)

      const URL = "https://epicurus-railway-production.up.railway.app/v1";
      //alert(userToken);
      if (userToken !== undefined) {
        fetch(`${URL}/dashboard/test`, {
          method: "GET",
          headers: { Authorization: `Bearer ${userToken}` },
        })
          .then((response) => {
            if (!response.ok) {
              console.log(`Request failed with status: ${response.status}`);
            } else {
              response.json().then((res) => {
                // Handle the response data as needed.
                const deposit_all_sum = res[0].deposit.balance.toFixed(2) || 0;
                setDepositAllSum(deposit_all_sum);
                const deposit_total_pnl = res[0].deposit.total_pnl.toFixed(2) || 0;
                setDepositTotalPnl(deposit_total_pnl);
                const deposit_status = res[0].deposit?.is_active;
                setDepositTotalStatus(deposit_status);
                const tm_balance = res[0].trust.balance.toFixed(2) || 0;
                setTmAllSum(tm_balance);
                const tm_total_pnl = res[0].trust.total_pnl.toFixed(2) || 0;
                setTmTotalPnl(tm_total_pnl);
                const tm_status = res[0].trust?.is_active;
                setTmTotalStatus(tm_status);
                const rt_balance = res[0].robot.balance.toFixed(2) || 0;
                setRtAllSum(rt_balance);
                const rt_total_pnl = res[0].robot.total_pnl.toFixed(2) || 0;
                setRtTotalPnl(rt_total_pnl);
                const rt_status = res[0].robot?.is_active;
                setRtTotalStatus(rt_status);
                const rt_pnl_day = res[0].robot.pnl_per_day.toFixed(2);
                setRtPnlPerDay(rt_pnl_day);
              });
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }
    }
  }, [currentUser]);
  

  return (
    <>
      <ProductContext.Provider
        value={{
          newApiKey,
          newTrustManagement,
          newRoboticTrading,
          newWallet,
          newDeposit,
          depositAllSum,
          depositTotalPnl,
          depositTotalStatus,
          tmAllSum,
          tmTmTotalPnl,
          tmTotalStatus,
          rtAllSum,
          rtTotalPnl, 
          rtTotalStatus,
          rtPnlPerDay,
          setNewApiKeyUpdated
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  );
}
