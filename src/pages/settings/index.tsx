import Tabs from '../../framework/presentation/components/modules/Tabs'

import FormSettings from '../../framework/presentation/components/modules/Form/FormSettings'
import FormSettingsPassword from '../../framework/presentation/components/modules/Form/FormSettingsPassword'

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