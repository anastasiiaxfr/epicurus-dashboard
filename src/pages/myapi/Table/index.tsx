import { useState, useContext } from "react";

import { ref, database, remove } from "../../_firebase";
import { AuthContext } from "../../../pages/_auth";
import { ProductContext } from "../../_products";

import ModalConfirmation from "../../../components/Modal/ModalConfirmation";
import ModalError from "../../../components/Modal/ModalAuthError";
import ModalAddApiKey from "../../../components/Modal/ModaEditApiKey";

import EditIcon from "../../../assets/icons/edit.svg";
import DelIcon from "../../../assets/icons/del.svg";

import styles from "./style.module.sass";

export default function ApiKeyList() {
  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const { newApiKey }: any = useContext(ProductContext);

  const [apiKeyName, setApiKeyName] = useState("");
  const [apiKeyId, setApiKeyId] = useState(null);

  const [openModalDelKeyConfirm, setOpenModalDelKeyConfirm] = useState(false);
  const [openModalDelSuccess, setOpenModalDelSuccess] = useState(false);

  const [openModalEditApiKey, setOpenModalEditApiKey] = useState(false);

  const modalDelKeyConfirm = {
    title: "Delete " + apiKeyName + "?",
    text: `This API Key is connected to: Test Robotic Trading, My New Deposit, Test Trust Management.
  
    Deleting the API key will render all products to which it is connected inoperable. Please make sure you really want to delete the key`,

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

  const toggleModalEdit = (id: any, name: any) => {
    setApiKeyName(name);
    setApiKeyId(id);
    //alert(e.target.getAttribute("data-key"));
    setOpenModalEditApiKey(true);
  };

  const toggleModalConfirmation = () => {
    setOpenModalDelKeyConfirm(false);

    const apiKey = ref(database, "apiKey/" + userID + "/" + apiKeyId);
    //alert(e.target.getAttribute("data-key"));
    // remove(apiKey)
    // .then(() => {
    //   //alert("Data successfully deleted!");
    //   setOpenModalDelSuccess(true);

    // })
    // .catch((error) => {
    //   console.error("Error deleting data:", error);
    // });
  };

  const onDelApiKey = (id: any, name: any) => {
    setApiKeyName(name);
    setApiKeyId(id);
    setOpenModalDelKeyConfirm(true);
  };

  //console.log('newApiKey', newApiKey);

  const getDateTime = (val: any) => {
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

      {newApiKey?.map((i: any, k: number) => {
        const date = new Date(i.api_start_date);
        const api_end_date = i.api_start_date ? getDateTime(date.setMonth(date.getMonth() + 1)) : '01.09.23';

        return (
          <div className={styles.table} key={i.id}>
            <div className={styles.table_header}>
              <div className={styles.table_header_container}>
                <div className={styles.table_title}>{i.api_name}</div>

                <div className={styles.table_info}>
                  <span>Status:</span>
                  <b>Active</b>
                </div>

                <div className={styles.table_info}>
                  <span>Сonnected to</span>
                  <b>Cryptobot</b>
                </div>
              </div>

              <div className={styles.table_cta}>
                {/* <DelIcon
                  className={styles.table_del}
                  onClick={() => onDelApiKey(i.id, i.api_name)}
                /> */}
                <EditIcon
                  className={styles.table_edit}
                  onClick={() => toggleModalEdit(i.id, i.api_name)}
                />
              </div>
            </div>
            <div className={styles.table_body}>
              {i.api_key && (
                <div className={styles.table_col}>
                  <div className={styles.table_label}>API Key</div>
                  <div className={styles.table_val}>{i.api_key}</div>
                </div>
              )}

              <div className={styles.table_col}>
                <div className={styles.table_label}>Balance</div>
                <div className={styles.table_val}>
                  <b>$ 3642</b>
                </div>
              </div>

              {i.api_start_date && (
                <div className={styles.table_col}>
                  <div className={styles.table_label}>Start Date</div>
                  <div className={styles.table_val}>
                    <span>{getDateTime(i.api_start_date)}</span>
                  </div>
                </div>
              )}

              <div className={styles.table_col}>
                <div className={styles.table_label}>End Date</div>
                <div className={styles.table_val}>
                  <span>{api_end_date}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
