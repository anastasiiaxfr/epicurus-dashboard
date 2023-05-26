import { useState, useRef, useEffect } from 'react'

import Input from '../../Form/Input'
import Btn from '../../Form/Btn'



import styles from './styles.module.sass'



export default function FormRegistration({ toggleModalLogin, toggleModalReset }) {

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


            <div className={styles.form__wrap}>

                <h1>
                    Registration
                </h1>

                <form action="/" methord="POST" noValidate name="FormRegistration" id="FormRegistration" className={styles.form} ref={form}>

                    <div className={styles.form__row}>
                        <Input type='text' label='Your name*' placeholder='' id='reg_name' error='Required. Only latin letters' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                    </div>
                    <div className={styles.form__row}>
                        <Input type='password' label='Password*' placeholder='' id='reg_password' error='Required field' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                    </div>
                    <Btn label='Send' onClick={handleSubmit} />

                </form>

                <div className={styles.form__cta}>
                    <div onClick={() => toggleModalReset()} className={styles.btn__cta}> Reset <b>password</b> </div>
                    <span>OR</span>
                    <div onClick={() => toggleModalLogin()} className={styles.btn__cta}>
                        Login
                    </div>
                </div>

            </div>
        </>


    )
}
