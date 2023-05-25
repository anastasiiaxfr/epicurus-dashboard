import ClickAwayListener from '@mui/base/ClickAwayListener'

import styles from './modal.module.sass'

export default function ModalPopup({ openModal, setModalOpen, children, blockModalHide }) {
    const handleClose = () => { !blockModalHide && setModalOpen(false) }

    return (
        openModal && <section className={styles.modal}>
            <ClickAwayListener onClickAway={handleClose}>
                <div className={styles.modal__content}>
                    {children}
                </div>
            </ClickAwayListener>
        </section>

    )
}
