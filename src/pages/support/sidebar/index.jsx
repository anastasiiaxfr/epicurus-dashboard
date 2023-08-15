import { useState } from "react";
import Link from "next/link";

import ArrowIcon from "../../../assets/icons/arr-rt.svg";
import ArrowBtmIcon from "../../../assets/icons/arr-btm-0.svg";

import styles from "./styles.module.sass";

function Sidebar({ links, currentURL }) {
  const [show, setShow] = useState(false)
  const showNav = () => {
    setShow(prev => !prev)
  }

  return (
    <aside className={styles.sidebar}>
      <section className={styles.sidebar_search}>
        <div className={styles.sidebar_title}> Search for a Question </div>
        <div className={styles.sidebar_subtitle}>
          Type your Question or search by keyword
        </div>
      </section>

      <nav className={styles.sidebar_links_wrap}>
        <div className={styles.sidebar_links_header} onClick={showNav}>
          <span className={styles.sidebar_title}>Wiki</span>
          <ArrowBtmIcon className={show ? styles.show : ''}/>
        </div>
        <ul className={`${styles.sidebar_links} ${show ? styles.show : ''}`}>
          {links.map((i, k) => (
            <li className={i.url === currentURL ? styles.active : ""} key={k}>
              <Link href={i.url}>
                {i.title}{" "}
                {i.url === currentURL && (
                  <div className={styles.sidebar_icons}>
                    <ArrowIcon />
                    <ArrowIcon />
                    <ArrowIcon />
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* <section className={styles.sidebar_cta}></section> */}
    </aside>
  );
}

export default Sidebar;
