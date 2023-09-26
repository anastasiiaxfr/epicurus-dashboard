import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../../../../../pages/_auth"

import Modal from '../../Modal'
import FormLogin from '../../Form/FormLogin'
import FormRegistration from '../../Form/FormRegistration'
import FormReset from '../../Form/FormReset'

import styles from './styles.module.sass'

export default function LoadingModal({setUserToken}) {
    const { auth, } = useContext(AuthContext)

    const [show, setShow] = useState(false)
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

    const handleModalReset = () => {
        setOpenRegister(false)
        setOpenLogin(false)
        setOpenReset(true)
    }

    const signOut = () => {
        setShow(false)
        setBlockModalHide(true)
        auth.signOut()
    }

    // useEffect(() => {
    //     if (currentUser) {
    //         //alert(user.displayName)
    //         //setOpenLogin(false)
    //         setShow(true)
    //         setBlockModalHide(false)
    //     } else {
    //         //setOpenLogin(true)
    //         signOut()
    //     }
    // }, [currentUser])

    return (
        <div className={styles.loading_modal}> 
           <Modal openModal={openLogin} setModalOpen={setOpenLogin} blockModalHide={blockModalHide} setUserToken={setUserToken}>
                <FormLogin toggleModal={handleToggleRegistration} setOpenLogin={setOpenLogin} 
                setUserToken={setUserToken} toggleModalReset={handleModalReset} />
            </Modal>

            <Modal openModal={openRegister} setModalOpen={setOpenRegister} blockModalHide={blockModalHide}>
                <FormRegistration toggleModalReset={handleModalRegistration} toggleModalLogin={handleModalLogin} setOpenRegister={setOpenRegister} setUserToken={setUserToken} />
            </Modal>

            <Modal openModal={openReset} setModalOpen={setOpenReset} blockModalHide={blockModalHide}>
                <FormReset toggleModalLogin={handleModalLogin} toggleModalRegistration={handleToggleRegistration} />
            </Modal>
        </div>
    )
}
