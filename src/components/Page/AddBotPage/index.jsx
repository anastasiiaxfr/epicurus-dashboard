import Image from 'next/image'
import AddBot from '../../Form/AddBot'
import Banner from '../../../assets/img/banner.jpg'

import styles from './styles.module.sass'

const str = [
    'To view the transaction number in Binance, please follow the link (while logged in): <a href="https://www.binance.com/ru/my/wallet/history/withdraw-crypto" target="_blank">withdraw-crypto</a>',
    'If you sent USDT from another exchange, please provide the Transaction Hash in the field (example TRC20): <b>fcb36c36a53a445aeadb39a567d426d456fc7a408d43160befe6f75d2b0f8ba1</b>',
    'You can also specify the transaction number (Internal transfer) - <b>43047269665</b>, but do not confuse it with the wallet - <b>TMBt8SyQ6JuAoWxkZ8NKi9FjWQPXHHt2A3</b>'
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
                            Recommendations:
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
