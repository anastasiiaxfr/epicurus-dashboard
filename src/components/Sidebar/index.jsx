import {useState, useEffect} from 'react'

import { auth } from '../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'


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
    const [user] = useAuthState(auth)
    const { push } = useRouter()
    const router = useRouter()

    //console.log(router.query)
    
    const { token } = router.query || ''
    

    let baseURL = `/dashboard`
    const [showURL, setShowURL] = useState(false)

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
        if (user !== null) {
            //alert(user.displayName)
            setShowURL(true)
        } else {
            //push(`/?token=${token}`)
        }
    }, [user])



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
                    <Link href="/dashboard" onClick={() => onSetTitle('Dashboard')} title="Dashboard">
                        <Icon1 with="20" height="20"/>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ? '/robotic-trading' : baseURL } onClick={() => onSetTitle('Robotic trading')} title="Robotic trading">
                        <Icon2 with="20" height="20"/>
                        <span>Robotic trading</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ? '/' :  baseURL } onClick={() => onSetTitle('Deposit')} title="Deposit">
                        <Icon3 with="20" height="20"/>
                        <span>Deposit</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ?'/' :  baseURL} onClick={() => onSetTitle('API')} title="API">
                        <Icon4 with="20" height="20"/>
                        <span>API</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ?'/' :  baseURL} onClick={() => onSetTitle('News Website')} title="News Website">
                        <Icon5 with="20" height="20"/>
                        <span>News Website</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ?'/' :  baseURL} onClick={() => onSetTitle('Transactions')} title="Transactions">
                        <Icon5 with="20" height="20"/>
                        <span>Transactions</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ? '/' :  baseURL} onClick={() => onSetTitle('Academy')} title="Academy">
                        <Icon5 with="20" height="20"/>
                        <span>Academy</span>
                    </Link>
                </li>
            </ul>

            <ul className="pg__nav">
                <li>
                    <Link href={showURL ? '/settings' :  baseURL } onClick={() => onSetTitle('Settings')} title="Settings">
                        <Icon6 with="20" height="20"/>
                        <span>Settings</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ? '/' :  baseURL} onClick={() => onSetTitle('Support')} title="Support">
                        <Icon7 with="20" height="20"/>
                        <span>Support</span>
                    </Link>
                </li>
            </ul>

        </aside>
    )
}
