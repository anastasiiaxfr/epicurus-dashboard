import { useState, useContext } from "react";
import Link from 'next/link';
import { AuthContext } from "../../../../../../pages/_auth";
import { ProductContext } from "../../../../../../pages/_products";

import ClickAwayListener from "@mui/base/ClickAwayListener";
import Image from "next/image";

import Btn from "../../Form/Btn";
import ModalWalletError from "../ModalAuthError";

import twIcon from "../../../assets/img/wallet/tw.png";
import metamaskIcon from "../../../assets/img/wallet/metamask.png";

import styles from "./modal.module.sass";

const modalWalletError = {
  title: "Please, activate your account",
  btnText: "Accept",
  btnUrl: "#",
};

export default function ModalWallet({
  openModal,
  setModalOpen,
  toggleModal,
}: any) {
  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const { newWallet }: any = useContext(ProductContext);

  const [openModalAddWalletError, setOpenModalAddWalletError] = useState(false);

  const handleOpenModalError = () => {
    setOpenModalAddWalletError(true);
  };

  const [walletSelected, setWalletSelected] = useState({
    id: 0,
    title: newWallet[0]?.wallet,
    wallet_id: newWallet[0]?.wallet_id,
  });

  const handleWalletSelected = (val: any, k: number) => {
    setWalletSelected({
      id: k,
      title: val.wallet,
      wallet_id: val.wallet === "MetaMask" ? val.wallet_id : "777",
    });
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    if (toggleModal) {
      toggleModal(walletSelected);
    } else {
    }
    setModalOpen(false);
  };

  const props = {
    title: "Connect Wallet",
    text: "Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely. Never share them with anyone.",
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

  return (
    openModal && (
      <>
        <section className={styles.modal}>
          <div className={styles.modal_wrap}>
          <ModalWalletError
            openModal={openModalAddWalletError}
            setModalOpen={setOpenModalAddWalletError}
            props={modalWalletError}
          />
          <ClickAwayListener onClickAway={handleClose}>
            <div className={styles.modal_content}>
              <div className={styles.modal_inner}>
                <div className={styles.modal_heading}>{props.title}</div>
                <div className={styles.modal_text}>{props.text}</div>
                <div className={styles.modal_wallets_wrap}>
                  {newWallet.length === 0 && <Link href="/payments">Please connect your wallet</Link>}
                  {newWallet.map((i: any, k: number) => (
                    <figure
                      key={k}
                      className={`${styles.modal_wallets} ${
                        walletSelected.id === k ? styles.active : ""
                      }`}
                      onClick={() => {
                        handleWalletSelected(i, k);
                      }}
                    >
                      <div className={styles.modal_wallets_img}>
                        <Image
                          src={i.wallet === "MetaMask" ? metamaskIcon : twIcon}
                          alt={i.wallet}
                        />
                      </div>
                      <div className={styles.modal_wallets_title}>
                        {i.wallet}
                      </div>
                    </figure>
                  ))}
                </div>

                {newWallet.length !== 0  && <div className={styles.modal_cta}>
                  {props.btns.map((i, k) => (
                    <Btn
                      label={i.label}
                      theme={i.theme}
                      onClick={i.on_click}
                      key={k}
                    />
                  ))}
                </div>}
              </div>
            </div>
          </ClickAwayListener>
          </div>
        </section>
      </>
    )
  );
}
