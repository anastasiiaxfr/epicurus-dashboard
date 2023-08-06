import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../pages/_products";

import Card from "./Card";
import Calculator from "./Calculator";
import Table from "./Table";
import Hgroup from "../../components/Hgroup";
import HeroGroup from "../../components/HeroCta";

import ModalWallet from "../../components/Modal/ModalWallet";
import ModalDeposit from "../../components/Modal/ModalDeposit";
import FormDeposit from "../../components/Form/FormAddDeposit";

function DepositPage() {
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { newDeposit } = useContext(ProductContext);

  const [openModal, setOpenModal] = useState(false);
  const [openModalAddWallet, setOpenModalAddWallet] = useState(false);
  const [selectDeposit, setSelectDeposit] = useState({});
  const [selectWallet, setSelectWallet] = useState();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenModalWallet = (val) => {
    setSelectDeposit(val);
    setOpenModalAddWallet(true);
  };

  const handleOpenModalForm = (val) => {
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
    heading: "Open New Deposit",
    title: "Open a new Deposit and start earning",
    text: `Press “Add Deposit” to register a new Deposit and start working with them`,
    info: "4 steps to complete",
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

      {show && (
        <>
          <Calculator />
          <Hgroup props={hgroup} />
          <Card deposits={deposits} />
        </>
      )}

      {!show && (
        <>
          <HeroGroup hero={hero} show={showForm}>
            <FormDeposit
              deposit={selectDeposit}
              wallet={selectWallet}
              show={newDeposit.length !== 0 ? () => setShowForm(prev => !prev) : setShow}
            />
          </HeroGroup>
          {newDeposit.length !== 0 && <>
            <Hgroup props={hgroup2} />
            <Table deposits={newDeposit} />
          </>}
        </>
      )}
    </>
  );
}

export default DepositPage;
