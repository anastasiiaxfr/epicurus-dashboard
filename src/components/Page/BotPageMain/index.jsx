import { useState, useEffect } from 'react'

import { auth } from '../../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'


import Link from 'next/link'

//import FormPeriod from '../../Form/FormPeriod'

import Table from '../../Tables/_transaction'

import DownloadIcon from '../../../assets/icons/download.svg'
import InfoIcon from '../../../assets/icons/info.svg'

import styles from './styles.module.sass'


export default function BotPageMain({ bot_id, bot_balance}) {
    const [user] = useAuthState(auth)
    const userID = user?.uid
    const botID = bot_id
    const botBalance = bot_balance || 0

    const url = process.env.DB

    const [tableData, setTableData] = useState([])
    const [botApy, setBotApy] = useState(0)
    const [botIncome, setBotIncome] = useState(0)

    const currency = 'USDT'

    const heading = ['Symbol', 'Open Time', 'Enter', 'Close Time', 'Exit', 'Side', 'Profit']

    //console.log('bot_id', bot_id)

   useEffect(() => {
        if (user) {

            const payload = {
                uid: userID,
            }

            const queryParams = new URLSearchParams(payload).toString();
            const newUrl = `${url}?${queryParams}`

            fetch(newUrl)
                .then(response => response.json())
                .then(data => {
                    //console.log('data', data)
                    const botData = data[userID][botID]
                    //console.log('botData', botData)
                    setTableData(botData)
                    const totalBotProfit = botData.reduce((sum, item) => sum + item.total_profit, 0)
                    //console.log('totalBotApy', totalBotApy)
                    setBotApy(totalBotProfit.toFixed(2))
                    setBotIncome(totalBotProfit.toFixed(2))
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error:', error)
                })
        }
    }, [user])

    //console.log('tableData', tableData)

    
    return (
        <>
            <div className={styles.pg}>
                <main className={styles.pg__row}>

                    <figure className={styles.box}>
                        <figcaption className={styles.box__title}>
                            Balance
                        </figcaption>
                        <div className={styles.box__value}>
                            {botBalance} <small className={styles.box__cur}>{currency}</small>  
                        </div>
                    </figure>

                    <figure className={styles.box}>
                        <figcaption className={styles.box__title}>
                            Сurrent income
                        </figcaption>
                        <div className={styles.box__value}>
                            {botIncome} <small className={styles.box__cur}>{currency}</small>  
                        </div>
                    </figure>

                    <figure className={styles.box}>
                        <div className={styles.box__row}>
                            <div>
                                <figcaption className={styles.box__title}>
                                    APY
                                </figcaption>
                                <div className={styles.box__value}>
                                    {botApy} <small className={styles.box__cur}>{currency}</small>  
                                </div>
                            </div>
                            {/* <div>
                                <figcaption className={styles.box__title}>
                                    Period
                                </figcaption>

                               <FormPeriod />

                            </div> */}
                        </div>
                    </figure>

                </main>

                {/* TRANSACTION */}
                { tableData.length > 0 ? <section className="pg__section">
                    <div className="pg__section-header">
                        <h2 className="h3">Transaction</h2>

                        {/* <div className="table__cta">
                            <DownloadIcon width="15" height="15" />
                            <Link href="/" className="text--link-btn">
                                See All
                            </Link>
                        </div> */}

                    </div>
                    <Table heading={heading} data={tableData}/>
                </section> :
                <div className={styles.pg__footer}>
                    <div className="tooltip tooltip--danger">
                        <InfoIcon width="20" height="20" />
                        <div>
                            <p>Each transaction requires some time for verification and processing, including the necessary authorization and confirmation procedures.
                            </p>
                            <p>Currently, we guarantee that the process of authorization and confirmation of your transaction will be completed within 12 - 24 hours after its initiation. We strive to make this process as fast and efficient as possible, however, in some cases, there may be slight delays due to internal security checks and clarifications.
                            </p>
                        </div>
                    </div> 
                </div> }
            </div>
        </>
    )
}
