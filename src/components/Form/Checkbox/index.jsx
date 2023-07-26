import { useState, useEffect } from 'react'
import Input from '@mui/base/Input'

import InfoIcon from '../../../assets/icons/info.svg'
import styles from './checkbox.module.sass'

export default function CheckboxField({ label, error, id, submit, setSubmit, validate, reset}) {
    const [checked, setChecked] = useState(false)
    const [showError, setShowError] = useState(false)

    const onClick = () => {
        setChecked(prev => !prev)
    }
    
    const onChange = () => {
        if(checked === false){ setShowError(true); setSubmit(false); } else { setShowError(false); }
    }

    if(checked === false){
        validate(false); 
    } else {
        validate(true);
    }

    useEffect(() => {
        if (submit === true) { onChange(); }
    }, [submit])



    useEffect(() => {
        setChecked(false)
        setShowError(false)
    }, [reset])

    //alert(reset)

    return (
        <div className={styles.field}>
            <Input name={id} id={id} type="checkbox" value={checked} className={`${styles.checkbox} ${checked ? styles.checked : '' || showError ? styles.error : ''}`} checked onChange={onChange} />
            <label htmlFor={id} className={styles.label} onClick={onClick}>
               <span><b></b></span> {label}
            </label>
            {/* { error && showError &&
                <div className={styles.error}>
                   <InfoIcon width="12" height="12" /> <span>{error}</span>
                </div>
            } */}
        </div>
    )
}
