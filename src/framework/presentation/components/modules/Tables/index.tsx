import { useState, useEffect } from "react";

import UsersIcon from '../../assets/icons/users.svg'

import styles from './table.module.sass'

const heading = [
    { title: 'Name', width: '20%' },
    { title: 'Date', width: '15%' },
    { title: 'Hash code', width: '20%' },
    { title: 'Status', width: '10%' },
    { title: 'Info', width: '10%' }
]

const data = [
    { title: 'Cryptocommunity', time: '10:34AM', date: '2 Nov 2023', crypto: '0.02 BTC', hash: '0056 GJ57 K7H5 8HG4 648K', status: 'Completed', info: '...' },
    { title: 'Academy', time: '10:34AM', date: '2 Nov 2023', crypto: '0.02 BTC', hash: '0056 GJ57 K7H5 8HG4 648K', status: 'In progress', info: '...' },
    { title: 'CryptoBot', time: '10:34AM', date: '2 Nov 2023', crypto: '0.02 BTC', hash: '0056 GJ57 K7H5 8HG4 648K', status: 'Declined', info: '...' },
    { title: 'CryptoBot', time: '10:34AM', date: '2 Nov 2023', crypto: '0.02 BTC', hash: '0056 GJ57 K7H5 8HG4 648K', status: 'Declined', info: '...' },
]

export default function Table({setHeading, setData}: any) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
      }, []);
    return (
        <div className={styles.table_wrap}>

            <div className={styles.table}>
                    <div className={styles.table_heading}>
                        {heading.map((i: any, ind: number) => (
                            <div key={ind}>
                                {i.title}
                            </div>
                        ))}
                    </div>
                <div className={styles.table_body}>
                    {loading && 
                        <div className={styles.table_caption}>
                            You Don’t Have Transactions Yet
                        </div>
                    }
                    {!loading && data.map((i, ind) => (
                        <div key={ind} className={styles.table_row}>
                            <div data-value={heading[0].title}>
                                <div className={styles.table_title}>
                                    <div className={styles.table_icon}>
                                        <UsersIcon width="21" height="15" />
                                    </div>
                                    {i.title}
                                </div>
                            </div>
                            <div data-value={heading[1].title}>
                                <div className={styles.table_datetime}>
                                    <div className={styles.table_time}>{i.time}</div>
                                    <div className={styles.table_date}>{i.date}</div>
                                </div>
                            </div>
                         
                            <div data-value={heading[2].title}>
                                <div className={styles.table_hash}>{i.hash}</div>
                            </div>
                            <div data-value={heading[3].title}>
                                <div className={`${styles.table_status} ${styles[i.status.toLowerCase().replace(' ', '-')]}`}>{i.status}</div>
                            </div>
                            <div data-value={heading[4].title}>
                                <div className={styles.table_info}>{i.info}</div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )

}