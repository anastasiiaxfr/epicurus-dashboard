import { useState, useRef, useContext } from "react";
import { ref, database, set } from '../../../pages/_firebase';
import { AuthContext } from "../../../pages/_auth";
import nextId from "react-id-generator";

import ModalConfirmation from "../../Modal/ModalConfirmation";
import Input from "../Input";
import Btn from "../Btn";
import Checkbox from "../Checkbox";

import styles from "./styles.module.sass";

const modalKeyAdded = {
  title: "Activation Successful",
  btnText: "Accept",
  btnUrl: "#",
};

const modalKeySuccessDeleted = {
    title: "Activation Successful",
    btnText: "Accept",
    btnUrl: "#",
};

const modalKeyConfirmDelete = {
    title: "Delete API Key?",
    text: "Удаление API ключа приведет к неработоспособности всех продуктов, к которому он подключен. Пожалуйста, убедитесь, что вы действительно хотите удалить ключ",
    btnText: "Accept",
    btnUrl: "#",
};


export default function FormAddTrustManagement({ show }) {
  const htmlId = nextId("tm-key-");
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const form = useRef(null);
  const [validation, setValidation] = useState(false);
  const [validationCheckbox, setValidationCheckbox] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false)
  const [resetCheckbox, setResetCheckbox] = useState(false);

  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const onAddTM = (e) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (form.current) {
      const api_name = form.current.api_name.value;
      const api_key = form.current.api_key.value;
      const api_secret = form.current.api_secret.value;

      if (validation && validationCheckbox) {
        setResetCheckbox(prev => !prev);
        sendToFB(api_name, api_key, api_secret);
        setOpenModalSuccess(true);
        show(false);
        form.current.reset();  
        setReset(prev => !prev);  
      }
    }
  };

  const onResetFrom = () => {
    form.current.reset();    
    setReset(prev => !prev);
    setResetCheckbox(prev => !prev);
    show(false);
  };

  const sendToFB = (api_name, api_key, api_secret) => {
    set(ref(database, 'trustManagement/' + userID + '/' + htmlId), {
      api_name: api_name,
      api_key: api_key,
      api_secret: api_secret,
    })
  };

  return (
    <>
      <ModalConfirmation
        openModal={openModalSuccess}
        setModalOpen={setOpenModalSuccess}
        props={modalKeyAdded}
        theme="success"
      />

      <form
        action="/"
        methord="POST"
        noValidate
        name="FormAddTrustManagement"
        id="FormAddTrustManagement"
        className={styles.form}
        ref={form}
        autoComplete="off"
      >
        <div className={styles.form_row}>
          <Input
            type="text"
            label="API Name"
            placeholder="Enter Name"
            id="api_name"
            error="Required field"
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
          <Input
            type="text"
            label="API Key"
            placeholder="Enter API Key"
            id="api_key"
            error="API Key is not valid"
            note="API Key changes every 3 months"
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
          <Input
            type="text"
            label="Secret Key"
            placeholder="Enter Secret Key"
            id="api_secret"
            error="API Key is not valid"
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
          <Checkbox
            label="I have read the Usage Policy"
            id="api_policy"
            error="Required field"
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidationCheckbox}
            reset={resetCheckbox}
          />
        </div>

        <div className={styles.form_cta}>
          <Btn label="Create Key" onClick={onAddTM} />
          <Btn label="Reset form" onClick={onResetFrom} theme="secondary" />
        </div>
      </form>
    </>
  );
}
