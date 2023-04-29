import Link from 'next/link'
import Card from '../Card'

import Image from 'next/image'
import ImgAssets from '../../assets/img/img1.png'
import ImgSolution1 from '../../assets/img/solutions-1.png'
import ImgSolution2 from '../../assets/img/solutions-2.png'
import ImgSolution3 from '../../assets/img/solutions-3.png'
import ImgSolution4 from '../../assets/img/solutions-4.png'

import styles from './hero.module.sass'

const solutions = [
    { title: 'Роботизированная торговля', img: ImgSolution1, url: '#' },
    { title: 'Управление API-ключами', img: ImgSolution2, url: '#' },
    { title: 'Депозиты на основе смарт-контрактов', img: ImgSolution3, url: '#', label: 'В разработке' },
    { title: 'Академия', img: ImgSolution4, url: '#' }
]


export default function Hero() {
    return (

        <div className={styles.hero}>
            <div className={styles.main}>

                <h2 className="h3">Our Solutions</h2>

                <div className={styles.row}>

                    {
                        solutions.map((i, ind) => (
                            <Card key={ind} {...i} />
                        ))
                    }

                </div>

            </div>

            <aside className={styles.sidebar}>

                <div className={styles.sidebar_head}>
                    <h2 className="h3">Assets</h2>
                    <div className="table__cta">
                        <Link href="/" className="text--link-btn">
                            See All
                        </Link>
                    </div>
                </div>

                <div className={styles.sidebar_row}>
                    <Link href="/" className={styles.img}>
                        <Image
                            src={ImgAssets}
                            width={330}
                            height={178}
                            alt="ALT"
                        />
                    </Link>

                    <Link href="/" className={styles.img}>
                        <Image
                            src={ImgAssets}
                            width={330}
                            height={178}
                            alt="ALT"
                        />
                    </Link>
                </div>

            </aside>

        </div>

    )
}
