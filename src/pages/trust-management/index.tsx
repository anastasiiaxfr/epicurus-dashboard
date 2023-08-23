import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../pages/_products";

import Table from "./Table";
import Banner from "../../components/Banner";
import Hgroup from "../../components/Hgroup";
import HeroGroup from "../../components/HeroCta";
import FormAddTrustManagement from "../../components/Form/FormAddTrustManagement";
import ModalConfirmation from "../../components/Modal/ModalConfirmation";

function TrustManagementPage() {
  const [showForm, setShowForm] = useState(false);

  const { newTrustManagement }: any = useContext(ProductContext);

  const totalSteps = 5;
  const [steps, setSteps] = useState(totalSteps);
  const [stepsTitle, setStepsTitle] = useState("Enter SUM");

  const [fieldName, setFieldName] = useState(false);
  const [fieldSum, setFieldSum] = useState(false);
  const [fieldPeriod, setFieldPeriod] = useState(false);
  const [fieldApi, setFieldApi] = useState(false);
  const [fieldPolicy, setFieldPolicy] = useState(false);

  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const modalKeyAdded = {
    title: "Activation Successful",
    btnText: "Accept",
    btnUrl: "#",
  };

 useEffect(() => {
    const trueFieldCount = [fieldPolicy, fieldApi, fieldPeriod, fieldSum, fieldName].filter(Boolean).length;
    setSteps(totalSteps - trueFieldCount);
 }, [fieldPolicy, fieldApi, fieldPeriod, fieldSum, fieldName]);

  useEffect(() => {
    setFieldName(false);
    setFieldSum(false);
    setFieldPeriod(false);
    setFieldApi(false);
    setFieldPolicy(false);
    setSteps(totalSteps);
    setStepsTitle("Enter SUM");
  }, [showForm]);

  const handleBtnAddTM = () => {
    setShowForm(true);
  };

  const hgroup = {
    title: "My Trust Management",
    link: {
      label: "Learn More",
      url: "#",
    },
  };

  const hero = {
    heading: `Add New Trust Management`,
    title: "Create a new Trust Management and start earning",
    text: `Press “Add Trust” to create new Trust Management and start working with them`,
    info: ` ${steps} steps to complete`,
    btn: {
      label: "Add Trust",
      on_click: handleBtnAddTM,
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
      <HeroGroup
        hero={hero}
        show={showForm}
        totalSteps={totalSteps}
        steps={steps}
      >
        <>
          <FormAddTrustManagement
            show={
              newTrustManagement.length !== 0
                ? () => setShowForm((prev) => !prev)
                : () => setShowForm((prev) => !prev)
            }
            setFieldPeriod={setFieldPeriod}
            setFieldApi={setFieldApi}
            setFieldName={setFieldName}
            setFieldSum={setFieldSum}
            setFieldPolicy={setFieldPolicy}
            toggleModal={setOpenModalSuccess}
          />
        </>
      </HeroGroup>

      {newTrustManagement.length !== 0 && (
        <>
          <Hgroup props={hgroup} />
          <Table />
        </>
      )}

      {newTrustManagement.length <= 4 && <Banner />}
    </>
  );
}

export default TrustManagementPage;
