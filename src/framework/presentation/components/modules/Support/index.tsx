import styles from './styles.module.sass'
import IconSupport from '../../assets/icons/support.svg'
import Link from "next/link";

export default function Support() {
    return (
       <Link className={styles.support} href="https://t.me/+J9vxZa6TKRQ0N2Ey">
            <IconSupport width="38" height="38" />
       </Link>
    )
}
