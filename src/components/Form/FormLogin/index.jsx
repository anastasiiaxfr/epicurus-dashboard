import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, initFirebase, auth, sendPasswordResetEmail } from '../../../pages/_firebase'

import { useAuthState } from 'react-firebase-hooks/auth'

import ModalAuthError from '../../Modal/ModalAuthError'

import Input from '../../Form/Input'
import Btn from '../../Form/Btn'

import styles from './styles.module.sass'


const modalInfo = {
    title: 'Something Wrong',
    text: 'Reset password from link on your email',
    btnText: 'Okay',
    btnUrl: '#'
}


export default function FormLogin({ toggleModal, setOpenLogin }) {
    const reg_email = /^[^\s@#$%]+@[^\s@#$%]+\.[^\s@#$%]+$/

    const { push } = useRouter()

    const form = useRef(null)

    const [openModalError, setOpenModalError] = useState(false)

    initFirebase()
    //const auth = getAuth()

    const [user] = useAuthState(auth)

    const provider = new GoogleAuthProvider()

    // if (loading){
    //     return <div>Loading...</div>
    // }

    if (user) {
        //alert(user.displayName)
        //return <div>Welcome {user.displayName}</div>
        return user
    }

    const signInGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            //console.log(result.user)
            setOpenLogin(false)
            // Handle successful sign-in
        } catch (error) {
            // Handle sign-in error
            const errorCode = error.code
            const errorMessage = error.message
            const email = error.email
            setOpenModalError(true)
        }
    }

    // const signInEmailAndPassword = async (email, password) => {
    //     try {
    //         const result = await signInWithEmailAndPassword(auth, email, password)
    //         const user = result.user
    //         const secureToken = user.getIdToken()
    //         setOpenLogin(false)
    //         //console.log(result.user)
    //       } catch (error) {
    //         // Handle sign-in error
    //         const errorCode = error.code
    //         const errorMessage = error.message
    //         const email = error.email
    //         setOpenModalError(true)

    //       }
    // }



    const [validation, setValidation] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [reset, setReset] = useState(true)

    const signIn = (e) => {
        e.preventDefault()
        setSubmit(prev => !prev)

        if (form.current) {
            const login_email = form.current.login_email.value
            const login_password = form.current.login_password.value

            if (validation) {
                signInWithEmailAndPassword(auth, login_email, login_password).then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user
                    setOpenLogin(false)
                    // ...
                })
                    .catch((error) => {
                        const errorCode = error.code
                        const errorMessage = error.message
                        setOpenModalError(true)
                        login_email && sendPasswordResetEmail(auth, login_email)
                            .then(() => {
                                // Password reset email sent!

                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;

                            })
                    })

                form.current.reset()
            }
        }
    }

    return (
        <>
            <ModalAuthError openModal={openModalError} setModalOpen={setOpenModalError} props={modalInfo} />

            <div className={styles.form__wrap}>

                <h1>
                    Войти
                </h1>

                <form action="/" methord="POST" noValidate name="FormLogin" id="FormLogin" className={styles.form} ref={form} autoComplete='off'>

                    <div className={styles.form__row}>
                        <Input type='email' label='Ваша почта*' placeholder='' id='login_email' error='Обязательное поле' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} pattern={reg_email} />
                    </div>
                    <div className={styles.form__row}>
                        <Input type='password' label='Пароль*' placeholder='' id='login_password' error='Обязательное поле' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                    </div>
                    <Btn label='Отправить' onClick={signIn} className={styles.form__btn} />
                </form>

                <div className={styles.form__cta}>
                    <div onClick={signInGoogle} className={styles.btn__cta}> <b>Войти</b> Google </div>
                    <span>ИЛИ</span>
                    <div onClick={() => toggleModal()} className={styles.btn__cta}>
                        Регистрация
                    </div>
                </div>

            </div>
        </>
    )
}