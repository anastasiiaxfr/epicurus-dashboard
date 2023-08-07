import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../pages/_products";

import Banner from "../../components/Banner";
import Card from "../../components/Card2";
import Hgroup from "../../components/Hgroup";
import HeroGroup from "../../components/HeroCta";
import FormAddRT from "../../components/Form/FormAddRT";

import Table from "./Table";

import styles from "./styles.module.sass";

function RoboticTradingPage() {
  const { newRT } = useContext(ProductContext);

  const [show, setShow] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    newRT.length === 0 ? setShow(false) : setShow(true);
  }, [newRT]);

  const handleChooseBot = () => {
    setShow(true)
    setShowForm(true)
  }

  const cards = [
    {
      title: "DCA Trading Bot",
      text: "DCA (Dollar Cost Averaging) бот - это программа, разработанная для автоматического выполнения стратегии долларового усреднения при инвестировании. Он основан на алгоритмах искусственного интеллекта и предназначен для помощи инвесторам в автоматическом распределении их инвестиций в течение определенного периода времени.",
      on_click: handleChooseBot,
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
      on_click: handleChooseBot,
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
    title: "Our Solutions",
    link: {
      label: "Learn More",
      url: "#",
    },
  };

  const hgroup2 = {
    title: "My Robotic Trading List",
    link: {
      label: "Learn More",
      url: "#",
    },
  };

  const hero = {
    heading: "Add New Robotic Trading",
    title: "Create a new Robotic Trading and start earning",
    text: `Press “Add Bot” to create new Robotic Trading and start working with them`,
    info: "4 steps to complete",
    btn: {
      label: "Add Bot",
      on_click: () => setShowForm(true),
    },
  };

  return (
    <>
      {!show && (
        <>
          <Banner toggleShow={showBanner} />
          <Hgroup props={hgroup} />
          <div className={styles.cards}>
            {cards.map((i, k) => (
              <Card props={i} key={k} />
            ))}
          </div>
        </>
      )}
      {show && (
        <>
          <HeroGroup hero={hero} show={showForm}>
            <FormAddRT show={newRT.length !== 0 ? () => setShowForm(prev => !prev) : setShow} />
          </HeroGroup>
          {newRT.length !== 0 && (
            <>
              <Hgroup props={hgroup2} />
              <Table data={newRT} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default RoboticTradingPage;
