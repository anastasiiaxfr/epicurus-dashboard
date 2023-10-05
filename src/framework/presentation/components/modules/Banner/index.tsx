import { useState, useEffect } from "react";

import Image from "next/image";

import styles from "./styles.module.sass";
import Btn from "../Form/Btn";


export default function Banner({ toggleShow, data }: any) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        toggleShow === false ? setShow(false) : setShow(true)
    }, [toggleShow]);

  return show ? (<figure className={styles.banner}>
      <Image
        src={data?.img}
        alt={data?.title}
        className={styles.banner_img}
      />
      <div className={styles.banner_container}>
        <div className={styles.banner_subtitle}> {data?.sub_title} </div>
        <div className={styles.banner_title}> {data?.title} </div>
        <div className={styles.banner_divider}></div>
        <div className={styles.banner_footer}>
          <div className={styles.banner_footer_text}>
            {data?.text}
          </div>
        </div>
      </div>
    </figure>) : null
}
