import Link from 'next/link';

import styles from './styles.module.sass';

export default function Hgroup({props}) {
    const {title, link} = props;
    return (
        <div className={styles.hgroup}>
        <h2 className={styles.hgroup_title}>{title}</h2>

        <div className={styles.hgroup_cta}>
          <Link href={link.url} className={styles.hgroup_link}>
            {link.label}
          </Link>
        </div>
      </div>
    )
}
