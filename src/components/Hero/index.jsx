import { useState } from 'react'

import { auth } from '../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import Link from 'next/link'
import Card from '../Card'


import styles from './hero.module.sass'
import stylesCard from '../Card/card.module.sass'

import IconArr from "../../assets/icons/arr-t-rt.svg";


export default function Hero() {
    const [user] = useAuthState(auth)


    const redirectURL = !user ? '/' : '/settings'

    

    return (

        <div className={styles.hero}>
            <div className={styles.main}>

            <Card>
                <div className={stylesCard.card_header}>
                    <div className={stylesCard.card_hgroup}>
                    <div className={stylesCard.card_title}>
                        Robotic Trading
                    </div>
                    <div className={stylesCard.card_status}>
                        Status:
                        <span>
                        Active
                        </span>
                    </div>
                    </div>

                    <IconArr with="16" height="16" />
                </div>
                <div className={stylesCard.card_body}>
                    <div className={stylesCard.card_row}>
                        <div className={stylesCard.card_col}>
                        Balance
                        <span>
                        $ 100 342
                        </span>
                        </div>
                        <div className={stylesCard.card_col}>
                        PNL за день
                        <span>
                        +1434,75 $
                        </span>
                        </div>
                        <div className={stylesCard.card_col}>
                        Total PNL
                        <span>
                        +1434,75 $
                        </span>
                        </div>
                    </div>
                </div>
            </Card>


            <Card>
                <div className={stylesCard.card_header}>
                    <div className={stylesCard.card_hgroup}>
                    <div className={stylesCard.card_title}>
                    Deposit
                    </div>
                    </div>

                    <IconArr with="16" height="16" />
                </div>
                <div className={stylesCard.card_body}>
                    <div className={stylesCard.card_row}>
                        <div className={stylesCard.card_col}>
                        Balance
                        <span>
                        $ 100 342
                        </span>
                        </div>
                        <div className={stylesCard.card_col}>
                        Total PNL
                        <span>
                        +1434,75 $
                        </span>
                        </div>
                    </div>
                    <div className={stylesCard.card_cta}>
                        <Link href="#">CTA</Link>
                    </div>
                </div>
            </Card>
               
            <Card>
                <div className={stylesCard.card_header}>
                    <div className={stylesCard.card_hgroup}>
                    <div className={stylesCard.card_title}>
                        Trust Management
                    </div>
                    <div className={stylesCard.card_status}>
                        Status:
                        <span>
                        Active
                        </span>
                    </div>
                    </div>

                    <IconArr with="16" height="16" />
                </div>
                <div className={stylesCard.card_body}>
                    <div className={stylesCard.card_row}>
                        <div className={stylesCard.card_col}>
                        Balance
                        <span>
                        $ 100 342
                        </span>
                        </div>
                        <div className={stylesCard.card_col}>
                        Total PNL
                        <span>
                        +1434,75 $
                        </span>
                        </div>
                    </div>
                </div>
            </Card>
         

            </div>

            <aside className={styles.sidebar}>

                <div className={styles.sidebar_head}>
                   
                </div>

                <div className={styles.sidebar_row}>
                   
                </div>

            </aside>
        </div>

    )
}
