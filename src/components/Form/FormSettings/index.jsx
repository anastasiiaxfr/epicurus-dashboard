import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../../../pages/_auth";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import {
  ref,
  database,
  storage,
  set,
  uploadBytes,
  refStorage,
  getDownloadURL,
} from "../../../pages/_firebase";

// import Link from 'next/link'
import Input from "../Input";
import Select from "../Select";

import Btn from "../Btn";
import Ava from "../../Ava";

import EmailIcon from "../../../assets/icons/email.svg";
import CopyIcon from "../../../assets/icons/copy.svg";

import styles from "./styles.module.sass";

export default function Settings() {
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const form = useRef(null);
  const [validation, setValidation] = useState(false);
  const [validationSelect, setValidationSelect] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false);
  const [resetSelect, setResetSelect] = useState(false);

  const [imgPhoto, setImgPhoto] = useState(null);
  const [imgPhotoURL, setImgPhotoURL] = useState([]);

  const refferal = "bY2t8YgKQygNnWpQVGeVOiwdv";
  const gender = ["Choose gender", "Male", "Female", "Alien"];
  const [copy, setCopy] = useState(false);

  const copyTextToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      //console.log('Text copied successfully')
    } catch (error) {
      //console.error('Failed to copy text:', error)
    }
  };

  const handleCopyClick = (val) => {
    copyTextToClipboard(val);
    setCopy(true);
  };

  const getImgUrl = () => {
    const storageRef = refStorage(
      storage,
      `images/${userID}/photo-${imgPhoto?.name}`
    );

    if (imgPhoto !== undefined && imgPhoto !== null) {
      uploadBytes(storageRef, imgPhoto).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setImgPhotoURL((prev) => [...prev, url]);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
      });
    }
  };

  useEffect(() => {
    if (form.current && imgPhoto !== undefined && imgPhoto !== null) {
      getImgUrl();
    }
  }, [form.current, imgPhoto]);

  const handleReset = () => {
    form.current.reset();
    setReset((prev) => !prev);
    setValidation(false);
    setResetSelect((prev) => !prev);
    setCopy(false);
  };

  const handleSubmit = () => {
    setSubmit((prev) => !prev);

    if (form.current) {
      const settings_user_name = form.current.settings_username.value;
      const settings_user_referral = form.current.settings_referral.value;
      const settings_user_country = form.current.settings_country.value;
      const settings_user_email = form.current.settings_email.value;
      const settings_user_birth = form.current.settings_user_birth.value;
      const settings_user_gender = form.current.settings_user_sex.value;

      if (validation && validationSelect && imgPhotoURL.length > 0) {
        // alert(imgPhotoURL);
        saveMessages(
          userID,
          settings_user_name,
          imgPhotoURL,
          settings_user_referral,
          settings_user_country,
          settings_user_email,
          settings_user_birth,
          settings_user_gender
        );

        //alert(imgPhotoURL);

        form.current.reset();
        setReset((prev) => !prev);
        setResetSelect((prev) => !prev);
      }
    }
  };

  const saveMessages = (
    userID,
    settings_user_name,
    imgPhotoURL,
    settings_user_referral,
    settings_user_country,
    settings_user_email,
    settings_user_birth,
    settings_user_gender
  ) => {
    set(ref(database, "settings/" + userID), {
      settings_user_name: settings_user_name,
      settings_user_ava: imgPhotoURL,
      settings_user_referral: settings_user_referral,
      settings_user_country: settings_user_country,
      settings_user_email: settings_user_email,
      settings_user_birth: settings_user_birth,
      settings_user_gender: settings_user_gender,
    });
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
              theme="default"
            />
          </div>

          <div className={styles.form_row}>
            <label htmlFor="settings_user_ava" className={styles.form_label}>
              <span>Avatar</span>
              <b>This photo will be displayed on your profile</b>
            </label>

            <div className={styles.form_row_inline}>
              {currentUser && (
                <Ava
                  img={currentUser?.photoURL}
                  name={currentUser?.displayName}
                />
              )}

              <Input
                type="file"
                label={imgPhoto ? "Uploaded" : "Upload"}
                id="settings_user_ava"
                error="Only Jpg, Png less then 1MB"
                required={true}
                reset={reset}
                setReset={setReset}
                submit={submit}
                setSubmit={setSubmit}
                validate={setValidation}
                onImgSet={(e) => setImgPhoto(e)}
                theme="file"
              />

              <Btn label="Delete" type="text" theme="text" />
            </div>
          </div>

          <div className={styles.form_row}>
            <label htmlFor="settings_referral" className={styles.form_label}>
              <span>Your Referal</span>
              <b>Share the link and get personal bonus</b>
            </label>

            <ClickAwayListener onClickAway={() => setCopy(false)}>
              <div onClick={() => handleCopyClick(refferal)}>
                <Input
                  type="text"
                  placeholder="Enter Current Password"
                  id="settings_referral"
                  required={true}
                  reset={reset}
                  setReset={setReset}
                  submit={submit}
                  setSubmit={setSubmit}
                  validate={setValidation}
                  disabled={true}
                  value={refferal}
                  icon={<CopyIcon />}
                  theme={copy ? "copied" : "default"}
                />
              </div>
            </ClickAwayListener>
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
              theme="default"
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
              theme="default"
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
              theme="default"
            />
          </div>

          <div className={styles.form_row}>
            <label htmlFor="settings_user_sex" className={styles.form_label}>
              <span>Your Gender</span>
              <b>Choose your Gender</b>
            </label>
            <Select
              placeholder="Choose Your Gender"
              submit={submit}
              setSubmit={setSubmit}
              reset={resetSelect}
              validate={setValidationSelect}
              data={gender}
              id="settings_user_sex"
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
