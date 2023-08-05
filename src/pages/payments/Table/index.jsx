import { useState, useContext } from "react";

import { ref, database, remove } from "../../../pages/_firebase";
import { AuthContext } from "../../../pages/_auth";
import { ProductContext } from "../../../pages/_products";

import Btn from "../../../components/Form/Btn";

import ModalConfirmation from "../../../components/Modal/ModalConfirmation";
import ModalError from "../../../components/Modal/ModalAuthError";

import DelIcon from "../../../assets/icons/del.svg";

import styles from "./style.module.sass";

export default function ApiKeyList() {
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const { newPayments } = useContext(ProductContext);

  const [payments, setPayments] = useState("");
  const [paymentsId, setPaymentsId] = useState(null);

  const [openModalDelConfirm, setOpenModalDelConfirm] = useState(false);
  const [openModalDelSuccess, setOpenModalDelSuccess] = useState(false);

  const list = [
    {
      payments_name: "Robotic Trading",
      payments_subscription: "Active",
      payments_bot: "Cryptobot",
      api_key: "bY2t8YgK***vBssiXJ2",
      monthly_income: "$ 10.000",
      daily_income: "$ 199.00",
      deposit: "$ 99.00",
      active_until: "11.07.23",
    },
    {
      payments_name: "Trust Management",
      payments_subscription: "Payment required",
      payments_bot: "Cryptobot",
      api_key: "bY2t8YgK***vBssiXJ2",
      monthly_income: "$ 10.000",
      daily_income: "$ 199.00",
      deposit: "$ 99.00",
      active_until: "11.07.23",
    },
    {
      payments_name: "Trust Management",
      payments_subscription: "Deactivated",
      payments_bot: "Cryptobot",
      api_key: "bY2t8YgK***vBssiXJ2",
      monthly_income: "$ 10.000",
      daily_income: "$ 199.00",
      deposit: "$ 99.00",
      active_until: "11.07.23",
    },
  ];

  const modalDelConfirm = {
    title: "Delete " + payments + "?",
    btnText: "Accept",
    btnText2: "Cancel",
  };

  const modalDelSuccess = {
    title: payments + " was successfully deleted",
    btnText: "Accept",
  };

  const toggleModalConfirmation = () => {
    setOpenModalDelConfirm(false);

    const paymentd = ref(database, "payments/" + userID + "/" + paymentsId);
    //alert(e.target.getAttribute("data-key"));
    remove(paymentd)
      .then(() => {
        //alert("Data successfully deleted!");
        setOpenModalDelSuccess(true);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const onDelPayments = (id, name) => {
    setPayments(name);
    setPaymentsId(id);
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

      {list?.map((i, k) => (
        <>
          <div className={`${styles.table} ${i.payments_subscription.toLocaleLowerCase() === 'deactivated' ? styles.disabled : ""}`} key={i.id}>
            <div className={styles.table_header}>
              <div className={styles.table_header_container}>
                <div className={styles.table_title}>{i.payments_name}</div>

                <div className={styles.table_info}>
                  <span>Subscription:</span>
                  <b className={`${styles[i.payments_subscription.toLocaleLowerCase().replaceAll(" ", "_")]}`}>{i.payments_subscription}</b>
                </div>

                <div className={styles.table_info}>
                  <span>Сonnected to</span>
                  <b>Cryptobot</b>
                </div>
              </div>

              <div className={styles.table_cta}>
                <DelIcon
                  className={styles.table_del}
                  disabled={i.payments_subscription.toLocaleLowerCase() === 'deactivated' ? true : false}
                  onClick={() => onDelPayments(i.id, i.payments_name)
                  }
                />
              </div>
            </div>

            <div className={styles.table_content}>
              <div className={styles.table_body}>
                {i.api_key && (
                  <div className={styles.table_col}>
                    <div className={styles.table_label}>API Key</div>
                    <div className={styles.table_val}>{i.api_key}</div>
                  </div>
                )}

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Monthly Income</div>
                  <div className={styles.table_val}>
                    <b>{i.monthly_income}</b>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Daily Income</div>
                  <div className={styles.table_val}>
                    <b>{i.daily_income}</b>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Deposit</div>
                  <div className={styles.table_val}>
                    <b>{i.deposit}</b>
                  </div>
                </div>

                <div className={styles.table_col}>
                  <div className={styles.table_label}>Active Until</div>
                  <div className={styles.table_val}>
                    <span>{i.active_until}</span>
                  </div>
                </div>
              </div>

              <div className={styles.table_btn}>
                <Btn theme="grad" label="Open" disabled={i.payments_subscription.toLocaleLowerCase() === 'deactivated' ? true : false}/>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
