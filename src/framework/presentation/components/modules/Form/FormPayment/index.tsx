import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../../../../../pages/_auth";
import nextId from "react-id-generator";

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

export default function FormPayment({ show, setFieldNetwork, setFieldPolicy, getDataFB, payment }: any) {
  const htmlId = nextId("deposit-");
  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const form = useRef(null);
  const [disabled, setDisabled] = useState(false);
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

  const tooglePolicy = (val: any) => {
    setCheckedCheckboxPolicy(val);
    setOpenModalPolicy(false);
    if (!checkedCheckboxTerms && val !== false) {
      setOpenModalTerms(true);
    }
  };

  const toogleTerms = (val: any) => {
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


  const current_payment_sum = payment?.subscription_sum  || "100";
  const current_payment_type = payment?.subscription_type;
  
  
  const onAddKey = (e: any) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (form.current) {
      const payment_sum = current_payment_sum;
      const payment_network = (form.current as any).payment_network.value;

      if (validationCheckbox && validationSelect) {
        getDataFB({payment_sum: payment_sum, payment_network: payment_network});
        show(true);
        setResetCheckbox((prev) => !prev);
        setResetSelect((prev) => !prev);
        (form.current as any).reset();
        setReset((prev) => !prev);
      }
    }
  };

  const onResetFrom = () => {
    (form.current as any).reset();
    show(false);
    setReset((prev) => !prev);
    setResetCheckbox(false);
    setFieldNetwork(false);
    setFieldPolicy(false);
  };



  return (
    <>
      <ModalPolicy
        openModal={openModalPolicy}
        setModalOpen={setOpenModalPolicy}
        props={modalPolicy}
        toggleCheckbox={ tooglePolicy }
        theme="success"
      />
      

      <ModalPolicy
        openModal={openModalTerms}
        setModalOpen={setOpenModalTerms}
        props={modalTerms}
        toggleCheckbox={ toogleTerms }
        theme="success"
      />
      


      <div className={styles.form_note}>
        {current_payment_type ? <>You will activate the <b>{current_payment_type}</b> for <b>{current_payment_sum}$</b> per month. Tax included</> : <> You need to pay <b>{current_payment_sum}$</b></>}

      </div>

      <form
        action="/"
        method="POST"
        noValidate
        name="FormPayment"
        id="FormPayment"
        className={styles.form}
        ref={form}
        autoComplete="off"
      >
        <div className={styles.form_row}>
          <SelectNetwork
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidationSelect}
            reset={resetSelect}
            id="payment_network"
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
            id="payment_policy"
            error="Required field"
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidationCheckbox}
            reset={resetCheckbox}
            checkedCheckbox={checkedCheckbox}
          />
        </div>

        <div className={styles.form_cta}>
          <Btn label="Continue" onClick={onAddKey} disabled={disabled} />
          <Btn label="Close form" onClick={onResetFrom} theme="secondary" />
        </div>
      </form>
    </>
  );
}
