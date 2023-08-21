import { useState, useEffect, useRef } from "react";

import ModalPolicy from "../../Modal/ModalPolicy";
import Input from "../Input";
import Btn from "../Btn";
import Checkbox from "../Checkbox";
import SelectApi from "../SelectApi";

import styles from "./styles.module.sass";


const policy = {
  title: "Usage Policy",
  text: `
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

export default function FormAddRT({
  show,
  setFieldApi,
  setFieldName,
  setFieldSum,
  setFieldPolicy,
  getDataFB
}) {
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


  useEffect(() => {
    validationCheckbox ? setFieldPolicy(true) : setFieldPolicy(false);
  }, [validationCheckbox]);

  const handlePolicyClick = () => {
    setOpenModalPolicy(true);
    setResetCheckbox((prev) => !prev);
  };

  const onAddRT = (e) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (form.current) {
      const rt_name = form.current.rt_name.value.replaceAll(" ", "-");
      const rt_start_date = Date.now();
      const rt_sum = form.current.rt_sum.value;
      const api_key_name = form.current.rt_api.value;
      const api_key_id = form.current.rt_api.getAttribute("name");

      if (!disabled && validation && validationCheckbox && validationSelect) {
        getDataFB({
          rt_name, rt_start_date, rt_sum, api_key_name, api_key_id
        });
        show(true);
      }
    }
  };

  const onResetFrom = () => {
    form.current.reset();
    show(false);
    setReset((prev) => !prev);
    setResetCheckbox((prev) => !prev);
    setResetSelect((prev) => !prev);
  };

  return (
    <>
      <ModalPolicy
        openModal={openModalPolicy}
        setModalOpen={setOpenModalPolicy}
        props={modalPolicy}
        theme="success"
        toggleCheckbox={setCheckedCheckbox}
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
            label="Name"
            placeholder="Enter Name"
            id="rt_name"
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
            id="rt_sum"
            error="Required field"
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
            id="rt_api"
            success={() => setFieldApi(true)}
          />
        </div>

        <div className={styles.form_row}>
          <Checkbox
            label={
              <div>
                I have read the{" "}
                <strong onClick={handlePolicyClick}>Usage Policy</strong>
              </div>
            }
            id="rt_policy"
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
          <Btn label="Continue" onClick={onAddRT} disabled={disabled}/>
          <Btn label="Close form" onClick={onResetFrom} theme="secondary" />
        </div>
      </form>
    </>
  );
}
