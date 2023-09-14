import { useState, useRef, useContext, useEffect } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  firestore,
  collection,
  doc,
  setDoc,
} from "../../../../../../pages/_firebase";
import { AuthContext } from "../../../../../../pages/_auth";

import { getSPKey } from "../../../../../../pages/_send-pulse";

import ModalAuthError from "../../Modal/ModalAuthError";
import ModalAuthSuccess from "../../Modal/ModalConfirmation";
import ModalError from "../../Modal/ModalAuthError";

import Input from "../Input";
import Btn from "../Btn";

import styles from "./styles.module.sass";

const modalInfo = {
  title: "Something Wrong",
  text:
    "It seems you have already been registered OR email is invalid. Please try to log in",
  btnText: "Okay",
  btnUrl: "#",
};

const modalInfoSuccess = {
  title: "The data send",
  text:
    "To confirm your registration, please follow the link that has been sent to the email address you provided.",
  btnText: "Okay",
  btnUrl: "#",
};

const modalError = {
  title: "Please Try Again",
  btnText: "Accept",
};

export default function FormRegistration({
  toggleModalLogin,
  setOpenRegister,
  setUserToken,
}: any) {
  const user = auth.currentUser;
  const reg_name = /^[0-9a-zA-Z\s-]+$/;
  const reg_email = /^[^\s@#$%]+@[^\s@#$%]+\.[^\s@#$%]+$/;
  const form = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [validation, setValidation] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const [reset, setReset] = useState(false);

  const [openModalError, setOpenModalError] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalErrorDB, setOpenModalErrorDB] = useState(false);

  const { currentToken }: any = useContext(AuthContext);
  useEffect(() => {
    //console.log(currentToken)
    const URL = 'https://6054-176-36-35-141.ngrok-free.app/v1';
    if (currentToken !== undefined) {
      fetch(
        `${URL}/auth/signup/firebase`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${currentToken}` },
        }
      ).then((response) => {
        if (!response.ok) {
          console.log(response.status);
          setOpenModalErrorDB(true);
        } else {
          response.json().then((res) => {
            //console.log('res', res)
            const jwtToken = res?.JWTITGToken;
            if (jwtToken !== undefined) {
              setUserToken(jwtToken);
              //console.log('res.JWTITGToken', jwtToken);
            } else {
              //console.log("JWTITGToken is undefined");
            }
          });
        }
      });
    }
  }, [currentToken]);

  const addUserToFirestore = async (data: any) => {
    try {
      const collectionRef = collection(firestore, "NewUser");
      const db = doc(collectionRef);

      // Set the data in Firestore
      await setDoc(db, data);

      console.log("Data written to Firestore successfully.");
    } catch (error) {
      console.error("Error writing data to Firestore:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //onInputField(e)

    setSubmit((prev) => !prev);
    setSubmitPressed(true);

    if (form.current) {
      const reg_email = (form.current as any).reg_email.value;
      const reg_password = (form.current as any).reg_password.value;
      const reg_name = (form.current as any).reg_name.value;

      if (!disabled && validation === true) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            reg_email,
            reg_password
          );
          const user = userCredential.user;

          await updateProfile(user, {
            displayName: reg_name,
          });

          const emailData = {
            emails: [
              {
                email: reg_email,

                variables: {
                  name: reg_name,
                  referrer: "Epicurus_Dashboard",
                },
              },
            ],
          };

          getSPKey("new-user", emailData);

          addUserToFirestore({
            new_user_email: reg_email,
            new_user_name: reg_name,
          });

          setOpenModalSuccess(true);
          setReset((prev) => !prev);
          // openModalSuccess !== true && setOpenRegister(false)
        } catch (error) {
          //alert('Error Register')
          console.error("Error registering user:", error);
          (form.current as any).reset();
          setOpenModalError(true);
        }
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

      <ModalAuthSuccess
        openModal={openModalSuccess}
        setModalOpen={setOpenModalSuccess}
        props={modalInfoSuccess}
        toggleModal={setOpenRegister}
      />

      <ModalError
        openModal={openModalErrorDB}
        setModalOpen={setOpenModalErrorDB}
        props={modalError}
        theme="error"
      />

      <div className={styles.form_wrap}>
        <h1>Sign Up</h1>

        <form
          action="/"
          method="POST"
          noValidate
          name="FormRegistration"
          id="FormRegistration"
          className={styles.form}
          ref={form}
          autoComplete="off"
        >
          <div className={styles.form_row}>
            <Input
              type="text"
              label="Name*"
              placeholder=""
              id="reg_name"
              error="Required. Only Latin letters."
              required={true}
              reset={reset}
              setReset={setReset}
              submit={submit}
              setSubmit={setSubmit}
              validate={setValidation}
              maxLength={16}
              pattern={reg_name}
              setDisabled={setDisabled}
            />
          </div>
          <div className={styles.form_row}>
            <Input
              type="email"
              label="Email*"
              placeholder=""
              id="reg_email"
              error="Required field"
              required={true}
              reset={reset}
              setReset={setReset}
              submit={submit}
              setSubmit={setSubmit}
              validate={setValidation}
              pattern={reg_email}
              maxLength={128}
            />
          </div>
          <div className={styles.form_row}>
            <Input
              type="password"
              label="Password*"
              placeholder=""
              id="reg_password"
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
          <Btn label="Send" onClick={handleSubmit} disabled={disabled} />
        </form>
        <div className={styles.form_reset}>OR</div>
        <div className={styles.form_cta}>
          {/* <div onClick={() => toggleModalReset()} className={styles.btn__cta}> Reset <b>password</b> </div> */}
          <div onClick={() => toggleModalLogin()} className={styles.btn_cta}>
            Sign In
          </div>
        </div>
      </div>
    </>
  );
}
