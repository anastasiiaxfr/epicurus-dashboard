import { useState } from 'react'

import { auth } from '../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import Link from 'next/link'
import Card from '../Card'


import Image from 'next/image'
import ImgAssets from '../../assets/img/img1.png'
import ImgSolution1 from '../../assets/img/solutions-1.png'
import ImgSolution2 from '../../assets/img/solutions-2.png'
import ImgSolution3 from '../../assets/img/solutions-3.png'
import ImgSolution4 from '../../assets/img/solutions-4.png'

import styles from './hero.module.sass'




export default function Hero() {
    const [user] = useAuthState(auth)


    const redirectURL = !user ? '/' : '/settings'

    const solutions = [
        { title: 'Роботизированная торговля', img: ImgSolution1, url: redirectURL },
        { title: 'Управление ключами API', img: ImgSolution2, url: redirectURL, label: 'Скоро будет доступно' },
        { title: 'Депозиты на основе смарт-контрактов', img: ImgSolution3, url: redirectURL, label: 'Скоро будет доступно' },
        { title: 'Академия', img: ImgSolution4, url: redirectURL, label: 'Скоро будет доступно'}
    ]

    return (

        <div className={styles.hero}>
            <div className={styles.main}>

                <h2 className="h3"> Наши решения </h2>

                <div className={styles.row}>
                    {
                        solutions.map((i, ind) => (
                            <Card key={ind} {...i} />
                        ))
                    }

                </div>

            </div>

            {/* <aside className={styles.sidebar}>

                <div className={styles.sidebar_head}>
                    <h2 className="h3">Assets</h2>
                        <Link href="/" className="text--link-btn">
                            See All
                        </Link>
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

            </aside> */}
        </div>

    )
}
