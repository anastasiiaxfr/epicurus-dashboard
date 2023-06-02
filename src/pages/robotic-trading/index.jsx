import { useState, useEffect } from 'react'
import { auth, ref, database, onValue } from '../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import GetBotData from './_get-data'

import Tabs from '../../components/Tabs'

import AddBotPage from '../../components/Page/AddBotPage'
import BotPageMain from '../../components/Page/BotPageMain'

import PlusIcon from '../../assets/icons/plus.svg'


function RoboticTradingPage() {
    const [user, loading] = useAuthState(auth)
    const userID = user?.uid
    const [newData, setNewData] = useState()
    const tabsItems = [{ list: <PlusIcon />, item: <AddBotPage /> }]
  
    //console.log(user)

    useEffect(() => {
        if (user) {
          const db = ref(database, 'addBotForm/' + userID)
          GetBotData()
          const handleDataChange = (snapshot) => {
            const data = snapshot.val()
            if(data){
              //console.log(data)

              const items = Object.values(data).map(i => ({ name: i.add_bot_name, sum: i.add_bot_sum, apy: i.add_bot_sum, time: new Date() }))



              setNewData(items)
            }
          }
      
          const handleError = (error) => {
            console.error('Error reading data:', error)
          }
      
          onValue(db, handleDataChange, handleError)
        }
      }, [user])
      
      if (newData?.length > 0) {
        const tabslist = [...new Set(newData)]
        tabslist.map(i => tabsItems.push({ list: i.name, item: <BotPageMain dataDB={i}/> }))
      }

    return (
        !loading && <Tabs props={tabsItems} />
    )
}

export default RoboticTradingPage