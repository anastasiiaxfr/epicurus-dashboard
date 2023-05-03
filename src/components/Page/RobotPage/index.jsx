import Link from 'next/link'
import Image from 'next/image'

import Banner from '../../assets/img/banner.jpg'
import Input from '../Form/Input'
import Checkbox from '../Form/Checkbox'
import Btn from '../Form/Btn'

import styles from './styles.module.sass'

const str = [
    'Lorem Ipsum - это текст-"рыба", часто',
    'используемый в печати и вэб-дизайне. Lorem Ipsum',
    'является стандартной',
    '"рыбой" для текстов',
    'на латинице с начала XVI века.',
    'Lorem Ipsum - это текст-"рыба", часто',
    'используемый в печати и вэб-дизайне. Lorem Ipsum',
    'является стандартной',
    '"рыбой" для текстов',
    'на латинице с начала XVI века.',
]

export default function AddApiPage() {
    return (
        <>
            <div className={styles.api}>

                <h1 className='h3'>
                    Animation
                </h1>

                <div className={styles.api_row}>


                    <main className={styles.api_content}>
                        <div className={styles.api_wrap_img}>
                            <Image
                                src={Banner}
                                alt="Animatio"
                                width={1200}
                                height={600}
                            />
                        </div>

                        <form action="/" method="POST" className={styles.form} noValidate>

                            <Input type='text' label='Bot name' placeholder='Введите название...' id='bot_name' error='Only latin letters' />

                            <Input type='text' label='API for reading' placeholder='Введите ключ...' note='API key changes every 3 month' id='bot_api_reading' error='Not empty field' />


                            <Input type='text' label='API for trading' placeholder='Введите ключ...' note='API key changes every 3 month' id='bot_api_trading' error='Not empty field'/>

                            <div className={styles.form_row}>

                                <Input type='text' label='Sum' placeholder='Введите сумму...' id='bot_sum' error='Only numbers' />

                                <Input type='text' label='Period' id='bot_period' />

                            </div>

                            <Checkbox label={<div dangerouslySetInnerHTML={{ __html: `ознакомлен с <a href="#">политикой использования</a>*` }} />} id='bot_policy' error='Required field' />

                            <div className={styles.form_row_flex}>
                                <Btn label='Accept' />
                                <Btn label='Decline' type='reset' />
                            </div>

                        </form>

                    </main>
                    <aside className={styles.api_sidebar}>
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
                    </aside>
                </div>
            </div>
        </>
    )
}
