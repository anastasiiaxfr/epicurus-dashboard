import { useState, useRef } from "react";

import ClickAwayListener from "@mui/base/ClickAwayListener";

import Btn from "../../Form/Btn";
import Input from "../../Form/Input";

import styles from "./modal.module.sass";

export default function ModalDeposit({
  openModal,
  setModalOpen,
  toggleModal,
  props,
  data,
}: any) {
  const { title, text, btnText, btnText2 } = props;
  const reg_sum = /^[0-9]+(\.[0-9]+)?$/;

  const form = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [validation, setValidation] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (form.current) {
      const deposit_sum = (form.current as any).add_deposit_sum.value;
      const deposit_key = (form.current as any).add_deposit_key.value;

      if (!disabled && validation) {
        if (deposit_sum < 50) {
          toggleModal(true, 0);
        } else {
            toggleModal(false, deposit_sum);
            setModalOpen(false);
            (form.current as any).reset();
            setReset((prev) => !prev);
        }
      }
    }
  };

  return (
    openModal && (
      <section className={styles.modal}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={styles.modal_content}>
            <div className={styles.modal_inner}>
              <div className={styles.modal_hgroup}>
                <div className={styles.modal_heading}>{title}</div>
                <div
                  className={styles.modal_note}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              </div>

              <div className={styles.modal_form}>
                <form
                  action="/"
                  method="POST"
                  noValidate
                  name="FormAddDeposit"
                  id="FormAddDeposit"
                  className={styles.form}
                  ref={form}
                  autoComplete="off"
                >
                  <Input
                    type="text"
                    label="API Key connected to this Trust:"
                    id="add_deposit_key"
                    theme="text"
                    disabled={true}
                    placeholder={data}
                    value={data}
                  />
                  <Input
                    type="text"
                    label="Your SUM"
                    placeholder="Enter sum (USDT)"
                    id="add_deposit_sum"
                    error="Required field"
                    required={true}
                    reset={reset}
                    setReset={setReset}
                    submit={submit}
                    setSubmit={setSubmit}
                    validate={setValidation}
                    setDisabled={setDisabled}
                    pattern={reg_sum}
                    theme="default"
                  />

                  <div className={styles.modal_cta}>
                    <Btn label={btnText} theme="grad" onClick={handleSubmit} />
                    <Btn
                      label={btnText2}
                      theme="secondary"
                      onClick={handleClose}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </section>
    )
  );
}
