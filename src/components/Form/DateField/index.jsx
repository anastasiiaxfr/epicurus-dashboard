import { useState } from 'react'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import InfoIcon from '../../../assets/icons/info.svg'
import styles from './date.module.sass'

export default function InputField({ label, error, note, id }) {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>

            <div className={styles.wrap}>
                <DatePicker className={styles.input} popperPlacement="bottom" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>

            <div>
                {note && <div className={styles.note}>
                    <InfoIcon width="12" height="12" /> <span>{note}</span>
                </div>}
                {error && <div className={styles.error}>
                    <InfoIcon width="12" height="12" /> <span>{error}</span>
                </div>}
            </div>
        </div>
    )
}
