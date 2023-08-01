import Link from "next/link";
import Btn from '../../components/Form/Btn';

import styles from "./styles.module.sass";

const steps = [
  {
    active: true,
    completed: false,
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
    active: false,
    completed: false,
    num: "2.",
    title: "Select a Product",
    text: "Select a Product you would like (Robotic Trading OR Trust Management) to connect and register it.",
    text_done: "You have successfully registered your first product",
    btn: {
      title: "Select",
      type: "link",
      url: "",
    },
  },
  {
    active: false,
    completed: false,
    num: "3.",
    title: "Enjoy our Products",
    text: "Now you know how to work with our products. Сongratulations!",
    text_done: "",
    btn: {
      title: "My Dashboard",
      type: "link",
      url: ""

    },
  },
];

export default function Steps() {
  return (
    <section className={styles.steps}>
      <div className={styles.steps_header}>
        <div className={styles.steps_title}>Let’s Get Started!</div>

        <Link href="/" className={styles.steps_link}>
          How it works?
        </Link>
      </div>
      <div className={styles.steps_container}>

        {steps.map((i, k) => <figure className={`${styles.steps_item} ${i.active ? styles.active : ''}`} key={k}>
            <div className={styles.steps_item_header}>
                {i.num} {i.title}
            </div>
            <div className={styles.steps_item_text}>
                {i.text}
            </div>
            <div className={styles.steps_item_cta}>
                <Btn label={i.btn.title} type="link" link={i.btn.url} theme={i.active ? 'grad' : 'secondary'} disabled={i.active ? false : true}/>
            </div>
        </figure>)}

      </div>
    </section>
  );
}
