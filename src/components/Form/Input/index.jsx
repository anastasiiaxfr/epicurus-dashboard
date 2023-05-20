import { useState } from 'react'
import Input from '@mui/base/Input'

import InfoIcon from '../../../assets/icons/info.svg'
import Nottification from '../Nottifications'
import styles from './input.module.sass'

export default function InputField({ type, label, placeholder, value, note, error, id, required, disabled, icon, onClick, pattern }) {
    const [newValue, setNewValue] = useState(value)
    const [showError, setShowError] = useState(false)
    const [fileAttached, setFileAttached] = useState(false)

    const onChange = (e) => {
        if (type === 'file') {
            (e.target.files[0] && e.target.files[0].size / 1024).toFixed(1) > 150 ? setShowError(true) : setShowError(false); setFileAttached(true)
        }
        if (pattern) { setNewValue(e.target.value.replace(/[^0-9.,]|(?<=([.,])\d*)[.,]/g, '')) }
    }


    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>

            <div className={styles.wrap}>
                <Input name={id} id={id} type={type} placeholder={placeholder} value={newValue} disabled={disabled} required={required} className={styles.input} autoComplete='off' onClick={onClick} onChange={onChange} slotProps={{ input: { pattern: pattern, ...(type === 'file' && { accept: 'image/jpeg, image/png' }) } }} />
                {icon}
                {type === 'file' && <span className={styles.input__placeholder}>{fileAttached === true ? 'File added' : placeholder}</span>}
            </div>

            { note || error && showError && <div className={styles.info}>
                {note && <div className={styles.note}>
                    <InfoIcon width="12" height="12" /> <span>{note}</span>
                </div>}
                {error && showError &&
                    <Nottification label={error} type='error' />
                }
            </div>
            }
        </div>
    )
}
