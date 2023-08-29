import Chart from "../../../framework/presentation/components/modules/Chart";
import ChartArea from "../../../framework/presentation/components/modules/ChartArea";

import styles from "./hero.module.sass";

export default function Hero({ props }: any) {
  const deposit_sum = props?.deposit_sum || 0;
  return (
    <div className={styles.hero}>
      <div className={styles.main}>
        <div className={styles.chart_card}>
          <div className={styles.chart_header}>
            <div className={styles.chart_title}>Total Profit</div>
          </div>
          <div className={styles.chart}>
            <ChartArea />
          </div>
        </div>
      </div>

      <aside className={styles.sidebar}>
        <div className={styles.sidebar_card}>
          <div className={styles.sidebar_title}>Total Sum</div>
          <span className={styles.sidebar_chart_val}>{deposit_sum} $</span>
          <div className={styles.sidebar_chart}>
            <Chart />
          </div>
        </div>
      </aside>
    </div>
  );
}
