import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { ProductContext } from "../../pages/_products";

import Hgroup from "../../components/Hgroup";
import Table from "../../components/Tables";
import HeroSingle from "../../components/HeroSingle";
import HeroGroup from "../../components/HeroCta";
import FormPayment from "../../components/Form/FormPayment";
import FormPaymentTransaction from "../../components/Form/FormPaymentTransaction";
import Banner from "../../components/Banner";

import ModalDepositAdd from "../../components/Modal/ModalDepositAdd";
import ModalError from "../../components/Modal/ModalAuthError";
import ModalSuccess from "../../components/Modal/ModalConfirmation";

function DepositSinglePage() {
  const router = useRouter();
  const currentURL = router.asPath;
  const currentID = currentURL.replace("/trust-management/", "").trim();

  const { newTrustManagement } = useContext(ProductContext);

  const filterTM = newTrustManagement.filter((i) => i.id === currentID);

  const [data, setData] = useState({});
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
        id,
      } = filterTM[0];
      setData({ name, api_name, key, sum, id });
    }
  }, [filterTM[0]]);

  const [openModalDeposit, setOpenModalDeposit] = useState(false);
  const [openModalDepositError, setOpenModalDepositError] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const hangleModalDepositForm = (state, val) => {
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
          <HeroSingle
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
