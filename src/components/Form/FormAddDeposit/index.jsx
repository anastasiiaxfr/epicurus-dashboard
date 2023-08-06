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

const modalSuccessDeleted = {
    title: "Deposit removed",
    btnText: "Accept",
    btnUrl: "#",
};

const modalConfirmDelete = {
    title: "Delete Deposit?",
    btnText: "Accept",
    btnUrl: "#",
};


export default function FormAddDeposit({ show, deposit, wallet }) {
  const htmlId = nextId("deposit-");
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const form = useRef(null);
  const [validation, setValidation] = useState(false);
  const [validationCheckbox, setValidationCheckbox] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false)
  const [resetCheckbox, setResetCheckbox] = useState(false);

  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const onAddKey = (e) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (form.current) {
      const deposit_sum = form.current.deposit_sum.value;
      const deposit_type = deposit.type;
      const deposit_wallet = wallet;
      const deposit_period = form.current.deposit_period.value;
      const deposit_network = form.current.deposit_network.value;

      if (validation && validationCheckbox) {
        setResetCheckbox(prev => !prev);
        sendToFB(deposit_sum, deposit_type, deposit_wallet, deposit_period, deposit_network);
        setOpenModalSuccess(true);
        form.current.reset();  
        setReset(prev => !prev);  
      }
    }
  };

  const onResetFrom = () => {
    form.current.reset();  
    show(true);  
    setReset(prev => !prev);
    setResetCheckbox(prev => !prev);
  };

  const sendToFB = (deposit_sum, deposit_type, deposit_wallet, deposit_period, deposit_network) => {
    set(ref(database, 'deposit/' + userID + '/' + htmlId), {
      deposit_type: deposit_type,
      deposit_sum: deposit_sum,
      deposit_wallet: deposit_wallet,
      deposit_period: deposit_period,
      deposit_network: deposit_network,
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

      <div className={styles.form_note}>
        You have chosen <b>{deposit.type}</b>. Enter the amount and select the period
      </div>

      <form
        action="/"
        methord="POST"
        noValidate
        name="FormAddDeposit"
        id="FormAddDeposit"
        className={styles.form}
        ref={form}
        autoComplete="off"
      >
        <div className={styles.form_row}>
          <Input
            type="text"
            label="Your SUM"
            placeholder="Enter sum (USDT)"
            id="deposit_sum"
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
            id="deposit_period"
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
            id="deposit_network"
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
            id="deposit_policy"
            error="Required field"
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidationCheckbox}
            reset={resetCheckbox}
          />
        </div>

        <div className={styles.form_cta}>
          <Btn label="Create Deposit" onClick={onAddKey} />
          <Btn label="Reset form" onClick={onResetFrom} theme="secondary" />
        </div>
      </form>
    </>
  );
}
