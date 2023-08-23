import { useState, useRef } from "react";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  initFirebase,
  auth,
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
}: any) {
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
    } catch (error: any) {
      // Handle sign-in error
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      setOpenModalError(true);
    }
  };

  const [validation, setValidation] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false);

  const signIn = (e: any) => {
    e.preventDefault();
    setSubmit((prev) => !prev);

    if (form.current) {
      const login_email = (form.current as any).login_email.value;
      const login_password = (form.current as any).login_password.value;

      if (validation) {
        setReset(prev => !prev);
        signInWithEmailAndPassword(auth, login_email, login_password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            //alert(user.accessToken);
            //setOpenLogin(false);
            

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

          (form.current as any).reset();
      }
    }
  };

  return (
    <>
      <div className={styles.form_wrap}>
        <ModalAuthError
          openModal={openModalError}
          setModalOpen={setOpenModalError}
          props={modalInfo}
        />

        <div className={styles.form_wrap}>
          <h1>Sign In</h1>

          <form
            action="/"
            method="POST"
            noValidate
            name="FormLogin"
            id="FormLogin"
            className={styles.form}
            ref={form}
            autoComplete="off"
          >
            <div className={styles.form_row}>
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
                maxLength={32}
              />
            </div>
            <div className={styles.form_row}>
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
                maxLength={128}
              />
            </div>
            <Btn
              label="Send"
              onClick={signIn}
              className={styles.form_btn}
            />
          </form>

          <div
            onClick={() => toggleModalReset()}
            className={styles.form_reset}
          >
            Reset <b>password</b>
          </div>

          <div className={styles.form_cta}>
            <div onClick={signInGoogle} className={styles.btn_cta}>
              <b>Login with</b> Google
            </div>
            <span>OR</span>
            <div onClick={() => toggleModal()} className={styles.btn_cta}>
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
