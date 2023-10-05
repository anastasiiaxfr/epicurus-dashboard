import Image from "next/image";
import Link from "next/link";

import LabelImg from "../../assets/img/banners/comming-soon.svg";

import styles from "./styles.module.sass";

export default function Products({ products }: any) {
  return (
    <div className={styles.products_cards} id="products">
      {products.map((i: any, k: number) => (
        <Link className={styles.products} key={k} href={i.url}>
          <div
            className={`${styles.products_img_wrap} ${
              i.enable ? "" : styles.disabled
            }`}
          >
            <Image src={i.img} alt={i.title} className={styles.products_img} />
          </div>
          <div className={styles.products_content}>
            <div className={styles.products_title}>{i.title}</div>

            <div className={styles.products_info}>
              <div className={styles.products_subtitle}>{i.sub_title}</div>
              {i.text && <div className={styles.products_text}>{i.text}</div>}
            </div>
          </div>
            {!i.enable && (
                // <Image src={LabelImg} alt={i.title} className={styles.products_label} />
                <LabelImg alt={i.title} className={styles.products_label}></LabelImg>
            )}
        </Link>
      ))}
    </div>
  );
}
