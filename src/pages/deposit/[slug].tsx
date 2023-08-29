import { useContext } from "react";
import { useRouter } from "next/router";

import { ProductContext } from "../../pages/_products";

import Hgroup from "../../framework/presentation/components/modules/Hgroup";
import Table from "../../framework/presentation/components/modules/Tables";
import Hero from "./Hero";

function DepositSinglePage() {
  const router = useRouter();
  const currentURL = router.asPath;
  const currentID = currentURL.replace("/deposit/", "").trim();

  const { newDeposit }: any = useContext(ProductContext);
  //console.log(newDeposit)

  const filterDeposit = newDeposit.filter((i: any) => i.id === currentID);
  //console.log(filterDeposit[0])

  const hgroup = {
    title: "Transactions",
    link: {
      label: "Go Back",
      url: "/deposit",
    },
  };

  const hgroup2 = {
    title: filterDeposit[0]?.deposit_type,
    link: {
      label: "Go Back",
      url: "/deposit",
    },
  };

  return (
    <>
      <Hgroup props={hgroup2} />

      <Hero props={filterDeposit[0]} />
      {/* TRANSACTION */}
      <Hgroup props={hgroup} />
      <Table />
    </>
  );
}

export default DepositSinglePage;
