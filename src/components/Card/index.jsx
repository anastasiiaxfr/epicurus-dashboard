import Link from 'next/link'
import Image from 'next/image'

import styles from './card.module.sass'

export default function Card({ title, label, img, url, onClick }) {
    return (
        url ? <Link href={url} className={styles.card_wrap}>
            <div className={`${styles.card} ${label ? styles.disable : ''}`}>
                <div className={styles.card_img}>
                    <Image src={img} width={330} height={200} alt={title} />
                </div>
                {label && <div className={styles.card_label}>
                    {label}
                </div>}
                <div className={styles.card_title}>
                    {title}
                </div>
            </div>
        </Link> : <div className={`${styles.card} ${label ? styles.disable : ''}`} onClick={onClick}>
            <div className={styles.card_img}>
                <Image src={img} width={330} height={200} alt={title} />
            </div>
            {label && <div className={styles.card_label}>
                {label}
            </div>}
            <div className={styles.card_title}>
                {title}
            </div>
        </div>

    )
}
