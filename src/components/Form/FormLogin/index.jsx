import { useState, useRef, useEffect } from 'react'

import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, initFirebase } from '../../../pages/_firebase'

import Input from '../../Form/Input'
import Btn from '../../Form/Btn'

import styles from './styles.module.sass'



export default function FormLogin() {
    initFirebase()

    const provider = new GoogleAuthProvider()
    const auth = getAuth()

    const email = 'xforealn2019@gmail.com';
    const password = 'tg69xctg69x';

    const signIn = async () => {
        //const result = await signInWithEmailAndPassword(auth, email, password)

        const result = await signInWithPopup(auth, provider)

        console.log(result.user)
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
                <Btn label='Send' onClick={signIn} />

            </form>

        </div>

    )
}
