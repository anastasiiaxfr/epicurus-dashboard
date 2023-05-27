import { auth, ref, database, onValue } from '../../pages/_firebase'
import { useAuthState } from 'react-firebase-hooks/auth'


import Tabs from '../../components/Tabs'

import AddBotPage from '../../components/Page/AddBotPage'
import BotPageMain from '../../components/Page/BotPageMain'

import PlusIcon from '../../assets/icons/plus.svg'


const tabsItems = [
    { list: <PlusIcon/>, item: <AddBotPage /> },
    // { list: 'Bot name', item: <BotPageMain /> }
]

function RoboticTradingPage() {
    const [user] = useAuthState(auth)
    const userID = user?.uid
    
    onValue(ref(database, 'addBotForm/' + userID), (snapshot) => {
        // Handle the snapshot and extract the data
        const data = snapshot.val()
        console.log(data)
        }, (error) => {
        // Handle any errors
        console.error('Error reading data:', error)
    })
   

    return (
        <Tabs props={tabsItems} />
    )
}

export default RoboticTradingPage