import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { ProductContext } from "../../pages/_products";

import Hgroup from "../../components/Hgroup";
import Table from "../../components/Tables";
import HeroSingle from "../../components/HeroSingle";

function DepositSinglePage() {
  const router = useRouter();
  const currentURL = router.asPath;
  const currentID = currentURL.replace("/trust-management/", "").trim();

  const { newTrustManagement } = useContext(ProductContext);

  const filterTM = newTrustManagement.filter((i) => i.id === currentID);
  
  const [data, setData] = useState({});
  useEffect(() => {
    if(filterTM[0]){
        const { api_name: name, api_key: key, api_secret: secret } = filterTM[0];
        setData({name, key, secret});
    }
  }, [filterTM[0]])


  const hgroup = {
    title: "Transactions",
    link: {
      label: "Go Back",
      url: "/trust-management",
    },
  };

  return (
    <>
      <HeroSingle data={data} />
      {/* TRANSACTION */}
      <Hgroup props={hgroup} />
      <Table />
    </>
  );
}

export default DepositSinglePage;
