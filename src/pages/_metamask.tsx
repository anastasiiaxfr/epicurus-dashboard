import { useState, useEffect, useContext, createContext } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export const MetamaskContext = createContext({});

declare global {
  interface Window {
    ethereum?: any;
  }
}
if (typeof window !== "undefined") {
  let injectedProvider = false;
  if (typeof window.ethereum !== "undefined") {
    injectedProvider = true;
    console.log(window.ethereum);
  }
  const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false;
}

const Metamask = ({ children }: any) => {
  const [hasProvider, setHasProvider] = useState(Boolean);
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
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        updateWallet(accounts);
      } catch (error) {
        console.error("Error connecting to Ethereum:", error);
      }
    } else {
      console.error(
        "Ethereum provider not found. Make sure MetaMask or a similar wallet is installed."
      );
    }
  };

  useEffect(() => {
    wallet.accounts.length > 0 && setGetWallet(wallet.accounts[0]);
  }, [wallet.accounts]);

  //alert(wallet.accounts[0])

  return (
    <>
      <MetamaskContext.Provider value={{ handleConnect, getWallet }}>
        {children}
      </MetamaskContext.Provider>
    </>
  );
};
export default Metamask;
