import { useState, useRef, useContext } from "react";
import { ref, database, set } from '../../../pages/_firebase';
import { AuthContext } from "../../../pages/_auth";
import nextId from "react-id-generator";

import ModalConfirmation from "../../Modal/ModalConfirmation";
import Input from "../Input";
import Btn from "../Btn";
import Checkbox from "../Checkbox";

import styles from "./styles.module.sass";

const modalDepositAdded = {
  title: "Activation Successful",
  btnText: "Accept",
  btnUrl: "#",
};

export default function FormAddRT({ show }) {
  const htmlId = nextId("rt-");
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const form = useRef(null);
  const [validation, setValidation] = useState(false);
  const [validationCheckbox, setValidationCheckbox] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false)
  const [resetCheckbox, setResetCheckbox] = useState(false);

  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const onAddRT = (e) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (form.current) {
      const rt_sum = form.current.rt_sum.value;
      const rt_period = form.current.rt_period.value;
      const rt_network = form.current.rt_network.value;

      if (validation && validationCheckbox) {
        setResetCheckbox(prev => !prev);
        sendToFB(rt_sum, rt_period, rt_network);
        setOpenModalSuccess(true);
        form.current.reset();  
        setReset(prev => !prev);  
      }
    }
  };

  const onResetFrom = () => {
    form.current.reset();  
    show(false);  
    setReset(prev => !prev);
    setResetCheckbox(prev => !prev);
  };

  const sendToFB = (rt_sum, rt_period, rt_network) => {
    set(ref(database, 'rt/' + userID + '/' + htmlId), {
      rt_sum: rt_sum,
      rt_period: rt_period,
      rt_network: rt_network,
    })
  };

  return (
    <>
      <ModalConfirmation
        openModal={openModalSuccess}
        setModalOpen={setOpenModalSuccess}
        show={show}
        props={modalDepositAdded}
        theme="success"
      />

      <form
        action="/"
        methord="POST"
        noValidate
        name="FormAddRT"
        id="FormAddRT"
        className={styles.form}
        ref={form}
        autoComplete="off"
      >
        <div className={styles.form_row}>
          <Input
            type="text"
            label="Your SUM"
            placeholder="Enter sum (USDT)"
            id="rt_sum"
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
            label="Your Period"
            placeholder="Choose Period"
            id="rt_period"
            error="Required field"
            note=""
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
            label="Your Network"
            placeholder="Select Network"
            id="rt_network"
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
          <Checkbox
            label="I have read and accept the Terms of Use, confirm the amount due and understand that the payment cannot be canceled under the Refund Policy"
            id="rt_policy"
            error="Required field"
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidationCheckbox}
            reset={resetCheckbox}
          />
        </div>

        <div className={styles.form_cta}>
          <Btn label="Create" onClick={onAddRT} />
          <Btn label="Reset form" onClick={onResetFrom} theme="secondary" />
        </div>
      </form>
    </>
  );
}
