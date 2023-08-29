import { useState, useEffect } from "react";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import NotifiacationIcon from "../../assets/icons/notification.svg";
import CloseIcon from "../../assets/icons/close.svg";

import styles from "./notification.module.sass";

export default function Notification() {
  const data = [
    { show: true, title: "Notification Title", text: "Notification text" },
    {
      show: true,
      title: "Notification Title",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
    },
  ];

  const [show, setShow] = useState(false);
  const [active, setActive] = useState(true);
  const [newData, setNewData] = useState(data);

  useEffect(() => {
    setActive(newData.some((item) => item.show));
  }, [newData]);

  const onHideNotificationItem = (index: any) => {
    setNewData((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].show = false;
      return newItems;
    });
  };

  return (
    <div className={styles.notification}>
      <div
        className={`${styles.notification} ${show ? styles.active : ""}`}
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        <NotifiacationIcon
          className={`${styles.notification_icon} ${
            active ? styles.active : ""
          }`}
          width="25"
          height="25"
        />
      </div>

      {show && active && (
        <ClickAwayListener onClickAway={() => setShow(false)}>
          <div className={styles.notification_menu}>
            {newData.map((i, ind) => (
              <div
                key={ind}
                className={`${styles.notification_item} ${
                  i.show === false && "d-none"
                }`}
              >
                <div className={styles.notification_content}>
                  <div className={styles.notification_title}>
                    <span>
                      [{ind + 1}] {i.title}
                    </span>
                    <div
                      className={styles.notification_close}
                      onClick={() => onHideNotificationItem(ind)}
                    >
                      <CloseIcon width="35" height="35" />
                    </div>
                  </div>
                  <div className={styles.notification_text}>{i.text}</div>
                </div>
              </div>
            ))}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
