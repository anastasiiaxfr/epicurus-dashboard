import { useState, useRef } from "react";

import ClickAwayListener from "@mui/base/ClickAwayListener";

import Btn from "../../Form/Btn";
import Input from "../../Form/Input";

import styles from "./modal.module.sass";

export default function ModalDeposit({
  openModal,
  setModalOpen,
  toggleCheckbox,
  props,
}: any) {
  const { title, text, btnText, btnText2 } = props;

  const form = useRef(null);

  const handleClose = () => {
    setModalOpen(false);
    toggleCheckbox && toggleCheckbox(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    toggleCheckbox && toggleCheckbox(true);
    setModalOpen(false);
  };

  return (
    openModal && (
      <section className={styles.modal}>
        <div className={styles.modal_wrap}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={styles.modal_content}>
            <div className={styles.modal_inner}>
              <div className={styles.modal_hgroup}>
                <div className={styles.modal_heading}>{title}</div>
              </div>

              <div className={styles.modal_text_wrap}>
               <div className={styles.modal_text_wrap_inner}>
               <div
                  className={styles.modal_text_sm}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
               </div>
              </div>

              <div className={styles.modal_cta}>
                <Btn label={btnText} theme="grad" onClick={handleSubmit} />
                <Btn label={btnText2} theme="secondary" onClick={handleClose} />
              </div>
            </div>
          </div>
        </ClickAwayListener>
        </div>
      </section>
    )
  );
}
