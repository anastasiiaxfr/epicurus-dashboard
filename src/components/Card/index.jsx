import styles from './card.module.sass'

export default function Card({k, children}) {
    return (
       <figure className={styles.card} key={k}>
            {children}
       </figure>
    )
}
