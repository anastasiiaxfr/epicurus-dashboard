import { useState, useEffect, useRef, useContext } from "react";
import { ref, database, set } from "../../../../../../pages/_firebase";
import { AuthContext } from "../../../../../../pages/_auth";
import nextId from "react-id-generator";

import Input from "../Input";
import SelectPeriod from "../SelectPeriod";
import SelectNetwork from "../SelectNetwork";
import Btn from "../Btn";
import Checkbox from "../Checkbox";

import ModalPolicy from "../../Modal/ModalPolicy";

import styles from "./styles.module.sass";

const terms = {
  title: "Terms of Use",
  text: `Terms of Use
    <p>What the fuck is going on?! God-damn! Are these pills supposed to wake me up or something? Don't even trip about your pants, dawg. We got an extra pair right here.</p>
  
    <p>He's not pressing charges. That's gotta be the you shot me equivalent of not being mad. I'd like to order one large person with extra people please. white people, no no no black people... and hispanic on half. Ooohhh can do. Well then get your shit together. Get it all together and put it in a backpack, all your shit, so it's together. …and if you gotta take it somewhere, take it somewhere ya know? Take it to the shit store and sell it, or put it in a shit museum. I don't care what you do, you just gotta get it together… Get your shit together.</p>
    `,
};

const policy = {
  title: "Refund Policy",
  text: `Refund Policy
    <p>What the fuck is going on?! God-damn! Are these pills supposed to wake me up or something? Don't even trip about your pants, dawg. We got an extra pair right here.</p>
  
    <p>He's not pressing charges. That's gotta be the you shot me equivalent of not being mad. I'd like to order one large person with extra people please. white people, no no no black people... and hispanic on half. Ooohhh can do. Well then get your shit together. Get it all together and put it in a backpack, all your shit, so it's together. …and if you gotta take it somewhere, take it somewhere ya know? Take it to the shit store and sell it, or put it in a shit museum. I don't care what you do, you just gotta get it together… Get your shit together.</p>
    `,
};

const modalPolicy = {
  title: `${policy.title}`,
  text: policy.text,
  btnText: "Accept",
  btnText2: "Cansel",
};

const modalTerms = {
  title: `${terms.title}`,
  text: terms.text,
  btnText: "Accept",
  btnText2: "Cansel",
};

export default function FormAddDeposit({
  show,
  deposit,
  wallet,
  setFieldSum,
  setFieldPeriod,
  setFieldNetwork,
  setFieldPolicy,
  toggleModal,
}: any) {
  const reg_sum = /^[0-9]+(\.[0-9]+)?$/;
  const [disabled, setDisabled] = useState(false);

  const htmlId = nextId("deposit-");
  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const form = useRef(null);
  const [validation, setValidation] = useState(false);
  const [validationCheckbox, setValidationCheckbox] = useState(false);
  const [validationSelect, setValidationSelect] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false);
  const [resetCheckbox, setResetCheckbox] = useState(false);
  const [resetSelect, setResetSelect] = useState(false);

  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  const [checkedCheckboxPolicy, setCheckedCheckboxPolicy] = useState(false);
  const [checkedCheckboxTerms, setCheckedCheckboxTerms] = useState(false);

  const [openModalPolicy, setOpenModalPolicy] = useState(false);
  const [openModalTerms, setOpenModalTerms] = useState(false);

  const handlePolicyClick = () => {
    setOpenModalPolicy(true);
    setResetCheckbox((prev) => !prev);
  };

  const handleTermsClick = () => {
    setOpenModalTerms(true);
    setResetCheckbox((prev) => !prev);
  };

  const toogleModalPolicy = (val: any) => {
    setCheckedCheckboxPolicy(val);
    setOpenModalPolicy(false);
    if (!checkedCheckboxTerms && val !== false) {
      setOpenModalTerms(true);
    }
  };

  const toogleModalTerms = (val: any) => {
    setCheckedCheckboxTerms(val);
    setOpenModalTerms(false);

    if (!checkedCheckboxPolicy && val !== false) {
      setOpenModalPolicy(true);
    }
  };

  useEffect(() => {
    if (checkedCheckboxPolicy && checkedCheckboxTerms) {
      setCheckedCheckbox(true);
      setFieldPolicy(true);
    }
  }, [checkedCheckboxPolicy, checkedCheckboxTerms]);

  useEffect(() => {
    if (checkedCheckbox) {
      setCheckedCheckboxPolicy(false);
      setCheckedCheckboxTerms(false);
      setCheckedCheckbox(false)
    }
  }, [checkedCheckbox]);

  useEffect(() => {
    validationCheckbox ? setFieldPolicy(true) : setFieldPolicy(false);
  }, [validationCheckbox]);


  const onAddKey = (e: any) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (form.current) {
      const deposit_sum = (form.current as any).deposit_sum.value;
      const deposit_type = deposit.type;
      const deposit_percent = deposit.val;
      const deposit_wallet = wallet.title;
      const deposit_wallet_id = wallet.wallet_id;
      const deposit_period = (form.current as any).deposit_period.value;
      const deposit_network = (form.current as any).deposit_network.value;


      if (!disabled && validation && validationCheckbox && validationSelect) {
        setResetCheckbox((prev) => !prev);
        setResetSelect((prev) => !prev);

        sendToFB(
          deposit_sum,
          deposit_type,
          deposit_percent,
          deposit_wallet,
          deposit_wallet_id,
          deposit_period,
          deposit_network,
        );
        sendToFBTotalDeposit(deposit_sum);
        toggleModal(true);
        show(false);
        (form.current as any).reset();
        setReset((prev: any) => !prev);
        setResetCheckbox((prev: any) => !prev);
        setResetSelect((prev: any) => !prev);
        setFieldPolicy((prev: any) => !prev);
      }
    }
  };

  const onResetFrom = () => {
    (form.current as any).reset();
    show(false);
    setReset((prev) => !prev);
    setResetCheckbox((prev: any) => !prev);
    setResetSelect((prev: any) => !prev);
    setFieldPolicy((prev: any) => !prev);
  };

  const sendToFB = (
    deposit_sum: any,
    deposit_type: any,
    deposit_percent: any,
    deposit_wallet: any,
    deposit_wallet_id: any,
    deposit_period: any,
    deposit_network: any
  ) => {
    set(ref(database, "deposit/" + userID + "/" + htmlId), {
      deposit_type: deposit_type,
      deposit_percent: deposit_percent,
      deposit_sum: deposit_sum,
      deposit_wallet: deposit_wallet,
      deposit_wallet_id: deposit_wallet_id,
      deposit_period: deposit_period,
      deposit_network: deposit_network,
    });
  };

  const sendToFBTotalDeposit = (deposit_sum: any) => {
    set(ref(database, "allDeposit/" + userID + "/" + htmlId), {
      deposit_sum: deposit_sum,
    });
  };

  //alert(disabled)
  return (
    <>
      <ModalPolicy
        openModal={openModalPolicy}
        setModalOpen={setOpenModalPolicy}
        props={modalPolicy}
        toggleCheckbox={(val: any) => toogleModalPolicy(val)}
        theme="success"
      />

      <ModalPolicy
        openModal={openModalTerms}
        setModalOpen={setOpenModalTerms}
        props={modalTerms}
        toggleCheckbox={(val: any) => toogleModalTerms(val)}
        theme="success"
      />

      <div className={styles.form_note}>
        You have chosen <b>{deposit.type}</b>. Enter the amount and select the
        period
      </div>

      <form
        action="/"
        method="POST"
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
            error="Only numbers"
            required={true}
            reset={reset}
            setReset={setReset}
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidation}
            theme="default"
            success={setFieldSum}
            setDisabled={setDisabled}
            pattern={reg_sum}
          />
        </div>

        <div className={styles.form_row}>
          <SelectPeriod
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidationSelect}
            reset={resetSelect}
            id="deposit_period"
            success={() => setFieldPeriod(true)}
          />
        </div>

        <div className={styles.form_row}>
          <SelectNetwork
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidationSelect}
            reset={resetSelect}
            id="deposit_network"
            success={() => setFieldNetwork(true)}
          />
        </div>

        <div className={styles.form_row}>
          <Checkbox
            label={
              <div>
                I have read and accept the{" "}
                <strong onClick={handleTermsClick}>Terms of Use</strong>,
                confirm the amount due and understand that the payment cannot be
                canceled under the{" "}
                <strong onClick={handlePolicyClick}>Refund Policy</strong>
              </div>
            }
            id="deposit_policy"
            error="Required field"
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidationCheckbox}
            reset={resetCheckbox}
            checkedCheckbox={checkedCheckbox}
          />
        </div>

        <div className={styles.form_cta}>
          <Btn label="Create Deposit" onClick={onAddKey} disabled={disabled} />
          <Btn label="Reset form" onClick={onResetFrom} theme="secondary" />
        </div>
      </form>
    </>
  );
}
