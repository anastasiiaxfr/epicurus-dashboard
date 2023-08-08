import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../pages/_products";

import Table from "./Table";
import Banner from "../../components/Banner";
import Hgroup from "../../components/Hgroup";
import HeroGroup from "../../components/HeroCta";
import FormAddTrustManagement from "../../components/Form/FormAddTrustManagement";

function TrustManagementPage() {
  const [showForm, setShowForm] = useState(false);

  const [noTrustManagement, setNoTrustManagement] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const { newTrustManagement } = useContext(ProductContext);

  const [fieldName, setFieldName] = useState(false);
  const [fieldSum, setFieldSum] = useState(false);
  const [fieldPeriod, setFieldPeriod] = useState(false);
  const [fieldApi, setFieldApi] = useState(false);
  const [fieldPolicy, setFieldPolicy] = useState(false);


  useEffect(() => {
    newTrustManagement.length === 0
      ? setNoTrustManagement(true)
      : setNoTrustManagement(false);
  }, [newTrustManagement]);

  useEffect(() => {
    if (noTrustManagement === true) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [noTrustManagement, showForm]);

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
    info: ` 4 steps to complete`,
    btn: {
      label: "Add Trust",
      on_click: handleBtnAddTM,
    },
  };

  return (
    <>
      <HeroGroup hero={hero} show={showForm}>
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
          />
        </>
      </HeroGroup>
      <Banner toggleShow={showBanner} />
      {newTrustManagement.length !== 0 && (
        <>
          <Hgroup props={hgroup} />
          <Table />
        </>
      )}
    </>
  );
}

export default TrustManagementPage;
