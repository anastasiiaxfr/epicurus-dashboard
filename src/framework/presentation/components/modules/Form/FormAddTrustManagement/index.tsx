import { useState, useEffect, useRef, useContext } from "react";
import { ref, database, set } from "../../../../../../pages/_firebase";
import { AuthContext } from "../../../../../../pages/_auth";
import nextId from "react-id-generator";

import ModalPolicy from "../../Modal/ModalPolicy";

import Input from "../Input";
import Btn from "../Btn";
import Checkbox from "../Checkbox";
import SelectPeriod from "../SelectPeriod";
import SelectApi from "../SelectApi";

import styles from "./styles.module.sass";

const policy = {
  title: "Usage Policy",
  text: `
  <p>What the fuck is going on?! God-damn! Are these pills supposed to wake me up or something? Don't even trip about your pants, dawg. We got an extra pair right here.</p>

  <p>He's not pressing charges. That's gotta be the you shot me equivalent of not being mad. I'd like to order one large person with extra people please. white people, no no no black people... and hispanic on half. Ooohhh can do. Well then get your shit together. Get it all together and put it in a backpack, all your shit, so it's together. …and if you gotta take it somewhere, take it somewhere ya know? Take it to the shit store and sell it, or put it in a shit museum. I don't care what you do, you just gotta get it together… Get your shit together.</p>

  <p>Nothing you do matters, your existence is a lie! Sometimes science is a lot more art, than science. A lot of people don't get that. That, out there. That's my grave. On one of our adventures Rick and I basically destroyed the whole world. So we bailed on that reality and we came to this one. Because in this one the world wasn't destroyed. And in this one, we were dead. So we came here a-a-and we buried ourselves and we took their place. And every morning, Summer, I eat breakfast 2 Nice, Mrs Pancakes. Real nice.</p>

  <p>That's Right Morty! This is gonna be a lot like that. Except you know. It's gonna make sense. Like nothing shady ever happened in a fully furnished office? You ever hear about Wall Street Morty? You know what those guys do in their fancy board rooms? They take their balls and dip 'em in cocaine and wipe 'em all over each other. You know Grandpa goes around and he does his business in public because grandpa isn't shady. First off, I always slay it, queen. Secondly, yes. Okay, take it easy Rick. T-that's dark.</p>
  `,
};

const modalPolicy = {
  title: `${policy.title}`,
  text: policy.text,
  btnText: "Accept",
  btnText2: "Cansel",
};

export default function FormAddTrustManagement({
  show,
  setFieldPeriod,
  setFieldApi,
  setFieldName,
  setFieldSum,
  setFieldPolicy,
  toggleModal
}: any) {

  const htmlId = nextId("tm-key-");
  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const reg_sum = /^[0-9]+(\.[0-9]+)?$/;
  const reg_name = /^[0-9a-zA-Z\s-]+$/;
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


  const [openModalPolicy, setOpenModalPolicy] = useState(false);

  const onAddTM = (e: any) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (form.current) {
      const tm_name = (form.current as any).tm_name.value;
      const tm_sum = (form.current as any).tm_sum.value;
      const tm_sum_first = (form.current as any).tm_sum.value;
      const tm_period = (form.current as any).tm_period.value;
      const tm_start_date = Date.now();
      const api_key_name = (form.current as any).tm_api.value;
      const api_key_id = (form.current as any).tm_api.getAttribute("name");

      if (!disabled && validation && validationCheckbox && validationSelect) {
        setResetCheckbox((prev) => !prev);
        setResetSelect((prev) => !prev);
        sendToFB(tm_name, tm_period, tm_start_date, tm_sum, tm_sum_first, api_key_name, api_key_id);
        toggleModal(true);
        show(false);
        (form.current as any).reset();
        setReset((prev) => !prev);
        setFieldPolicy((prev: any) => !prev);
      }
    }
  };

  useEffect(() => {
    validationCheckbox ? setFieldPolicy(true) : setFieldPolicy(false);
  }, [validationCheckbox])

  const onResetFrom = () => {
    (form.current as any).reset();
    show(false);
    setReset((prev) => !prev);
    setResetCheckbox((prev) => !prev);
    setResetSelect((prev) => !prev);
  };

  const sendToFB = (tm_name: any, tm_period: any, tm_start_date: any, tm_sum: any, tm_sum_first: any, api_key_name: any, api_key_id: any) => {
    set(ref(database, "trust-management/" + userID + "/" + htmlId), {
      tm_name: tm_name.replaceAll(" ", "-"),
      tm_start_date: tm_start_date,
      tm_period: tm_period,
      tm_sum_first: tm_sum_first,
      tm_sum: tm_sum,
      api_key_name: api_key_name,
      api_key_id: api_key_id,
    });
  };

  const handlePolicyClick = () => {
    setOpenModalPolicy(true);
    setResetCheckbox((prev) => !prev);
  }

  return (
    <>
 
      <ModalPolicy
        openModal={openModalPolicy}
        setModalOpen={setOpenModalPolicy}
        props={modalPolicy}
        toggleCheckbox={setCheckedCheckbox}
        theme="success"
      />
      <form
        action="/"
        method="POST"
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
            note="Only numbers and Latin letters, less than 12 symbols"
            required={true}
            reset={reset}
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidation}
            theme="default"
            success={setFieldName}
            maxLength={12}
            pattern={reg_name}
          />
        </div>

        <div className={styles.form_row}>
          <Input
            type="text"
            label="Your SUM"
            placeholder="xxx.xx (USDT)"
            id="tm_sum"
            error="Only numbers"
            required={true}
            reset={reset}
            submit={submit}
            setSubmit={setSubmit}
            setDisabled={setDisabled}
            validate={setValidation}
            theme="default"
            success={setFieldSum}
            pattern={reg_sum}
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
             label={
              <div>
                I have read the
                <strong onClick={handlePolicyClick}> {policy.title}</strong>
              </div>
            }
            id="api_policy"
            error="Required field"
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidationCheckbox}
            reset={resetCheckbox}
            checkedCheckbox={checkedCheckbox}
            setCheckedCheckbox={setCheckedCheckbox}
          />
        </div>

        <div className={styles.form_cta}>
          <Btn label="Create" onClick={onAddTM} disabled={disabled}/>
          <Btn label="Close form" onClick={onResetFrom} theme="secondary" />
        </div>
      </form>
    </>
  );
}
