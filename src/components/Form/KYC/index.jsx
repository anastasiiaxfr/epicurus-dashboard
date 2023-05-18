// import Link from 'next/link'
import Input from '../../Form/Input'
import Checkbox from '../../Form/Checkbox'
import Btn from '../../Form/Btn'

import styles from './kyc.module.sass'

export default function KYC() {
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
            
            <form action="/" method="POST" className={styles.form} noValidate>

                <div className={styles.form__fields_wrapper}>
                <div className={styles.form__row}>
                    <Input type='text' label='First name*' placeholder='Type your name...' id='kyc_first_name' error='Only latin letters' required={true}/>

                    <Input type='text' label='Last name*' placeholder='Type your last name...' id='kyc_last_name' error='Only latin letters' required={true}/>
                </div>

                <div className={styles.form__row}>
                    <Input type='text' label='Date of Birth*' placeholder='Choose your birthday...' id='kyc_bday' error='Required field' required={true}/>

                    <Input type='text' label='Gender*' placeholder='Choose your sex...' id='bot_name' error='Required field' required={true}/>
                </div>

                <div className={styles.form__row}>
                    <Input type='text' label='Pasport*' placeholder='Attach photo...' id='kyc_password' error='Only Jpg, Png less then 150kB' required={true}/>

                    <Input type='text' label='Persone photo*' placeholder='Attach photo...' id='kyc_photo' error='Only Jpg, Png less then 150kB' required={true}/>
                </div>
                </div>

                <Checkbox label='Public offer' id='kyc_policy' error='Required field' />

                <div className={styles.form__note}>
                We are pleased to present you our Public Offer - an important document that governs the relationship between us as a service provider and you as our client. We invite you to familiarize yourself with its content, as it determines the terms of use of our platform and the provision of our services to you.
                </div>

                <Btn label='Confirm' />


            </form>

            </div>
        </div>
    )
}
