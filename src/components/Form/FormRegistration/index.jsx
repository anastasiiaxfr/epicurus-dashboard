import { useState, useRef, useEffect } from 'react'
import { auth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, firestore, collection, doc, setDoc } from '../../../pages/_firebase'

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

export default function FormRegistration({ toggleModalLogin, toggleModalReset, setOpenRegister }) {
    const user = auth.currentUser

    const reg_email = /^[^\s@#$%]+@[^\s@#$%]+\.[^\s@#$%]+$/
    const form = useRef(null)
    const [validation, setValidation] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [submitPressed, setSubmitPressed] = useState(false)
    const [reset, setReset] = useState(true)

    const [openModalError, setOpenModalError] = useState(false)

    const addUserToFirestore = async (data) => {
        try {
          const collectionRef = collection(firestore, 'NewUser')
          const db = doc(collectionRef)
      
          // Set the data in Firestore
          await setDoc(db, data)
      
          console.log('Data written to Firestore successfully.')
        } catch (error) {
          console.error('Error writing data to Firestore:', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //onInputField(e)

        setSubmit(prev => !prev)
        setSubmitPressed(true)

        if (form.current) {

            const reg_email = form.current.reg_email.value
            const reg_password = form.current.reg_password.value
            const reg_name = form.current.reg_name.value

            if (validation === true) {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, reg_email, reg_password)
                    const user = userCredential.user

                    await updateProfile(user, {
                        displayName: reg_name,
                    })
                    // sendEmailVerification(user)
                    //     .then(() => {
                    //         console.log('Email verification sent successfully.')
                    //     })
                    //     .catch((error) => {
                    //         console.error('Error sending verification email:', error)
                    //     })
                    //alert('User registered successfully!')
                    addUserToFirestore({
                        new_user_email: reg_email, new_user_name: reg_name
                    })
                    setOpenRegister(false)
                } catch (error) {
                    //alert('Error')
                    console.error('Error registering user:', error)
                    setOpenModalError(true)
                }
            }
        }

    }



    return (

        <>
            <ModalAuthError openModal={openModalError} setModalOpen={setOpenModalError} props={modalInfo} />

            <div className={styles.form__wrap}>

                <h1>
                    Registration
                </h1>

                <form action="/" methord="POST" noValidate name="FormRegistration" id="FormRegistration" className={styles.form} ref={form} autoComplete='off'>

                    <div className={styles.form__row}>
                        <Input type='text' label='Your name*' placeholder='' id='reg_name' error='Required. Only latin letters' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                    </div>
                    <div className={styles.form__row}>
                        <Input type='email' label='Your email*' placeholder='' id='reg_email' error='Required field' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} pattern={reg_email} />
                    </div>
                    <div className={styles.form__row}>
                        <Input type='password' label='Password*' placeholder='' id='reg_password' error='Required field' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                    </div>
                    <Btn label='Send' onClick={handleSubmit} />

                </form>

                <div className={styles.form__cta}>
                    {/* <div onClick={() => toggleModalReset()} className={styles.btn__cta}> Reset <b>password</b> </div> */}
                    <span>OR</span>
                    <div onClick={() => toggleModalLogin()} className={styles.btn__cta}>
                        Login
                    </div>
                </div>

            </div>
        </>


    )
}
