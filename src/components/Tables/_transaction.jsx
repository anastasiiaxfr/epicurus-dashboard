import UsersIcon from '../../assets/icons/users.svg'

import styles from './table.module.sass'


export default function Table({ heading, data }) {
    //console.log('data', data)

    return (
        <div className={styles.table_wrap}>

            <table className={styles.table}>
                <thead>
                    <tr>
                        {heading.map((i, ind) => (
                            <th key={ind}>
                                {i}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data !== undefined && data.slice(0, data.length - 1).map((item, index) => (
                        <tr key={index}>
                            <td data-value={heading[0]}>{item.symbol}</td>
                            <td data-value={heading[1]}>
                               <div>
                               <div className={styles.table_time}>{new Date(item.open_time).toLocaleTimeString()}</div>
                                <div className={styles.table_date}>{new Date(item.open_time).toLocaleDateString()}</div>
                               </div>
                            </td>
                            <td data-value={heading[2]}>{parseFloat(item.avg_price_enter).toFixed(2)}</td>
                            <td data-value={heading[3]}>
                               <div>
                               <div className={styles.table_time}>{new Date(item.close_time).toLocaleTimeString()}</div>
                                <div className={styles.table_date}>{new Date(item.close_time).toLocaleDateString()}</div>
                               </div>
                            </td>
                            <td data-value={heading[4]}>{parseFloat(item.avg_price_exit).toFixed(2)}</td>
                            <td data-value={heading[5]}>
                                <span className={`${styles.table_status} ${item.side === 'SHORT' ? styles.down : styles.up}`}>{item.side}</span>
                            </td>
                            <td data-value={heading[6]}>{item.net_profit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )

}
