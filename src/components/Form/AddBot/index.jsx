// import Link from 'next/link'
import Image from 'next/image'

import Input from '../../Form/Input'
import Btn from '../../Form/Btn'

import QrImg from '../../../assets/img/qr.jpg'
import CopyIcon from '../../../assets/icons/copy.svg'


import styles from './addBot.module.sass'

export default function AddBot() {

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



    return (
        <div className={styles.form__wrapper}>
            <div className={styles.form__fields}>

                <form action="/" method="POST" className={styles.form} noValidate>

                    <div className={styles.form__fields_wrapper}>

                        <div className={styles.form__row}>
                            <Input type='text' label='Bot name*' placeholder='' id='add_bot_name' error='Only latin letters' required={true} />
                        </div>

                        <div className={styles.form__row}>
                            <Input type='text' label='Enter the replenishment amount*' placeholder='' id='add_bot_amount' error='Only numbers' pattern="[0-9]+([.,][0-9]+)?" required={true} />
                        </div>

                        <div className={styles.form__row_cols}>

                            <div>
                                <div className={styles.form__row} onClick={handleCopyClick}>
                                    <Input type='text' label='TRC-20 Address:' placeholder={wallet} value={wallet}  id='add_bot_wallet' disabled={true} icon={<CopyIcon width='20' height='20' />} />
                                </div>

                                <div className={styles.form__row}>
                                    <Input type='text' label='Specify hash or transaction number*' placeholder='' id='add_bot_hash' error='Required Field' required={true} />
                                </div>

                                <Btn label='Confirm' />
                            </div>

                            <div className={styles.form__img}>
                                <Image src={QrImg} alt='qr' width='215' height='200' />
                            </div>


                        </div>

                    </div>


                </form>

            </div>
        </div>
    )
}
