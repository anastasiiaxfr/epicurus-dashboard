import { useState, useContext } from "react";

import { ref, database, remove } from "../../../pages/_firebase";
import { AuthContext } from "../../../pages/_auth";
import { ProductContext } from "../../../pages/_products";

import ModalConfirmation from "../../../components/Modal/ModalConfirmation";
import ModalError from "../../../components/Modal/ModalAuthError";
import ModalAddApiKey from "../../../components/Modal/ModaEditApiKey";


import EditIcon from "../../../assets/icons/edit.svg";
import DelIcon from "../../../assets/icons/del.svg";

import styles from "./style.module.sass";

export default function ApiKeyList() {
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const { newApiKey } = useContext(ProductContext);


  const [apiKeyName, setApiKeyName] = useState('');
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
    text: `This API Key is connected to: Test Robotic Trading, My New Deposit, Test Trust Management.
  
    Deleting the API key will render all products to which it is connected inoperable. Please make sure you really want to delete the key`,

    btnText: "Accept",
    btnText2: "Cancel"
  };

  const modalDelKeySuccess = {
    title: apiKeyName + " was successfully deleted",
    btnText: "Accept",
  };

  const modalEditKey = {
    user_id: userID,
    api_key_id: apiKeyId,
    api_key_name: apiKeyName
  }

  const toggleModalEdit = (id, name) => {
    setApiKeyName(name);
    setApiKeyId(id);
    //alert(e.target.getAttribute("data-key"));
    setOpenModalEditApiKey(true);
  }

  const toggleModalConfirmation = () => {
    setOpenModalDelKeyConfirm(false);
   
    const apiKey = ref(database, "apiKey/" + userID + '/' + apiKeyId);
    //alert(e.target.getAttribute("data-key"));
    remove(apiKey)
    .then(() => {
      //alert("Data successfully deleted!");
      setOpenModalDelSuccess(true);
      
    })
    .catch((error) => {
      console.error("Error deleting data:", error);
    });
  }

  const onDelApiKey = (id, name) => {
    setApiKeyName(name);
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

      <ModalAddApiKey
        openModal={openModalEditApiKey}
        setModalOpen={setOpenModalEditApiKey}
        props={modalEditKey}
      />


      {newApiKey?.map((i, k) => (
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
              <DelIcon
                className={styles.table_del}
                onClick={() => onDelApiKey(i.id, i.api_name)}
              />
              <EditIcon className={styles.table_edit} onClick={() => toggleModalEdit(i.id, i.api_name)} />
            </div>
          </div>
          <div className={styles.table_body}>
            {i.api_key && (
              <div className={styles.table_col}>
                <div className={styles.table_label}>API Key</div>
                <div className={styles.table_val}>{i.api_key}</div>
              </div>
            )}

            {i.api_secret && (
              <div className={styles.table_col}>
                <div className={styles.table_label}>API Secret</div>
                <div className={styles.table_val}>{i.api_secret}</div>
              </div>
            )}

            <div className={styles.table_col}>
              <div className={styles.table_label}>Balance</div>
              <div className={styles.table_val}>
                <b>$ 3642</b>
              </div>
            </div>

            <div className={styles.table_col}>
              <div className={styles.table_label}>End Period</div>
              <div className={styles.table_val}>
                <span>11.07.23</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}