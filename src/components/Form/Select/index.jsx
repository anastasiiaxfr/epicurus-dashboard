import { useState } from 'react'

import ClickAwayListener from '@mui/base/ClickAwayListener'
import Input from '@mui/base/Input'

import ArrowIcon from '../../../assets/icons/arr-btm-0.svg'

import styles from './select.module.sass'



export default function SelectField({ label, id, data }) {
    const [newValue, setNewValue] = useState(data[0])
    const [shown, setShown] = useState(false)

    const onMenuToggle = () => {
        setShown(true)
    }

    return (
        <div className={styles.select__wrapper}>
            <label className={styles.select__label} htmlFor={id}>{label}</label>

            <div className={`${styles.select} ${shown ? styles.active : null}`}>
            <Input name={id} id={id} type="text" value={newValue.charAt(0).toUpperCase() + newValue.slice(1)}  disabled onClick={onMenuToggle} />
            <ArrowIcon className={`${styles.select__icon} ${shown ? styles.active : null}`} width="15" height="15"/>
            </div>

            {shown && 
             <ClickAwayListener onClickAway={() => setShown(false)}> 
            <ul className={styles.select__options}>
                {data.slice(0, 3).map((i, ind) => (
                    <li key={ind} value={i} onClick={() => { setNewValue(i); setShown(false) }}>
                        {i}
                    </li>
                ))}
                {data.length >= 4 && <div className={styles.select__options_wrap}>
                    {data.slice(3, data.length).map((i, ind) => (
                        <li key={ind} value={i} onClick={() => { setNewValue(i); setShown(false) }}>
                            {i}
                        </li>
                    ))}
                </div>
                }
            </ul>
            </ClickAwayListener>}
        </div>

    )
}
