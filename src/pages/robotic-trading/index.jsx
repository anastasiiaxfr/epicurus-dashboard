import { useState, useEffect } from 'react'
import { auth, ref, database, onValue } from '../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import Tabs from '../../components/Tabs'

import AddBotPage from '../../components/Page/AddBotPage'
import BotPageMain from '../../components/Page/BotPageMain'

import PlusIcon from '../../assets/icons/plus.svg'


function RoboticTradingPage() {
    const [user, loading] = useAuthState(auth)
    const userID = user?.uid
    const [newData, setNewData] = useState()
    const url = process.env.DB
    const tabsItems = [{ list: <PlusIcon />, item: <AddBotPage /> }]

    //console.log(user)

    useEffect(() => {
        if (user) {
            const db = ref(database, 'addBotForm/' + userID)

            const payload = {
                uid: userID,
            }

            const queryParams = new URLSearchParams(payload).toString();
            const newUrl = `${url}?${queryParams}`

            fetch(newUrl)
                .then(response => response.json())
                .then(data => {
                    // Handle the response data
                    //console.log('data', data)
                    Object.values(data).map(i => (
                        //Object.values(i).map(el => console.log(el[el.length - 1]))
                        setNewData(i)
                    ))
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error:', error)
                })
        }
    }, [user])

    if (newData !== undefined) {
        //console.log('newData', newData)

        Object.values(newData).map(el => (
            tabsItems.push({ list: el[el.length - 1].bot_name, item: <BotPageMain dataDB={el} /> })

        ))
    }

    return (
        !loading && <Tabs props={tabsItems} />
    )
}

export default RoboticTradingPage