import { useState } from 'react'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import styles from './date.module.sass'

export default function DatePeriodField({ label, id, type }) {
    const [startDate, setStartDate] = useState(new Date())
    const [dateRange, setDateRange] = useState([new Date(), new Date()])
    const [startPeriodDate, endPeriodDate] = dateRange
    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>

            <div className={styles.wrap}>
                {type === 'period' ?
                    <DatePicker
                        selectsRange={true}
                        startDate={startPeriodDate}
                        endDate={endPeriodDate}
                        onChange={(update) => {
                            setDateRange(update);
                        }}
                        isClearable={true}
                        className={styles.input} 
                        id={id} 
                        name={id} 
                        popperPlacement="bottom"
                    /> :
                    <DatePicker className={styles.input} id={id} name={id} popperPlacement="bottom" selected={startDate} onChange={(date) => setStartDate(date)} />
                }
            </div>
        </div>
    )
}
