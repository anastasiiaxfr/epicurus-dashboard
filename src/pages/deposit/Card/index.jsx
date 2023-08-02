import Btn from "../../../components/Form/Btn";
import styles from "./card.module.sass";

export default function Card({ deposits }) {
  return (
    <section className={styles.card_wrap}>
      {deposits.map((i, k) => (
        <figure className={styles.card} key={k}>
          <div className={styles.card_header}>
            <div className={styles.card_title}>{i.type}</div>
          </div>

          <div className={styles.card_content}>
            <div className={styles.card_cols}>
              <div className={styles.card_cols_title}>{i.about.title}</div>
              <div className={styles.card_cols_text}>{i.about.text}</div>
            </div>

            <div className={styles.card_cols}>
              <div className={styles.card_cols_title}>{i.offer.title}</div>
              <div className={styles.card_cols_val}>{i.offer.val}</div>
            </div>

            <div className={styles.card_cols}>
              <div className={styles.card_cols_title}>{i.cta.title}</div>
              <Btn
                label={i.cta.btn.title}
                onClick={i.cta.btn.on_click}
                type="button"
                theme="grad"
              />
            </div>
          </div>
        </figure>
      ))}
    </section>
  );
}
