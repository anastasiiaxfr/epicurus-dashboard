import { useState } from 'react'

import DatePeriodField from '../../Form/DatePeriod'
import Btn from '../../Form/Btn'
import Nottification from '../Nottifications'

import styles from './styles.module.sass'

export default function FormPeriod() {
    const [shown, setShown] = useState(true)

    const onPeriodSelected = () => {

    }
  
    return (
        <div className={styles.formPeriod}>
            <DatePeriodField id='bot_period' className={styles.formPeriod__date} type='period' />
            <Btn label='Search' onClick={onPeriodSelected}/>
            <Nottification label='less than 1 week left' type='error' shown={shown} />
        </div>
    )
}
