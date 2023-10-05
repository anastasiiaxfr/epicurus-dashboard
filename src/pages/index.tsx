import { useState, useContext } from "react";
import Push from "../framework/presentation/components/modules/Push";
import Products from "../framework/presentation/components/modules/Products";
import Hgroup from "../framework/presentation/components/modules/Hgroup";
import Steps from "../framework/presentation/components/modules/Steps";
import HomeDashboard from "../framework/presentation/components/modules/Page/Home";

import { AuthContext } from "./_auth";

import ProductImg1 from "../framework/presentation/components/assets/img/banners/product-rt.jpg";
import ProductImg2 from "../framework/presentation/components/assets/img/banners/product-tm.jpg";
import ProductImg3 from "../framework/presentation/components/assets/img/banners/product-deposit.jpg";
import ProductImg4 from "../framework/presentation/components/assets/img/banners/product-academy.jpg";


function HomePage() {
  const { auth, currentUser }: any = useContext(AuthContext);

  const userName = currentUser.displayName;
  const [toggleDashboard, setToggleDashboard] = useState(false);

  const hgroup = {
    title: "Our Products",
  };

  const products = [
    {
      enable: true,
      title: "Robotic Trading",
      sub_title: "About the Product",
      text: "Service for automated digital assets trading on centralised or decentralised exchanges. Robotic Trading allows an investor to subscribe to one or more bots that autonomously, without investor participation, trade based on algorithmic strategies.",
      img: ProductImg1,
      url: "/",
    },

    {
      enable: true,
      title: "Trust Management",
      sub_title: "About the Product",
      text: "The investor transfers his assets to the trust management of the investment service provider, International Trade Group. The client's personal investment advisor trades on digital asset markets from the investor's account. All assets received remain the investor's property.",
      img: ProductImg2,
      url: "/",
    },
  
    {
      enable: true,
      title: "Deposit",
      sub_title: "About the Product",
      text: "A cryptocurrency deposit is an analogue of a traditional bank deposit in cryptocurrency. The investor transfers digital assets to the investment service provider, International Trade Group, for a certain period. The company regularly pays fixed interest.",
      img: ProductImg3,
      url: "/",
    },

    {
      enable: false,
      title: "Academy",
      text: "",
      img: ProductImg4,
      url: "/",
    },
  ];

  return (
    <>
      {toggleDashboard ? (
        <HomeDashboard />
      ) : (
        <>
          <Push
            url="#"
            theme="default"
            type="Welcome!"
            text={`We are very pleased to present to you Epicurus, ${userName ? userName : 'friend'}!`}
            close={false}
          />

          <Steps setToggleDashboard={setToggleDashboard} />


          {/* TRANSACTION */}
          <Hgroup props={hgroup} />

          {products && <Products products={products} />}

        </>
      )}
    </>
  );
}

export default HomePage;
