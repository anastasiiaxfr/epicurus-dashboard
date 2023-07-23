import { useState, useEffect, useContext  } from 'react'
import { AuthContext } from "../../pages/_auth"


import AuthBtns from '../Form/Auth'
import Ava from '../Ava'
import Notification from '../Notification'

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
            <h1 className="h3">{ currentTitle }</h1>
            
            {currentUser && (
                    <>
                            <Ava img={currentUser?.photoURL} name={currentUser?.displayName}/>
                        {/* <Notification /> */}
                    </>
            )}
            
            
            {!currentUser && (<AuthBtns toggleShow = {setShow}/>)}
            
        </header>
    )
}