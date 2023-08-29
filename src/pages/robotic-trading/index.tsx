import { useState, useEffect, useContext } from "react";
import { ref, database, set } from "../_firebase";
import { AuthContext } from "../../pages/_auth";
import nextId from "react-id-generator";

import { ProductContext } from "../_products";

import Banner from "../../framework/presentation/components/modules/Banner";
import Card from "../../framework/presentation/components/modules/Card2";
import Hgroup from "../../framework/presentation/components/modules/Hgroup";
import HeroGroup from "../../framework/presentation/components/modules/HeroCta";
import FormAddRT from "../../framework/presentation/components/modules/Form/FormAddRT";
import FormChooseSubscription from "../../framework/presentation/components/modules/Form/FormChooseSubscription";
import FormPayment from "../../framework/presentation/components/modules/Form/FormPayment";
import FormPaymentTransaction from "../../framework/presentation/components/modules/Form/FormPaymentTransaction";

import ModalConfirmation from "../../framework/presentation/components/modules/Modal/ModalConfirmation";

import Table from "./Table";

import styles from "./styles.module.sass";

function RoboticTradingPage() {
  const htmlId = nextId("rt-");
  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const { newRoboticTrading }: any = useContext(ProductContext);

  const [show, setShow] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const totalSteps = 4;
  const [steps, setSteps] = useState(totalSteps);

  const [submit, setSubmit] = useState(false);

  const [fieldName, setFieldName] = useState(false);
  const [fieldSum, setFieldSum] = useState(false);
  const [fieldApi, setFieldApi] = useState(false);
  const [fieldPolicy, setFieldPolicy] = useState(false);
  const [fieldPolicyPayment, setFieldPolicyPayment] = useState(false);
  const [fieldHash, setFieldHash] = useState(false);
  const [fieldNetwork, setFieldNetwork] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [choosenSubscription, choosenSetSubscription] = useState<{
    subscription_type: string;
    subscription_sum: number;
  } | undefined>(undefined);

  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);

  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalDeposit, setOpenModalDeposit] = useState(false);
  const [openModalDepositError, setOpenModalDepositError] = useState(false);

  const [fbData, setFbData] = useState({
    rt_name: "",
    rt_start_date: "",
    rt_sum: "",
    rt_sum_first: "",
    api_key_name: "",
    api_key_id: "",
    subscription: "",
    subscription_sum: 0,
    subscription_period: "",
    subscription_type: "",
    payment_network: "",
    payment_sum: "",
    hash_code: "",
  });

  useEffect(() => {
    const trueFieldCount = [fieldPolicy, fieldApi, fieldSum, fieldName].filter(
      Boolean
    ).length;
    const completeStep1 = totalSteps - trueFieldCount;
    completeStep1 === 0 && submit && setStep1(true);
  }, [fieldPolicy, fieldApi, fieldSum, fieldName, submit]);

  useEffect(() => {
    subscription === true && submit && setStep2(true);
  }, [subscription, submit]);

  useEffect(() => {
    fieldNetwork && fieldPolicyPayment && submit && setStep3(true);
  }, [fieldNetwork, fieldPolicyPayment, submit]);

  useEffect(() => {
    fieldHash === true ? setStep4(true) : setStep4(false);
  }, [fieldHash]);

  useEffect(() => {
    !step1 ? setSubmit(false) : setSubmit(true);
    !step2 ? setSubmit(false) : setSubmit(true);
    !step3 ? setSubmit(false) : setSubmit(true);
    !step4 ? setSubmit(false) : setSubmit(true);
    step1 && setSteps(totalSteps - 1);
    step1 && step2 && setSteps(totalSteps - 2);
    step1 && step2 && step3 && setSteps(totalSteps - 3);
    step1 && step2 && step3 && step4 && setSteps(0);
  }, [step1, step2, step3, step4]);

  useEffect(() => {
    setFieldName(false);
    setFieldSum(false);
    setFieldApi(false);
    setFieldPolicy(false);
    setFieldPolicyPayment(false);
    setSubscription(false);
    setFieldNetwork(false);
    setFieldHash(false);
    setSteps(totalSteps);
    setStep1(false);
    setStep2(false);
    setStep3(false);
    setStep4(false);
    setSubmit(false);
  }, [showForm]);

  useEffect(() => {
    newRoboticTrading.length === 0 ? setShow(false) : setShow(true);
  }, [newRoboticTrading]);

  const handleChooseBot = () => {
    setShow(true);
    setShowForm(true);
  };

  useEffect(() => {
    if (fbData && fbData.subscription) {
      choosenSetSubscription({
        subscription_type: fbData.subscription,
        subscription_sum: fbData.subscription_sum,
      });
    }
    if (fbData && fbData?.hash_code) {
      set(ref(database, "robotic-trading/" + userID + "/" + htmlId), {
        rt_name: fbData.rt_name,
        rt_start_date: fbData.rt_start_date,
        rt_sum: fbData.rt_sum,
        rt_sum_first: fbData.rt_sum,
        api_key_name: fbData.api_key_name,
        api_key_id: fbData.api_key_id,
        subscription: fbData.subscription,
        subscription_sum: fbData.subscription_sum,
        subscription_period: fbData.subscription_period,
        payment_network: fbData.payment_network,
        payment_sum: fbData.payment_sum,
        hash_code: fbData.hash_code,
      });
    }
  }, [fbData]);

  const cards = [
    {
      title: "DCA Trading Bot",
      text:
        "DCA (Dollar Cost Averaging) бот - это программа, разработанная для автоматического выполнения стратегии долларового усреднения при инвестировании. Он основан на алгоритмах искусственного интеллекта и предназначен для помощи инвесторам в автоматическом распределении их инвестиций в течение определенного периода времени.",
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
      text:
        "DCA (Dollar Cost Averaging) бот - это программа, разработанная для автоматического выполнения стратегии долларового усреднения при инвестировании. Он основан на алгоритмах искусственного интеллекта и предназначен для помощи инвесторам в автоматическом распределении их инвестиций в течение определенного периода времени.",
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
    info: `${steps} steps to complete`,
    btn: {
      label: "Add Bot",
      on_click: () => setShowForm(true),
    },
  };

  const toggleModalSuccess = () => {
    setOpenModalSuccess(true);
  };

  const modalDepositAdded = {
    title: "Activation Successful",
    btnText: "Accept",
    btnUrl: "#",
  };

  return (
    <>
      <ModalConfirmation
        openModal={openModalSuccess}
        setModalOpen={setOpenModalSuccess}
        props={modalDepositAdded}
        theme="success"
      />

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
          {
            <HeroGroup
              hero={hero}
              show={showForm}
              totalSteps={totalSteps}
              steps={steps}
              hideSidebar={step1 ? true : false}
            >
              {!step1 && (
                <FormAddRT
                  setFieldApi={setFieldApi}
                  setFieldName={setFieldName}
                  setFieldSum={setFieldSum}
                  setFieldPolicy={setFieldPolicy}
                  getDataFB={setFbData}
                  show={
                    newRoboticTrading.length !== 0
                      ? (val: any) => {
                          setShowForm(val);
                          setSubmit(val);
                        }
                      : (val: any) => {
                          setShow(val);
                          setSubmit(val);
                        }
                  }
                />
              )}
              {step1 && !step2 && (
                <>
                  <FormChooseSubscription
                    getDataFB={(data: any) =>
                      setFbData((prevData) => ({ ...prevData, ...data }))
                    }
                    show={(val: any) => {
                      setShowForm(val);
                      setSubmit(val);
                    }}
                    setSubscription={setSubscription}
                  />
                </>
              )}
              {step2 && !step3 && (
                <>
                  <FormPayment
                    getDataFB={(data: any) =>
                      setFbData((prevData) => ({ ...prevData, ...data }))
                    }
                    show={(val: any) => {
                      setShowForm(val);
                      setSubmit(val);
                    }}
                    setFieldNetwork={setFieldNetwork}
                    setFieldPolicy={setFieldPolicyPayment}
                    payment={choosenSubscription}
                  />
                </>
              )}
              {step3 && (
                <>
                  <FormPaymentTransaction
                    getDataFB={(data: any) =>
                      setFbData((prevData) => ({ ...prevData, ...data }))
                    }
                    show={(val: any) => {
                      setShowForm(val);
                    }}
                    setFieldHash={setFieldHash}
                    toggleModal={toggleModalSuccess}
                  />
                </>
              )}
            </HeroGroup>
          }

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
