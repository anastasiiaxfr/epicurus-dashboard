import UsersIcon from '../../assets/icons/users.svg'

import styles from './table.module.sass'

const heading = [
    { title: 'Name', width: '20%' },
    { title: 'Date', width: '15%' },
    { title: 'Sum', width: '10%' },
    { title: 'Hash code', width: '20%' },
    { title: 'Status', width: '10%' },
    { title: 'Info', width: '10%' }
]

const data = [
    { title: 'Cryptocommunity', time: '10:34AM', date: '2 Nov 2023', sum: '$10 000', crypto: '0.02 BTC', hash: '0056 GJ57 K7H5 8HG4 648K', status: 'Completed', info: '...' },
    { title: 'Academy', time: '10:34AM', date: '2 Nov 2023', sum: '$10 000', crypto: '0.02 BTC', hash: '0056 GJ57 K7H5 8HG4 648K', status: 'In progress', info: '...' },
    { title: 'CryptoBot', time: '10:34AM', date: '2 Nov 2023', sum: '$10 000', crypto: '0.02 BTC', hash: '0056 GJ57 K7H5 8HG4 648K', status: 'Declined', info: '...' },
    { title: 'CryptoBot', time: '10:34AM', date: '2 Nov 2023', sum: '$10 000', crypto: '0.02 BTC', hash: '0056 GJ57 K7H5 8HG4 648K', status: 'Declined', info: '...' },
]

export default function Table() {

    return (
        <div className={styles.table_wrap}>

            <table className={styles.table}>
                <thead>
                    <tr>
                        {heading.map((i, ind) => (
                            <th key={ind} style={{ maxWidth: i.width }}>
                                {i.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>

                    {data.map((i, ind) => (
                        <tr key={ind}>
                            <td data-value={heading[0].title}>
                                <div className={styles.table_title}>
                                    <div className={styles.table_icon}>
                                        <UsersIcon width="21" height="15" />
                                    </div>
                                    {i.title}
                                </div>
                            </td>
                            <td data-value={heading[1].title}>
                                <div className={styles.table_row}>
                                    <div className={styles.table_time}>{i.time}</div>
                                    <div className={styles.table_date}>{i.date}</div>
                                </div>
                            </td>
                            <td data-value={heading[2].title}>
                                <div className={styles.table_row}>
                                    <div className={styles.table_sum}>{i.sum}</div>
                                    <div className={styles.table_crypto}>{i.crypto}</div>
                                </div>
                            </td>
                            <td data-value={heading[3].title}>
                                <div className={styles.table_hash}>{i.hash}</div>
                            </td>
                            <td data-value={heading[4].title}>
                                <div className={`${styles.table_status} ${styles[i.status.toLowerCase().replace(' ', '-')]}`}>{i.status}</div>
                            </td>
                            <td data-value={heading[5].title}>
                                <div className={styles.table_info}>{i.info}</div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )

}
