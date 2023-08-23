import { useState, useRef, useEffect, useContext } from "react";
import { ref, database, set } from '../../../pages/_firebase';
import { AuthContext } from "../../../pages/_auth";

import Input from "../Input";
import Btn from "../Btn";

import styles from "./styles.module.sass";


export default function FormAddApiKeyEdit({api_key_id, close_modal}: any) {
  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;
  const reg_name = /^[0-9a-zA-Z\s-]+$/;
  const formEdit = useRef(null);
  const [validation, setValidation] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false)



  const onAddKey = (e: any) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (formEdit.current) {
      const api_name = (formEdit.current as any).api_edit_name.value.replaceAll(" ", "-");
      const api_key = (formEdit.current as any).api_edit_key.value;
      const api_secret = (formEdit.current as any).api_edit_secret.value;

      if (!disabled && (api_name.length > 0 && api_key.length > 0 && api_secret.length > 0)) {
        sendToFB(api_name, api_key, api_secret);
        (formEdit.current as any).reset();  
        setReset(prev => !prev);  
        close_modal();
      }
    }
  };


  const sendToFB = (api_name: any, api_key: any, api_secret: any) => {
    if(userID){
      set(ref(database, 'apiKey/' + userID + '/' + api_key_id), {
        api_name: api_name,
        api_key: api_key,
        api_secret: api_secret,
      });
    }
  };

  return (
    <>

      <form
        action="/"
        method="POST"
        noValidate
        name="FormEditApiKey"
        id="FormEditApiKey"
        className={styles.form}
        ref={formEdit}
        autoComplete="off"
      >
        <div className={styles.form_row}>
          <Input
            type="text"
            label="API Name"
            placeholder="Enter Name"
            id="api_edit_name"
            error="Required field"
            note="Only numbers and Latin letters, less than 12 symbols"
            required={true}
            reset={reset}
            submit={submit}
            setSubmit={setSubmit}
            setDisabled={setDisabled}
            validate={setValidation}
            theme="default"
            maxLength={12}
            pattern={reg_name}
          />
        </div>

        <div className={styles.form_row}>
          <Input
            type="text"
            label="API Key"
            placeholder="Enter API Key"
            id="api_edit_key"
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
            id="api_edit_secret"
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

       
        <div className={styles.form_cta}>
          <Btn label="Change Key" onClick={onAddKey} />
        </div>
      </form>
    </>
  );
}
