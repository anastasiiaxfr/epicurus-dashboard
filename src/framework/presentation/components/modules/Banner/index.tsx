import { useState, useEffect } from "react";

import Image from "next/image";

import styles from "./styles.module.sass";
import Btn from "../Form/Btn";

import BannerImg from "../../assets/img/banners/banner1.png";

export default function Banner({ toggleShow }: any) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        toggleShow === false ? setShow(false) : setShow(true)
    }, [toggleShow]);

  return show ? (<figure className={styles.banner}>
      <Image
        src={BannerImg}
        alt="Robotic Trading"
        className={styles.banner_img}
      />
      <div className={styles.banner_container}>
        <div className={styles.banner_subtitle}> What is </div>
        <div className={styles.banner_title}> Robotic Trading </div>
        <div className={styles.banner_divider}></div>
        <div className={styles.banner_footer}>
          <div className={styles.banner_footer_text}>
            <b>Robotic Trading</b> is our new development. A bot that will help
            you multiply your income and fill your wallet with money. You don't
            have to work anymore, all you do is wait and relax.
          </div>
          <Btn className={styles.banner_btn} label="Watch Video" theme="grad" />
        </div>
      </div>
    </figure>) : null
}
