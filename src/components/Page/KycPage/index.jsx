// import Link from 'next/link'

import KYC from '../../Form/KYC'

import styles from './styles.module.sass'

// const str = [
//     'Lorem Ipsum - это текст-"рыба", часто',
//     'используемый в печати и вэб-дизайне. Lorem Ipsum',
//     'является стандартной',
//     '"рыбой" для текстов',
//     'на латинице с начала XVI века.',
//     'Lorem Ipsum - это текст-"рыба", часто',
//     'используемый в печати и вэб-дизайне. Lorem Ipsum',
//     'является стандартной',
//     '"рыбой" для текстов',
//     'на латинице с начала XVI века.',
// ]

export default function AddApiPage() {
    return (
        <>
            <div className={styles.api}>

                {/* <h1 className='h3'>
                    Animation
                </h1> */}

                <div className={styles.api_row}>


                    <main className={styles.api_content}>
                        {/* <div className={styles.api_wrap_img}>
                            <Image
                                src={Banner}
                                alt="Animatio"
                                width={1200}
                                height={600}
                            />
                        </div> */}

                        <KYC />

                    </main>
                    {/* <aside className={styles.api_sidebar}>
                        <p>
                            Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                        </p>
                        <ol>
                            {
                                str.map((i, ind) => (
                                    <li key={ind}>
                                        {i}
                                    </li>
                                ))
                            }
                        </ol>
                        <Link href="/" className={styles.link}>Learn more in Academy</Link>
                    </aside> */}
                </div>
            </div>
        </>
    )
}
