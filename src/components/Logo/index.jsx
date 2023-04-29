import Link from 'next/link'
import LogoIcon from './logo.svg'
import styles from './logo.module.sass'

export default function Logo({ width = 214, height = 53, onToggleMenu }) {
    return (
        <Link href="/" className={styles.logo} onClick={() => onToggleMenu(false)}>
            <LogoIcon width={width} height={height}/>
        </Link>
    )
}
