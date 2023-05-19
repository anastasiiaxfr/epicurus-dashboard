import Tabs from '../../components/Tabs'

import KycPage from '../../components/Page/KycPage'

import PlusIcon from '../../assets/icons/plus.svg'


const tabsItems = [
    { list: <PlusIcon/>, item: <KycPage /> },
]

function Settings() {
    return (
        <Tabs props={tabsItems} />
    )
}

export default Settings