import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { ref, database, storage, set, uploadBytes, refStorage,  getDownloadURL  } from '../../../pages/_firebase'
import { getSPKey } from '../../../pages/_send-pulse'


// import Link from 'next/link'
import Input from '../Input'
import Select from '../Select'
import Checkbox from '../Checkbox'
import Date from '../DateField'
import Btn from '../Btn'
import Nottification from '../Nottifications'


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
    const [submitPressed, setSubmitPressed] = useState<any>(false)
    const [reset, setReset] = useState(true)
    const [send, setSend] = useState<boolean>(false)
    const formSend = localStorage.getItem('kyc_form_send')

    const [imgPasport, setImgPasport] = useState<File | null>(null)
    const [imgPhoto, setImgPhoto] = useState<File | null>(null)
    const [imgPasportURL, setImgPasportURL] = useState<string[]>([])
    const [imgPhotoURL, setImgPhotoURL] = useState<string[]>([])

    const { push } = useRouter()

    // console.log('reset', reset)
    // console.log('validation', validation)
    // console.log('submitPressed', submitPressed)

    const getImgUrl = (val: any) => {
        const storageRef1 = refStorage(storage, `images/${val}/pasport-${imgPasport?.name}`)
        const storageRef2 = refStorage(storage, `images/${val}/photo-${imgPhoto?.name}`)
        if (imgPasport !== null) {
        uploadBytes(storageRef1, imgPasport).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                //alert(url)
                setImgPasportURL((prev) => [...prev, url])
            })
        })
    }
    if (imgPhoto !== null) {
        uploadBytes(storageRef2, imgPhoto).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                //alert(url)
                setImgPhotoURL((prev) => [...prev, url])
            })
        })
    }
    }

    useEffect(() => {
        if (send !== true && form.current && submitPressed === true && imgPasport !== undefined && imgPasport !== null && imgPhoto !== undefined && imgPhoto !== null) {
            getImgUrl(userID)
        }
    }, [form.current, imgPasport, imgPhoto, send, submitPressed])


   
    // console.log(imgPasportURL)
    // console.log(imgPhotoURL)

    const handleSubmit = () => {

        setSubmit(prev => !prev)
        setSubmitPressed(true)

        if (form.current) {
            
            const kyc_first_name = (form.current as any).kyc_first_name.value
            const kyc_last_name = (form.current as any).kyc_last_name.value
            const kyc_dbirth = (form.current as any).kyc_dbirth.value
            const kyc_gender = (form.current as any).kyc_gender.value
            const kyc_policy = (form.current as any).kyc_policy.checked

            if (!formSend && validation && imgPasportURL.length > 0 && imgPhotoURL.length > 0){
                saveMessages(userID, kyc_first_name, kyc_last_name, userEmail, kyc_dbirth, kyc_gender, imgPasportURL, imgPhotoURL)
                setSend(true)
            }  
            
            if(send === true){
                (form.current as any).reset()
                setReset(true)
                submitPressed(true)
            }

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
        if (send === true) {
            push('/robotic-trading')
            localStorage.setItem('kyc_form_send', send.toString())
        }
    }, [send])

    const saveMessages = (userID: any, kyc_first_name: any, kyc_last_name: any, userEmail: any, kyc_dbirth: any, kyc_gender: any, imgPasportURL: any, imgPhotoURL: any) => {


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
                    Уважаемый клиент,
                </p>

                <p>
                    Мы хотели бы поделиться с вами информацией о процессе KYC (Know Your Customer) и системе безопасности, которую мы применяем на нашей платформе. Эти меры предпринимаются для обеспечения безопасности ваших финансовых операций и защиты от возможных мошеннических действий.
                </p>
            </div>
            <div className={styles.form__fields}>

                <form action="/" method="POST" className={`${styles.form} ${formSend && styles.disabled}`} noValidate name="kycForm" id="kycForm" ref={form} autoComplete='off'>

                    <div className={styles.form__fields_wrapper}>
                        <div className={styles.form__row}>
                            <Input type='text' label='Имя*' placeholder='Введите ваше имя...' id='kyc_first_name' error='Только латинские буквы' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} pattern={field_text_exp} disabled={formSend}/>

                            <Input type='text' label='Фамилия*' placeholder='Введите вашу фамилию...' id='kyc_last_name' error='Только латинские буквы' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} pattern={field_text_exp} disabled={formSend}/>
                        </div>

                        <div className={styles.form__row}>
                            {/* <Input type='text' label='Date of Birth*' placeholder='MM-DD-YYYY' id='kyc_bday' error='Обязательное поле' required={true}/> */}
                            <Date label='Дата рождения*' id='kyc_dbirth' />

                            {/* <Input type='text' label='Gender*' placeholder='Choose your sex...' id='bot_name' error='Обязательное поле' required={true}/> */}
                            <Select label='Пол*' data={gender} id='kyc_gender' disabled={formSend}/>
                        </div>

                        <div className={styles.form__row}>
                            <Input type='file' label='Паспорт*' placeholder='Прикрепите фотографию...' id='kyc_pasport' error='Только Jpg, Png меньше чем 1MB' required={true} icon={<PlusIcon width="15" height="15" />} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} onImgSet={(e: any) => setImgPasport(e)} disabled={formSend}/>

                            <Input type='file' label='Ваша фотография*' placeholder='Прикрепите фотографию...' id='kyc_photo' error='Только Jpg, Png меньше чем 1MB' required={true} icon={<PlusIcon width="15" height="15" />} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} onImgSet={(e: any) => setImgPhoto(e)} disabled={formSend}/>
                        </div>
                    </div>

                    <Checkbox label='Публичная оферта' id='kyc_policy' error='Обязательное поле' submit={submit} setSubmit={setSubmit} validate={setValidation} reset={reset} setReset={setReset} />

                    <div className={styles.form__note}>
                        Мы рады представить вам наше Публичное предложение - важный документ, который регулирует отношения между нами в качестве поставщика услуг и вами в качестве нашего клиента. Мы приглашаем вас ознакомиться с его содержанием, поскольку он определяет условия использования нашей платформы и предоставления наших услуг вам.
                    </div>

                    <Btn label='Подтвердить' onClick={handleSubmit} disabled={formSend} />


                </form>

                {reset && submitPressed || formSend && <Nottification type="success" label='Your data send!' />}

            </div>
        </div>
    )
}
