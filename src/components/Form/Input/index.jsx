import Input from '@mui/base/Input'

import InfoIcon from '../../../assets/icons/info.svg'
import styles from './input.module.sass'

export default function InputField({ type, label, placeholder, note, error, id }) {
    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <Input name={id} id={id} type={type} placeholder={placeholder} className={`${styles.input}`}/>
            <div>
                { note && <div className={styles.note}>
                    <InfoIcon width="12" height="12" /> <span>{note}</span>
                </div> }
                { error && <div className={styles.error}>
                <InfoIcon width="12" height="12" /> <span>{error}</span>
                </div> }
            </div>
        </div>
    )
}
