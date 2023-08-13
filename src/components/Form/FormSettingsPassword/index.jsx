import { useState, useRef, useEffect } from "react";

// import Link from 'next/link'
import Input from "../Input";
import Btn from "../Btn";

import { auth } from "../../../pages/_firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import styles from "./styles.module.sass";

export default function KYC() {
  const [user] = useAuthState(auth);
  const userID = user?.uid;
  const userEmail = user?.email;

  const form = useRef(null);
  const [validation, setValidation] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleReset = () => {
    form.current.reset();
    setReset((prev) => !prev);
    setValidation(false);
  };

  const handleSubmit = () => {
    setSubmit((prev) => !prev);

    if (form.current) {
      const password_current = form.current.settings_passwrod_current.value;
      const password_new = form.current.settings_passwrod_new.value;
      const password_new_repeat = form.current.settings_passwrod_repeat.value;

      if (password_new !== password_new_repeat) {
        setShowError(true);
      }
      if (validation && password_new === password_new_repeat) {
        alert("send");
        saveMessages(userID, password_current, password_new);

        form.current.reset();
        setReset(true);
      }
    }
  };

  const saveMessages = (userID, password_current, password_new) => {
    // set(ref(database, "kycForm/" + userID), {
    //   kyc_first_name: kyc_first_name,
    // });
  };

  return (
    <div className={styles.form__wrapper}>
      <div className={styles.form__fields}>
        <form
          action="/"
          method="POST"
          className={`${styles.form}`}
          noValidate
          name="SettingsPassword"
          id="SettingsPassword"
          ref={form}
          autoComplete="off"
        >
          <div className={styles.form_row}>
            <label htmlFor="settings_password" className={styles.form_label}>
              <span>Password Settings</span>
              <b>Here you can change your current password</b>
            </label>

            <div className={styles.form_cta}>
              <Btn label="Cancel" theme="secondary" onClick={handleReset} />
              <Btn label="Save Settings" onClick={handleSubmit} />
            </div>
          </div>

          <div className={styles.form_row}>
            <label htmlFor="settings_password" className={styles.form_label}>
              <span>Current Password</span>
              <b>Enter your current password</b>
            </label>
            <Input
              type="password"
              placeholder="Enter Current Password"
              id="settings_passwrod_current"
              error="Only latin characters"
              required={true}
              reset={reset}
              setReset={setReset}
              submit={submit}
              setSubmit={setSubmit}
              validate={setValidation}
            />
          </div>

          <div className={styles.form_row}>
            <label htmlFor="settings_password" className={styles.form_label}>
              <span>New Password</span>
              <b>Enter your new password</b>
            </label>
            <Input
              type="password"
              placeholder="Enter New Password"
              id="settings_passwrod_new"
              error="Only latin characters"
              required={true}
              reset={reset}
              setReset={setReset}
              submit={submit}
              setSubmit={setSubmit}
              validate={setValidation}
            />
          </div>

          <div className={styles.form_row}>
            <label htmlFor="settings_password" className={styles.form_label}>
              <span>Repeat New Password</span>
              <b>Enter your new password again</b>
            </label>
            <Input
              type="password"
              placeholder="Repeat New Password"
              id="settings_passwrod_repeat"
              error="Only latin characters"
              required={true}
              reset={reset}
              setReset={setReset}
              submit={submit}
              setSubmit={setSubmit}
              validate={setValidation}
            />
          </div>
          <div className={`${styles.form_cta} ${styles.form_cta_btm}`}>
            <Btn label="Save Settings" onClick={handleSubmit} />
            <Btn label="Cancel" theme="secondary" onClick={handleReset} />
          </div>
        </form>
      </div>
    </div>
  );
}
