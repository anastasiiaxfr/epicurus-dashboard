import Link from 'next/link'
import LogoIcon from './logo.svg'
import styles from './logo.module.sass'

export default function Logo({ width = 156, height = 36, onToggleMenu }: any) {
    return (
        <LogoIcon width={width} height={height} className={styles.logo} onClick={() => onToggleMenu(false)}/>
    )
}
