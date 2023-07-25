import { useState, useRef } from "react";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  initFirebase,
  auth,
  sendPasswordResetEmail,
} from "../../../pages/_firebase";

import ModalAuthError from "../../Modal/ModalAuthError";

import Input from "../../Form/Input";
import Btn from "../../Form/Btn";

import styles from "./styles.module.sass";

const modalInfo = {
  title: "Something Wrong",
  text:
    "Reset your password OR register a new account.",
  btnText: "Okay",
  btnUrl: "#",
};

export default function FormLogin({
  toggleModal,
  setOpenLogin,
  toggleModalReset,
}) {
  const reg_email = /^[^\s@#$%]+@[^\s@#$%]+\.[^\s@#$%]+$/;

  const form = useRef(null);

  const [openModalError, setOpenModalError] = useState(false);

  initFirebase();
  const provider = new GoogleAuthProvider();

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //console.log(result.user)
      setOpenLogin(false);
      // Handle successful sign-in
    } catch (error) {
      // Handle sign-in error
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      setOpenModalError(true);
    }
  };

  const [validation, setValidation] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(true);

  const signIn = (e) => {
    e.preventDefault();
    setSubmit((prev) => !prev);

    if (form.current) {
      const login_email = form.current.login_email.value;
      const login_password = form.current.login_password.value;

      if (validation) {
        signInWithEmailAndPassword(auth, login_email, login_password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            //alert(user.accessToken);

            setOpenLogin(false);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setOpenModalError(true);
            // login_email &&
            //   sendPasswordResetEmail(auth, login_email)
            //     .then(() => {
            //       // Password reset email sent!
            //     })
            //     .catch((error) => {
            //       const errorCode = error.code;
            //       const errorMessage = error.message;
            //     });
          });

        form.current.reset();
      }
    }
  };

  return (
    <>
      <div className="form__wrap-outside">
        <ModalAuthError
          openModal={openModalError}
          setModalOpen={setOpenModalError}
          props={modalInfo}
        />

        <div className={styles.form__wrap}>
          <h1>Sign In</h1>

          <form
            action="/"
            methord="POST"
            noValidate
            name="FormLogin"
            id="FormLogin"
            className={styles.form}
            ref={form}
            autoComplete="off"
          >
            <div className={styles.form__row}>
              <Input
                type="email"
                label="Email*"
                placeholder=""
                id="login_email"
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
            <div className={styles.form__row}>
              <Input
                type="password"
                label="Password*"
                placeholder=""
                id="login_password"
                error="Required field"
                required={true}
                reset={reset}
                setReset={setReset}
                submit={submit}
                setSubmit={setSubmit}
                validate={setValidation}
              />
            </div>
            <Btn
              label="Send"
              onClick={signIn}
              className={styles.form__btn}
            />
          </form>

          <div
            onClick={() => toggleModalReset()}
            className={styles.form__reset}
          >
            Reset <b>password</b>
          </div>

          <div className={styles.form__cta}>
            <div onClick={signInGoogle} className={styles.btn__cta}>
              {" "}
              <b>Login with</b> Google{" "}
            </div>
            <span>OR</span>
            <div onClick={() => toggleModal()} className={styles.btn__cta}>
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
