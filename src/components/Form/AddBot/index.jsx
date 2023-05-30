// import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

import { ref, database, set, auth, onValue, firestore, collection, doc, setDoc } from '../../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import { getSPKey } from '../../../pages/_send-pulse'

import Image from 'next/image'

import Input from '../../Form/Input'
import Btn from '../../Form/Btn'
import Nottification from '../Nottifications'
import ModalConfirmation from '../../Modal/ModalConfirmation'

import ClickAwayListener from '@mui/base/ClickAwayListener'

import QrImg from '../../../assets/img/qr.jpg'
import CopyIcon from '../../../assets/icons/copy.svg'


import styles from './addBot.module.sass'

function getRandom(min, max) {
    const range = max - min + 1
    const randomValue = Math.floor(Math.random() * range) + min
    return randomValue
}


const modalInfo = {
    title: 'Wait for confirmation',
    text: 'It will take 24 hours',
    btnText: 'Okay',
    btnUrl: '#'
}

export default function AddBot() {
    const [user] = useAuthState(auth)
    const userID = user?.uid
    const userEmail = user?.email

    const field_sum_exp = /[^0-9.,]|(?<=([.,])\d*)[.,]/g
    const field_text_exp = /[^a-zA-Z0-9\w]/g


    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)

    const form = useRef(null)

    const [validation, setValidation] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [submitPressed, setSubmitPressed] = useState(false)
    const [reset, setReset] = useState(true)
    const [copy, setCopy] = useState(false)

    const wallet = 'TXLbP1LtvV6pjRfFJVeJU67EssCTH5d1P2' //FIXME
    const copyTextToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            //console.log('Text copied successfully')
        } catch (error) {
            //console.error('Failed to copy text:', error)
        }
    }

    const handleCopyClick = (e) => {
        copyTextToClipboard(wallet)
        setCopy(true)
    }

    const addBotToFirestore = async (data) => {
        try {
            const collectionRef = collection(firestore, 'NewBot')
            const db = doc(collectionRef)

            // Set the data in Firestore
            await setDoc(db, data)

            console.log('Data written to Firestore successfully.')
        } catch (error) {
            console.error('Error writing data to Firestore:', error)
        }
    }

    //console.log('reset', reset)
    //console.log('validation', validation)
    //console.log('submitPressed', submitPressed)

    const handleSubmit = (e) => {
        e.preventDefault()
        //onInputField(e)

        setSubmit(prev => !prev)
        setSubmitPressed(true)

        if (form.current) {
            const add_bot_name = form.current.add_bot_name.value.trim().replaceAll(/\s+/g, ' ')
            const add_bot_sum = form.current.add_bot_amount.value
            const add_bot_hash = form.current.add_bot_hash.value
            if (validation) {
                saveMessages(userID, add_bot_name, add_bot_sum, add_bot_hash, userEmail)

                addBotToFirestore({
                    user_id: userID,
                    user_email: userEmail,
                    bot_name: add_bot_name
                })

                const variableData = {
                    "email": userEmail,
                    "variables": [
                      {
                        "name": 'new_bot',
                        "value": add_bot_name
                      }
                    ]
                }

                //alert(variableData.email)

                getSPKey('new-bot', variableData)
            }

            form.current.reset()

            if (validation === false) {
                setSubmitPressed(false)
            }

        }
    }

    const saveMessages = (userID, add_bot_name, add_bot_sum, add_bot_hash, userEmail) => {

        set(ref(database, 'addBotForm/' + userID + '/' + getRandom(1, 1000)), {
            add_bot_name: add_bot_name,
            add_bot_sum: add_bot_sum,
            add_bot_hash: add_bot_hash,
            kyc_email: userEmail,
            kyc_uid: userID,
        })
    }

    useEffect(() => {
        reset && submitPressed && handleOpen()
    }, [reset, submitPressed])


    return (
        <div className={styles.form__wrapper}>

            <ModalConfirmation openModal={open} setModalOpen={setOpen} props={modalInfo}>
            </ModalConfirmation>

            <div className={styles.form__fields}>

                <form action="/" method="POST" className={styles.form} noValidate name="addBotForm" id="addBotForm" ref={form} autoComplete='off'>

                    <div className={styles.form__fields_wrapper}>

                        <div className={styles.form__row}>
                            <Input type='text' label='Bot name*' placeholder='' id='add_bot_name' pattern={field_text_exp} error='Required. Only latin letters' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                        </div>

                        <div className={styles.form__row}>
                            <Input type='text' label='Enter the replenishment amount*' placeholder='' id='add_bot_amount' error='Required. Only numbers. Wrong format' pattern={field_sum_exp} required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                        </div>

                        <div className={styles.form__row_cols}>

                            <div>
                                <ClickAwayListener onClickAway={() => setCopy(false)}>
                                    <div className={`${styles.form__row} ${copy && styles.copied}`} onClick={handleCopyClick}>
                                        <Input type='text' label='TRC-20 Address:' placeholder={wallet} value={wallet} id='add_bot_wallet' disabled={true} icon={<CopyIcon width='20' height='20' />} />
                                    </div>
                                </ClickAwayListener>


                                <div className={styles.form__row}>
                                    <Input type='text' label='Specify hash or transaction number*' placeholder='' id='add_bot_hash' error='Required Field' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                                </div>

                                <Btn label='Confirm' onClick={handleSubmit} />
                            </div>

                            <div className={styles.form__img}>
                                <Image src={QrImg} alt='qr' width='215' height='200' />
                            </div>


                        </div>

                    </div>


                </form>
                {reset && submitPressed && <Nottification type="success" label='Your data send!' />}

            </div>
        </div>
    )
}
