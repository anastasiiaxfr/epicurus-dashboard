import { useState, useContext } from "react";
import { ref, database, set } from "../../../../../../pages/_firebase";
import { AuthContext } from "../../../../../../pages/_auth";

import ClickAwayListener from "@mui/base/ClickAwayListener";
import Image from "next/image";

import Btn from "../../Form/Btn";
import ModalWalletError from "../../../../components/modules/Modal/ModalAuthError";

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
  newWallet,
  toggleModal,
}: any) {
  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const [openModalAddWalletError, setOpenModalAddWalletError] = useState(false);

  const [selected, setSelected] = useState(false);

  const handleOpenModalError = () => {
    setOpenModalAddWalletError(true);
  };

  const [walletSelected, setWalletSelected] = useState({
    id: "",
    title: "",
    wallet_id: "",
    status: "",
  });

  const isPrimary = newWallet?.some(
    (item: any) => item.wallet_status === "Primary"
  );

  const handleWalletSelected = (a: any, b: any) => {
    setSelected(true);

    //alert(getWallet);

    //handleOpenModalError();

    setWalletSelected({
      id: a,
      title: b,
      wallet_id: b === "Metamask" ? "888" : "777",
      status: isPrimary ? "Secondary" : "Primary",
    });
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelected(false);
  };

  const handleSubmit = () => {
    if (selected) {
      if (toggleModal) {
        toggleModal(walletSelected);
      } else {
        sendToFB(walletSelected);
      }
      setModalOpen(false);
      setSelected(false);
    }
  };

  const sendToFB = (wallet: any) => {
    set(
      ref(
        database,
        "wallet/" +
          userID +
          "/" +
          wallet.title.toLowerCase().replaceAll(" ", "-")
      ),
      {
        wallet: wallet.title,
        wallet_id: wallet.wallet_id,
        wallet_status: wallet.status,
      }
    );
  };

  const props = {
    title: "Connect Wallet",
    text:
      "Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely. Never share them with anyone.",
    wallets: [
      {
        title: `Metamask`,
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
    (wallet) => !newWallet?.some((i: any) => i.wallet === wallet.title)
  );

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
                  {activeWallets.map((i, k) => (
                    <figure
                      key={k}
                      className={`${styles.modal_wallets} ${
                        Number(walletSelected.id) === k ? styles.active : ""
                      }`}
                      onClick={() => {
                        handleWalletSelected(k, i.title);
                      }}
                    >
                      <div className={styles.modal_wallets_img}>
                        <Image src={i.icon} alt={i.title} />
                      </div>
                      <div className={styles.modal_wallets_title}>
                        {i.title}
                      </div>
                    </figure>
                  ))}
                </div>

                {!selected && (
                  <div className={styles.modal_note}>Please choose one!</div>
                )}

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
          </div>
        </section>
      </>
    )
  );
}
