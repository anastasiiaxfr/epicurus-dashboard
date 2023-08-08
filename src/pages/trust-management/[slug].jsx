import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { ProductContext } from "../../pages/_products";

import Hgroup from "../../components/Hgroup";
import Table from "../../components/Tables";
import HeroSingle from "../../components/HeroSingle";

import ModalDepositAdd from "../../components/Modal/ModalDepositAdd";
import ModalError from "../../components/Modal/ModalAuthError";

function DepositSinglePage() {
  const router = useRouter();
  const currentURL = router.asPath;
  const currentID = currentURL.replace("/trust-management/", "").trim();

  const { newTrustManagement } = useContext(ProductContext);

  const filterTM = newTrustManagement.filter((i) => i.id === currentID);

  const [data, setData] = useState({});
  const [deposit, setDeposit] = useState(0);

  
  useEffect(() => {
    if (filterTM[0]) {
      const { tm_name: name, api_key_id: key, tm_sum: sum, id
      } = filterTM[0];
      setData({ name, key, sum, id });
    }
  }, [filterTM[0]]);


  const [openModalDeposit, setOpenModalDeposit] = useState(false);
  const [openModalDepositError, setOpenModalDepositError] = useState(false);

  const hangleModalDepositForm = (state, val) => {
    setOpenModalDepositError(state);
    setDeposit(val);
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

  const hgroup = {
    title: "Transactions",
    link: {
      label: "Go Back",
      url: "/trust-management",
    },
  };

  return (
    <>
      <ModalDepositAdd
        openModal={openModalDeposit}
        data={data.key}
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

      <HeroSingle
        data={data}
        deposit={deposit}
        depositAdd={() => {setOpenModalDeposit(true)}}
      />

      {/* TRANSACTION */}
      <Hgroup props={hgroup} />
      <Table />
    </>
  );
}

export default DepositSinglePage;
