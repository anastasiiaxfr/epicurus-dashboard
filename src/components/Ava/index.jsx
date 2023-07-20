import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import UserIcon from "../../assets/icons/user.svg";
import styles from "./ava.module.sass";

export default function Ava({ onClick, name, img }) {
  const [showImg, setShowImg] = useState(false);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    setShowImg(true);
  }, [img]);
  useEffect(() => {
    setShowName(true);
  }, [name]);

  return (
    <Link href="/settings">
      {showName && (
        <div className={styles.ava} onClick={onClick}>
          {img && (
            <div className={styles.ava_logo}>
              <Image src={img} alt={name} width="75" height="75" />
              {/* <UserIcon width="27" height="27" /> */}
            </div>
          )}
        </div>
      )}
    </Link>
  );
}
