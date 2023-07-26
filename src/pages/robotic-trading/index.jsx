import { useState } from "react";

import Banner from "../../components/Banner";
import Card from "../../components/Card2";
import Hgroup from "../../components/Hgroup";

import styles from "./styles.module.sass";

function RoboticTradingPage() {
  const [showBanner, setShowBanner] = useState(true);

  const cards = [
    {
      title: "DCA Trading Bot",
      text: "DCA (Dollar Cost Averaging) бот - это программа, разработанная для автоматического выполнения стратегии долларового усреднения при инвестировании. Он основан на алгоритмах искусственного интеллекта и предназначен для помощи инвесторам в автоматическом распределении их инвестиций в течение определенного периода времени.",
      url: "#",
      btn: "Choose",
      cols: [
        {
          title: "Risks",
          val: "10%",
        },
        {
          title: "APY",
          val: "48%",
        },
      ],
    },
    {
      title: "DCA Trading Bot",
      text: "DCA (Dollar Cost Averaging) бот - это программа, разработанная для автоматического выполнения стратегии долларового усреднения при инвестировании. Он основан на алгоритмах искусственного интеллекта и предназначен для помощи инвесторам в автоматическом распределении их инвестиций в течение определенного периода времени.",
      url: "#",
      btn: "Choose",
      cols: [
        {
          title: "Risks",
          val: "10%",
        },
        {
          title: "APY",
          val: "48%",
        },
      ],
    },
  ];

  const hgroup = {
    title: 'Our Solutions',
    link: {
        label: 'Learn More',
        url: '#'
    }
  };

  return (
    <>
      <Banner toggleShow={showBanner} />
      <Hgroup props={hgroup}/>
      <div className={styles.cards}>
        {cards.map((i, k) => (
          <Card props={i} key={k} />
        ))}
      </div>
    </>
  );
}

export default RoboticTradingPage;
