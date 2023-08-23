import { useContext } from 'react'
import { AuthContext } from "../../pages/_auth"

// import Link from "next/link";
import Image from "next/image";

import styles from "./ava.module.sass";


export default function Ava({ name, img }: any) {
  const { auth }: any = useContext(AuthContext)

  return (
      <div className={styles.ava} onClick={() => auth.signOut()}>
        
          <div className={styles.ava_logo}>
            {img ? <Image src={img} alt={name} width="75" height="75" /> : name && name.charAt(0)}
          </div>
        
      </div>
  );
}
