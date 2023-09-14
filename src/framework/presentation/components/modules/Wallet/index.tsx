import { useState, useContext } from "react";
import { ProductContext } from "../../../../../pages/_products";

// import Image from "next/image";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import WalletIcon from "../../assets/icons/wallet.svg";
// import WalletCoins from "../../assets/icons/wallet-coins.svg";
import WalletMetamaskAva from "../../assets/img/wallet/metamask.png";
import WalletTrustWalletAva from "../../assets/img/wallet/tw.png";

import styles from "./styles.module.sass";

export default function wallet() {
  const { newWallet }: any = useContext(ProductContext);

  const data = {
    show: true,
    title: "Main Wallet",
    wallet: newWallet[0]?.wallet,
    wallet_id: newWallet[0]?.wallet_id,
    wallet_ava:
      newWallet[0]?.wallet === "MetaMask"
        ? WalletMetamaskAva
        : WalletTrustWalletAva,
    referals_balance: "125",
  };

  const [show, setShow] = useState(false);

  return (
    <div className={`${styles.wallet}`}>
      {data.wallet && <div
        className={`${styles.wallet_icon_wrap} ${show ? styles.active : ""}`}
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        <WalletIcon className={styles.wallet_icon} width="25" height="25" />
      </div>}

      {show && (
        <ClickAwayListener onClickAway={() => setShow(false)}>
          <div className={styles.wallet_menu}>
            <div className={styles.wallet_header}>
              <div className={styles.wallet_title}>{data.title}</div>
            </div>
            <div className={styles.wallet_body}>
              {newWallet.length > 0 && (
                <>
                  <div className={styles.wallet_ps}>
                    {/* <Image
                      className={styles.wallet_ps_img}
                      src={data.wallet_ava}
                      alt={data.wallet}
                      width="36"
                      height="36"
                    ></Image> */}
                    <div className={styles.wallet_ps_title}>{data.wallet}</div>
                  </div>

                  <div className={styles.wallet_row}>
                    {/* <div className={styles.wallet_label}>ID</div> */}
                    <div className={styles.wallet_id}>{data.wallet_id}</div>
                  </div>
                </>
              )}

              {/* <div className={styles.wallet_row}>
                <div className={styles.wallet_label}>Referals</div>
                <div className={styles.wallet_balance}>
                  <WalletCoins width="20" height="20" />
                  <div className={styles.wallet_balance_title}>
                    {data.referals_balance}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
