import { useState, useRef, useContext } from "react";
import { ref, database, set } from "../../../pages/_firebase";
import { AuthContext } from "../../../pages/_auth";
import nextId from "react-id-generator";

import ModalConfirmation from "../../Modal/ModalConfirmation";
import Input from "../Input";
import Btn from "../Btn";
import Checkbox from "../Checkbox";
import SelectPeriod from "../SelectPeriod";
import SelectApi from "../SelectApi";

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

export default function FormAddTrustManagement({ show, setFieldPeriod, setFieldApi, setFieldName, setFieldSum }) {
  const htmlId = nextId("tm-key-");
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const form = useRef(null);
  const [validation, setValidation] = useState(false);
  const [validationCheckbox, setValidationCheckbox] = useState(false);
  const [validationSelect, setValidationSelect] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false);
  const [resetCheckbox, setResetCheckbox] = useState(false);
  const [resetSelect, setResetSelect] = useState(false);

  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const onAddTM = (e) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (form.current) {
      const tm_name = form.current.tm_name.value;
      const tm_period = form.current.tm_period.value;
      const tm_sum = form.current.tm_sum.value;
      const api_key_name = form.current.tm_api.value;
      const api_key_id = form.current.tm_api.getAttribute("name");

      if (validation && validationCheckbox) {
        setResetCheckbox((prev) => !prev);
        setResetSelect((prev) => !prev);
        sendToFB(tm_name, tm_period, tm_sum, api_key_name, api_key_id);
        setOpenModalSuccess(true);
        show(false);
        form.current.reset();
        setReset((prev) => !prev);
      }
    }
  };

  const onResetFrom = () => {
    form.current.reset();
    setReset((prev) => !prev);
    setResetCheckbox((prev) => !prev);
    setResetSelect((prev) => !prev);
    show(false);
  };

  const sendToFB = (tm_name, tm_period, tm_sum, api_key_name, api_key_id) => {
    set(ref(database, "trustManagement/" + userID + "/" + htmlId), {
      tm_name: tm_name,
      tm_period: tm_period,
      tm_sum: tm_sum,
      api_key_name: api_key_name,
      api_key_id: api_key_id
    });
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
            label="Name"
            placeholder="Enter Name"
            id="tm_name"
            error="Required field"
            required={true}
            reset={reset}
            setReset={setReset}
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidation}
            theme="default"
            success={setFieldName}
          />
        </div>

        <div className={styles.form_row}>
          <Input
            type="text"
            label="Your SUM"
            placeholder="Enter SUM, USDT"
            id="tm_sum"
            error="Required field"
            required={true}
            reset={reset}
            setReset={setReset}
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidation}
            theme="default"
            success={setFieldSum}
          />
        </div>

        <div className={styles.form_row}>
          <SelectApi
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidationSelect}
            reset={resetSelect}
            id="tm_api"
            success={() => setFieldApi(true)}
          />
        </div>

        <div className={styles.form_row}>
          <SelectPeriod
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidationSelect}
            reset={resetSelect}
            id="tm_period"
            success={() => setFieldPeriod(true)}
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
