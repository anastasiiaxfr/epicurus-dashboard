import styles from './card.module.sass'

export default function Card({children}) {
    return (
       <figure className={styles.card}>
            {children}
       </figure>
    )
}
