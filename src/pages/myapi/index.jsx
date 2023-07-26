import { useState, useEffect } from "react";

import Hero from "./Hero";
import Table from "./Table";
import Banner from "../../components/Banner";


function MyApiPage() {
  const [hideForm, setHideForm] = useState(true);
  const [noApiKeys, setNoApiKeys] = useState(true);
  const [showBanner, setShowBanner] = useState(true);


  useEffect(() => {
    if(hideForm === true && noApiKeys === true){
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [noApiKeys, hideForm]);
  return (
    <>
      <Hero setShow={setHideForm}/>
      <Banner toggleShow={showBanner}/>  

      {/* TRANSACTION */}
      <Table setShow={setNoApiKeys}/>
    </>
  );
}

export default MyApiPage;
