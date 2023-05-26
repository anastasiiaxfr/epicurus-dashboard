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
    
    const [blockModalHide, setBlockModalHide] = useState(true)

    const handleOpenLogin = () => setOpenLogin(true)
    const handleOpenRegister = () => setOpenRegister(true)

    const handleModalRegistration = () => {
        setOpenRegister(false)
        setOpenReset(true)
    }

    const handleModalLogin = () => {
        setOpenRegister(false)
        setOpenReset(false)
        setOpenLogin(true)
    }

    const handleToggleRegistration = () => {
        setOpenRegister(true)
        setOpenLogin(false)
        setOpenReset(false)
    }

    return (
       
        <>
        <Modal openModal={openLogin} setModalOpen={setOpenLogin} blockModalHide={blockModalHide}>
            <FormLogin toggleModal={handleToggleRegistration}/>
        </Modal>

        <Modal openModal={openRegister} setModalOpen={setOpenRegister} blockModalHide={blockModalHide}>
            <FormRegistration toggleModalReset={handleModalRegistration} toggleModalLogin={ handleModalLogin }/>
        </Modal>

        <Modal openModal={openReset} setModalOpen={setOpenReset} blockModalHide={blockModalHide}>
            <FormReset toggleModalLogin={ handleModalLogin } toggleModalRegistration={ handleToggleRegistration }/>
        </Modal>

        <div className={styles.btns}>
            <div type='button' className={styles.btn_v1} onClick={handleOpenLogin} role="button">
                <span>Sign</span> In
            </div>
            <div type='button' className={styles.btn_v1} onClick={handleOpenRegister} role="button">
                <span>Sign</span> Up
            </div>
        </div>

        </>

    )
}
