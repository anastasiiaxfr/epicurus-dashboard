import { useState, useEffect } from "react";

import { auth } from "../../pages/_firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Link from "next/link";
import Image from "next/image";

import styles from "./ava.module.sass";

export default function Ava({ name, img }) {
  const [user] = useAuthState(auth);
  return (
    <Link href="/settings">
      <div className={styles.ava} onClick={() => auth.signOut()}>
        {img && (
          <div className={styles.ava_logo}>
            <Image src={img} alt={name} width="75" height="75" />
          </div>
        )}
      </div>
    </Link>
  );
}
