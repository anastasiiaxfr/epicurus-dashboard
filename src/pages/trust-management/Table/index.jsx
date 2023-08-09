import { useState, useEffect, useContext } from "react";

import { ref, database, remove } from "../../../pages/_firebase";
import { AuthContext } from "../../../pages/_auth";
import { ProductContext } from "../../../pages/_products";

import Btn from "../../../components/Form/Btn";
import ModalConfirmation from "../../../components/Modal/ModalConfirmation";
import ModalError from "../../../components/Modal/ModalAuthError";
import ModalAddApiKey from "../../../components/Modal/ModaEditApiKey";

import DelIcon from "../../../assets/icons/del.svg";

import styles from "./style.module.sass";

export default function ApiKeyList() {
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const { newTrustManagement, newApiKey } = useContext(ProductContext);

  const [apiKeyName, setApiKeyName] = useState("");
  const [apiKeyId, setApiKeyId] = useState(null);

  const [openModalDelKeyConfirm, setOpenModalDelKeyConfirm] = useState(false);
  const [openModalDelSuccess, setOpenModalDelSuccess] = useState(false);

  const [openModalEditApiKey, setOpenModalEditApiKey] = useState(false);

  const pnl_total = (0).toFixed(2);
  const pnl_daily = (0).toFixed(2);

  const getDateTime = (val) => {
    const timestamp = val;
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    const formattedDate = `${day < 10 ? `0${day}` : day}.${
      month < 10 ? `0${month}` : month
    }.${year}`;
    return formattedDate;
  };

  const modalDelKeyConfirm = {
    title: "Delete " + apiKeyName + "?",
    text: `Removing this Trust Management will render it inoperable. Please make sure you really want to delete this bot`,

    btnText: "Accept",
    btnText2: "Cancel",
  };

  const modalDelKeySuccess = {
    title: apiKeyName + " was successfully deleted",
    btnText: "Accept",
  };

  const modalEditKey = {
    user_id: userID,
    api_key_id: apiKeyId,
    api_key_name: apiKeyName,
  };

  const toggleModalConfirmation = () => {
    setOpenModalDelKeyConfirm(false);

    const TM = ref(database, "trust-management/" + userID + "/" + apiKeyId);
    const totalDeposit = ref(
      database,
      "total-deposit/" + userID + "/" + apiKeyId
    );
    //alert(e.target.getAttribute("data-key"));
    remove(TM)
      .then(() => {
        //alert("Data successfully deleted!");
        setOpenModalDelSuccess(true);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });

    remove(totalDeposit)
      .then(() => {
        //alert("Data successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const onDelApiKey = (id, name) => {
    setApiKeyName(name);
    setApiKeyId(id);
    setOpenModalDelKeyConfirm(true);
  };

  //console.log('newTrustManagement', newTrustManagement);

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

      <ModalAddApiKey
        openModal={openModalEditApiKey}
        setModalOpen={setOpenModalEditApiKey}
        props={modalEditKey}
      />

      {newTrustManagement?.map((i, k) => {
        const targetKey = newApiKey.find((j) => j.id === i.api_key_id);
        const apiName = targetKey ? targetKey.api_name : "";
        const date = new Date(i.tm_start_date);
        const period = +i.tm_period.replace("Month", "").trim();
        const period_start = getDateTime(i.tm_start_date);
        const period_end = getDateTime(date.setMonth(date.getMonth() + period));

        return (
          <div className={styles.table} key={k}>
            <div className={styles.table_header}>
              <div className={styles.table_header_container}>
                <div className={styles.table_title}>{i.tm_name}</div>

                <div className={styles.table_info}>
                  <span>Status:</span>
                  <b>Active</b>
                </div>
              </div>

              <div className={styles.table_cta}>
                <DelIcon
                  className={styles.table_del}
                  onClick={() => onDelApiKey(i.id, i.tm_name)}
                />
              </div>
            </div>
            <div className={styles.table_content}>
              <div className={styles.table_body}>
                {i.api_key_id && (
                  <div className={styles.table_col}>
                    <div className={styles.table_label}>API Key</div>
                    <div className={styles.table_val}>{apiName}</div>
                  </div>
                )}

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Total PNL</div>
                  <div className={styles.table_val}>
                    <b>$ {pnl_total}</b>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Daily PNL</div>
                  <div className={styles.table_val}>
                    <b>$ {pnl_daily}</b>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Deposit</div>
                  <div className={styles.table_val}>
                    <b>$ {Number(i.tm_sum).toFixed(2) || "0.00"}</b>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Activated Start</div>
                  <div className={styles.table_val}>
                    <span>{period_start}</span>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Activated End</div>
                  <div className={styles.table_val}>
                    <span>{period_end}</span>
                  </div>
                </div>
              </div>
              <div className={styles.table_btn}>
                <Btn
                  theme="grad"
                  label="Open"
                  type="link"
                  link={`trust-management/${i.id}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
