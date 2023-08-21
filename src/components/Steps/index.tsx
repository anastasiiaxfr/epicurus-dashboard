import { useContext } from "react";
import { ProductContext } from "../../pages/_products";


import CheckIcon from "../../assets/icons/check.svg";


import Link from "next/link";
import Btn from "../Form/Btn";

import styles from "./styles.module.sass";

export default function Steps({setToggleDashboard}: any) {
  const { newApiKey, newTrustManagement, newRoboticTrading } = useContext(
    ProductContext
  );

  const onDashboardToggle = () => {
    setToggleDashboard(true);
  }

  const steps = [
    {
      active: true,
      completed: newApiKey.length > 0 ? true : false,
      num: "1.",
      title: "Add an API Key",
      text: "Connect an API Key to start working with our bots.",
      text_done: "You have successfully connected the API Key",
      btn: {
        title: "Connect",
        type: "link",
        url: "/myapi",
      },
    },
    {
      active: newApiKey.length > 0 ? true : false,
      completed:
        newTrustManagement.length > 0 || newRoboticTrading.length > 0
          ? true
          : false,
      num: "2.",
      title: "Select a Product",
      text:
        "Select a Product you would like (Robotic Trading OR Trust Management) to connect and register it.",
      text_done: "You have successfully registered your first product",
      btn: {
        title: "Select",
        type: "link",
        url: "#products",
      },
    },
    {
      active: newTrustManagement.length > 0 || newRoboticTrading.length > 0 ? true : false,
      completed: false,
      num: "3.",
      title: "Enjoy our Products",
      text: "Now you know how to work with our products. Сongratulations!",
      text_done: "",
      btn: {
        title: "My Dashboard",
        type: "button",
        url: "",
        on_click: onDashboardToggle
      },
    },
  ];

  return (
    <section className={styles.steps}>
      <div className={styles.steps_header}>
        <div className={styles.steps_title}>Let’s Get Started!</div>

        <Link href="/" className={styles.steps_link}>
          How it works?
        </Link>
      </div>
      <div className={styles.steps_container}>
        {steps.map((i: any, k: number) => (
          <figure
            className={`${styles.steps_item} ${i.active ? styles.active : ""} ${
              i.completed ? styles.completed : ""
            }`}
            key={k}
          >
            {!i.completed ? (
              <>
                <div className={styles.steps_item_header}>
                  {i.num} {i.title}
                </div>
                <div className={styles.steps_item_text}>{i.text}</div>
                <div className={styles.steps_item_cta}>
                  <Btn
                    label={i.btn.title}
                    type={i.btn.type}
                    link={i.btn?.url}
                    onClick={i.btn?.on_click}
                    theme={i.active ? "grad" : "secondary"}
                    disabled={i.active ? false : true}
                  />
                </div>
              </>
            ) : (
              <div className={styles.steps_content}>
                <CheckIcon className={styles.steps_icon}/>
                <div>{i.text_done}</div>
              </div>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
