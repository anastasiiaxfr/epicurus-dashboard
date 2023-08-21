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
}: any) {
  const { title, text, btnText, on_click } = props;
  const handleClose = () => {
    setModalOpen(false);
    if(show){ show(false); }
    if (toggleModal) {
      toggleModal(false);
    }
  };

  const onSubmit = () => {
   handleClose(true); 
   if(on_click){on_click(true)}
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
            <Btn label={btnText} theme={theme} onClick={onSubmit} />
          </div>
        </ClickAwayListener>
      </section>
    )
  );
}
