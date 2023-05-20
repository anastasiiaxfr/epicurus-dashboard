import FormPeriod from '../../Form/FormPeriod'

import InfoIcon from '../../../assets/icons/info.svg'

import styles from './styles.module.sass'


export default function BotPageMain() {
    return (
        <>
            <div className={styles.pg}>
                <main className={styles.pg__row}>

                    <figure className={styles.box}>
                        <figcaption className={styles.box__title}>
                            Balance
                        </figcaption>
                        <div className={styles.box__value}>
                            $00.00
                        </div>
                    </figure>

                    <figure className={styles.box}>
                        <figcaption className={styles.box__title}>
                            Сurrent income
                        </figcaption>
                        <div className={styles.box__value}>
                            $00.00
                        </div>
                    </figure>

                    <figure className={styles.box}>
                        <div className={styles.box__row}>
                            <div>
                                <figcaption className={styles.box__title}>
                                    APY
                                </figcaption>
                                <div className={styles.box__value}>
                                    $00.00
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
                <div className={styles.pg__footer}>
                    <div className="tooltip tooltip--danger">
                        <InfoIcon width="20" height="20" />
                        <div>
                            <p>Each transaction requires some time for verification and processing, including the necessary authorization and confirmation procedures.
                            </p>
                            <p>Currently, we guarantee that the process of authorization and confirmation of your transaction will be completed within 12 hours after its initiation. We strive to make this process as fast and efficient as possible, however, in some cases, there may be slight delays due to internal security checks and clarifications.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
