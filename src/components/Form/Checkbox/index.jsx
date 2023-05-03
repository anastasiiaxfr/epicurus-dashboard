import { useState } from 'react'
import Input from '@mui/base/Input'

import InfoIcon from '../../../assets/icons/info.svg'
import styles from './checkbox.module.sass'

export default function CheckboxField({ label, error, id }) {
    const [checked, setChecked] = useState(false)
    const onClick = () => {
         setChecked(prev => !prev)
    }
    
    return (
        <div className={styles.field}>
            <Input name={id} id={id} type="checkbox" className={`${styles.checkbox} ${checked ? styles.checked : ''} `} checked />
            <label htmlFor={id} className={styles.label} onClick={onClick}>
               <span><b></b></span> {label}
            </label>
            { error &&
                <div className={styles.error}>
                   <InfoIcon width="12" height="12" /> <span>{error}</span>
                </div>
            }
        </div>
    )
}
