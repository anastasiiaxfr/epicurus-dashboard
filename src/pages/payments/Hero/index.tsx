import { useState, useEffect, useContext } from "react";
import { ref, database, set } from "../../../pages/_firebase";
import { ProductContext } from "../../../pages/_products";
import { AuthContext } from "../../../pages/_auth";
import nextId from "react-id-generator";

import WalletConnect from "../../../pages/_wallet-connect";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";

import TableWallets from "../TableWallets";
import HeroGroup from "../../../components/HeroCta";

export default function Hero() {
  const htmlId = nextId("wallet-");

  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const [loading, setLoading] = useState(false);
  const { open, close } = useWeb3Modal();

  const { newWallet }: any = useContext(ProductContext);

  const [connected, setConnected] = useState(false);

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  const sendToFB = (wallet: any) => {
    set(
      ref(
        database,
        "wallet/" +
          userID +
          "/" +
          htmlId
      ),
      {
        wallet: wallet?.wallet_name,
        wallet_id: wallet?.wallet_id,
        wallet_status: wallet?.wallet_status,
      }
    );
  };

  function Wallet({ Component }: any) {
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const label = isConnected ? "Disconnect" : "Add Wallet";

    function onClick() {
      if (isConnected) {
        disconnect();
      } else {
        onOpen();
        setConnected(true);
      }
    }

    const account = useAccount({
      onConnect({ address, connector, isReconnected }) {
        console.log("Connected", { address, connector, isReconnected });
      },
      onDisconnect() {
        console.log("Disconnected");
        setConnected(false);
      },
    });

    useEffect(() => {
      if (connected && account.address !== undefined) {
        sendToFB({
          id: account?.connector?.name,
          wallet_name: account?.connector?.name,
          wallet_id: account.address,
          wallet_status: "Primary",
        });
      }
    }, [account]);


    const hero = {
      heading: "Connect Backup Wallet",
      title: "Connect your Backup wallet if you need it",
      text: `Press “Add Wallet” to connect a Backup Wallet and start
        working with it`,
      info: "1 steps to complete left",
      btn: {
        label: loading ? "Loading..." : label,
        on_click: () => {
          onClick();
        },
      },
    };

    return <Component hero={hero} />;
  }

  return (
    <>
      {newWallet.length < 1 && (
        <WalletConnect>
          <Wallet Component={HeroGroup} />
        </WalletConnect>
      )}

      {newWallet.length !== 0 && (
        <WalletConnect>
          <TableWallets
            props={newWallet}
            delWallet={() => setConnected(false)}
          />
        </WalletConnect>
      )}
    </>
  );
}
