import { useState, useEffect, useContext } from "react";
import { ref, database, update } from '../../pages/_firebase';
import { AuthContext } from "../../pages/_auth";
import { ProductContext } from "../../pages/_products";

import nextId from "react-id-generator";

import Btn from "../Form/Btn";
import Push from "../Push";

import styles from "./hero.module.sass";

export default function Hero({ data, deposit, depositAdd }) {
  const htmlId = nextId("all-deposit-");
  const { currentUser } = useContext(AuthContext)
  const userID = currentUser.uid;
  const { newApiKey } = useContext(ProductContext);
  

  const {name, key, sum, id } = data;
  const targetKey = newApiKey.find((j) => j.id === key);
  const apiName = targetKey ? targetKey.api_name : "";

  const [showPush, setShowPush] = useState(false);
  const [pnl, setPnl] = useState(0);
  const [dailyPnl, setDailyPnl] = useState(0);
  

  useEffect(() => {
    if(deposit !== 0){
        setShowPush(true);
        setTimeout(() => setShowPush(false), 1500);
    }
  }, [deposit]);

  const newDeposit = (+sum + +deposit).toFixed(2) || +sum.toFixed(2)

  useEffect(() => {
   if(id && deposit !== 0){
      update(ref(database, "trustManagement/" + userID + "/" + id), {
        tm_sum: newDeposit,
      });
   }
  }, [deposit])


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

      <div className={styles.hero}>
        <div className={styles.hero_header}>
          <div className={styles.hero_hgroup}>
            <div className={styles.hero_title}>{name}</div>
            <div className={styles.hero_status}>
              Status:
              <b> Active </b>
            </div>
          </div>
          <Btn label="Increase the Deposit" theme="grad" onClick={() => { depositAdd(); }} />
        </div>

        <div className={styles.hero_body}>
          <div className={styles.hero_card}>
            <div className={styles.hero_card_title}>PNL</div>
            <div className={styles.hero_card_val}>$ {pnl.toFixed(2)}</div>
          </div>
          <div className={styles.hero_card}>
            <div className={styles.hero_card_title}>Deposit</div>
            <div className={styles.hero_card_val}>
              $ {sum}
            </div>
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
                <div className={styles.hero_card_period_field}>11.07.23</div>
              </div>
              <div>
                <div className={styles.hero_card_period_title}>Ends at</div>
                <div className={styles.hero_card_period_field}>11.07.23</div>
              </div>
            </div>
            <div className={styles.hero_card_cta}>
              <Btn label="Renew Subscription" theme="grad" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
