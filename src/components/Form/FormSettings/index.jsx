import { useState, useRef, useEffect } from "react";

// import Link from 'next/link'
import Input from "../Input";
import Select from "../Select";

import Btn from "../Btn";

import { auth } from "../../../pages/_firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import EmailIcon from "../../../assets/icons/email.svg"
import CopyIcon from "../../../assets/icons/copy.svg"

import styles from "./styles.module.sass";

export default function KYC() {
  const [user] = useAuthState(auth);
  const userID = user?.uid;
  const userEmail = user?.email;

  const form = useRef(null);
  const [validation, setValidation] = useState(false);
  const [validationSelect, setValidationSelect] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false);
  const [showError, setShowError] = useState(false);

  const refferal = "bY2t8YgKQygNnWpQVGeVOiwdv";
  const gender = ['Male', 'Female', 'Alien'];

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
              <span>Profile Settings</span>
              <b>View and update your profile settings</b>
            </label>

            <div className={styles.form_cta}>
              <Btn label="Cancel" theme="secondary" onClick={handleReset} />
              <Btn label="Save Settings" onClick={handleSubmit} />
            </div>
          </div>

          <div className={styles.form_row}>
            <label htmlFor="settings_username" className={styles.form_label}>
              <span>Your Name</span>
              <b>Enter your First and Second name</b>
            </label>
            <Input
              type="text"
              placeholder="Enter Name"
              id="settings_username"
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
            <label htmlFor="settings_user_ava" className={styles.form_label}>
              <span>Avatar</span>
              <b>This photo will be displayed on your profile</b>
            </label>
          </div>

          <div className={styles.form_row}>
            <label htmlFor="settings_referral" className={styles.form_label}>
              <span>Your Referal</span>
              <b>Share the link and get personal bonus</b>
            </label>
            <Input
              type="text"
              placeholder="Enter Current Password"
              id="settings_referral"
              error="Only latin characters"
              required={true}
              reset={reset}
              setReset={setReset}
              submit={submit}
              setSubmit={setSubmit}
              validate={setValidation}
              disabled={true}
              value={refferal}
              icon={<CopyIcon />}
            />
          </div>

          <div className={styles.form_row}>
            <label htmlFor="settings_country" className={styles.form_label}>
              <span>Your Country</span>
              <b>Where are you at right now?</b>
            </label>
            <Input
              type="text"
              placeholder="Choose Your Country"
              id="settings_country"
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
            <label htmlFor="settings_email" className={styles.form_label}>
              <span>Your Email</span>
              <b>Please, enter your active email for log in</b>
            </label>
            <Input
              type="email"
              placeholder="Enter Your Email"
              id="settings_email"
              error="Only latin characters"
              required={true}
              reset={reset}
              setReset={setReset}
              submit={submit}
              setSubmit={setSubmit}
              validate={setValidation}
              icon={<EmailIcon />}
            />
          </div>

          <div className={styles.form_row}>
            <label htmlFor="settings_user_birth" className={styles.form_label}>
              <span>Date of Birth</span>
              <b>Here you can enter your birth date</b>
            </label>
            <Input
              type="text"
              placeholder="00/00/00"
              id="settings_user_birth"
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
            <label htmlFor="settings_user_sex" className={styles.form_label}>
              <span>Your Gender</span>
              <b>Choose your Gender</b>
            </label>
            <Select
              placeholder="Choose Your Gender"
              error="Required field"
              submit={submit}
              setSubmit={setSubmit}
              reset={reset}
              data={gender}
              id="settings_user_sex"
              validate={setValidationSelect}
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
