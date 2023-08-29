import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../../../../../pages/_auth";

import Image from "next/image";
import Btn from "../Btn";
import Input from "../Input";
import Nottification from "../Nottifications";

import QrImg from '../../../assets/img/qr.jpg';
import CopyIcon from '../../../assets/icons/copy.svg';

import styles from "./styles.module.sass";

export default function FormPayment({ show, setFieldHash, toggleModal, getDataFB }: any) {
  const { currentUser }: any = useContext(AuthContext);
  const userID = currentUser.uid;

  const form = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [validation, setValidation] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [reset, setReset] = useState(false);

  const pm_network = "USDT.TRC20"
  const wallet = "TMJTmyTQFFhSL6PKc3DwcBmyvgpXNKSbos"

  const onSubmit = (e: any) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    if (form.current) {
      const hash_code = (form.current as any).transaction_hash.value;
      if (validation) {
        getDataFB && getDataFB({hash_code: hash_code});
        show(false);
        toggleModal(true);
      }
    }
  };

  const onResetFrom = () => {
    show(false);
    (form.current as any).reset();
    setReset((prev) => !prev);
  };

  return (
    <>
      <div className={styles.form_row}>
        <figure className={styles.form_card}>
          <div className={styles.form_card_header}>
            <span>{pm_network}</span>
            <span>Recipient Address:</span>
          </div>
          <div className={styles.form_field_copy}>
            <div>{wallet}</div>
            <CopyIcon />
          </div>
          <Image src={QrImg} alt={wallet} width={180} height={180} className={styles.form_card_img}/>
        </figure>

        <figure className={styles.form_card}>
          <div className={styles.form_card_header}>Transaction Amount:</div>
          <Nottification label="Tax included" type="info" />
          <div className={styles.form_field_copy}>
            <div>28.98892 <span>{pm_network}</span></div>
            <CopyIcon />
          </div>
          <Nottification label="Network fee not included" type="warning" />
          <div className={styles.form_card_text}>
            The network fee and the fee for transfer/withdrawal from a wallet or exchange are calculated depending on the type of network used. Make sure you have enough required coins to pay the fee.
          </div>
        </figure>
      </div>

      <form
        action="/"
        method="POST"
        noValidate
        name="FormPaymentTransaction"
        id="FormPaymentTransaction"
        className={styles.form}
        ref={form}
        autoComplete="off"
      >
        <Input
            type="text"
            label="Specify hash or transaction number"
            placeholder="Enter your Hash Code"
            id="transaction_hash"
            error="Required field"
            required={true}
            reset={reset}
            setReset={setReset}
            submit={submit}
            setSubmit={setSubmit}
            validate={setValidation}
            theme="default"
            success={setFieldHash}
            setDisabled={setDisabled}
          />

        <div className={styles.form_cta}>
          <Btn label="Accept" onClick={onSubmit} disabled={disabled} />
          <Btn label="Close form" onClick={onResetFrom} theme="secondary" />
        </div>
      </form>
    </>
  );
}
