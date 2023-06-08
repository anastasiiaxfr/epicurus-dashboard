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
    const [delBot, setDelBot] = useState(false)
    const [newBot, setNewBot] = useState(false)
    const tabsItems = [{ list: <PlusIcon />, item: <AddBotPage setNewBot={setNewBot} /> }]

    //console.log(user)

    useEffect(() => {
        if (user) {
            const db = ref(database, 'addBotForm/' + userID)

            const handleDataChange = (snapshot) => {
                const data = snapshot.val()
                if(data){
                  const items = Object.entries(data).map(([id, item]) => ({ id, name: item.add_bot_name, balance: item.add_bot_sum }))
                  setNewData(items)
                }
            }
            const handleError = (error) => {
                console.error('Error reading data:', error)
            }
            onValue(db, handleDataChange, handleError)
        }
    }, [user, newBot, delBot])

    //console.log('setNewBot', newBot)

    if (newData?.length > 0) {
        const tabslist = [...new Set(newData)]
        tabslist.map(i => tabsItems.push({ list: i.name, item: <BotPageMain bot_id={i.id} bot_balance={i.balance} setDelBot={setDelBot} /> }))
    }



    return (
        !loading && <Tabs props={tabsItems} />
    )
}

export default RoboticTradingPage