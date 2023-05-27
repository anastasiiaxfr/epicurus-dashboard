import ClickAwayListener from '@mui/base/ClickAwayListener'
import Btn from '../../Form/Btn'

import CloseIcon from '../../../assets/icons/close.svg'
import CheckIcon from '../../../assets/icons/check.svg'

import styles from './modalSuccess.module.sass'

export default function ModalPopup({ openModal, setModalOpen, props }) {
    const { title, text, btnText, btnUrl } = props
    const handleClose = () => { setModalOpen(false) }

    return (
        openModal && <section className={styles.modal}>
            <ClickAwayListener onClickAway={handleClose}>
                <div className={styles.modal__content}>
                    <div className={styles.modal__icon}>
                        <CheckIcon width="60" height="60"/>
                    </div>
                    <CloseIcon className={styles.modal__close} width="25" height="25" onClick={handleClose}/>

                    <div className={styles.modal__title}>
                        { title }
                    </div>
                    <div className={styles.modal__text}>
                        { text }
                    </div>
                    <Btn label={ btnText } onClick={handleClose} />

                </div>
            </ClickAwayListener>
        </section>

    )
}
