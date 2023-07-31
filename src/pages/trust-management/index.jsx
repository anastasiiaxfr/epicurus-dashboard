import { useState, useEffect } from "react";

import Hero from "./Hero";
import Table from "./Table";
import Banner from "../../components/Banner";

function TrustManagementPage() {
  const [hideForm, setHideForm] = useState(true);
  const [noTrustManagement, setNoTrustManagement] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

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
      <Table setShow={setNoTrustManagement} />
    </>
  );
}

export default TrustManagementPage;
