import { useState, useEffect, useRef, useContext } from "react";
import { ref, database, set } from "../../../pages/_firebase";
import { AuthContext } from "../../../pages/_auth";
import nextId from "react-id-generator";

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
  toogleModal
}) {
  const htmlId = nextId("rt-");
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
      const rt_name = form.current.rt_name.value;
      const rt_start_date = Date.now();
      const rt_sum = form.current.rt_sum.value;
      const api_key_name = form.current.rt_api.value;
      const api_key_id = form.current.rt_api.getAttribute("name");

      if (validation && validationCheckbox && validationSelect) {
        setResetCheckbox((prev) => !prev);
        setResetSelect((prev) => !prev);
        sendToFB(rt_name, rt_start_date, rt_sum, api_key_name, api_key_id);
        
        toogleModal && toogleModal(true);

        show(false);
        form.current.reset();
        setReset((prev) => !prev);
        setFieldPolicy((prev) => !prev);
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

  const sendToFB = (rt_name, rt_start_date, rt_sum, api_key_name, api_key_id) => {
    set(ref(database, "robotic-trading/" + userID + "/" + htmlId), {
      rt_name: rt_name,
      rt_start_date: rt_start_date,
      rt_sum: rt_sum,
      rt_sum_first: rt_sum,
      api_key_name: api_key_name,
      api_key_id: api_key_id,
    });
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
            success={setFieldSum}
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
          <Btn label="Create" onClick={onAddRT} />
          <Btn label="Reset form" onClick={onResetFrom} theme="secondary" />
        </div>
      </form>
    </>
  );
}
