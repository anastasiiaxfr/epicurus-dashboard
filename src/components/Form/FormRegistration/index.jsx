import { useState, useRef } from 'react'
import { auth, createUserWithEmailAndPassword, updateProfile, firestore, collection, doc, setDoc } from '../../../pages/_firebase'

import { getSPKey } from '../../../pages/_send-pulse'

import ModalAuthError from '../../Modal/ModalAuthError'
import ModalAuthSuccess from '../../Modal/ModalConfirmation'

import Input from '../../Form/Input'
import Btn from '../../Form/Btn'


import styles from './styles.module.sass'

const modalInfo = {
    title: 'Something Wrong',
    text: 'It seems you have already been registered OR email is invalid. Please try to log in',
    btnText: 'Okay',
    btnUrl: '#'
}

const modalInfoSuccess = {
    title: 'The data send',
    text: 'To confirm your registration, please follow the link that has been sent to the email address you provided.',
    btnText: 'Okay',
    btnUrl: '#'
}


export default function FormRegistration({ toggleModalLogin, setOpenRegister }) {
    const user = auth.currentUser

    const reg_email = /^[^\s@#$%]+@[^\s@#$%]+\.[^\s@#$%]+$/
    const form = useRef(null)
    const [validation, setValidation] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [submitPressed, setSubmitPressed] = useState(false)
    const [reset, setReset] = useState(false)

    const [openModalError, setOpenModalError] = useState(false)
    const [openModalSuccess, setOpenModalSuccess] = useState(false)

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

                    const emailData = {
                        emails: [{
                            email: reg_email,

                            variables: {
                                name: reg_name,
                                referrer: 'Epicurus_Dashboard'
                            },
                        }]
                    }
                    
                    getSPKey('new-user', emailData)

                    addUserToFirestore({
                        new_user_email: reg_email, new_user_name: reg_name
                    })

                    setOpenModalSuccess(true)
                    setReset(prev => !prev);  
                    // openModalSuccess !== true && setOpenRegister(false)

                } catch (error) {
                    //alert('Error Register')
                    console.error('Error registering user:', error)
                    form.current.reset()
                    setOpenModalError(true)
                    
                }
            }
        }

    }

    return (

        <>
            <ModalAuthError openModal={openModalError} setModalOpen={setOpenModalError} props={modalInfo} />

            <ModalAuthSuccess openModal={openModalSuccess} setModalOpen={setOpenModalSuccess} props={modalInfoSuccess} toggleModal={setOpenRegister}/>

            <div className={styles.form_wrap}>

                <h1>
                    Sign Up
                </h1>

                <form action="/" methord="POST" noValidate name="FormRegistration" id="FormRegistration" className={styles.form} ref={form} autoComplete='off'>

                    <div className={styles.form_row}>
                        <Input type='text' label='Name*' placeholder='' id='reg_name' error='Required. Only Latin letters.' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                    </div>
                    <div className={styles.form_row}>
                        <Input type='email' label='Email*' placeholder='' id='reg_email' error='Required field' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} pattern={reg_email} />
                    </div>
                    <div className={styles.form_row}>
                        <Input type='password' label='Password*' placeholder='' id='reg_password' error='Required field' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                    </div>
                    <Btn label='Send' onClick={handleSubmit} />

                </form>

                <div className={styles.form_cta}>
                    {/* <div onClick={() => toggleModalReset()} className={styles.btn__cta}> Reset <b>password</b> </div> */}
                    <span>OR</span>
                    <div onClick={() => toggleModalLogin()} className={styles.btn_cta}>
                        Sign In
                    </div>
                </div>

            </div>
        </>


    )
}