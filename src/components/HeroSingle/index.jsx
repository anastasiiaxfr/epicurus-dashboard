import { useState, useEffect } from "react";

import Btn from "../Form/Btn";

import styles from "./hero.module.sass";

export default function Hero({ data }) {
 const { name, key } = data;
  return (
    <div className={styles.hero}>
      <div className={styles.hero_header}>
        <div className={styles.hero_hgroup}>
          <div className={styles.hero_title}>{name}</div>
          <div className={styles.hero_status}>
            Status:
            <b> Active </b>
          </div>
        </div>
        <Btn label="Increase the Deposit" theme="grad" />
      </div>

      <div className={styles.hero_body}>
        <div className={styles.hero_card}>
          <div className={styles.hero_card_title}>PNL</div>
          <div className={styles.hero_card_val}>$ 900.00</div>
        </div>
        <div className={styles.hero_card}>
          <div className={styles.hero_card_title}>Deposit</div>
          <div className={styles.hero_card_val}>$ 599.00</div>
        </div>
        <div className={styles.hero_card}>
          <div className={styles.hero_card_title}>Daily PNL</div>
          <div className={styles.hero_card_val}>$ 199.00</div>
        </div>
        <div className={styles.hero_card}>
          <div className={styles.hero_card_title}>API Key</div>
          <div className={`${styles.hero_card_val}`}>
            <b>
              {key}
            </b>
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
  );
}
