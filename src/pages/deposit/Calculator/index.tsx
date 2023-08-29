import { useState, useEffect } from "react";


import Btn from "../../../framework/presentation/components/modules/Form/Btn";
import SliderField from "../../../framework/presentation/components/modules/Form/Slider";
import InfoIcon from "../../../framework/presentation/components/assets/icons/info.svg";

import styles from "./styles.module.sass";

const currency = "USDT";
const deposits = [
  {
    active: true,
    title: "Classic",
    val: "10",
  },
  {
    active: false,
    title: "Premium",
    val: "20",
  },
  {
    active: false,
    title: "VIP",
    val: "12",
  },
];

export default function Calculator({}) {
  const [show, setShow] = useState(true);
  const [active, setActive] = useState(0);
  const [period, setPeriod] = useState(1);

  const [invest, setInvest] = useState(1000);
  const [apy, setApy] = useState(Number(deposits[0].val));
  const [receive, setReceive] = useState(0);

  const MAX_WIDTH = "(max-width: 640px)";
  const smallWindow = window.matchMedia(MAX_WIDTH);
  const [title, setTitle] = useState(true);

  useEffect(() => {
    let matchMedia = () => {
      smallWindow.matches ? setTitle(false) : setTitle(true);
    };
    matchMedia();

    matchMedia();
    const resizeHandler = () => {
      matchMedia();
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);


  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const onChoosePlan = (val: any, ind: number) => {
    setApy(val);
    setActive(ind);
  };

  const handleInputVal = (e: any) => {
    const input_val = e.target.value;
    const new_input_val = input_val.replace(/[^0-9]/g, "");
    setInvest(new_input_val);
  };

  const handleInputFocus = () => {
    setInvest(0);
  };

  useEffect(() => {
    const newReceive: number = (apy * period / (100 * 12) + 1) * invest;
    isNaN(newReceive) ? 0 : setReceive(Number(newReceive.toFixed(2)));
  }, [apy, invest, period]);

  return (
    <div className={styles.calculator}>
      <div className={styles.calculator_header}>
        <div className={styles.calculator_title}>Deposit Calculator</div>
        <div className={styles.calculator_toggle} onClick={handleShow}>
          {show ? "Hide" : "Show"}
        </div>
      </div>
      {show && (
        <div className={styles.calculator_body}>
          <div className={styles.calculator_card}>
            <div className={styles.calculator_card_header}>
              <div className={styles.calculator_card_title}>
                You will invest
              </div>
              <span className={styles.calculator_note}>
                <InfoIcon /> Minimum $ 1000
              </span>
            </div>
            <div className={styles.calculator_card_body}>
              <div className={styles.calculator_input}>
                <input
                  className={styles.calculator_input_val}
                  onChange={handleInputVal}
                  onFocus={handleInputFocus}
                  value={invest}
                />
                <div className={styles.calculator_input_cur}>{currency}</div>
              </div>
            </div>
          </div>

          <div className={styles.calculator_nav}>
            {deposits.map((i: any, k: number) => (
              <Btn
                label={`${title ? i.title : ""} ${i.val}%`}
                key={k}
                theme={active === k ? "grad" : "secondary"}
                onClick={() => onChoosePlan(i.val, k)}
              />
            ))}
          </div>

          <div className={styles.calculator_card}>
            <div className={styles.calculator_card_header}>
              <div className={styles.calculator_card_title}>Period </div>
              <span className={styles.calculator_note}>
                <InfoIcon /> Months from 1 to 24
              </span>
            </div>
            <div className={styles.calculator_card_body}>
              <SliderField getSliderVal={(val: any) => setPeriod(val)}/>
              
              <div className={styles.calculator_card_body_content}>
                <div className={styles.calculator_card_body_title}>
                  Early termination
                </div>
                <div className={styles.calculator_card_body_text}>
                  Interest rates will be lower. There is no provision for a deposit for 1 month.
                </div>
              </div>
            </div>
          </div>

          <div className={styles.calculator_card}>
            <div className={styles.calculator_card_header}>
              <div className={styles.calculator_card_title}>
                You will receive
              </div>
            </div>
            <div className={styles.calculator_card_body}>
              <div className={`${styles.calculator_input} ${styles.active}`}>
                <input
                  className={styles.calculator_input_val}
                  value={receive}
                  disabled
                />
                <div className={styles.calculator_input_cur}>{currency}</div>
              </div>

              <div className={styles.calculator_card_body_content}>
                <div className={styles.calculator_card_body_title}>
                  Calculate with taxes included
                </div>
                <div className={styles.calculator_card_body_text}>
                  Payment for accompanying bank services is not provided
                </div>
              </div>

              <div className={styles.calculator_info}>
                <div className={styles.calculator_info_card}>
                  <div className={styles.calculator_info_label}>Invested</div>
                  <div className={styles.calculator_info_val}>
                    <b>{invest || 0}</b> <span>{currency}</span>
                  </div>
                </div>
                <div className={styles.calculator_info_card}>
                  <div className={styles.calculator_info_label}>APY</div>
                  <div className={styles.calculator_info_val}>{apy}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
