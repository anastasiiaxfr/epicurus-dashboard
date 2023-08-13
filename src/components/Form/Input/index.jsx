import { useState, useEffect, useRef } from "react";
import Input from "@mui/base/Input";

import InfoIcon from "../../../assets/icons/info.svg";
import Nottification from "../Nottifications";
import styles from "./input.module.sass";

export default function InputField({
  type,
  label,
  placeholder,
  value,
  note,
  error,
  id,
  name,
  required,
  disabled,
  setDisabled,
  icon,
  onClick,
  pattern,
  validate,
  submit,
  setSubmit,
  reset,
  setReset,
  onImgSet,
  theme,
  form,
  success,
  isError
}) {
  const [newValue, setNewValue] = useState(value);
  const [showError, setShowError] = useState(false);
  const [fileAttached, setFileAttached] = useState(false);
  const [errorPattern, setErrorPattern] = useState(false);
  const [completed, setCompleted] = useState(false);

  const input = useRef(null);

  const onChange = () => {
    const currentInput = input.current;

    if (currentInput?.disabled !== true) {
      if (currentInput?.value?.length === 0) {
        setShowError(true);
      } else if (
        type !== "email" &&
        pattern &&
        currentInput.value.match(pattern)
      ) {
        setShowError(true);
        // setNewValue('')
      } else if (pattern && !currentInput.value.match(pattern)) {
        setNewValue(value);
      } else {
        setShowError(false);
        setCompleted(true);
      }
    }

    if (type === "email") {
      if (pattern) {
        if (pattern.test(currentInput.value) !== true) {
          setShowError(true);
        } else {
          setShowError(false);
        }
      }
    }

    if (type === "file") {
      if (
        currentInput?.files[0] &&
        (currentInput?.files[0].size / 1024 / 1024)?.toFixed(1) > 1
      ) {
        setShowError(true);
        setFileAttached(false);
      } else if (
        currentInput?.files[0] === undefined ||
        currentInput?.files[0].size === 0
      ) {
        setFileAttached(false);
        setShowError(true);
      } else {
        setFileAttached(true);
      }
      onImgSet(currentInput?.files[0]);
    }

    const allInputs = Array.from(document.querySelectorAll("input"));
    const anyEmptyInput = allInputs.some((input) => input.value === "");
    if (anyEmptyInput === false) {
      validate(true);
    } else {
      validate(false);
      setSubmit(false);
    }
  };

  useEffect(() => {
    if (submit === true) {
      onChange();
    }
  }, [submit]);

  useEffect(() => {
    setShowError(false);
    setCompleted(false);
  }, [reset]);


  useEffect(() => {
    if (setDisabled) {
      showError === true ? setDisabled(true) : setDisabled(false);
    }
    showError === true && setCompleted(false);
  }, [showError]);

  useEffect(() => {
    if (success) {
      completed ? success(true) : success(false);
    }
  }, [completed]);

  return (
    <div className={`${styles.field} ${styles[theme]}`}>
      <label htmlFor={id} className={styles.label}>
        <span>{label}</span>
        {(note || (error && showError)) && (
          <div className={styles.info}>
            {note && !showError && (
              <div className={styles.note}>
                <Nottification label={note} type="note" />
              </div>
            )}
            {error && showError && <Nottification label={error} type="error" />}
          </div>
        )}
      </label>

      <div className={styles.wrap}>
        <Input
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          value={newValue}
          disabled={disabled}
          required={required}
          className={`${styles.input} ${showError ? styles.error : ""} ${
            completed ? styles.success : ""
          }`}
          autoComplete="off"
          onClick={onClick}
          onChange={onChange}
          slotProps={{
            input: {
              pattern: pattern,
              ref: input,
              ...(type === "file" && { accept: "image/jpeg, image/png" }),
            },
          }}
        />
        {icon}
        {type === "file" && (
          <span className={styles.input__placeholder}>
            {fileAttached === true ? "File added" : placeholder}
          </span>
        )}
      </div>
    </div>
  );
}
