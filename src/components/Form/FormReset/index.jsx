import { useState, useRef, useEffect } from 'react'

import Input from '../../Form/Input'
import Btn from '../../Form/Btn'



import styles from './styles.module.sass'



export default function FormReset() {

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
                    Reset
                </h1>

                <form action="/" methord="POST" noValidate name="FormReset" id="FormReset" className={styles.form} ref={form}>

                    <div className={styles.form__row}>
                        <Input type='password' label='New password*' placeholder='' id='reset_new_password' error='Required field' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                    </div>
                    <div className={styles.form__row}>
                        <Input type='password' label='Confirm password*' placeholder='' id='reset_confirm_password' error='Required field' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                    </div>
                    <Btn label='Send' onClick={handleSubmit} />

                </form>
               
            </div>
        </>


    )
}
