import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../pages/_products";

import Hero from "./Hero";
import Table from "./Table";
import Banner from "../../components/Banner";


function TrustManagementPage() {
  const [hideForm, setHideForm] = useState(true);
  const [noTrustManagement, setNoTrustManagement] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const { newTrustManagement } = useContext(ProductContext);

  useEffect(() => {
    newTrustManagement.length === 0 ?  setNoTrustManagement(true) :  setNoTrustManagement(false);
  }, [newTrustManagement]);

  useEffect(() => {
    if (hideForm === true && noTrustManagement === true) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [noTrustManagement, hideForm]);

  return (
    <>
      <Hero setShow={setHideForm} />

      <Banner toggleShow={showBanner} />

      {/* TRANSACTION */}
      <Table />
    </>
  );
}

export default TrustManagementPage;
