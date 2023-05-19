import Tabs from '../../components/Tabs'

import AddBotPage from '../../components/Page/AddBotPage'

import PlusIcon from '../../assets/icons/plus.svg'


const tabsItems = [
    { list: <PlusIcon/>, item: <AddBotPage /> }
]

function RoboticTradingPage() {
    return (
        <Tabs props={tabsItems} />
    )
}

export default RoboticTradingPage