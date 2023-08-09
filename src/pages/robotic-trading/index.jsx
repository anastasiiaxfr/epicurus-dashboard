import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../pages/_products";

import Banner from "../../components/Banner";
import Card from "../../components/Card2";
import Hgroup from "../../components/Hgroup";
import HeroGroup from "../../components/HeroCta";
import FormAddRT from "../../components/Form/FormAddRT";
import ModalConfirmation from "../../components/Modal/ModalConfirmation";

import Table from "./Table";

import styles from "./styles.module.sass";

function RoboticTradingPage() {
  const { newRoboticTrading } = useContext(ProductContext);

  const [show, setShow] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const totalSteps = 4;
  const [steps, setSteps] = useState(totalSteps);

  const [fieldName, setFieldName] = useState(false);
  const [fieldSum, setFieldSum] = useState(false);
  const [fieldApi, setFieldApi] = useState(false);
  const [fieldPolicy, setFieldPolicy] = useState(false);

  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);

  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  useEffect(() => {
    const trueFieldCount = [fieldPolicy, fieldApi, fieldSum, fieldName].filter(
      Boolean
    ).length;
    const completeStep1 = totalSteps - trueFieldCount;
    if(completeStep1 === 0){ setStep1(true); setSteps(totalSteps - 1); }
  }, [fieldPolicy, fieldApi, fieldSum, fieldName]);

  useEffect(() => {
    newRoboticTrading.length === 0 ? setShow(false) : setShow(true);
  }, [newRoboticTrading]);

  const handleChooseBot = () => {
    setShow(true);
    setShowForm(true);
  };

  useEffect(() => {
    setFieldName(false);
    setFieldSum(false);
    setFieldApi(false);
    setFieldPolicy(false);
    setSteps(totalSteps);
  }, [showForm]);

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
    heading: "Register Trading Bot",
    title: "Create a new Robotic Trading and start earning",
    text: `Press “Add Bot” to create new Robotic Trading and start working with them`,
    info: "4 steps to complete",
    btn: {
      label: "Add Bot",
      on_click: () => setShowForm(true),
    },
  };

  const modalDepositAdded = {
    title: "Activation Successful",
    btnText: "Accept",
    btnUrl: "#",
  };

  return (
    <>
      {!show && (
        <>
          <Banner />
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
          <ModalConfirmation
            openModal={openModalSuccess}
            setModalOpen={setOpenModalSuccess}
            props={modalDepositAdded}
            theme="success"
          />

          <HeroGroup
            hero={hero}
            show={showForm}
            totalSteps={totalSteps}
            steps={steps}
          >

            {!step1 && <FormAddRT
              setFieldApi={setFieldApi}
              setFieldName={setFieldName}
              setFieldSum={setFieldSum}
              setFieldPolicy={setFieldPolicy}
              show={
                newRoboticTrading.length !== 0
                  ? () => {
                    setStep1(true);
                    setShowForm(prev => !prev);
                  }
                  : () => {
                      //setShow(prev => !prev);
                      
                    }
              }
            />}
            {step1 && <>
                step2
            </>}
          </HeroGroup>

          {newRoboticTrading.length !== 0 && (
            <>
              <Hgroup props={hgroup2} />
              <Table data={newRoboticTrading} />
            </>
          )}

          {newRoboticTrading.length <= 4 && <Banner />}
        </>
      )}
    </>
  );
}

export default RoboticTradingPage;
