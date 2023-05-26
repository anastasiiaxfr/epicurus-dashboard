import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// import Link from 'next/link'
import Input from '../../Form/Input'
import Select from '../../Form/Select'
import Checkbox from '../../Form/Checkbox'
import Date from '../../Form/DateField'
import Btn from '../../Form/Btn'
import Nottification from '../Nottifications'

import { ref, database, storage, set, uploadBytes, refStorage,  getDownloadURL } from '../../../pages/_firebase'

import { auth } from '../../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import PlusIcon from '../../../assets/icons/plus-sm.svg'

import styles from './kyc.module.sass'

const gender = [
    'male', 'female', 'alien',
]


export default function KYC() {
    const [user] = useAuthState(auth)
    const userID = user?.uid
    const userEmail = user?.email

    const field_text_exp = /[^a-zA-Z]+$/

    const form = useRef(null)

    const [validation, setValidation] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [submitPressed, setSubmitPressed] = useState(false)
    const [reset, setReset] = useState(true)
    const [send, setSend] = useState(false)
    const formSend = localStorage.getItem('kyc_form_send')

    const [imgPasport, setImgPasport] = useState(null)
    const [imgPhoto, setImgPhoto] = useState(null)
    const [imgPasportURL, setImgPasportURL] = useState([])
    const [imgPhotoURL, setImgPhotoURL] = useState([])

    const { push } = useRouter()

    // console.log('reset', reset)
    // console.log('validation', validation)
    // console.log('submitPressed', submitPressed)

    const getImgUrl = (val) => {
        const storageRef1 = refStorage(storage, `images/${val}/pasport-${imgPasport?.name}`)
        const storageRef2 = refStorage(storage, `images/${val}/photo-${imgPhoto?.name}`)

        uploadBytes(storageRef1, imgPasport).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                //alert(url)
                setImgPasportURL((prev) => [...prev, url])
            })
        })

        uploadBytes(storageRef2, imgPhoto).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                //alert(url)
                setImgPhotoURL((prev) => [...prev, url])
            })
        })
    }

    useEffect(() => {
        if (send !== true && form.current && submitPressed === true && imgPasport !== undefined && imgPasport !== null && imgPhoto !== undefined && imgPhoto !== null) {
            getImgUrl(userID)

            // console.log(imgPasportURL)
            // console.log(imgPhotoURL)
        }
    }, [form.current, imgPasport, imgPhoto, send, submitPressed])


   
    console.log(imgPasportURL)
    console.log(imgPhotoURL)

    const handleSubmit = () => {

        setSubmit(prev => !prev)
        setSubmitPressed(true)

        if (form.current) {
            
            const kyc_first_name = form.current.kyc_first_name.value
            const kyc_last_name = form.current.kyc_last_name.value
            const kyc_dbirth = form.current.kyc_dbirth.value
            const kyc_gender = form.current.kyc_gender.value
            const kyc_policy = form.current.kyc_policy.checked

            if (!formSend && validation && imgPasportURL.length > 0 && imgPhotoURL.length > 0){
                saveMessages(userID, kyc_first_name, kyc_last_name, userEmail, kyc_dbirth, kyc_gender, imgPasportURL, imgPhotoURL)
                
            }  form.current.reset()

            if (validation === false) {
                setSubmitPressed(false)
            }
            
            //    alert(imgPasport?.name)
            //    alert(imgPhoto?.name)
        }
    }

    useEffect(() => {
        if (imgPhotoURL.length > 0 && imgPasportURL.length > 0 ) {
            handleSubmit()
        }
    }, [imgPasportURL, imgPhotoURL])

    useEffect(() => {

        reset && submitPressed && localStorage.setItem('kyc_form_send', true)
        reset && submitPressed && push('/robotic-trading')
        setSend(formSend === 'true')

    }, [reset, submitPressed])


    const saveMessages = (userID, kyc_first_name, kyc_last_name, userEmail, kyc_dbirth, kyc_gender, imgPasportURL, imgPhotoURL) => {


        set(ref(database, 'kycForm/' + userID), {
            kyc_first_name: kyc_first_name,
            kyc_last_name: kyc_last_name,
            kyc_email: userEmail,
            kyc_dbirth: kyc_dbirth,
            kyc_gender: kyc_gender,
            kyc_pasport: imgPasportURL,
            kyc_photo: imgPhotoURL,
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

                <form action="/" method="POST" className={`${styles.form} ${send && styles.disabled}`} noValidate name="kycForm" id="kycForm" ref={form}>

                    <div className={styles.form__fields_wrapper}>
                        <div className={styles.form__row}>
                            <Input type='text' label='First name*' placeholder='Type your name...' id='kyc_first_name' error='Only latin letters' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} pattern={field_text_exp} disabled={send}/>

                            <Input type='text' label='Last name*' placeholder='Type your last name...' id='kyc_last_name' error='Only latin letters' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} pattern={field_text_exp} disabled={send}/>
                        </div>

                        <div className={styles.form__row}>
                            {/* <Input type='text' label='Date of Birth*' placeholder='MM-DD-YYYY' id='kyc_bday' error='Required field' required={true}/> */}
                            <Date label='Date of Birth*' id='kyc_dbirth' />

                            {/* <Input type='text' label='Gender*' placeholder='Choose your sex...' id='bot_name' error='Required field' required={true}/> */}
                            <Select label='Gender*' data={gender} id='kyc_gender' disabled={send}/>
                        </div>

                        <div className={styles.form__row}>
                            <Input type='file' label='Pasport*' placeholder='Attach photo...' id='kyc_pasport' error='Only Jpg, Png less then 1MB' required={true} icon={<PlusIcon width="15" height="15" />} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} onImgSet={(e) => setImgPasport(e)} disabled={send}/>

                            <Input type='file' label='Persone photo*' placeholder='Attach photo...' id='kyc_photo' error='Only Jpg, Png less then 1MB' required={true} icon={<PlusIcon width="15" height="15" />} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} onImgSet={(e) => setImgPhoto(e)} disabled={send}/>
                        </div>
                    </div>

                    <Checkbox label='Public offer' id='kyc_policy' error='Required field' submit={submit} setSubmit={setSubmit} validate={setValidation} reset={reset} setReset={setReset} />

                    <div className={styles.form__note}>
                        We are pleased to present you our Public Offer - an important document that governs the relationship between us as a service provider and you as our client. We invite you to familiarize yourself with its content, as it determines the terms of use of our platform and the provision of our services to you.
                    </div>

                    <Btn label='Confirm' onClick={handleSubmit} disabled={send} />


                </form>

                {reset && submitPressed || send && <Nottification type="success" label='Your data send!' />}

            </div>
        </div>
    )
}
