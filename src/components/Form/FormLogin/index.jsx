import { useState, useRef, useEffect } from 'react'

import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, initFirebase } from '../../../pages/_firebase'

import ModalAuthError from '../../Modal/ModalAuthError'

import Input from '../../Form/Input'
import Btn from '../../Form/Btn'

import styles from './styles.module.sass'


const modalInfo = {
    title: 'Something Wrong',
    text: 'Try again',
    btnText: 'Okay',
    btnUrl: '#'
}

export default function FormLogin({ toggleModal }) {
    const [openModalError, setOpenModalError] = useState(false)

    initFirebase()

    const provider = new GoogleAuthProvider()
    const auth = getAuth()

    const email = 'xforealn2019@gmail.com';
    const password = 'tg69xctg69x';

    const signInGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, provider)
          const user = result.user
          // Handle successful sign-in
        } catch (error) {
          // Handle sign-in error
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          setOpenModalError(true)
        }
    }

    const signInEmailAndPassword = async () => {
        const result = await signInWithEmailAndPassword(auth, email, password)
        //console.log(result.user)
    }


    const form = useRef(null)
    const [validation, setValidation] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [submitPressed, setSubmitPressed] = useState(false)
    const [reset, setReset] = useState(true)


    const handleSubmit = (e) => {
        e.preventDefault()
        //onInputField(e)

        setSubmit(prev => !prev)
        setSubmitPressed(true)




    }


    return (
        <>
        <ModalAuthError openModal={openModalError} setModalOpen={setOpenModalError} props={modalInfo}/>
       
        <div className={styles.form__wrap}>

            <h1>
                Login
            </h1>

           

            <form action="/" methord="POST" noValidate name="FormLogin" id="FormLogin" className={styles.form} ref={form}>

                <div className={styles.form__row}>
                    <Input type='text' label='Your name*' placeholder='' id='login_name' error='Required. Only latin letters' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                </div>
                <div className={styles.form__row}>
                    <Input type='password' label='Password*' placeholder='' id='login_password' error='Required field.' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                </div>
                <Btn label='Send' onClick={signInEmailAndPassword} />

            </form>

            <div className={styles.form__cta}>
                <div onClick={signInGoogle} className={styles.btn__cta}> <b>Sign in with</b> Google </div>
                    <span>OR</span>
                <div onClick={() => toggleModal()} className={styles.btn__cta}>
                    Registration
                </div>
            </div>

        </div>
        </>
    )
}
