import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../_products";

import Card from "./Card";
import Calculator from "./Calculator";
import Table from "./Table";
import Hgroup from "../../framework/presentation/components/modules/Hgroup";
import HeroGroup from "../../framework/presentation/components/modules/HeroCta";
import Banner from "../../framework/presentation/components/modules/Banner";

import ModalWallet from "../../framework/presentation/components/modules/Modal/ModalWalletChoose";
import ModalDeposit from "../../framework/presentation/components/modules/Modal/ModalDeposit";
import ModalConfirmation from "../../framework/presentation/components/modules/Modal/ModalConfirmation";

import FormDeposit from "../../framework/presentation/components/modules/Form/FormAddDeposit";

import DepositImage from "../../framework/presentation/components/assets/img/banners/deposit.jpg";


function DepositPage() {
  const { newDeposit }: any = useContext(ProductContext);

  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [openModalAddWallet, setOpenModalAddWallet] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const [selectDeposit, setSelectDeposit] = useState({});
  const [selectWallet, setSelectWallet] = useState();

  const totalSteps = 4;
  const [steps, setSteps] = useState(totalSteps);
  const [stepsTitle, setStepsTitle] = useState("Enter SUM");

  const [fieldSum, setFieldSum] = useState(false);
  const [fieldPeriod, setFieldPeriod] = useState(false);
  const [fieldNetwork, setFieldNetwork] = useState(false);
  const [fieldPolicy, setFieldPolicy] = useState(false);

  const modalDepositAdded = {
    title: "Activation Successful",
    btnText: "Accept",
    btnUrl: "#",
  };

  useEffect(() => {
    const trueFieldCount = [
      fieldSum,
      fieldPeriod,
      fieldNetwork,
      fieldPolicy,
    ].filter(Boolean).length;
    setSteps(totalSteps - trueFieldCount);
  }, [fieldSum, fieldPeriod, fieldNetwork, fieldPolicy]);

  useEffect(() => {
    setFieldSum(false);
    setFieldPeriod(false);
    setFieldNetwork(false);
    setFieldPolicy(false);
    setSteps(totalSteps);
  }, [showForm, show]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenModalWallet = (val: any) => {
    setSelectDeposit(val);
    setOpenModalAddWallet(true);
  };

  const handleOpenModalForm = (val: any) => {
    console.log("val", val);
    setSelectWallet(val);
    setShowForm(true);
    setShow(false);
  };

  useEffect(() => {
    newDeposit.length === 0 ? setShow(true) : setShow(false);
  }, [newDeposit]);

  const hgroup = {
    title: "Our Solutions",
    link: {
      label: "See All",
      url: "#",
    },
  };

  const hgroup2 = {
    title: "My Deposits",
    link: {
      label: "Learn More",
      url: "#",
    },
  };

  const hero = {
    heading: `Open New Deposit`,
    title: "Open a new Deposit and start earning",
    text: `Press “Add Deposit” to register a new Deposit and start working with them`,
    info: `${steps} steps to complete`,
    btn: {
      label: "Add Deposit",
      on_click: handleOpenModal,
    },
  };

  const deposits = [
    {
      type: "Deposit Classic",
      about: {
        title: "About the Deposit",
        text:
          "DCA (Dollar Cost Averaging) бот - это программа, разработанная для автоматического выполнения стратегии долларового усреднения при инвестировании. Он основан на алгоритмах искусственного интеллекта и предназначен для помощи инвесторам в автоматическом распределении их инвестиций в течение определенного периода времени.",
      },
      offer: {
        title: "Percentage",
        val: "10%",
      },
      cta: {
        title: "Want to invest?",
        btn: {
          title: "Invest Now",
          on_click: () =>
            handleOpenModalWallet({ type: "Deposit Classic", val: "10%" }),
        },
      },
    },
    {
      type: "Deposit Premium",
      about: {
        title: "About the Deposit",
        text:
          "DCA (Dollar Cost Averaging) бот - это программа, разработанная для автоматического выполнения стратегии долларового усреднения при инвестировании. Он основан на алгоритмах искусственного интеллекта и предназначен для помощи инвесторам в автоматическом распределении их инвестиций в течение определенного периода времени.",
      },
      offer: {
        title: "Percentage",
        val: "20%",
      },
      cta: {
        title: "Want to invest?",
        btn: {
          title: "Invest Now",
          on_click: () =>
            handleOpenModalWallet({ type: "Deposit Premium", val: "20%" }),
        },
      },
    },
    {
      type: "Deposit VIP",
      about: {
        title: "About the Deposit",
        text:
          "DCA (Dollar Cost Averaging) бот - это программа, разработанная для автоматического выполнения стратегии долларового усреднения при инвестировании. Он основан на алгоритмах искусственного интеллекта и предназначен для помощи инвесторам в автоматическом распределении их инвестиций в течение определенного периода времени.",
      },
      offer: {
        title: "Percentage",
        val: "12%",
      },
      cta: {
        title: "Want to invest?",
        btn: {
          title: "Invest Now",
          on_click: () =>
            handleOpenModalWallet({ type: "Deposit VIP", val: "12%" }),
        },
      },
    },
  ];

  const banner = {
    title: "Deposits",
    sub_title: "What is",
    text: "A cryptocurrency deposit is an analogue of a traditional bank deposit in cryptocurrency. The investor transfers digital assets to the investment service provider, International Trade Group, for a certain period. The company regularly pays fixed interest.",
    img: DepositImage
  };

  return (
    <>
      <ModalWallet
        openModal={openModalAddWallet}
        setModalOpen={setOpenModalAddWallet}
        toggleModal={handleOpenModalForm}
      />

      <ModalDeposit
        openModal={openModal}
        setModalOpen={setOpenModal}
        deposits={deposits}
        toggleModal={handleOpenModalWallet}
      />

      <ModalConfirmation
        openModal={openModalSuccess}
        setModalOpen={setOpenModalSuccess}
        show={show}
        props={modalDepositAdded}
        theme="success"
      />

      {show && (
        <>
          <Banner data={banner} />
          <Calculator />
          <Hgroup props={hgroup} />
          <Card deposits={deposits} />
        </>
      )}

      {!show && (
        <>
          <HeroGroup
            hero={hero}
            show={showForm}
            steps={steps}
            totalSteps={totalSteps}
          >
            <FormDeposit
              deposit={selectDeposit}
              wallet={selectWallet}
              show={
                newDeposit.length !== 0
                  ? () => setShowForm((prev) => !prev)
                  : () => {
                      setShow(true);
                      setShowForm((prev) => !prev);
                    }
              }
              setFieldSum={setFieldSum}
              setFieldPeriod={setFieldPeriod}
              setFieldNetwork={setFieldNetwork}
              setFieldPolicy={setFieldPolicy}
              toggleModal={setOpenModalSuccess}
            />
          </HeroGroup>

          {newDeposit.length !== 0 && (
            <>
              <Hgroup props={hgroup2} />
              <Table deposits={newDeposit} />
            </>
          )}

          {newDeposit.length <= 4 && <Banner data={banner} />}
        </>
      )}
    </>
  );
}

export default DepositPage;
