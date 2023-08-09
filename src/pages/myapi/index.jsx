import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../pages/_products";

import Table from "./Table";
import Banner from "../../components/Banner";
import Hgroup from "../../components/Hgroup";
import HeroGroup from "../../components/HeroCta";
import FormAddApiKey from "../../components/Form/FormAddApiKey";
import ModalConfirmation from "../../components/Modal/ModalConfirmation";


function MyApiPage() {
  const [showForm, setShowForm] = useState(false);
  const { newApiKey } = useContext(ProductContext);

  const totalSteps = 4;
  const [steps, setSteps] = useState(totalSteps);
  const [fieldName, setFieldName] = useState(false);
  const [fieldKey, setFieldKey] = useState(false);
  const [fieldSecret, setFieldSecret] = useState(false);
  const [fieldPolicy, setFieldPolicy] = useState(false);

  useEffect(() => {
    const successSteps = [fieldPolicy, fieldKey, fieldSecret, fieldName].filter(Boolean).length;
    setSteps(totalSteps - successSteps)
  }, [fieldPolicy, fieldKey, fieldSecret, fieldName]);

  useEffect(() => {
    setFieldName(false);
    setFieldKey(false);
    setFieldSecret(false);
    setFieldPolicy(false);
    setSteps(totalSteps);
  }, [showForm]);

  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const modalKeyAdded = {
    title: "Key Add Successful",
    btnText: "Accept",
    btnUrl: "#",
  };


  const handleBtnAddKey = () => {
    setShowForm(true);
  }

  const hgroup = {
    title: "My Api Keys",
    link: {
      label: "Learn More",
      url: "#",
    },
  };

  const hero = {
    heading: `Connect Your API Keys`,
    title: "Add your API Keys and start earning",
    text: `Press “Add API Key” to add new API Keys and start working with
    them`,
    info: `${steps} steps to complete`,
    btn: {
      label: "Add API Key",
      on_click: handleBtnAddKey,
    },
  };

  return (
    <>
     <ModalConfirmation
        openModal={openModalSuccess}
        setModalOpen={setOpenModalSuccess}
        props={modalKeyAdded}
        theme="success"
      />
      <HeroGroup hero={hero} show={showForm} totalSteps={totalSteps} steps={steps}>
        <>
          <FormAddApiKey
            show={
                newApiKey.length !== 0
                ? () => setShowForm((prev) => !prev)
                : () => setShowForm((prev) => !prev)
            }
            toggleModal={setOpenModalSuccess}
            setFieldPolicy={setFieldPolicy}
            setFieldName={setFieldName}
            setFieldKey={setFieldKey}
            setFieldSecret={setFieldSecret}
          />
        </>
      </HeroGroup>

      {newApiKey.length !== 0 && (
        <>
          <Hgroup props={hgroup} />
          <Table />
        </>
      )}

      {newApiKey.length <= 4 && <Banner />}
    </>
  );
}

export default MyApiPage;
