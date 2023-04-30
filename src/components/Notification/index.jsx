import { useState, useEffect } from 'react'

import NotifiacationIcon from '../../assets/icons/notification.svg'
import CloseIcon from '../../assets/icons/close.svg'

import styles from './notification.module.sass'

export default function Notification() {
    const data = [
        { show: true, title: 'Notification Title', text: 'Notification text' },
        { show: true, title: 'Notification Title', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters' }
    ]

    const [show, setShow] = useState(false)
    const [active, setActive] = useState(true)
    const [newData, setNewData] = useState(data)

    useEffect(() => {
        setActive(newData.some(item => item.show))
    }, [newData])

    const onHideNotificationItem = (index) => {
        setNewData((prevItems) => {
            const newItems = [...prevItems]
            newItems[index].show = false
            return newItems
        })
    }

    return (

        <div className={
            styles.notification
        }>
            <NotifiacationIcon className={`${styles.notification_icon} ${active ? styles.active : ''}`} width="25" height="25" onClick={() => { setShow(prev => !prev) }} />

            { show && active && <div className={
                styles.notification_menu
            }>

                {newData.map((i, ind) =>

                    <div key={ind} className={
                        `${styles.notification_item} ${i.show === false && 'd-none'}`
                    }>
                        <div className={
                            styles.notification_content
                        }>
                            <div className={
                                styles.notification_title
                            }>
                                <span>
                                    [{ind + 1}] {i.title}
                                </span>
                                <CloseIcon onClick={() => onHideNotificationItem(ind)} width="35" height="35" />
                            </div>
                            <div className={
                                styles.notification_text
                            }>
                                {i.text}
                            </div>
                        </div>
                    </div>
                )
                }

            </div>
            }
            
        </div>
    )

}
