import Tabs from '../../components/Tabs'

import AddBotPage from '../../components/Page/AddBotPage'

import PlusIcon from '../../assets/icons/plus.svg'


const TabsItems = [
    { list: <PlusIcon/>, item: <AddBotPage /> }
]

function RoboticTradingPage() {
    return (
        <Tabs props={TabsItems} />
    )
}

export default RoboticTradingPage