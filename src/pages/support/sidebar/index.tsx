import { useState } from "react";
import Link from "next/link";

import Btn from "../../../components/Form/Btn";
import ArrowIcon from "../../../assets/icons/arr-rt.svg";
import ArrowBtmIcon from "../../../assets/icons/arr-btm-0.svg";

import styles from "./styles.module.sass";

function Sidebar({ links, currentURL }: any) {
  const [show, setShow] = useState(false);
  const showNav = () => {
    setShow((prev) => !prev);
  };

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
          <ArrowBtmIcon className={show ? styles.show : ""} />
        </div>
        <ul className={`${styles.sidebar_links} ${show ? styles.show : ""}`}>
          {links.map((i: any, k: number) => (
            <li
              className={
                i.url === currentURL ||
                currentURL.includes(i.url.split("/")[2]) ||
                (currentURL.includes(i.url) &&
                  !currentURL.includes(i.url.split("/")[1] + "/"))
                  ? styles.active
                  : ""
              }
              key={k}
            >
              <Link href={i.url}>
                {i.title} <br />
                <div
                  className={`${styles.sidebar_icons} ${
                    i.url === currentURL ||
                    currentURL.includes(i.url.split("/")[2]) ||
                    (currentURL.includes(i.url) &&
                      !currentURL.includes(i.url.split("/")[1] + "/"))
                      ? styles.active
                      : ""
                  }`}
                >
                  <ArrowIcon />
                  <ArrowIcon />
                  <ArrowIcon />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className={styles.sidebar_cta}>
        <div className={styles.sidebar_cta_hgroup}>
          <div className={styles.sidebar_cta_title}>
            Do you still need our help?
          </div>
          <div className={styles.sidebar_cta_subtitle}>Send your request here</div>
        </div>
        <div className={styles.sidebar_cta_btn}>
          <Btn label="Start Chat" />
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
