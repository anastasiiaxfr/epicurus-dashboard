import styles from './preloader.module.scss'

export default function Preloader() {
    return (

        <div className={styles.preloader}>
            <div className={styles.dots}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
        </div>

    )
}
