import Input from '@mui/base/Input'
import Link from 'next/link'

import styles from './btn.module.sass'

export default function BtnField({ type, label, link }) {
    return (

        type === 'submit' ? (
            <Input type='submit' className={styles.btn} value={label} />
        ) : type === 'link' ?
            <Link href={link} className={styles.btn_link}>{label}</Link> : type === 'reset' ? <Input type='button' className={styles.btn_link} value={label} /> : <Input type='button' className={styles.btn} value={label} />

    )
}
