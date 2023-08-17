import { useState, useEffect, useContext } from "react";
import { ref, database, update } from "../../../pages/_firebase";
import { AuthContext } from "../../../pages/_auth";
import { ProductContext } from "../../../pages/_products";

import nextId from "react-id-generator";

import Btn from "../../../components/Form/Btn";
import Push from "../../../components/Push";

import styles from "./hero.module.sass";


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

export default function Hero({
  data,
  deposit,
  depositAddSuccess,
  toggleModalAddDeposit,
  subscription,
  subscriptionSuccess,
}) {
  const htmlId = nextId("all-deposit-");
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;
  const { newApiKey } = useContext(ProductContext);

  const { name, key, sum, id, tm_start_date, tm_period } = data;
  const targetKey = newApiKey.find((j) => j.id === key);
  const apiName = targetKey ? targetKey.api_name : "";

  const [showPush, setShowPush] = useState(false);
  const [showPushSubscribtion, setShowPushSubscribtion] = useState(false);

  const [pnl, setPnl] = useState(0);
  const [dailyPnl, setDailyPnl] = useState(0);

  const [depositAdd, setDepositAdd] = useState(false);



  const date = new Date(tm_start_date);
  const period = +tm_period?.replace("Month", "").trim();
  const start_date = tm_start_date ? getDateTime(tm_start_date) : '01.09.23';
  const end_date = period ? getDateTime(date.setMonth(date.getMonth() + period)) : '01.10.23';

  
  useEffect(() => {
    if (deposit) {
      setDepositAdd(prev => !prev);
    }
  }, [depositAddSuccess]);

  useEffect(() => {
    if (deposit) {
      setShowPush(true);
      setTimeout(() => {setShowPush(false);}, 6500);
    }
  }, [depositAdd]);

  useEffect(() => {
      setShowPush(false);
      if(subscriptionSuccess){ 
        setShowPushSubscribtion(true);
        setTimeout(() => setShowPushSubscribtion(false), 6500);
      }
  }, [subscriptionSuccess]);

  useEffect(() => {
    const newDeposit = (+sum + +deposit).toFixed(2) || +sum.toFixed(2);

    if (id && deposit !== 0) {
      update(ref(database, "trust-management/" + userID + "/" + id), {
        tm_sum: newDeposit,
      });
    }
  }, [depositAdd]);



  return (
    <>
      {showPush && (
        <Push
          url="#"
          theme="green"
          type="Reminder"
          text="You Successfully Increased your Deposit!"
          close={true}
        />
      )}

      {showPushSubscribtion && (
        <Push
          url="#"
          theme="green"
          type="Reminder"
          text="You Successfully Updated your Subscription  |  Ends at 11.07.23"
          close={true}
        />
      )}

      <div className={styles.hero}>
        <div className={styles.hero_header}>
          <div className={styles.hero_hgroup}>
            <div className={styles.hero_title}>{name}</div>
            <div className={styles.hero_status}>
              Status:
              <b> Active </b>
            </div>
          </div>
          <Btn
            label="Increase the Deposit"
            theme="grad"
            onClick={() => {
              toggleModalAddDeposit(true);
            }}
          />
        </div>

        <div className={styles.hero_body}>
          <div className={styles.hero_card}>
            <div className={styles.hero_card_title}>PNL</div>
            <div className={styles.hero_card_val}>$ {pnl.toFixed(2)}</div>
          </div>
          <div className={styles.hero_card}>
            <div className={styles.hero_card_title}>Deposit</div>
            <div className={styles.hero_card_val}>$ {sum}</div>
          </div>
          <div className={styles.hero_card}>
            <div className={styles.hero_card_title}>Daily PNL</div>
            <div className={styles.hero_card_val}>$ {dailyPnl.toFixed(2)}</div>
          </div>
          <div className={styles.hero_card}>
            <div className={styles.hero_card_title}>API Key</div>
            <div className={`${styles.hero_card_val}`}>
              <b>{apiName}</b>
            </div>
          </div>
          <div className={styles.hero_card}>
            <div className={styles.hero_card_title}>Period</div>
            <div className={styles.hero_card_period}>
              <div>
                <div className={styles.hero_card_period_title}>Started</div>
                <div className={styles.hero_card_period_field}>{start_date}</div>
              </div>
              <div>
                <div className={styles.hero_card_period_title}>Ends at</div>
                <div className={styles.hero_card_period_field}>{end_date}</div>
              </div>
            </div>
            <div className={styles.hero_card_cta}>
              <Btn
                label="Renew Subscription"
                theme="grad"
                onClick={() => subscription(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
