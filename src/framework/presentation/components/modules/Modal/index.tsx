import ClickAwayListener from "@mui/base/ClickAwayListener";

import Logo from '../Logo/logo.svg'

import styles from "./modal.module.sass";

export default function ModalPopup({
  openModal,
  setModalOpen,
  children,
  blockModalHide,
}: any) {
  const handleClose = () => {
    !blockModalHide && setModalOpen(false);
  };

  return (
    openModal && (
      <section className={styles.modal}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={styles.modal_wrap}>
            <Logo />
            <div className={styles.modal_content}>{children}</div>
          </div>
        </ClickAwayListener>
      </section>
    )
  );
}
