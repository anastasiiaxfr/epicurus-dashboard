import { useState, useEffect } from "react";
import  getWallet, { hasProvider, handleConnect }  from "../../pages/_metamask";

import Image from "next/image";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import WalletIcon from "../../assets/icons/wallet.svg";
import WalletCoins from "../../assets/icons/wallet-coins.svg";
import WalletAva from "../../assets/img/wallet/metamask.png";

import styles from "./styles.module.sass";


export default function wallet() {
    

  const data = {
    show: true,
    title: "Main Wallet",
    wallet: "Metamask",
    wallet_id: '',
    wallet_ava: "",
    referals_balance: "125",
  };

  const [show, setShow] = useState(false);


  return (
    <div className={`${styles.wallet}`}>
      <div
        className={`${styles.wallet_icon_wrap} ${show ? styles.active : ""}`}
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        <WalletIcon className={styles.wallet_icon} width="25" height="25" />
      </div>

      

      {show && (
        <ClickAwayListener onClickAway={() => setShow(false)}>
          <div className={styles.wallet_menu}>
            <div className={styles.wallet_header}>
              <div className={styles.wallet_title}>{data.title}</div>
            </div>
            <div className={styles.wallet_body}>
              
              {hasProvider && <div className={styles.wallet_ps}>
                <Image
                  className={styles.wallet_ps_img}
                  src={WalletAva}
                  alt={data.wallet}
                  width="36"
                  height="36"
                ></Image>
                <div className={styles.wallet_ps_title}>{data.wallet}</div>
              </div>}

              {hasProvider && <div className={styles.wallet_row}>
                <div className={styles.wallet_label}>ID</div>
                <div className={styles.wallet_id}>{getWallet}</div>
              </div>}

              <div className={styles.wallet_row}>
                <div className={styles.wallet_label}>Referals</div>
                <div className={styles.wallet_balance}>
                  <WalletCoins width="20" height="20" />
                  <div className={styles.wallet_balance_title}>
                    {data.referals_balance}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
