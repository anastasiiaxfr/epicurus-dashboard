import Btn from "../../components/Form/Btn";

import IconArr from "../../assets/icons/arr-t-rt.svg";

import styles from "./card.module.sass";

export default function Card({ props, k }) {
  const { title, text, url, btn, cols } = props;
  return (
    <figure className={styles.card} key={k}>
      <div className={styles.card_header}>
        <div className={styles.card_hgroup}>
          <div className={styles.card_title}>{title}</div>
          <div className={styles.card_divider}></div>
        </div>

        <div className={styles.card_close}>
          <IconArr />
        </div>
      </div>
      <div className={styles.card_content}>
        <div className={styles.card_text}>{text}</div>
      </div>
      <div className={styles.card_footer}>
        <div className={styles.card_cols}>
          {cols.map((i, k) => (
            <div key={k} className={styles.card_cols_col}>
              <div>
                <div className={styles.card_cols_title}>{i.title}</div>
                <div className={styles.card_cols_val}>{i.val}</div>
                </div>
            </div>
          ))}
        </div>

        <Btn label={btn} theme="grad" />
      </div>
    </figure>
  );
}
