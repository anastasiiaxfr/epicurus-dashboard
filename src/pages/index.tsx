import { useState, useContext } from "react";
import Push from "../framework/presentation/components/modules/Push";
import Products from "../framework/presentation/components/modules/Products";
import Hgroup from "../framework/presentation/components/modules/Hgroup";
import Steps from "../framework/presentation/components/modules/Steps";
import HomeDashboard from "../framework/presentation/components/modules/Page/Home";

import { AuthContext } from "./_auth";

import ProductImg1 from "../framework/presentation/components/assets/img/banners/rt.png";
import ProductImg2 from "../framework/presentation/components/assets/img/banners/tm.png";
import ProductImg3 from "../framework/presentation/components/assets/img/banners/deposit.png";
import ProductImg4 from "../framework/presentation/components/assets/img/banners/academy.png";


function HomePage() {
  const { auth, currentUser }: any = useContext(AuthContext);

  const userName = currentUser.displayName;
  const [toggleDashboard, setToggleDashboard] = useState(false);

  const hgroup = {
    title: "Our Products",
  };

  const products = [
    {
      title: "Trust Management",
      text: "",
      img: ProductImg1,
      url: "/",
    },

    {
      title: "Robotic Trading",
      text: "",
      img: ProductImg2,
      url: "/",
    },

    {
      title: "Api Keys",
      text: "",
      img: ProductImg3,
      url: "/myapi",
    },

    {
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

          <script
            src="https://cdn.pulse.is/livechat/loader.js"
            data-live-chat-id="651576acd32739aebf0a7b9e"
            async
          ></script>
        </>
      )}
    </>
  );
}

export default HomePage;
