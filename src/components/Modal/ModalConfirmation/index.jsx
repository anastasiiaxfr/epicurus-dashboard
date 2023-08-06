import ClickAwayListener from "@mui/base/ClickAwayListener";
import Btn from "../../Form/Btn";

import CheckIcon from "../../../assets/icons/check.svg";

import styles from "./modalSuccess.module.sass";

export default function ModalPopup({
  openModal,
  setModalOpen,
  props,
  toggleModal,
  theme,
  show
}) {
  const { title, text, btnText } = props;
  const handleClose = () => {
    setModalOpen(false);
    if(show){ show(false); }
    if (toggleModal) {
      toggleModal(false);
    }
  };

  return (
    openModal && (
      <section className={styles.modal}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={styles.modal_content}>
            <div className={styles.modal_icon}>
              <CheckIcon width="25" height="25" />
            </div>

            <div className={styles.modal_title}>{title}</div>
            {text && <div className={styles.modal_text} dangerouslySetInnerHTML={{ __html: text }}/>}
            <Btn label={btnText} theme={theme} onClick={handleClose} />
          </div>
        </ClickAwayListener>
      </section>
    )
  );
}
