import Tabs from '../../components/Tabs'

import FormSettings from '../../components/Form/FormSettings'
import FormSettingsPassword from '../../components/Form/FormSettingsPassword'


const tabsItems = [
    { list: "General", item: <FormSettings /> },
    { list: "Security", item: <FormSettingsPassword /> },
]

function Settings() {
    return (
        <Tabs props={tabsItems} />
    )
}

export default Settings