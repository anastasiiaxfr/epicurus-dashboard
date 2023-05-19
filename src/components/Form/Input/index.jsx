import { useState } from 'react'
import Input from '@mui/base/Input'

import InfoIcon from '../../../assets/icons/info.svg'
import styles from './input.module.sass'

export default function InputField({ type, label, placeholder, value, note, error, id, required, disabled, icon, onClick, pattern }) {
    const [newValue, setNewValue] = useState(value)
    const onChange = (e) => {
        pattern && setNewValue(e.target.value.replace(/[^0-9.,]|(?<=([.,])\d*)[.,]/g, ''))
    }
    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>

            <div className={styles.wrap}>
                <Input name={id} id={id} type={type} placeholder={placeholder} value={newValue} disabled={disabled} required={required} className={`${styles.input}`} autoComplete='off' onClick={onClick} onChange={onChange} slotProps={{ input: { pattern: pattern } }}/>
                {icon}
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
