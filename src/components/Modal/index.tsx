import ClickAwayListener from "@mui/base/ClickAwayListener";

import Logo from './../../components/Logo/logo.svg'

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
          <>
            <Logo />
            <div className={styles.modal_content}>{children}</div>
          </>
        </ClickAwayListener>
      </section>
    )
  );
}
