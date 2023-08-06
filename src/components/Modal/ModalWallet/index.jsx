import { useState, useContext } from "react";
import { ref, database, set } from "../../../pages/_firebase";
import { AuthContext } from "../../../pages/_auth";

import ClickAwayListener from "@mui/base/ClickAwayListener";
import Image from "next/image";

import Btn from "../../../components/Form/Btn";

import twIcon from "../../../assets/img/wallet/tw.png";
import metamaskIcon from "../../../assets/img/wallet/metamask.png";

import styles from "./modal.module.sass";

export default function ModalWallet({ openModal, setModalOpen, newWallet, toggleModal }) {
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const [walletSelectedId, setWalletSelectedId] = useState(0);
  const [walletSelected, setWalletSelected] = useState("Metamask");

  const handleWalletSelected = (a, b) => {
    setWalletSelectedId(a);
    setWalletSelected(b);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    if(toggleModal){
      toggleModal(walletSelected);
    } else {
      sendToFB(walletSelected);
    }
    setModalOpen(false);
  };

  const sendToFB = (wallet) => {
    set(
      ref(
        database,
        "wallet/" + userID + "/" + wallet.toLowerCase().replaceAll(" ", "-")
      ),
      {
        wallet: wallet,
      }
    );
  };

  const props = {
    title: "Connect Wallet",
    text:
      "Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely. Never share them with anyone.",
    wallets: [
      {
        title: "Metamask",
        icon: metamaskIcon,
      },
      {
        title: "Trust Wallet",
        icon: twIcon,
      },
    ],
    btns: [
      {
        label: "Decline",
        theme: "secondary",
        on_click: handleClose,
      },
      {
        label: "Accept",
        theme: "grad",
        on_click: handleSubmit,
      },
    ],
  };

  const activeWallets = props.wallets.filter(
    (wallet) => !newWallet?.some((i) => i.wallet === wallet.title)
  );


  return (
    openModal && (
      <section className={styles.modal}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={styles.modal_content}>
            <div className={styles.modal_inner}>
              <div className={styles.modal_heading}>{props.title}</div>
              <div className={styles.modal_text}>{props.text}</div>
              <div className={styles.modal_wallets_wrap}>
                {activeWallets.map((i, k) => (
                  <figure
                    key={k}
                    className={`${styles.modal_wallets} ${
                      walletSelectedId === k ? styles.active : ""
                    }`}
                    onClick={() => {
                      handleWalletSelected(k, i.title);
                    }}
                  >
                    <div className={styles.modal_wallets_img}>
                      <Image src={i.icon} alt={i.title} />
                    </div>
                    <div className={styles.modal_wallets_title}>{i.title}</div>
                  </figure>
                ))}
              </div>

              <div className={styles.modal_cta}>
                {props.btns.map((i, k) => (
                  <Btn
                    label={i.label}
                    theme={i.theme}
                    onClick={i.on_click}
                    key={k}
                  />
                ))}
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </section>
    )
  );
}
