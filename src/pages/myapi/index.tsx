import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../pages/_products";

import Table from "./Table";
import Banner from "../../framework/presentation/components/modules/Banner";
import Hgroup from "../../framework/presentation/components/modules/Hgroup";
import HeroGroup from "../../framework/presentation/components/modules/HeroCta";
import FormAddApiKey from "../../framework/presentation/components/modules/Form/FormAddApiKey";
import ModalConfirmation from "../../framework/presentation/components/modules/Modal/ModalConfirmation";


function MyApiPage() {
  const [showForm, setShowForm] = useState(false);
  const { newApiKey }: any = useContext(ProductContext);

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
    str: `
    <h3>How to Connect the API Key to EPICURUS</h3>
    
    <ol>
      <li>Log in to Binance and go to “API Management” section in your profile.
      </li>
      <li>Click “Create API”. In the “Choose API Key type” window that opens, select “System generated” and click “Next”. Create a label for the API key and click “Next” again.
      </li>
      <li>You must confirm the request using your two-factor authentication device to generate an API key.
      </li>
      <li>Binance will generate an API key and a corresponding API secret key. After that, uncheck the “Manage Security” checkbox. Complete the request using your device for two-factor authentication.</li>
      <li>Check the boxes next to the “Enable futures” and “Allow universal operations” settings, and leave the API access restriction “Unrestricted”.
      </li>
      <li>Copy the API Key and Secret Key. Paste them into the appropriate fields on this page.</li>
    </ol>
    `
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
