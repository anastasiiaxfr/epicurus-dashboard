import { useState, useEffect, useRef } from 'react'
import Input from '@mui/base/Input'

import InfoIcon from '../../../assets/icons/info.svg'
import Nottification from '../Nottifications'
import styles from './input.module.sass'

export default function InputField({ type, label, placeholder, value, note, error, id, required, disabled, icon, onClick, pattern, validate, submit,  setSubmit, reset, setReset, onImgSet }) {
    const [newValue, setNewValue] = useState(value)
    const [showError, setShowError] = useState(false)
    const [fileAttached, setFileAttached] = useState(false)
    const [checkPattern, setCheckPattern] = useState(true)

    const input = useRef(null)

    const onChange = () => {
        const currentInput = input.current

        if (currentInput?.disabled !== true) {
            if (currentInput?.value?.length === 0) {
                setShowError(true)
            } else if (pattern && currentInput.value.match(pattern)) {
                setShowError(true)
                setNewValue('')
                setCheckPattern(false)
            } else if (pattern && !currentInput.value.match(pattern)) {
                setNewValue(value)
                setShowError(false)
                setCheckPattern(true)
            }
            else {
                setShowError(false)
            }
        }

        if (type === 'file') {
            if(currentInput?.files[0] && (currentInput?.files[0].size / 1024 / 1024)?.toFixed(1) > 1){ setShowError(true); setFileAttached(false) } else if(currentInput?.files[0] === undefined || currentInput?.files[0].size === 0){ setFileAttached(false); setShowError(true) } else { setFileAttached(true) }
            
            
            onImgSet(currentInput?.files[0])
        }

        if(reset === false){
            setShowError(false)
        }

        const allInputs = Array.from(document.querySelectorAll('input'))
        const anyEmptyInput = allInputs.some((input) => input.value === '')
        if (anyEmptyInput === false && checkPattern) { validate(true); setReset(false);  } else { validate(false); setSubmit(false); setReset(true); }

    }

    useEffect(() => {
        if (submit === true) { onChange(); }
    }, [submit])

    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>

            <div className={styles.wrap}>
                <Input name={id} id={id} type={type} placeholder={placeholder} value={newValue} disabled={disabled} required={required} className={styles.input} autoComplete='off' onClick={onClick} onChange={onChange} slotProps={{ input: { pattern: pattern,  ref: input, ...(type === 'file' && { accept: 'image/jpeg, image/png' }) } }} />
                {icon}
                {type === 'file' && <span className={styles.input__placeholder}>{fileAttached === true ? 'File added' : placeholder}</span>}
            </div>

            {note || error && showError && <div className={styles.info}>
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
