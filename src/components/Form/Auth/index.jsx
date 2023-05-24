import { useState } from 'react'

import Modal from '../../Modal'

import FormLogin from '../FormLogin'
import FormRegistration from '../FormRegistration'
import FormReset from '../FormReset'


import styles from '../Btn/btn.module.sass'


export default function AuthBtns() {
    const [openLogin, setOpenLogin] = useState(true)
    const [openRegister, setOpenRegister] = useState(false)
    const [openReset, setOpenReset] = useState(false)
    
    const handleOpenLogin = () => setOpenLogin(true)
    const handleOpenRegister = () => setOpenRegister(true)
    const handleOpenReset = () => setOpenReset(true)

    return (
       
        <>
        <Modal openModal={openLogin} setModalOpen={setOpenLogin}>
            <FormLogin />
        </Modal>

        <Modal openModal={openRegister} setModalOpen={setOpenRegister}>
            <FormRegistration />
        </Modal>

        <Modal openModal={openReset} setModalOpen={setOpenReset}>
            <FormReset />
        </Modal>

        <div className={styles.btns}>
            <div type='button' className={styles.btn_v1}onClick={handleOpenLogin} role="button">
                <span>Sign</span> In
            </div>
            <div type='button' className={styles.btn_v1}onClick={handleOpenRegister} role="button">
                <span>Sign</span> Up
            </div>
        </div>

        </>

    )
}
