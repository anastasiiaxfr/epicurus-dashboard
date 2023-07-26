import InfoIcon from '../../../assets/icons/info.svg'

import styles from './select.module.sass'


export default function Nottification({ label, type, shown = true}) {

    return (
        shown && <div className={`${styles.nottification} ${styles[type]}`}>
           {type !== 'note' && <InfoIcon width="15" height="15" />} { label }
        </div>
    )
}
