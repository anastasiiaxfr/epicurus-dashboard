import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../pages/_products";

import Hero from "./Hero";
import Table from "./Table";
import Banner from "../../components/Banner";


function MyApiPage() {
  const [hideForm, setHideForm] = useState(true);
  const [noApiKeys, setNoApiKeys] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const { newApiKey } = useContext(ProductContext);

  useEffect(() => {
    newApiKey.length === 0 ? setNoApiKeys(true) : setNoApiKeys(false);
  }, [newApiKey]);

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
      <Table />
    </>
  );
}

export default MyApiPage;
