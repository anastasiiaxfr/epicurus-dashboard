import { useState, useContext } from "react";
import Push from "../components/Push";
import Products from "../components/Products";
import Hgroup from "../components/Hgroup";
import Steps from "../components/Steps";
import HomeDashboard from "../components/Page/Home";

import { AuthContext } from "./_auth";

import ProductImg1 from "../assets/img/solutions-1.png";
import ProductImg2 from "../assets/img/solutions-2.png";
import ProductImg3 from "../assets/img/solutions-3.png";
import ProductImg4 from "../assets/img/solutions-4.png";


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
      url: "/trust-management",
    },

    {
      title: "Robotic Trading",
      text: "",
      img: ProductImg2,
      url: "/robotic-trading",
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
      url: "/academy",
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
            text={`We are very pleased to present to you Epicurus, ${userName}!`}
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
