import Image from "next/image";
import Link from 'next/link';

import styles from "./styles.module.sass";

export default function Products({ products }) {
  return (
    <div className={styles.products_cards}>
      {products.map((i, k) => (
       
          <Link className={styles.products} key={k} href={i.url}>
            <Image src={i.img} alt={i.title} className={styles.products_img}/>
            
            <div className={styles.products_content}>
              <div className={styles.products_title}>{i.title}</div>
              {i.text && <div className={styles.products_text}></div>}
            </div>
          </Link>
       
      ))}
    </div>
  );
}
