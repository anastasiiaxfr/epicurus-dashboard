import { useState } from "react";
import Link from "next/link";

import styles from "./styles.module.sass";

import IconArr from "../../assets/icons/arr-t-rt.svg";
import IconClose from "../../assets/icons/close.svg";

export default function Push({
  type,
  text,
  url,
  theme,
  close = false
}: any): JSX.Element | null {
  const [show, setShow] = useState(true);

  const pushClose = (e: any) => {
    e.preventDefault();
    if (close) {
      setShow(false);
    }
  };

  return show ? (
    <Link
      href={url}
      className={`${styles.push} ${styles[theme]}`}
      onClick={pushClose}
    >
      <div className={styles.push_container}>
        <div className={styles.push_divider}></div>
        <div className={styles.push_content}>
          <div className={styles.push_title}>{type}</div>
          <div className={styles.push_text}>{text}</div>
        </div>
      </div>

      <div className={styles.push_icon}>
        {close ? <IconClose /> : <IconArr />}
      </div>
    </Link>
  ) : null;
}
