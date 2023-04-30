import * as React from 'react'

import Tabs from '@mui/base/Tabs'
import TabsList from '@mui/base/TabsList'
import TabPanel from '@mui/base/TabPanel'
import Tab from '@mui/base/Tab'

import PlusIcon from '../../assets/icons/plus.svg'
import styles from './tabs.module.sass'



export default function BasicTabs() {
  return (
    <Tabs defaultValue={1} className={styles.tabs} sx={{
      scrollButtons: {
        display: ({ lg }) => (lg ? 'none' : 'block'),
      },
    }}>
      <TabsList className={styles.tabs_header}>
        <Tab value={1} className={styles.tabs_toggle}><PlusIcon width="20" height="20"/></Tab>
        <Tab value={2} className={styles.tabs_toggle}>Robot Evil Morty</Tab>
        <Tab value={3} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={4} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={5} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={6} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={7} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={8} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={9} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={10} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={11} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={12} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={13} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={14} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={15} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={16} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={17} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={18} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={19} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={20} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={21} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={22} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={23} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={24} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={25} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={26} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={27} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={28} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={29} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={30} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={31} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={32} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={33} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={34} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={35} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={36} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={37} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={38} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={39} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={40} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={41} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={42} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={43} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={44} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={45} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={46} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={47} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={48} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={49} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={50} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={51} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={52} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={53} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={54} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={55} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={56} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={57} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={58} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={59} className={styles.tabs_toggle}>Three</Tab>
        <Tab value={60} className={styles.tabs_toggle}>Three</Tab>
      </TabsList>
      <div className={styles.tabs_content}>
        <TabPanel value={1}>First page</TabPanel>
        <TabPanel value={2}>Second page</TabPanel>
        <TabPanel value={3}>Third page</TabPanel>
      </div>
    </Tabs>
  )
}