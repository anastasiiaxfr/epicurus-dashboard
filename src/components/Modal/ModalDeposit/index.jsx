import { useState } from "react";

import ClickAwayListener from "@mui/base/ClickAwayListener";

import Btn from "../../Form/Btn";


import styles from "./modal.module.sass";

export default function ModalDeposit({ openModal, setModalOpen, deposits, toggleModal }) {
  const depositActive = {
    type: deposits[0].type,
    val: deposits[0].offer.val
  }
  const [depositSelected, setDepositSelected] = useState(depositActive);

  const handleDepositSelected = (type, val) => {
    const depositChoosen = {
      type: type,
      val: val,
    };
    setDepositSelected(depositChoosen);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    toggleModal(depositSelected);
    setModalOpen(false);
  };

  const props = {
    title: "Choose Deposit Plan",
    btns: [
      {
        label: "Decline",
        theme: "secondary",
        on_click: handleClose,
      },
      {
        label: "Accept",
        theme: "grad",
        on_click: handleSubmit,
      },
    ],
  };

  return (
    openModal && (
      <section className={styles.modal}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={styles.modal_content}>
            <div className={styles.modal_inner}>
              <div className={styles.modal_heading}>{props.title}</div>

              <div className={styles.modal_row}>
                {deposits.map((i, k) => (
                  <div key={k} className={`${styles.modal_col} ${
                    depositSelected.type === i.type ? styles.active : ""
                  }`} onClick={() => handleDepositSelected(i.type, i.offer.val)}>
                    <b className={styles.modal_label}>{i.type.replace("Deposit", "")}</b>
                    <div className={styles.modal_val}>{i.offer.val}</div>
                  </div>
                ))}
              </div>

              <div className={styles.modal_cta}>
                {props.btns.map((i, k) => (
                  <Btn
                    label={i.label}
                    theme={i.theme}
                    onClick={i.on_click}
                    key={k}
                  />
                ))}
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </section>
    )
  );
}
