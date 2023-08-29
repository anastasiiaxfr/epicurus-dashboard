import { useState, useEffect } from "react";

import FormAddApiKey from "../../../framework/presentation/components/modules/Form/FormAddApiKey";
import Btn from "../../../framework/presentation/components/modules/Form/Btn";

import RocketIcon from "../../../framework/presentation/components/assets/icons/rocket.svg";
import PlusIcon from "../../../framework/presentation/components/assets/icons/plus-md.svg";


import styles from "./hero.module.sass";

export default function Hero({setShow}: any) {
  const [active, setActive] = useState(false);

  const handleBtnAddKey = () => {
    setActive(true);
  }

  useEffect(() => {
    active === true ? setShow(false) : setShow(true);
  }, [active]);


  return (
    <div className={styles.hero}>
      <div className={styles.hero_header}>
        <div className={styles.hero_title}>Connect Your API Keys</div>
        <span>4 steps to complete left</span>
      </div>

      <div className={styles.hero_container}>

        {!active && <div className={styles.hero_container_inner}>
          <div className={styles.hero_container_content}>
            <RocketIcon className={styles.hero_container_icon}  width="28" height="28" />
            <div className={styles.hero_container_text}>
              <div className={styles.hero_container_title}>
                Add your API Keys and start earning
              </div>
              <span>
                Press “Add API Key” to add new API Keys and start working with
                them
              </span>
            </div>
          </div>
          <Btn label="Add API Key" onClick={handleBtnAddKey} icon={<PlusIcon />} theme="grad"/>
        </div> }


        { active && <div className={styles.hero_container_form}>
          <div className={styles.main}>
            <FormAddApiKey setActive={setActive}/>
          </div>
          <aside className={styles.sidebar}>
            <div className={styles.sidebar_card}>
              <div className={styles.sidebar_card_overlay}>
                <div></div>
              </div>
            </div>
          </aside>
          </div> }

      </div>
    </div>
  );
}
