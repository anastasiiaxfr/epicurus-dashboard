import { useState, useRef } from 'react'
// import Link from 'next/link'
import Input from '../../Form/Input'
import Select from '../../Form/Select'
import Checkbox from '../../Form/Checkbox'
import Date from '../../Form/DateField'
import Btn from '../../Form/Btn'

import { ref, database, set } from '../../../pages/_firebase'

import PlusIcon from '../../../assets/icons/plus-sm.svg'

import styles from './kyc.module.sass'

const gender = [
    'male', 'female', 'alien',
]


export default function KYC() {
    const form = useRef(null)
    const [userId, setUserId] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(form.current){
            const kyc_first_name = form.current.kyc_first_name.value
            const kyc_last_name = form.current.kyc_last_name.value
            const kyc_email = form.current.kyc_email.value
            const kyc_dbirth = form.current.kyc_dbirth.value
            const kyc_gender = form.current.kyc_gender.value
            const kyc_pasport = form.current.kyc_pasport.value
            const kyc_photo = form.current.kyc_photo.value
            setUserId(prev => prev + 1)

            saveMessages( userId, kyc_first_name, kyc_last_name, kyc_email, kyc_dbirth, kyc_gender, kyc_pasport, kyc_photo)
            //console.log({ kyc_first_name, kyc_last_name, kyc_dbirth, kyc_gender, kyc_pasport, kyc_photo, kyc_policy, })

            form.current.reset()

        }
    }

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
            
            <form action="/" method="POST" className={styles.form} noValidate name="kycForm" id="kycForm" ref={form}> 

                <div className={styles.form__fields_wrapper}>
                <div className={styles.form__row}>
                    <Input type='text' label='First name*' placeholder='Type your name...' id='kyc_first_name' error='Only latin letters' required={true}/>

                    <Input type='text' label='Last name*' placeholder='Type your last name...' id='kyc_last_name' error='Only latin letters' required={true}/>
                </div>

                <div className={styles.form__row}>
                    {/* <Input type='text' label='Date of Birth*' placeholder='MM-DD-YYYY' id='kyc_bday' error='Required field' required={true}/> */}
                    <Date label='Date of Birth*' id='kyc_dbirth'/>

                    {/* <Input type='text' label='Gender*' placeholder='Choose your sex...' id='bot_name' error='Required field' required={true}/> */}
                    <Select label='Gender*' data={gender} id='kyc_gender'/>
                </div>

                <div className={styles.form__row}>
                    <Input type='file' label='Pasport*' placeholder='Attach photo...' id='kyc_pasport' error='Only Jpg, Png less then 150kB' required={true} icon={<PlusIcon width="15" height="15"/>}/>

                    <Input type='file' label='Persone photo*' placeholder='Attach photo...' id='kyc_photo' error='Only Jpg, Png less then 150kB' required={true} icon={<PlusIcon width="15" height="15"/>}/>
                </div>

                <div className={styles.form__row}>
                    <Input type='email' label='Email*' placeholder='your@email.com' id='kyc_email' error='Wrang format' required={true} />
                </div>
                </div>

                <Checkbox label='Public offer' id='kyc_policy' error='Required field' />

                <div className={styles.form__note}>
                We are pleased to present you our Public Offer - an important document that governs the relationship between us as a service provider and you as our client. We invite you to familiarize yourself with its content, as it determines the terms of use of our platform and the provision of our services to you.
                </div>

                <Btn label='Confirm' onClick={handleSubmit} />


            </form>

            </div>
        </div>
    )
}
