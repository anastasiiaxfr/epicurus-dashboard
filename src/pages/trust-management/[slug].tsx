import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { ProductContext } from "../../pages/_products";

import Hgroup from "../../framework/presentation/components/modules/Hgroup";
import Table from "../../framework/presentation/components/modules/Tables";
import Hero from "./Hero";
import HeroGroup from "../../framework/presentation/components/modules/HeroCta";
import FormPayment from "../../framework/presentation/components/modules/Form/FormPayment";
import FormPaymentTransaction from "../../framework/presentation/components/modules/Form/FormPaymentTransaction";
import Banner from "../../framework/presentation/components/modules/Banner";

import ModalDepositAdd from "../../framework/presentation/components/modules/Modal/ModalDepositAdd";
import ModalError from "../../framework/presentation/components/modules/Modal/ModalAuthError";
import ModalSuccess from "../../framework/presentation/components/modules/Modal/ModalConfirmation";

function DepositSinglePage() {
  const router = useRouter();
  const currentURL = router.asPath;
  const currentID = currentURL.replace("/trust-management/", "").trim();
  const { newTrustManagement }: any = useContext(ProductContext);
  const filterTM = newTrustManagement.filter((i: any) => currentID.includes(i.id));

  const [data, setData] = useState({
    name: '', api_name: '', key: '', sum: '', id: '', tm_start_date: '', tm_period: ''
  });
  const [deposit, setDeposit] = useState(0);
  const [depositAddedSuccess, setDepositAddedSuccess] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [fieldNetwork, setFieldNetwork] = useState(false);
  const [fieldPM, setFieldPM] = useState(false);
  const [fieldPolicy, setFieldPolicy] = useState(false);
  const [fieldHash, setFieldHash] = useState(false);

  const totalSteps = 2;
  const [steps, setSteps] = useState(totalSteps);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  //const [stepsTitle, setStepsTitle] = useState("Choose Network");
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  useEffect(() => {
    fieldNetwork && fieldPolicy ? setStep1(true) : setStep1(false);
  }, [fieldNetwork, fieldPolicy]);

  useEffect(() => {
    fieldHash === true ? setStep2(true) : setStep2(false);
  }, [fieldHash]);

  useEffect(() => {
    if (step1) {
      setSteps(1);
      //setStepsTitle("Make a Transfer");
    }
    if (step1 && step2) {
      setSteps(0);
      //setStepsTitle("Completed");
    }
    //!step1 && setStepsTitle("Choose Network");
  }, [step1, step2]);

  useEffect(() => {
    setFieldNetwork(false);
    setFieldPolicy(false);
    setFieldHash(false);
    setSteps(totalSteps);
    setSubscriptionSuccess(false);
  }, [showForm]);

  useEffect(() => {
    if (filterTM[0]) {
      const {
        tm_name: name,
        api_key_id: key,
        api_key_name: api_name,
        tm_sum: sum,
        tm_start_date: tm_start_date,
        tm_period: tm_period,
        id,
      } = filterTM[0];
      setData({ name, api_name, key, sum, id, tm_start_date, tm_period });
    }
  }, [filterTM[0]]);

  const [openModalDeposit, setOpenModalDeposit] = useState(false);
  const [openModalDepositError, setOpenModalDepositError] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const hangleModalDepositForm = (state: any, val: any) => {
    setOpenModalDepositError(state);
    setDeposit(val);
    val && setDepositAddedSuccess(prev => !prev);
  };

  const handleModalSuccess = () => {
    setOpenModalSuccess(true);
  };

  const modalDeposit = {
    title: "Trust Deposit Incrase",
    text: `You are increasing the <b>Deposit</b> for your <b>“Trust Management”</b>`,

    btnText: "Accept",
    btnText2: "Cancel",
  };

  const modalDepositError = {
    title: "Insufficient funds in the account",
    btnText: "Accept",
  };

  const modalSubscriptionSuccess = {
    title: "Activation Successful",
    btnText: "Accept",
    on_click: () => setSubscriptionSuccess(true),
  };

  const hgroup = {
    title: "Transactions",
    link: {
      label: "Go Back",
      url: "/trust-management",
    },
  };

  const hero = {
    heading: `Payment`,
    info: `${steps} steps to complete`,
  };

  return (
    <>
      <ModalDepositAdd
        openModal={openModalDeposit}
        data={data.api_name}
        setModalOpen={setOpenModalDeposit}
        props={modalDeposit}
        toggleModal={hangleModalDepositForm}
      ></ModalDepositAdd>

      <ModalError
        openModal={openModalDepositError}
        setModalOpen={setOpenModalDepositError}
        props={modalDepositError}
        theme="error"
      />

      <ModalSuccess
        openModal={openModalSuccess}
        setModalOpen={setOpenModalSuccess}
        props={modalSubscriptionSuccess}
        theme="success"
      />

      {!showForm && (
        <>
          <Hero
            data={data}
            deposit={deposit}
            subscription={setShowForm}
            subscriptionSuccess={subscriptionSuccess}
            depositAddSuccess={depositAddedSuccess}
            toggleModalAddDeposit={setOpenModalDeposit}
          />
          <Hgroup props={hgroup} />
          <Table />
        </>
      )}

      {showForm && (
        <>
          <HeroGroup
            hero={hero}
            show={showForm}
            hideSidebar={step1 ? true : false}
            steps={steps}
            totalSteps={totalSteps}
          >
            {!step1 && (
              <FormPayment
                show={() => {
                  setShowForm(false);
                }}
                setFieldNetwork={setFieldNetwork}
                setFieldPolicy={setFieldPolicy}
              />
            )}
            {step1 && (
              <FormPaymentTransaction
                show={() => {
                  setShowForm(false);
                }}
                setFieldHash={setFieldHash}
                toggleModal={handleModalSuccess}
              />
            )}
          </HeroGroup>
          <Banner />
        </>
      )}
    </>
  );
}

export default DepositSinglePage;