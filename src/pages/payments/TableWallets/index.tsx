import { useState, useContext } from "react";

import { ref, database, remove } from "../../_firebase";
import { AuthContext } from "../../_auth";

import Image from "next/image";

import Btn from "../../../framework/presentation/components/modules/Form/Btn";

import ModalConfirmation from "../../../framework/presentation/components/modules/Modal/ModalConfirmation";
import ModalError from "../../../framework/presentation/components/modules/Modal/ModalAuthError";

import DelIcon from "../../../framework/presentation/components/assets/icons/del.svg";
import CoinsIcon from "../../../framework/presentation/components/assets/icons/wallet-coins.svg";
import twIcon from "../../../framework/presentation/components/assets/img/wallet/tw.png";
import metamaskIcon from "../../../framework/presentation/components/assets/img/wallet/metamask.png";

import styles from "./style.module.sass";

export default function WalletsList({ props, changeWallet, delWallet }: any) {


  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const [payments, setPayments] = useState("");

  const [openModalDelConfirm, setOpenModalDelConfirm] = useState(false);
  const [openModalDelSuccess, setOpenModalDelSuccess] = useState(false);

  const modalDelConfirm = {
    title: "Delete " + payments + "?",
    btnText: "Accept",
    btnText2: "Cancel",
  };

  const modalDelSuccess = {
    title: payments + " was successfully deleted",
    btnText: "Accept",
  };

  const toggleModalConfirmation = (t: any) => {
    setOpenModalDelConfirm(false);

    const wallets = ref(database, "wallet/" + userID + "/" + props[0].id);
    //alert(e.target.getAttribute("data-key"));
    remove(wallets)
      .then(() => {
        //alert("Data successfully deleted!");
        setOpenModalDelSuccess(true);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const onDelWallet = (name: any) => {
    setPayments(name);
    setOpenModalDelConfirm(true);
    delWallet(false);
  };

  //console.log('newApiKey', newApiKey);

  return (
    <>
      <ModalConfirmation
        openModal={openModalDelSuccess}
        setModalOpen={setOpenModalDelSuccess}
        props={modalDelSuccess}
        theme="success"
      />

      <ModalError
        openModal={openModalDelConfirm}
        setModalOpen={setOpenModalDelConfirm}
        props={modalDelConfirm}
        theme="error"
        toggleModal={toggleModalConfirmation}
      />

      {props?.map((i: any, k: number) => (
        
          <div className={`${styles.table}`} key={k}>
            <div className={styles.table_header}>
              <div className={styles.table_header_container}>
                <div className={styles.table_title}>{i.wallet}</div>
                <div className={styles.table_info}>
                  <span>Status:</span>
                  <b className={""}>{i.wallet_status}</b>
                </div>
              </div>
              <div className={styles.table_cta}>
                <DelIcon
                  className={styles.table_del}
                  onClick={() => onDelWallet(i.wallet)}
                />
              </div>
            </div>

            <div className={styles.table_content}>
              <div className={styles.table_body}>
                <div className={styles.table_img}>
                  <Image src={i.wallet === 'MetaMask' ? metamaskIcon : twIcon} alt={i.wallet} />
                </div>
                <div className={styles.table_col}>
                  <div className={styles.table_label}>Wallet ID</div>
                  <div className={styles.table_val}> {i.wallet_id} </div>
                </div>
                <div className={styles.table_col}>
                  <div className={styles.table_label}>Wallet Name</div>
                  <div className={styles.table_val}>
                    {i.wallet}
                  </div>
                </div>
                <div className={styles.table_col}>
                  <div className={styles.table_label}>Total Referals</div>
                  <div className={styles.table_val}>
                    <b> <CoinsIcon /> 260 </b>
                  </div>
                </div>
              </div>
              {/* <div className={styles.table_btn}>
                <Btn theme="grad" label="Change Wallet" onClick={changeWallet}/>
              </div> */}
            </div>
          </div>
       
      ))}
    </>
  );
}
