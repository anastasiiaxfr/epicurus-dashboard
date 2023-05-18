// import { useState } from 'react'

import Link from 'next/link'
import Card from '../Card'
// import Modal from '../Modal'
// import KYC from '../Form/KYC'

import Image from 'next/image'
import ImgAssets from '../../assets/img/img1.png'
import ImgSolution1 from '../../assets/img/solutions-1.png'
import ImgSolution2 from '../../assets/img/solutions-2.png'
import ImgSolution3 from '../../assets/img/solutions-3.png'
import ImgSolution4 from '../../assets/img/solutions-4.png'

import styles from './hero.module.sass'


const solutions = [
    { title: 'Robotic trading', img: ImgSolution1, url: '/settings' },
    { title: 'API key management', img: ImgSolution2, url: '/settings', label: 'Coming soon' },
    { title: 'Deposits based on smart contracts', img: ImgSolution3, url: '/settings', label: 'Coming soon' },
    { title: 'Academy', img: ImgSolution4, url: '/settings', label: 'Coming soon'}
]


export default function Hero() {
    // const [open, setOpen] = useState(false)
    // const handleOpen = () => setOpen(true)

    return (

        <div className={styles.hero}>
            <div className={styles.main}>
                {/* <Modal openModal={open} setModalOpen={setOpen}>
                    <KYC />
                </Modal> */}

                <h2 className="h3">Our Solutions</h2>

                <div className={styles.row}>

                    {
                        solutions.map((i, ind) => (
                            <Card key={ind} {...i}/>
                        ))
                    }

                </div>

            </div>

            <aside className={styles.sidebar}>

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

            </aside>
        </div>

    )
}
