import ClickAwayListener from "@mui/base/ClickAwayListener";
import Btn from "../../Form/Btn";

import CloseIcon from "../../../assets/icons/close.svg";

import styles from "./styles.module.sass";

export default function ModalPopup({ openModal, setModalOpen, props, toggleModal }: any) {
  const { title, text, btnText, btnText2 } = props;
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    openModal && (
      <section className={styles.modal}>
        <div className={styles.modal_wrap}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={styles.modal_content}>
            <div className={styles.modal_icon}>
              <CloseIcon
                className={styles.modal_close}
                width="25"
                height="25"
                onClick={handleClose}
              />
            </div>

            <div className={styles.modal_title}>{title}</div>
            {text && <div className={styles.modal_text}>{text}</div>}
            {btnText2 ? <div className={styles.modal_cta}>
                <Btn label={btnText} theme="error" onClick={toggleModal}/>
                <Btn label={btnText2} theme="secondary" onClick={handleClose} /> 
            </div> : <Btn label={btnText} theme="secondary" onClick={handleClose} />}
           
          </div>
        </ClickAwayListener>
        </div>
      </section>
    )
  );
}
