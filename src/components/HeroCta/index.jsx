import { useState, useEffect } from "react";

import Btn from "../Form/Btn";

import RocketIcon from "../../assets/icons/rocket.svg";
import PlusIcon from "../../assets/icons/plus-md.svg";

import styles from "./hero.module.sass";

export default function Hero({ hero, show, children, steps, totalSteps }) {
  const { heading, title, text, info, btn } = hero;

  let stepsArr = [];
  for (let i = 0; i < totalSteps; i++) {
    stepsArr.push(i);
  }

  return (
    <div className={styles.hero}>
      <div className={styles.hero_header}>
        <div className={styles.hero_title}> {heading} </div>
        <span>{info}</span>
      </div>

      {show && totalSteps && (
        <div
          className={`${styles.hero_steps} ${
            styles[`step_${totalSteps}_${steps}`]
          }`}
        >
          {stepsArr.map((k) => (
            <div key={k}></div>
          ))}
        </div>
      )}

      <div className={styles.hero_container}>
        {!show && (
          <div className={styles.hero_container_inner}>
            <div className={styles.hero_container_content}>
              <RocketIcon
                className={styles.hero_container_icon}
                width="28"
                height="28"
              />
              <div className={styles.hero_container_text}>
                <div className={styles.hero_container_title}>{title}</div>
                <span>{text}</span>
              </div>
            </div>
            <Btn
              label={btn.label}
              icon={<PlusIcon />}
              theme="grad"
              onClick={btn.on_click}
            />
          </div>
        )}

        {show && (
          <div className={styles.hero_container_form}>
            <div className={styles.main}>{children}</div>
            <aside className={styles.sidebar}>
              <div className={styles.sidebar_card}>
                <div className={styles.sidebar_card_overlay}>
                  <div></div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
