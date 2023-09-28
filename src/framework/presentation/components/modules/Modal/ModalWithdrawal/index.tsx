import { useState, useEffect, useRef } from 'react'

import { ref, database, set, auth, remove, firestore, collection, doc, setDoc } from '../../../../../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import { getSPKey } from '../../../../../../pages/_send-pulse'

import ClickAwayListener from '@mui/base/ClickAwayListener'
import Btn from '../../Form/Btn'
import Input from '../../Form/Input'

import CloseIcon from '../../../assets/icons/close.svg'
import CheckIcon from '../../../assets/icons/check.svg'

import styles from './modal.module.sass'

function getRandom(min: number, max: number) {
    const range = max - min + 1
    const randomValue = Math.floor(Math.random() * range) + min
    return randomValue
}

export default function ModalWithdrawal({ openModal, setModalOpen, toggleModal, totalBalance, botID, setDelBot, setWithdrawal }: any) {
    const [user] = useAuthState(auth)
    const userID = user?.uid
    const userEmail = user?.email


    const handleClose = () => { setModalOpen(false) }

    const [balance, setBalance] = useState(totalBalance || 0)

    //console.log('totalBalance', totalBalance)

    const form = useRef(null)

    const [validation, setValidation] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [submitPressed, setSubmitPressed] = useState(false)
    const [reset, setReset] = useState(true)
    const [error, setError] = useState(false)


    //DELETE FROM FIREBASE RTDB
    const botRef = ref(database, 'addBotForm/' + userID + '/' + botID);

    const delBot = () => {
        remove(botRef)
            .then(() => {
                console.log('Node successfully deleted!');
            })
            .catch((error) => {
                console.error('Error removing node:', error);
            });
    }

    useEffect(() => {
        if (totalBalance !== undefined) {
            setBalance(totalBalance)
        }
    }, [totalBalance])


    //SEND TO FIRESTORE
    const addBotToFirestore = async (data: any) => {
        try {
            const collectionRef = collection(firestore, 'NewWithdrawal')
            const db = doc(collectionRef)

            // Set the data in Firestore
            await setDoc(db, data)

            console.log('Data written to Firestore successfully.')
        } catch (error) {
            console.error('Error writing data to Firestore:', error)
        }
    }

    //SEND TO FIREBASE RTDB
    const saveMessages = (bot_withdrawal: any, bot_balance: any, wallet: any) => {

        set(ref(database, 'addWithdrawalForm/' + userID + '/' + getRandom(1, 1000)), {
            user_id: userID,
            user_email: userEmail,
            user_wallet: wallet,
            bot_id: botID,
            bot_withdrawal: bot_withdrawal,
            bot_balance: bot_balance,
            bot_time: Date.now()
        })

        if (bot_withdrawal.replace(',', '.') >= totalBalance) {
            delBot()
            setDelBot((prev: any) => !prev)
            setWithdrawal(0)
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        //onInputField(e)

        setSubmit(prev => !prev)
        setSubmitPressed(true)

        if (form.current) {
            const withdrawal_wallet = (form.current as any).withdrawal_wallet.value.trim().replaceAll(/\s+/g, ' ')
            const withdrawal_sum = (form.current as any).withdrawal_sum.value

            if (withdrawal_sum > totalBalance) {
                setValidation(false)
                setError(true)
                //form.current.reset()
            } else if (validation) {
                setError(false)

                toggleModal(withdrawal_sum)

                addBotToFirestore({
                    user_id: userID,
                    user_email: userEmail,
                    bot_id: botID,
                    bot_withdrawal: withdrawal_sum,
                    bot_balance: totalBalance,
                    wallet: withdrawal_wallet
                })

                const SPdata = {
                    user_id: userID,
                    user_email: userEmail,
                    bot_id: botID,
                    bot_balance: totalBalance,
                    bot_withdrawal: withdrawal_sum,
                    user_wallet: withdrawal_wallet
                }
                // getSPKey('withdrawal', SPdata)

                saveMessages(withdrawal_sum, totalBalance, withdrawal_wallet);

                (form.current as any).reset()
                setModalOpen(false)
            }
        }
    }

    return (
        openModal && <section className={styles.modal}>
            <ClickAwayListener onClickAway={handleClose}>
                <div className={styles.modal__content}>

                    <CloseIcon className={styles.modal__close} width="25" height="25" onClick={handleClose} />

                    <div className={styles.modal__text}>
                        Our terms allow for withdrawal of earned funds once a month. This means that you can request a withdrawal of funds earned on our platform once during each calendar month.
                    </div>

                    <form action="/" method="POST" noValidate name="FormWithdrawal" id="FormWithdrawal" className={styles.form} ref={form} autoComplete='off'>
                        <div className={styles.form__row}>
                            <Input type='text' label='TRC20 Wallet Address*' placeholder='' id='withdrawal_wallet' error='Обязательное поле' required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                        </div>
                        <div className={styles.form__row}>
                            <Input type='text' label='Sum*' placeholder='' id='withdrawal_sum' error={`It should be less than the ${balance} USDT.`} required={true} reset={reset} setReset={setReset} submit={submit} setSubmit={setSubmit} validate={setValidation} />
                        </div>

                        {error && <div className={styles.form__note}>
                            {`It should be less than the ${balance} USDT`}
                        </div>}

                        <div className={styles.modal__note}>
                            *We guarantee that the funds transfer will be processed within 24 hours upon receiving your withdrawal request. We make every effort to ensure fast and reliable processing of your transactions and transfers.
                        </div>
                        <Btn label='Send' onClick={handleSubmit} />
                    </form>
                </div>
            </ClickAwayListener>
        </section>

    )
}
