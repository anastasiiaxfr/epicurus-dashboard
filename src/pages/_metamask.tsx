import { useState, useEffect, useContext, createContext } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export const MetamaskContext = createContext();

const Metamask = ({ children }) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [] }; /* New */
  const [wallet, setWallet] = useState(initialState); /* New */

  const [getWallet, setGetWallet] = useState(0);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };

    getProvider();
  }, []);

  const updateWallet = async (accounts: any) => {
    /* New */
    setWallet({ accounts }); /* New */
  }; /* New */

  const handleConnect = async () => {
    /* New */
    let accounts = await window.ethereum.request({
      /* New */ method: "eth_requestAccounts" /* New */,
    }); /* New */
    updateWallet(accounts); /* New */
  }; /* New */

  useEffect(() => {
    wallet.accounts.length > 0 && setGetWallet(wallet.accounts[0]);
  }, [wallet.accounts]);

  //alert(wallet.accounts[0])

  return (
    <>
    <MetamaskContext.Provider value={{handleConnect, getWallet}}>
        {children}
    </MetamaskContext.Provider>
    </>
  );
};
export default Metamask;
