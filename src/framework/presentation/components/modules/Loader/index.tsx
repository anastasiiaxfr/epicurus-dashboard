import styles from './preloader.module.scss'

export default function Preloader() {
    return (

        <div className={styles.preloader}>
           <div className={styles.ripple}><div></div><div></div></div>
        </div>

    )
}
