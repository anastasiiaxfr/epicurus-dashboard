import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { ProductContext } from "../../pages/_products";

import Hgroup from "../../components/Hgroup";
import Table from "../../components/Tables";
import HeroSingle from "../../components/HeroSingle";

function DepositSinglePage() {
  const router = useRouter();
  const currentURL = router.asPath;
  const currentID = currentURL.replace("/robotic-trading/", "").trim();

  const { newRoboticTrading } = useContext(ProductContext);

  const filterTM = newRoboticTrading.filter((i) => i.id === currentID);
  
  const [data, setData] = useState({});


  useEffect(() => {
    if(filterTM[0]){
        const { rt_sum: sum, rt_network: network, rt_period: period } = filterTM[0];
        setData({sum, network, period});
    }
  }, [filterTM[0]])


  const hgroup = {
    title: "Transactions",
    link: {
      label: "Go Back",
      url: "/robotic-trading",
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
