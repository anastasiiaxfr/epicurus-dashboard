import { useState, useContext } from "react";

import { ref, database, remove } from "../../../pages/_firebase";
import { AuthContext } from "../../../pages/_auth";

import ModalConfirmation from "../../../components/Modal/ModalConfirmation";
import ModalError from "../../../components/Modal/ModalAuthError";
import Btn from "../../../components/Form/Btn";

import DelIcon from "../../../assets/icons/del.svg";

import styles from "./style.module.sass";

export default function ApiKeyList({ data }) {
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const [name, setName] = useState("");
  const [id, setId] = useState(null);

  const [openModalDelConfirm, setOpenModalDelConfirm] = useState(false);
  const [openModalDelSuccess, setOpenModalDelSuccess] = useState(false);

  const modalDelConfirm = {
    title: "Delete " + name + " Bot?",
    text: "Removing the bot will render it inoperable. Please make sure you really want to delete this bot",
    btnText: "Delete",
    btnText2: "Cancel",
  };

  const modalDelSuccess = {
    title: name + " was successfully deleted",
    btnText: "Accept",
  };

  const toggleModalConfirmation = () => {
    setOpenModalDelConfirm(false);

    const RT = ref(database, "rt/" + userID + "/" + id);
    //alert(e.target.getAttribute("data-key"));
    remove(RT)
      .then(() => {
        //alert("Data successfully deleted!");
        setOpenModalDelSuccess(true);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const onDelRT = (id, name) => {
    setName(name);
    setId(id);
    setOpenModalDelConfirm(true);
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

      {data?.map((i, k) => (
        <div className={styles.table} key={k}>
          <div className={styles.table_header}>
            <div className={styles.table_header_container}>
              <div
                className={`${styles.table_title}`}
              >{"Robotic Trading"}</div>
              <div className={styles.table_info}>
                <span>Status:</span>
                <b> {"Active"} </b>
              </div>
            </div>

            <div className={styles.table_cta}>
              <DelIcon
                className={styles.table_del}
                onClick={() => onDelRT(i.id, "Robotic Trading")}
              />
            </div>
          </div>

          <div className={styles.table_content}>
            <div className={styles.table_body}>
              <div className={styles.table_col}>
                <div className={styles.table_label}>API Key</div>
                <div className={styles.table_val}>
                  <span>Test API Key</span>
                </div>
              </div>

              <div className={styles.table_col}>
                <div className={styles.table_label}>Total PNL</div>
                <div className={styles.table_val}>
                  <b>$ {"199.00"}</b>
                </div>
              </div>

              <div className={styles.table_col}>
                <div className={styles.table_label}>Daily PNL</div>
                <div className={styles.table_val}>
                  <b>$ {"199.00"} </b>
                </div>
              </div>

              <div className={styles.table_col}>
                <div className={styles.table_label}>Deposit</div>
                <div className={styles.table_val}>
                  <b>$ {"199.00"} </b>
                </div>
              </div>

              <div className={styles.table_col}>
                <div className={styles.table_label}>Period</div>
                <div className={styles.table_val}>
                  <span> {"11.07.23"} </span>
                </div>
              </div>
            </div>
            <div className={styles.table_btn}>
              <Btn
                theme="grad"
                label="Open"
                type="link"
                link={`robotic-trading/${i.id}`}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
