import { useState, useEffect } from 'react'

import FormPeriod from '../../Form/FormPeriod'

import InfoIcon from '../../../assets/icons/info.svg'

import styles from './styles.module.sass'


export default function BotPageMain({ sum }) {
    const currency = 'USDT'
    const nottificationTimeout = 1 // day
    const [show, setShow] = useState(true)

    useEffect(() => {
        const targetTime = new Date()
        targetTime.setDate(targetTime.getDate() + nottificationTimeout)
    
        const checkTime = () => {
          const currentTime = new Date()
          if (currentTime >= targetTime) {
            setShow(false)
          } else {
            setShow(true)
            const timeRemaining = targetTime - currentTime
            setTimeout(checkTime, timeRemaining)
          }
        }
    
        checkTime()
      }, [])

    return (
        <>
            <div className={styles.pg}>
                <main className={styles.pg__row}>

                    <figure className={styles.box}>
                        <figcaption className={styles.box__title}>
                            Balance
                        </figcaption>
                        <div className={styles.box__value}>
                            {sum} <small className={styles.box__cur}>{currency}</small>  
                        </div>
                    </figure>

                    <figure className={styles.box}>
                        <figcaption className={styles.box__title}>
                            Сurrent income
                        </figcaption>
                        <div className={styles.box__value}>
                            00.00 <small className={styles.box__cur}>{currency}</small>  
                        </div>
                    </figure>

                    <figure className={styles.box}>
                        <div className={styles.box__row}>
                            <div>
                                <figcaption className={styles.box__title}>
                                    APY
                                </figcaption>
                                <div className={styles.box__value}>
                                    00.00 <small className={styles.box__cur}>{currency}</small>  
                                </div>
                            </div>
                            <div>
                                <figcaption className={styles.box__title}>
                                    Period
                                </figcaption>

                               <FormPeriod />

                            </div>
                        </div>
                    </figure>

                </main>
                { show && <div className={styles.pg__footer}>
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
