import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// import Link from 'next/link'
import Input from '../../Form/Input'
import Select from '../../Form/Select'
import Checkbox from '../../Form/Checkbox'
import Date from '../../Form/DateField'
import Btn from '../../Form/Btn'
import Nottification from '../Nottifications'

import { ref, database, storage, set, uploadBytes, refStorage } from '../../../pages/_firebase'

import PlusIcon from '../../../assets/icons/plus-sm.svg'

import styles from './kyc.module.sass'

const gender = [
    'male', 'female', 'alien',
]


export default function KYC() {
    const field_text_exp = /[^a-zA-Z]+$/
    const field_email_exp = /[^\sa-zA-Z0-9@.]+$/

    const getRandomInteger = (min, max) => {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }

    const form = useRef(null)
    const [userId, setUserId] = useState(getRandomInteger(1, 10000))

    const [validation, setValidation] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [submitPressed, setSubmitPressed] = useState(false)
    const [reset, setReset] = useState(true)
    const [send, setSend] = useState(false)
    const formSend = localStorage.getItem('kyc_form_send')

    const { push } = useRouter()

    // console.log('reset', reset)
    // console.log('validation', validation)
    // console.log('submitPressed', submitPressed)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUserId(getRandomInteger(1, 10000))

        setSubmit(prev => !prev)
        setSubmitPressed(true)

        if(form.current){
            const kyc_first_name = form.current.kyc_first_name.value
            const kyc_last_name = form.current.kyc_last_name.value
            const kyc_email = form.current.kyc_email.value
            const kyc_dbirth = form.current.kyc_dbirth.value
            const kyc_gender = form.current.kyc_gender.value
            const kyc_pasport = form.current.kyc_pasport.value
            const kyc_photo = form.current.kyc_photo.value
            const kyc_policy = form.current.kyc_policy.checked

            !formSend && validation && saveMessages(userId, kyc_first_name, kyc_last_name, kyc_email, kyc_dbirth, kyc_gender, kyc_pasport, kyc_photo)
        
            validation && localStorage.setItem('kyc_email', kyc_email)

            form.current.reset()

            if(validation === false){
                setSubmitPressed(false)
            }
        }
    }

    useEffect(() => {

        reset && submitPressed && localStorage.setItem('kyc_form_send', true)
        reset && submitPressed && push('/robotic-trading')
        setSend(formSend === 'true')

    }, [reset, submitPressed])


    const saveMessages = (userId, kyc_first_name, kyc_last_name, kyc_email, kyc_dbirth, kyc_gender, kyc_pasport, kyc_photo) => {

        set(ref(database, 'kycForm/' + userId), {
            kyc_first_name: kyc_first_name, 
            kyc_last_name: kyc_last_name, 
            kyc_email: kyc_email,
            kyc_dbirth: kyc_dbirth, 
            kyc_gender: kyc_gender, 
            kyc_pasport: kyc_pasport, 
            kyc_photo: kyc_photo, 
        })

       
      

const storageRef = refStorage(storage, 'images/');

uploadBytes(storageRef, kyc_pasport).then(() => {
alert('Uploaded a blob or file!');
});
}


    return (
        <div className={styles.form__wrapper}>
            <div className={styles.form__text}>
                <p>
                    Dear Customer,
                </p>

                <p>
                    We would like to share with you information about the KYC (Know Your Customer) process and the security system that we apply on our platform. These measures are taken to ensure the security of your financial transactions and to protect you from possible fraudulent activities.
                </p>
            </div>
            <div className={styles.form__fields}>
            
            <form action="/" method="POST" className={`${styles.form} ${send && styles.disabled}`} noValidate name="kycForm" id="kycForm" ref={form}> 

                <div className={styles.form__fields_wrapper}>
                <div className={styles.form__row}>
                    <Input type='text' label='First name*' placeholder='Type your name...' id='kyc_first_name' error='Only latin letters' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} pattern={field_text_exp}/>

                    <Input type='text' label='Last name*' placeholder='Type your last name...' id='kyc_last_name' error='Only latin letters' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} pattern={field_text_exp}/>
                </div>

                <div className={styles.form__row}>
                    {/* <Input type='text' label='Date of Birth*' placeholder='MM-DD-YYYY' id='kyc_bday' error='Required field' required={true}/> */}
                    <Date label='Date of Birth*' id='kyc_dbirth'/>

                    {/* <Input type='text' label='Gender*' placeholder='Choose your sex...' id='bot_name' error='Required field' required={true}/> */}
                    <Select label='Gender*' data={gender} id='kyc_gender'/>
                </div>

                <div className={styles.form__row}>
                    <Input type='file' label='Pasport*' placeholder='Attach photo...' id='kyc_pasport' error='Only Jpg, Png less then 150kB' required={true} icon={<PlusIcon width="15" height="15"/>} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation}/>

                    <Input type='file' label='Persone photo*' placeholder='Attach photo...' id='kyc_photo' error='Only Jpg, Png less then 150kB' required={true} icon={<PlusIcon width="15" height="15"/>} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation}/>
                </div>

                <div className={styles.form__row}>
                    <Input type='email' label='Email*' placeholder='your@email.com' id='kyc_email' error='Wrang format' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} pattern={field_email_exp}/>
                </div>
                </div>

                <Checkbox label='Public offer' id='kyc_policy' error='Required field' submit={submit} setSubmit={setSubmit} validate={setValidation} reset={reset} setReset={setReset} />

                <div className={styles.form__note}>
                We are pleased to present you our Public Offer - an important document that governs the relationship between us as a service provider and you as our client. We invite you to familiarize yourself with its content, as it determines the terms of use of our platform and the provision of our services to you.
                </div>

                <Btn label='Confirm' onClick={handleSubmit} disabled={send}/>


            </form>

            { reset && submitPressed || send && <Nottification type="success" label='Your data send!'/> }

            </div>
        </div>
    )
}
