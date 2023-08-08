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

  // const list = [
  //   {
  //     api_name: "Test API Key",
  //     api_status: "Active",
  //     api_bot: "Cryptobot",
  //     api_key: "bY2t8YgK***vBssiXJ2",
  //     api_secret: "••••••••••••••••••••••••",
  //     api_balance: "$ 3642",
  //     api_perios: "11.07.23",
  //   },
  // ];

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

  console.log(newApiKey);

  const toggleModalConfirmation = () => {
    setOpenModalDelKeyConfirm(false);

    const TM = ref(database, "trustManagement/" + userID + "/" + apiKeyId);
    const totalDeposit = ref(
      database,
      "totalDeposit/" + userID + "/" + apiKeyId
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
        const apiSecret = targetKey ? targetKey.api_secret : "";

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

                {i.api_key_id  && (
                  <div className={styles.table_col}>
                    <div className={styles.table_label}>API Secret</div>
                    <div className={styles.table_val}>{apiSecret}</div>
                  </div>
                )}

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Total PNL</div>
                  <div className={styles.table_val}>
                    <b>$ 199.00</b>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Deposit</div>
                  <div className={styles.table_val}>
                    <b>$ {Number(i.tm_sum).toFixed(2) || "0.00"}</b>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Active Until</div>
                  <div className={styles.table_val}>
                    <span>11.07.23</span>
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
