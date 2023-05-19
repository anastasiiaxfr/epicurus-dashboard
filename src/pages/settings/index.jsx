import Tabs from '../../components/Tabs'

import KycPage from '../../components/Page/KycPage'

import PlusIcon from '../../assets/icons/plus.svg'


const TabsItems = [
    { list: <PlusIcon/>, item: <KycPage /> },
]

function Settings() {
    return (
        <Tabs props={TabsItems} />
    )
}

export default Settings