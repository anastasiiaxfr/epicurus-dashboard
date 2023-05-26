import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, initFirebase, auth} from '../../../pages/_firebase'

import { useAuthState } from 'react-firebase-hooks/auth'


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

export default function FormLogin({ toggleModal, setOpenLogin }) {
    const field_email_exp = /[^\sa-zA-Z0-9@.]+$/
    
    const { push } = useRouter()

    const [openModalError, setOpenModalError] = useState(false)

    initFirebase()
    //const auth = getAuth()

    const [user, loading] = useAuthState(auth)

    const provider = new GoogleAuthProvider()

    // if (loading){
    //     return <div>Loading...</div>
    // }

    if (user){
        //alert(user.displayName)
        push('/settings')
        //return <div>Welcome {user.displayName}</div>
        return user
    }

    const signInGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, provider)
          const user = result.user

         
          
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

    const signInEmailAndPassword = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            const user = result.user
            setOpenLogin(false)
            
            //alert('Success')
          } catch (error) {
            // Handle sign-in error
            const errorCode = error.code
            const errorMessage = error.message
            const email = error.email
            setOpenModalError(true)
          }
    }

    
    const form = useRef(null)
    const [validation, setValidation] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [reset, setReset] = useState(true)

    const signIn = (e) => {
        e.preventDefault()
        setSubmit(prev => !prev)

        if (form.current) {
            const login_email = form.current.login_email.value
            const login_password = form.current.login_password.value
            
            validation && signInEmailAndPassword(login_email, login_password)
            
            form.current.reset()
        }
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
                    <Input type='email' label='Your email*' placeholder='' id='login_email' error='Required field' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} pattern={field_email_exp} />
                </div>
                <div className={styles.form__row}>
                    <Input type='password' label='Password*' placeholder='' id='login_password' error='Required field' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                </div>
                <Btn label='Send' onClick={signIn} />

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
