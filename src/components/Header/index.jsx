import { useState, useEffect, useContext  } from 'react'
import { AuthContext } from "../../pages/_auth"


import AuthBtns from '../Form/Auth'
import Ava from '../Ava'
import Notification from '../Notification'
import Wallet from '../Wallet'

export default function Header({ title, getTitle }) {
    const { auth, currentUser } = useContext(AuthContext)

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
        if (currentUser !== null) {
            //alert(user.displayName)
            setShow(true)
        } else
        if (show === true){
            setShow(false)
        }
    }, [currentUser, show])


    return (
        <header className="pg__header">
            <h1 className="pg__header-title">{ currentTitle }</h1>
            
            {currentUser && (
                <div className="pg__header-cta">
                    <Wallet />
                    <Notification />
                    <Ava img={currentUser?.photoURL} name={currentUser?.displayName}/>
                </div>
            )}
            
            {!currentUser && (<AuthBtns toggleShow = {setShow}/>)}
            
        </header>
    )
}