import { useState, useContext } from "react";

import { ref, database, remove } from "../../../pages/_firebase";
import { AuthContext } from "../../../pages/_auth";

import ModalConfirmation from "../../../components/Modal/ModalConfirmation";
import ModalError from "../../../components/Modal/ModalAuthError";
import Btn from "../../../components/Form/Btn";

import DelIcon from "../../../assets/icons/del.svg";

import styles from "./style.module.sass";

export default function ApiKeyList({deposits}) {
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;


  const [depositName, setDepositName] = useState("");
  const [apiKeyId, setApiKeyId] = useState(null);

  const [openModalDelKeyConfirm, setOpenModalDelKeyConfirm] = useState(false);
  const [openModalDelSuccess, setOpenModalDelSuccess] = useState(false);

  const list = [
    {
      deposit_name: "Premium",
      deposit_status: "Active",
      deposit_wallet: "Metamask",
      deposit_balance: "100 342",
      deposit_pnl: "+1434,75 $",
      deposit_percentage: "20",
      deposit_active_until: "11.07.23",
    },
    {
      deposit_name: "Classic",
      deposit_status: "Active",
      deposit_wallet: "Metamask",
      deposit_balance: "100 342",
      deposit_pnl: "+1434,75 $",
      deposit_percentage: "20",
      deposit_active_until: "11.07.23",
    },
    {
      deposit_name: "VIP",
      deposit_status: "Active",
      deposit_wallet: "Metamask",
      deposit_balance: "100 342",
      deposit_pnl: "+1434,75 $",
      deposit_percentage: "20",
      deposit_active_until: "11.07.23",
    },
  ];

  const modalDelKeyConfirm = {
    title: "Delete " + depositName + "?",
    btnText: "Accept",
    btnText2: "Cancel",
  };

  const modalDelKeySuccess = {
    title: depositName + " was successfully deleted",
    btnText: "Accept",
  };

  const toggleModalConfirmation = () => {
    setOpenModalDelKeyConfirm(false);

    const apiKey = ref(database, "deposit/" + userID + "/" + apiKeyId);
    //alert(e.target.getAttribute("data-key"));
    remove(apiKey)
      .then(() => {
        //alert("Data successfully deleted!");
        setOpenModalDelSuccess(true);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const onDelApiKey = (id, name) => {
    setDepositName(name);
    setApiKeyId(id);
    setOpenModalDelKeyConfirm(true);
  };

  //console.log('newApiKey', newApiKey);

  return (
    <>
      <ModalConfirmation
        openModal={openModalDelSuccess}
        setModalOpen={setOpenModalDelSuccess}
        props={modalDelKeySuccess}
        theme="success"
      />

      <ModalError
        openModal={openModalDelKeyConfirm}
        setModalOpen={setOpenModalDelKeyConfirm}
        props={modalDelKeyConfirm}
        theme="error"
        toggleModal={toggleModalConfirmation}
      />

      {deposits?.map((i, k) => (
        <div className={styles.table} key={k}>
          <div className={styles.table_header}>
            <div className={styles.table_header_container}>
              <div className={`${styles.table_title} ${styles[i.deposit_name]}`}>{`${i.deposit_type}`}</div>
              <div className={styles.table_info}>
                <span>Status:</span>
                <b> {i.deposit_status || "Active"} </b>
              </div>

              <div className={styles.table_info}>
                <span>Wallet:</span>
                <b> {i.deposit_wallet} </b>
              </div>
            </div>

            <div className={styles.table_cta}>
              <DelIcon
                className={styles.table_del}
                onClick={() => onDelApiKey(i.id, i.deposit_type)}
              />
            </div>
          </div>

          <div className={styles.table_content}>
            <div className={styles.table_body}>

              <div className={styles.table_col}>
                <div className={styles.table_label}>Balance</div>
                <div className={styles.table_val}>
                  <b>$ {i.deposit_sum}</b>
                </div>
              </div>

              <div className={styles.table_col}>
                <div className={styles.table_label}>Total PNL</div>
                <div className={styles.table_val}>
                  <b>{i.deposit_pnl || "+1434,75"}</b>
                </div>
              </div>

              <div className={styles.table_col}>
                <div className={styles.table_label}>Percentage</div>
                <div className={styles.table_val}>
                  <b> {i.deposit_percent || '20%'}</b>
                </div>
              </div>

              <div className={styles.table_col}>
                <div className={styles.table_label}>Active Until</div>
                <div className={styles.table_val}>
                  <span> {i.deposit_active_until || "11.07.23"} </span>
                </div>
              </div>

            </div>
            <div className={styles.table_btn}>
              <Btn theme="grad" label="Open" type="link" link={`deposit/${i.id}`}/>
            </div>
          </div>

        </div>
      ))}
    </>
  );
}
