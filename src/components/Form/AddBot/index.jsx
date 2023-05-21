// import Link from 'next/link'
import Image from 'next/image'

import Input from '../../Form/Input'
import Btn from '../../Form/Btn'
import Nottification from '../Nottifications'

import QrImg from '../../../assets/img/qr.jpg'
import CopyIcon from '../../../assets/icons/copy.svg'

import { useState, useRef } from 'react'

import styles from './addBot.module.sass'

import { ref, database, set } from '../../../pages/_firebase'

export default function AddBot() {
    const field_sum_exp = /[^0-9.,]|(?<=([.,])\d*)[.,]/g
    const field_text_exp = /[^a-zA-Z0-9\w]/g
    
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

    const wallet = 'TUadP2NaG8zTEupnFbAXp11uAEJbEafbiN'
    const copyTextToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            console.log('Text copied successfully')
        } catch (error) {
            console.error('Failed to copy text:', error)
        }
    }

    const handleCopyClick = (e) => {
       copyTextToClipboard(wallet)
    }


    //console.log('reset', reset)
    //console.log('validation', validation)
    //console.log('submitPressed', submitPressed)

    const handleSubmit = (e) => {
            e.preventDefault()
            //onInputField(e)
            setUserId(getRandomInteger(1, 10000))

            setSubmit(prev => !prev)
            setSubmitPressed(true)
            
           
            if(form.current){
                const add_bot_name = form.current.add_bot_name.value.trim().replaceAll(/\s+/g, ' ')
                const add_bot_sum = form.current.add_bot_amount.value
                const add_bot_hash = form.current.add_bot_hash.value
                
                setUserId(prev => prev + 1)

                validation && saveMessages( userId, add_bot_name, add_bot_sum, add_bot_hash)

                form.current.reset()
                
                if(validation === false){
                    setSubmitPressed(false)
                }
             
            }
        }

        const saveMessages = (userId, add_bot_name, add_bot_sum, add_bot_hash) => {

            set(ref(database, 'addBotForm/' + userId), {
                add_bot_name: add_bot_name, 
                add_bot_sum: add_bot_sum, 
                add_bot_hash: add_bot_hash, 
            })
        }


    return (
        <div className={styles.form__wrapper}>
            <div className={styles.form__fields}>

                <form action="/" method="POST" className={styles.form} noValidate  name="addBotForm" id="addBotForm" ref={form}>

                    <div className={styles.form__fields_wrapper}>

                        <div className={styles.form__row}>
                            <Input type='text' label='Bot name*' placeholder='' id='add_bot_name' pattern={field_text_exp} error='Required. Only latin letters' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation}/>
                        </div>

                        <div className={styles.form__row}>
                            <Input type='text' label='Enter the replenishment amount*' placeholder='' id='add_bot_amount' error='Required. Only numbers. Wrong format' pattern={field_sum_exp} required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation}/>
                        </div>

                        <div className={styles.form__row_cols}>

                            <div>
                                <div className={styles.form__row} onClick={handleCopyClick}>
                                    <Input type='text' label='TRC-20 Address:' placeholder={wallet} value={wallet}  id='add_bot_wallet' disabled={true} icon={<CopyIcon width='20' height='20' />} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation}/>
                                </div>

                                <div className={styles.form__row}>
                                    <Input type='text' label='Specify hash or transaction number*' placeholder='' id='add_bot_hash' error='Required Field' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation}/>
                                </div>

                                <Btn label='Confirm' onClick={handleSubmit}/>
                            </div>

                            <div className={styles.form__img}>
                                <Image src={QrImg} alt='qr' width='215' height='200' />
                            </div>


                        </div>

                    </div>


                </form>
                { reset && submitPressed && <Nottification type="success" label='Your data send!'/> }

            </div>
        </div>
    )
}
