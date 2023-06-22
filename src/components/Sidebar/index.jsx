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
    const [showURL, setShowURL] = useState(true)

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
                    <Link href="/dashboard" onClick={() => onSetTitle('Панель управления')} title="Панель управления">
                        <Icon1 with="20" height="20"/>
                        <span>Панель управления</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ? '/robotic-trading' : baseURL } onClick={() => onSetTitle('Роботизированная торговля')} title="Роботизированная торговля">
                        <Icon2 with="20" height="20"/>
                        <span>Роботизированная торговля</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ? '/' :  baseURL } onClick={() => onSetTitle('Пополнение')} title="Пополнение">
                        <Icon3 with="20" height="20"/>
                        <span>Пополнение</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ?'/' :  baseURL} onClick={() => onSetTitle('API')} title="API">
                        <Icon4 with="20" height="20"/>
                        <span>API</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ?'/' :  baseURL} onClick={() => onSetTitle('Новостной сайт')} title="Новостной сайт">
                        <Icon5 with="20" height="20"/>
                        <span>Новостной сайт</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ?'/' :  baseURL} onClick={() => onSetTitle('Транзакции')} title="Транзакции">
                        <Icon5 with="20" height="20"/>
                        <span>Транзакции</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ? '/' :  baseURL} onClick={() => onSetTitle('Академия')} title="Академия">
                        <Icon5 with="20" height="20"/>
                        <span>Академия</span>
                    </Link>
                </li>
            </ul>

            <ul className="pg__nav">
                <li>
                    <Link href={showURL ? '/settings' :  baseURL } onClick={() => onSetTitle('Настройки')} title="Настройки">
                        <Icon6 with="20" height="20"/>
                        <span>Настройки</span>
                    </Link>
                </li>
                <li>
                    <Link href={showURL ? '/' :  baseURL} onClick={() => onSetTitle('Поддержка')} title="Поддержка">
                        <Icon7 with="20" height="20"/>
                        <span>Поддержка</span>
                    </Link>
                </li>
            </ul>

        </aside>
    )
}
