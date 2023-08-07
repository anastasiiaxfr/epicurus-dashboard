import { useState, useEffect } from "react";

import ClickAwayListener from "@mui/base/ClickAwayListener";
import Input from "@mui/base/Input";
import Nottification from "../Nottifications";

import ArrowIcon from "../../../assets/icons/arr-btm-0.svg";

import styles from "./select.module.sass";

export default function SelectField({ label, id, data, error, note, submit, setSubmit, validate, success }) {
  const [newValue, setNewValue] = useState(data[0]);
  const [shown, setShown] = useState(false);
  const [selected, setSelected] = useState(false);
  const [showError, setShowError] = useState(false);

  const onMenuToggle = () => {
    setShown(true);
  };

  const onClick = (val) => {
    setNewValue(val);
    setShown(false);
    setSelected(true);
    validate(true);
  }

  const onChange = () => {
    if(selected === false){ setShowError(true); setSubmit(false); } else { setShowError(false); }
  }

  useEffect(() => {
    if (submit === true) { onChange(); }
  }, [submit])

  useEffect(() => {
    if (selected === true) { onChange(); success(true) }
  }, [selected])

  return (
    <div className={styles.select__wrapper}>
      <label className={styles.select__label} htmlFor={id}>
        <span>{label}</span>

        {(note || (error && showError)) && (
          <div className={styles.info}>
            {note && !showError && (
              <div className={styles.note}>
                <Nottification label={note} type="note" />
              </div>
            )}
            {error && showError && (
              <Nottification label={error} type="error" />
            )}
          </div>
        )}
      </label>

      <div
        className={`${styles.select} ${shown ? styles.active : ""} ${ selected ? styles.selected : ""} ${showError ? styles.error : ""}`}
      >
        <Input
          name={id}
          id={id}
          type="text"
          value={newValue.charAt(0).toUpperCase() + newValue.slice(1)}
          disabled
          onClick={onMenuToggle}
        />
        <ArrowIcon
          className={`${styles.select__icon} ${shown ? styles.active : null}`}
          width="15"
          height="15"
        />
      </div>

      {shown && (
        <ClickAwayListener onClickAway={() => setShown(false)}>
          <ul className={styles.select__options}>
            {data.slice(1, 3).map((i, ind) => (
              <li
                key={ind}
                value={i}
                onClick={() => onClick(i)}
              >
                {i}
              </li>
            ))}
            {data.length >= 4 && (
              <div className={styles.select__options_wrap}>
                {data.slice(3, data.length).map((i, ind) => (
                  <li
                    key={ind}
                    value={i}
                    onClick={() => onClick(i)}
                  >
                    {i}
                  </li>
                ))}
              </div>
            )}
          </ul>
        </ClickAwayListener>
      )}
    </div>
  );
}
