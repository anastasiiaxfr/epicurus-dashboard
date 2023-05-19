import Tabs from '../../components/Tabs'

import AddBotPage from '../../components/Page/AddBotPage'
import BotPageMain from '../../components/Page/BotPageMain'

import PlusIcon from '../../assets/icons/plus.svg'


const tabsItems = [
    { list: <PlusIcon/>, item: <AddBotPage /> },
    { list: 'Bot name', item: <BotPageMain /> }
]

function RoboticTradingPage() {
    return (
        <Tabs props={tabsItems} />
    )
}

export default RoboticTradingPage