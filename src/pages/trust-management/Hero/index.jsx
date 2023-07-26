import { useState, useEffect } from "react";

import FormAddTrustManagement from "../../../components/Form/FormAddTrustManagement";
import Btn from "../../../components/Form/Btn";

import RocketIcon from "../../../assets/icons/rocket.svg";
import PlusIcon from "../../../assets/icons/plus-md.svg";


import styles from "./hero.module.sass";

export default function Hero({setShow}) {
  const [active, setActive] = useState(false);

  const handleBtnAddTM = () => {
    setActive(true);
  }

  useEffect(() => {
    active === true ? setShow(false) : setShow(true);
  }, [active]);


  return (
    <div className={styles.hero}>
      <div className={styles.hero_header}>
        <div className={styles.hero_title}>
        Add New Trust Management
        </div>
        <span>
        4 steps to complete
        </span>
      </div>

      <div className={styles.hero_container}>

        {!active && <div className={styles.hero_container_inner}>
          <div className={styles.hero_container_content}>
            <RocketIcon className={styles.hero_container_icon}  width="28" height="28" />
            <div className={styles.hero_container_text}>
              <div className={styles.hero_container_title}>
              Create a new Trust Management and start earning
              </div>
              <span>
              Press “Add Trust” to create new Trust Management and start working with them
              </span>
            </div>
          </div>
          <Btn label="Add Trust" onClick={handleBtnAddTM} icon={<PlusIcon />} theme="grad"/>
        </div> }


        { active && <div className={styles.hero_container_form}>
          <div className={styles.main}>
            <FormAddTrustManagement setActive={setActive}/>
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
