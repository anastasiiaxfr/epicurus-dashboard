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
    const tabsItems = [{ list: <PlusIcon />, item: <AddBotPage /> }]
  
    useEffect(() => {
        if (user) {
          const db = ref(database, 'addBotForm/' + userID)
      
          const handleDataChange = (snapshot) => {
            const data = snapshot.val()
            const items = Object.values(data).map(i => ({ name: i.add_bot_name, sum: i.add_bot_sum }))
            setNewData(items)
          }
      
          const handleError = (error) => {
            console.error('Error reading data:', error)
          }
      
          onValue(db, handleDataChange, handleError)
        }
      }, [user])
      
      if (newData?.length > 0) {
        const tabslist = [...new Set(newData)]
        tabslist.map(i => tabsItems.push({ list: i.name, item: <BotPageMain sum={i.sum} /> }))
      }

    return (
        !loading && <Tabs props={tabsItems} />
    )
}

export default RoboticTradingPage