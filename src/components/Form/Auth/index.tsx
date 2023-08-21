import { useState, useEffect } from 'react'

import { auth } from '../../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'

// import Verify from './_verify'

import Modal from '../../Modal'

import FormLogin from '../FormLogin'
import FormRegistration from '../FormRegistration'
import FormReset from '../FormReset'


import styles from '../Btn/btn.module.sass'


export default function AuthBtns({ toggleShow }: any) {
    const [user] = useAuthState(auth)
    const { push } = useRouter()

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
        push('/')
    }

    useEffect(() => {
        if (user) {
            //alert(user.displayName)
            setOpenLogin(false)
            setShow(true)
            setBlockModalHide(false)
        } else {
            setOpenLogin(true)
            signOut()
        }
    }, [user])



    return (

        <>
    
        



        </>

    )
}