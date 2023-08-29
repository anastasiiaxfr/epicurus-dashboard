import * as React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../../../../pages/_auth";

import Tabs from "@mui/base/Tabs";
import TabsList from "@mui/base/TabsList";
import TabPanel from "@mui/base/TabPanel";
import Tab from "@mui/base/Tab";
import Btn from "../Form/Btn";

// import PlusIcon from '../../assets/icons/plus.svg'
import styles from "./tabs.module.sass";

export default function BasicTabs({ props }: any) {
  const { auth }: any = useContext(AuthContext);

  return (
    <Tabs defaultValue={0} orientation="vertical" className={styles.tabs}>
      <div className={styles.tabs_btns}>
        <TabsList className={styles.tabs_toogle}>
          {props?.map((i: any, ind: number) => (
            <Tab key={ind} value={ind}>
              {i.list}
            </Tab>
          ))}
        </TabsList>

        <div className={styles.tabs_cta}>
          <Btn label="Log Out" theme="error" onClick={() => auth.signOut()} />
        </div>
      </div>

      <div className={styles.tabs_content}>
        {props?.map((i: any, ind: number) => (
          <TabPanel value={ind} key={ind}>
            {i.item}
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
}
