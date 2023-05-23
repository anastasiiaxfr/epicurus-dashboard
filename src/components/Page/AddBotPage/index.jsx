import Image from 'next/image'
import AddBot from '../../Form/AddBot'
import Banner from '../../../assets/img/banner.png'

import styles from './styles.module.sass'

const str = [
    'Чтобы посмотреть номер транзакции в Binance, перейдите по ссылке (будучи авторизованным): <a href="https://www.binance.com/ru/my/wallet/history/withdraw-crypto" target="_blank">withdraw-crypto</a>',
    'Если вы отправляли USDT с другой биржи, укажите в поле Хэш транзакции (пример TRC20): <b>fcb36c36a53a445aeadb39a567d426d456fc7a408d43160befe6f75d2b0f8ba1</b>',
    'Также вы можете указать номер транзакции (Internal transfer) - <b>43047269665</b>, но не путайте с кошельком - <b>TMBt8SyQ6JuAoWxkZ8NKi9FjWQPXHHt2A3</b>'
]

export default function AddApiPage() {
    return (
        <>
            <div className={styles.api}>

                {/* <h1 className='h3'>
                    Animation
                </h1> */}

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

                        <AddBot />

                    </main>
                    <aside className={styles.api_sidebar}>
                        <h4>
                            Рекомендации:
                        </h4>
                        <ol>
                            {
                                str.map((i, ind) => (
                                    <li key={ind}>
                                       <span dangerouslySetInnerHTML={{ __html: i }} />
                                    </li>
                                ))
                            }
                        </ol>
                    </aside>
                </div>
            </div>
        </>
    )
}
