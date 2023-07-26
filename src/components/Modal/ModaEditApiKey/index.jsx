import ClickAwayListener from "@mui/base/ClickAwayListener";
import FormAddApiKeyEdit from "../../Form/FormAddApiKeyEdit";

import CloseIcon from "../../../assets/icons/close.svg";

import styles from "./styles.module.sass";

export default function ModalPopup({ openModal, setModalOpen, props }) {
  const {api_key_id, api_key_name } = props;
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    openModal && (
      <section className={styles.modal}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={styles.modal_content}>
            <div className={styles.modal_header}>

              <div className={styles.modal_title}>
                Edit {api_key_name}
              </div>

              <CloseIcon className={styles.modal_close} onClick={handleClose} />

            </div>
            <FormAddApiKeyEdit api_key_id={api_key_id} close_modal={handleClose}/>
          </div>
        </ClickAwayListener>
      </section>
    )
  );
}
