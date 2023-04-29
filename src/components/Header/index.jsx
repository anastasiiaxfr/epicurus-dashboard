import { useState, useEffect } from 'react'

import Ava from '../Ava'
import Notification from '../Notification'

export default function Header({ title, getTitle }) {
    const [currentTitle, setCurrentTitle] = useState(title)

    const getNewTitle = (newTitle) => {
        setCurrentTitle(newTitle)
        getTitle(newTitle)
    }

    useEffect(() => {
        setCurrentTitle(title)
    }, [title])


    return (
        <header className="pg__header">
            <h1 className="h3">{ currentTitle }</h1>

            <div className="pg__header-cta">
                <Ava onClick={() => getNewTitle('Settings')} />
                <Notification />
            </div>
        </header>
    )
}
