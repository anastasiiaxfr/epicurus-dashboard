import { useState } from 'react'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import styles from './date.module.sass'

export default function DateField({ label, id }) {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>

            <div className={styles.wrap}>
                <DatePicker className={styles.input} id={id}name={id} popperPlacement="bottom" selected={startDate} onChange={(date) => setStartDate(date)}  />
            </div>
        </div>
    )
}
