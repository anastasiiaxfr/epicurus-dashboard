import Link from 'next/link'
import UserIcon from '../../assets/icons/user.svg'
import styles from './ava.module.sass'

export default function Ava({ onClick, name }) {
    return (
        <Link href="/settings">
            <div className={styles.ava} onClick={onClick}>
                <div className={styles.ava_logo}>
                    <UserIcon width="27" height="27"/>
                </div>
                <div className={styles.ava_title}>
                    {name}
                </div>

            </div>
        </Link>
    )
}
