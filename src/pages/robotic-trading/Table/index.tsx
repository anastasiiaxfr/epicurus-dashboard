import { useState, useContext } from "react";

import { ref, database, remove } from "../../_firebase";
import { AuthContext } from "../../../pages/_auth";
import { ProductContext } from "../../_products";
import nextId from "react-id-generator";

import ModalConfirmation from "../../../components/Modal/ModalConfirmation";
import ModalError from "../../../components/Modal/ModalAuthError";
import Btn from "../../../components/Form/Btn";

import DelIcon from "../../../assets/icons/del.svg";

import styles from "./style.module.sass";

export default function ApiKeyList({
  data,
}: any) {
  const htmlId = nextId("all-deposit-");

  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;
  const { newRoboticTrading, newApiKey }: any = useContext(ProductContext);

  const [apiKeyName, setApiKeyName] = useState("");
  const [apiKeyId, setApiKeyId] = useState(null);

  const [openModalDelConfirm, setOpenModalDelConfirm] = useState(false);
  const [openModalDelSuccess, setOpenModalDelSuccess] = useState(false);

  const pnl_total = (0).toFixed(2);
  const pnl_daily = (0).toFixed(2);

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

  const modalDelConfirm = {
    title: "Delete " + apiKeyName + " Bot?",
    text: "Removing the bot will render it inoperable. Please make sure you really want to delete this bot",
    btnText: "Delete",
    btnText2: "Cancel",
  };

  const modalDelSuccess = {
    title: apiKeyName + " was successfully deleted",
    btnText: "Accept",
  };

  const toggleModalConfirmation = () => {
    setOpenModalDelConfirm(false);

    const RT = ref(database, "robotic-trading/" + userID + "/" + apiKeyId);
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

  const onDelRT = (id: any, name: any) => {
    setApiKeyName(name);
    setApiKeyId(id);
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

      {newRoboticTrading?.map((i: any, k: number) => {
        const targetKey = newApiKey.find((j: any) => j.id === i.api_key_id);
        const apiName = targetKey ? targetKey.api_name : "";
        const date = new Date(i.rt_start_date);
        const period = 1;
        const period_start = getDateTime(i.rt_start_date);
        const period_end = getDateTime(date.setMonth(date.getMonth() + period));

        return (
          <div className={styles.table} key={k}>
            <div className={styles.table_header}>
              <div className={styles.table_header_container}>
                <div className={`${styles.table_title}`}>
                  {i.rt_name}
                </div>
                <div className={styles.table_info}>
                  <span>Status:</span>
                  <b> {"Active"} </b>
                </div>
              </div>

              <div className={styles.table_cta}>
                <DelIcon
                  className={styles.table_del}
                  onClick={() => onDelRT(i.id, i.rt_name)}
                />
              </div>
            </div>

            <div className={styles.table_content}>
              <div className={styles.table_body}>
                <div className={styles.table_col}>
                  <div className={styles.table_label}>API Key</div>
                  <div className={styles.table_val}>
                    <span>{apiName}</span>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Total PNL</div>
                  <div className={styles.table_val}>
                    <b>$ {pnl_total}</b>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Daily PNL</div>
                  <div className={styles.table_val}>
                    <b>$ {pnl_daily} </b>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Deposit</div>
                  <div className={styles.table_val}>
                    <b>$ {Number(i.rt_sum).toFixed(2) || "0.00"} </b>
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
                  link={`robotic-trading/${i.id}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
