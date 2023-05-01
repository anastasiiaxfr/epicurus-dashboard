import * as React from 'react'
import {  useEffect, useState, useRef } from 'react'

import Tabs from '@mui/base/Tabs'
import TabsList from '@mui/base/TabsList'
import TabPanel from '@mui/base/TabPanel'
import Tab from '@mui/base/Tab'

import PlusIcon from '../../assets/icons/plus.svg'
import styles from './tabs.module.sass'


const CustomTab = ({ label, value, onFocus, onBlur, children }) => {
    return (
        <Tab
            label={label}
            value={value}
            className={styles.tabs_toggle}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {children || label}
        </Tab>
    )
}


export default function BasicTabs() {
    const tabsHeaderRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false)

    const onTabToggle = (e) => {
        e.currentTarget.scrollIntoView({
            behavior: "smooth",
            inline: "center"
        })
        setIsFocused(true)
    }
    
    const tabs = [];
    for (let i = 1; i <= 50; i++) {
        const label = `Tab ${i}`
        const value = i

        tabs.push(
            <CustomTab
                key={value}
                value={value}
                label={label}
                onFocus={onTabToggle}
                onBlur={onTabToggle}
            />
        )
    }
    // If Tab length > 10 add className={`${styles.tabs_header} ${styles.scrollable}`}
    return (
        <Tabs defaultValue={1} className={styles.tabs}>
            <TabsList className={`${styles.tabs_header}`} ref={tabsHeaderRef}>

                <CustomTab key={1} onFocus={onTabToggle} onBlur={onTabToggle} onTabToggle={onTabToggle} value={1} className={styles.tabs_toggle}><PlusIcon width="20" height="20" /></CustomTab>
                <CustomTab key={2} onFocus={onTabToggle} onBlur={onTabToggle} onTabToggle={onTabToggle} value={2} className={styles.tabs_toggle}>Robot Evil Morty</CustomTab>
                
                {/* {tabs} */}

            </TabsList>
            <div className={styles.tabs_content}>
                <TabPanel value={1}>First page</TabPanel>
                <TabPanel value={2}>Second page</TabPanel>
                <TabPanel value={3}>Third page</TabPanel>
            </div>
        </Tabs>
    )
}