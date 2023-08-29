import { useState, useEffect } from "react";

import Btn from "../Btn";
import ModalError from "../../Modal/ModalAuthError";

import styles from "./styles.module.sass";

export default function FormPayment({ show, setSubscription, getDataFB }: any) {
  const [disabled, setDisabled] = useState(false);
  const [validation, setValidation] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false);

  const [choosen, setChoosen] = useState();
  const [selected, setSelected] = useState({
    title: '',
    sum: '',
    period: ''
  });

  const onResetFrom = () => {
    show(false);
    setReset((prev: any) => !prev);
  };

  const cards = [
    {
      active: false,
      title: "Three Month Subscription",
      period: '3 month',
      price_current: "300",
      price_before: "150",
      cur: "USDT",
      btns: [
        {
          title: "Choose Subscription",
          on_click: (k: any) => { setChoosen(k); setSelected({ title: 'Three Month Subscription', sum: '300', period: '3 month' }); },
        },
      ],
    },
    {
      popular: 'Most Popular',
      active: true,
      title: "One Month Subscription",
      period: '1 month',
      price_current: "100",
      price_before: "35",
      cur: "USDT",
      btns: [
        {
          title: "Try 7 days for Free",
          on_click: (k: any) => {setSelected({title: 'One Month Subscription', sum: '100', period: '7 days'}), setChoosen(k)},
          theme: "bd",
        },
        {
          title: "Choose Subscription",
          on_click: (k: any) => {setSelected({title: 'One Month Subscription', sum: '100', period: 'One month'}), setChoosen(k)},
        },
      ],
    },
    {
      active: false,
      title: "Three Month Subscription",
      period: '3 month',
      price_current: "300",
      price_before: "150",
      cur: "USDT",
      btns: [
        {
          title: "Choose Subscription",
          on_click: (k: any) => {setSelected({title: 'Three Month Subscription', sum: '300', period: '3 month'}), setChoosen(k)},
        },
      ],
    },
  ];

  const baseSelected = {
    title: cards[1].title,
    sum: cards[1].price_current,
    period: cards[1].period
  }


  const [openModalError, setOpenModalError] = useState(false);
  const modalError = {
    title: "Choose Subscription",
    btnText: "Accept",
  };


  const onSubmit = (e: any) => {
    e.preventDefault();
    setSubmit((prev: any) => !prev);
    
    if(selected){
      getDataFB &&
      getDataFB({ subscription: selected.title, subscription_sum: selected.sum, subscription_period: selected.period });

      show(true);
      setSubscription(true);
    } else {
      setOpenModalError(true);
    }
    
  };

  return (
    <>
      <ModalError
        openModal={openModalError}
        setModalOpen={setOpenModalError}
        props={modalError}
        theme="error"
      />
      
      <div className={styles.card_wrap}>
        {cards.map((i: any, k: number) => (
          <figure className={`${styles.card} ${i.popular ? styles.popular : ''} ${choosen === k ? styles.active : ''}`} key={k}>
            {i.popular && <span className={styles.card_label}>{i.popular}</span>}
            <div className={styles.card_title}>{i.title}</div>
            <div className={styles.card_price}>
              <div className={styles.card_price_new}>
                {i.price_current}
                <span>{i.cur}</span>
              </div>
                <u>{i.price_before} {i.cur}</u>
            </div>
            <div className={styles.card_btns}>
              {i.btns.map((j: any, ind: number) => (
                <Btn onClick={() => j.on_click(k)} label={j.title} theme={j.theme ? j.theme : 'grad'} key={ind} />
              ))}
            </div>
          </figure>
        ))}
      </div>

      <div className={styles.form_cta}>
        <Btn label="Continue" onClick={onSubmit} />
        <Btn label="Close form" onClick={onResetFrom} theme="secondary" />
      </div>
    </>
  );
}
