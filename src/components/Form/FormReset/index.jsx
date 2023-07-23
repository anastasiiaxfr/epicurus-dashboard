import { useState, useRef } from "react";

import { auth, sendPasswordResetEmail } from "../../../pages/_firebase";

import Input from "../../Form/Input";
import Btn from "../../Form/Btn";
import ModalAuthReset from "../../Modal/ModalConfirmation";
import ModalAuthError from "../../Modal/ModalAuthError";

import styles from "./styles.module.sass";

const modalInfoSuccess = {
  title: "The Reset link send",
  text:
    "Reset your password using the link sent to your email or register a new account.",
  btnText: "Okay",
  btnUrl: "#",
};

const modalInfo = {
  title: "Something Wrong",
  text: "Email is invalid or not registered. Please try again OR sign up",
  btnText: "Okay",
  btnUrl: "#",
};

export default function FormReset({
  toggleModalRegistration,
  toggleModalLogin,
}) {
  const reg_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const form = useRef(null);
  const [validation, setValidation] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const [reset, setReset] = useState(true);
  const [openModalError, setOpenModalError] = useState(false);
  const [openModalReset, setOpenModalReset] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //onInputField(e)

    setSubmit((prev) => !prev);
    setSubmitPressed(true);

    if (form.current) {
      const reset_email = form.current.reset_email.value;
      if (validation) {
        sendPasswordResetEmail(auth, reset_email)
          .then(() => {
            // Password reset email sent!
            setOpenModalReset(true);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            form.current.reset();
            setOpenModalError(true);
          });
      }
    }
  };

  return (
    <>
      <ModalAuthError
        openModal={openModalError}
        setModalOpen={setOpenModalError}
        props={modalInfo}
      />

      <ModalAuthReset
        openModal={openModalReset}
        props={modalInfoSuccess}
        setModalOpen={setOpenModalReset}
      />

      <div className={styles.form__wrap}>
        <h1>Reset</h1>

        <form
          action="/"
          methord="POST"
          noValidate
          name="FormReset"
          id="FormReset"
          className={styles.form}
          ref={form}
          autoComplete="off"
        >
          <div className={styles.form__row}>
            <Input
              type="email"
              label="Your email*"
              placeholder=""
              id="reset_email"
              error="Required field"
              required={true}
              reset={reset}
              setReset={setReset}
              submit={submit}
              setSubmit={setSubmit}
              validate={setValidation}
              pattern={reg_email}
            />
          </div>

          <Btn
            label="Send"
            onClick={handleSubmit}
            disabled={validation ? false : true}
          />
        </form>

        <div className={styles.form__cta}>
          <div
            onClick={() => toggleModalRegistration()}
            className={styles.btn__cta}
          >
            Sign Up
          </div>
          <span>OR</span>
          <div onClick={() => toggleModalLogin()} className={styles.btn__cta}>
            Sign In
          </div>
        </div>
      </div>
    </>
  );
}
