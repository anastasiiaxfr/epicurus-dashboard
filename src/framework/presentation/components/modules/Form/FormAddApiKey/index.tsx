import { useState, useEffect, useRef, useContext } from "react";
import nextId from "react-id-generator";
import { AuthContext } from "../../../../../../pages/_auth";
import { ProductContext } from "../../../../../../pages/_products";

import Input from "../../Form/Input";
import Btn from "../../Form/Btn";
import Checkbox from "../../Form/Checkbox";
import ModalPolicy from "../../Modal/ModalPolicy";
import ModalError from "../../Modal/ModalAuthError";
import Preloader from "../../Loader";

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

export default function FormAddApiKey({
  show,
  toggleModal,
  setFieldPolicy,
  setFieldName,
  setFieldKey,
  setFieldSecret,
}: any) {
  const [loading, setLoading] = useState(false); 

  const reg_name = /^[0-9a-zA-Z\s-]+$/;

  const htmlId = nextId("api-key-");
  const { currentUser, userToken }: any = useContext(AuthContext);
  const { setNewApiKeyUpdated }: any = useContext(ProductContext);

  const userID = currentUser.uid;

  const form = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [validation, setValidation] = useState(false);
  const [validationCheckbox, setValidationCheckbox] = useState(false);

  const [formSend, setFormSend] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false);
  const [resetCheckbox, setResetCheckbox] = useState(false);
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);

  const [openModalPolicy, setOpenModalPolicy] = useState(false);

  const [openModalError, setOpenModalError] = useState(false);
  const modalError = {
    title: "Please Try Again",
    text: "Key is not available or wrong key format",
    btnText: "Accept",
  };

  const handlePolicyClick = () => {
    setOpenModalPolicy(true);
    setResetCheckbox((prev) => !prev);
  };

  const onAddKey = (e: any) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (form.current) {
      const api_name = (form.current as any).api_name.value.replaceAll(
        " ",
        "-"
      );
      const api_key = (form.current as any).api_key.value;
      const api_secret = (form.current as any).api_secret.value;
      const api_start_date = Date.now();

      if (!disabled && validation && validationCheckbox) {
        //setFieldPolicy((prev: any) => !prev);
        //setResetCheckbox((prev: any) => !prev);
        sendToFB(api_name, api_key, api_secret, form);
      }
    }
  };

  const onResetFrom = () => {
    show(false);
    (form.current as any).reset();
    setReset((prev: any) => !prev);
    setResetCheckbox((prev: any) => !prev);
  };



  const URL = "https://epicurus-railway-production.up.railway.app/v1";
  async function sendToFB(
    api_name: any,
    api_key: any,
    api_secret: any,
    form: any
  ) {
    console.log(userToken);
    setLoading(true);
    let res = fetch(
      `${URL}/key/create/`,
      {
        method: "POST",
        body: JSON.stringify({
          title: api_name,
          secret_key: api_secret,
          api_key: api_key,
          vendor: "Binance",
        }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    ).then((response) => {
      setLoading(false);
      if (!response.ok) {
        console.log(response.status);
        setReset(true);
        setOpenModalError(true);
        //onResetFrom();
      } else {
        setNewApiKeyUpdated((prev: any) => !prev);
        onResetFrom();
        toggleModal(true);
      }
    });
  }

  useEffect(() => {
    validationCheckbox ? setFieldPolicy(true) : setFieldPolicy(false);
  }, [validationCheckbox]);

  return (
    <>
      <ModalPolicy
        openModal={openModalPolicy}
        setModalOpen={setOpenModalPolicy}
        props={modalPolicy}
        theme="success"
        toggleCheckbox={setCheckedCheckbox}
      />
      <ModalError
        openModal={openModalError}
        setModalOpen={setOpenModalError}
        props={modalError}
        theme="error"
      />
              {loading && <Preloader />}

      {!loading && <form
        action="/"
        method="POST"
        noValidate
        name="FormAddApiKey"
        id="FormAddApiKey"
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
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidation}
            setDisabled={setDisabled}
            theme="default"
            success={setFieldName}
            maxLength={12}
            pattern={reg_name}
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
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidation}
            theme="default"
            success={setFieldKey}
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
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidation}
            theme="default"
            success={setFieldSecret}
          />
        </div>

        <div className={styles.form_row}>
          <Checkbox
            label={
              <div>
                I have read the
                <strong onClick={handlePolicyClick}> Usage Policy</strong>
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
          <Btn label="Create Key" onClick={onAddKey} disabled={disabled} />
          <Btn label="Close Form" onClick={onResetFrom} theme="secondary" />
        </div>
      </form>}
    </>
  );
}
