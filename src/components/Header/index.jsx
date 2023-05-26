import { useState, useEffect } from 'react'

import { auth } from '../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import AuthBtns from '../Form/Auth'
import Ava from '../Ava'
import Notification from '../Notification'

export default function Header({ title, getTitle }) {
    const [user] = useAuthState(auth)

    const [currentTitle, setCurrentTitle] = useState(title)

    const [show, setShow] = useState(false)

    const getNewTitle = (newTitle) => {
        setCurrentTitle(newTitle)
        getTitle(newTitle)
    }

    useEffect(() => {
        setCurrentTitle(title)
    }, [title])

    useEffect(() => {
        if (user !== null) {
            //alert(user.displayName)
            setShow(true)
        } else
        if (show === true){
            setShow(false)
        }
    }, [user, show])


    return (
        <header className="pg__header">
            <h1 className="h3">{ currentTitle }</h1>
            
            {show && (
                    <>
                        <Ava onClick={() => getNewTitle('Settings')} img={user?.photoURL}  name={user?.displayName}/>
                        {/* <Notification /> */}
                    </>
            )}
            
            <div className="pg__header-cta">
                <AuthBtns toggleShow = {setShow}/>
            </div>
        </header>
    )
}
