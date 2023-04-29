import {useState, useEffect} from 'react'

import Link from 'next/link'
import Logo from '../Logo'

import Icon1 from '../../assets/icons/i1.svg'
import Icon2 from '../../assets/icons/i2.svg'
import Icon3 from '../../assets/icons/i3.svg'
import Icon4 from '../../assets/icons/i4.svg'
import Icon5 from '../../assets/icons/i5.svg'
import Icon6 from '../../assets/icons/i6.svg'
import Icon7 from '../../assets/icons/i7.svg'


export default function Sidebar({getTitle}) {

    const [showMenu, setShowMenu] = useState(false)


    const onToggleMenu = (title) => {
        setShowMenu(!showMenu)
        getTitle(title)
    }

    const onSetTitle = (title) => {
        getTitle(title)
        setShowMenu(false)
    }

    useEffect(() => {
        const onAwaySidebarClick = (event) => {
          const sidebarElement = document.querySelector('.pg__sidebar')
          if (sidebarElement && !sidebarElement.contains(event.target)) {
            setShowMenu(false)
          }
        }
        document.addEventListener('click', onAwaySidebarClick)
        return () => {
          document.removeEventListener('click', onAwaySidebarClick)
        }
    }, [])

    return (
        <aside className={`pg__sidebar${showMenu ? ' active' : '' }`}>
            <Logo onToggleMenu={() => onToggleMenu('Home')}/>

            <ul className="pg__nav">
                <li>
                    <Link href="/dashboard" onClick={() => onSetTitle('Dashboard')}>
                        <Icon1 with="20" height="20"/>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/cryptobot" onClick={() => onSetTitle('CryptoBot')}>
                        <Icon2 with="20" height="20"/>
                        <span>CryptoBot</span>
                    </Link>
                </li>
                <li>
                    <Link href="/deposit" onClick={() => onSetTitle('Deposit')}>
                        <Icon3 with="20" height="20"/>
                        <span>Deposit</span>
                    </Link>
                </li>
                <li>
                    <Link href="/apis" onClick={() => onSetTitle('API')}>
                        <Icon4 with="20" height="20"/>
                        <span>API</span>
                    </Link>
                </li>
                <li>
                    <Link href="/news" onClick={() => onSetTitle('News Website')}>
                        <Icon5 with="20" height="20"/>
                        <span>News Website</span>
                    </Link>
                </li>
                <li>
                    <Link href="/transactions" onClick={() => onSetTitle('Transactions')}>
                        <Icon5 with="20" height="20"/>
                        <span>Transactions</span>
                    </Link>
                </li>
                <li>
                    <Link href="/academy" onClick={() => onSetTitle('Academy')}>
                        <Icon5 with="20" height="20"/>
                        <span>Academy</span>
                    </Link>
                </li>
            </ul>

            <ul className="pg__nav">
                <li>
                    <Link href="/settings" onClick={() => onSetTitle('Settings')}>
                        <Icon6 with="20" height="20"/>
                        <span>Settings</span>
                    </Link>
                </li>
                <li>
                    <Link href="/support" onClick={() => onSetTitle('Support')}>
                        <Icon7 with="20" height="20"/>
                        <span>Support</span>
                    </Link>
                </li>
            </ul>

        </aside>
    )
}
