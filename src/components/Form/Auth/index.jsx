import { useState, useEffect } from 'react'

import { auth } from '../../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import Modal from '../../Modal'

import FormLogin from '../FormLogin'
import FormRegistration from '../FormRegistration'
import FormReset from '../FormReset'


import styles from '../Btn/btn.module.sass'


export default function AuthBtns({ toggleShow }) {
    const [user] = useAuthState(auth)

    const [show, setShow] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
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

    const signOut = () => {
        setShow(false)
        setBlockModalHide(true)
        toggleShow(false)
        auth.signOut()
    }

    useEffect(() => {
        if (user !== null) {
            //alert(user.displayName)
            setOpenLogin(false)
            setShow(true)
            setBlockModalHide(false)
        } 
    }, [user])

    //alert(user.displayName)

    return (

        <>
            { !show && <Modal openModal={openLogin} setModalOpen={setOpenLogin} blockModalHide={blockModalHide}>
                <FormLogin toggleModal={handleToggleRegistration} setOpenLogin={setOpenLogin} />
            </Modal>}

            <Modal openModal={openRegister} setModalOpen={setOpenRegister} blockModalHide={blockModalHide}>
                <FormRegistration toggleModalReset={handleModalRegistration} toggleModalLogin={handleModalLogin} />
            </Modal>

            <Modal openModal={openReset} setModalOpen={setOpenReset} blockModalHide={blockModalHide}>
                <FormReset toggleModalLogin={handleModalLogin} toggleModalRegistration={handleToggleRegistration} />
            </Modal>

            <div>
                { show ? <div type='button' className={styles.btn_v1} role="button" onClick={signOut}>
                    <span>Sign</span> Out 
                </div> :
                    <div className={styles.btns}>
                        <div type='button' className={styles.btn_v1} onClick={handleOpenLogin} role="button">
                            <span>Sign</span> In
                        </div>
                        <div type='button' className={styles.btn_v1} onClick={handleOpenRegister} role="button">
                            <span>Sign</span> Up
                        </div>
                    </div>
                }

            </div>

        </>

    )
}
