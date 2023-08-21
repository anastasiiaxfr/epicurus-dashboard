import { useState, useEffect} from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import Sidebar from "./sidebar"

import LogoIcon from '../../assets/img/logo-sm.svg'
import AuthorIcon from '../../assets/img/ava.png'

import styles from "./styles.module.sass"

const links = [
    {
        enable: true,
        title: 'Getting started',
        url: '/support'
    },
    {
        enable: true,
        title: 'Create a Wallet',
        url: '/support/create-a-wallet'
    },
    {
        enable: true,
        title: 'Get BEP20 Token',
        url: '/support/get-bep20-token'
    },
    {
        enable: true,
        title: 'Connect your wallet to Epicurus',
        url: '/support/connect-your-wallet-to-epicurus'
    },
    {
        enable: true,
        title: 'Payments Guidline',
        url: '/support/payments-quidline'
    },
    {
        enable: true,
        title: 'Epicurus’s Products Guideline',
        url: '/support/epicuruss-products-guideline'
    },
    {
        enable: true,
        title: 'Academy Guideline',
        url: '/support/academy-guideline'
    },

];

const items = [
  {
    dt: "What is Epicurus?",
    dd: `
            <h3> How to Start in Epicurus • Fast & Easy Guideline</h3>
            <p>Follow these guides to get everything set up to use Epicurus, or feel free to jump to the guide you need if you've been doing okay but lost your way.</p>   
            `,
    author: "Epicurus Team",
    authhor_img: "",
  },
  {
    dt: "What is Epicurus?",
    dd: `
            <h3> How to Start in Epicurus • Fast & Easy Guideline</h3>
            <p>Follow these guides to get everything set up to use Epicurus, or feel free to jump to the guide you need if you've been doing okay but lost your way.</p>   
            `,
    author: "Epicurus Team",
    authhor_img: "",
  },
  {
    dt: "What is Epicurus?",
    dd: `
            <h3> How to Start in Epicurus • Fast & Easy Guideline</h3>
            <p>Follow these guides to get everything set up to use Epicurus, or feel free to jump to the guide you need if you've been doing okay but lost your way.</p>   
            `,
    author: "Epicurus Team",
    authhor_img: "",
  },
];

function SupportPage() {
  const router = useRouter();
  const currentURL = router.asPath;

  const findTitleByURL = (url: any) => {
    for (const item of links) {
        if (item.url === url) {
          return item.title;
        }
    }
    return null; 
  };

  const currentTitle = findTitleByURL(currentURL) || "Getting started";
  return (
    <div className={styles.pg_container}>
      <Sidebar links={links} currentURL={currentURL}/>

      <article className={styles.pg_content}>
        <div className={styles.hgroup}>
          <h2 className={styles.hgroup_title}>
            {currentTitle}</h2>
          <p>You can find all answers you need right here</p>
        </div>

        {items.map((i: any, k: number) => <Link className={styles.card} href="#" key={k}>
            <div className={styles.card_header}>
                <div className={styles.card_icon}>
                    <LogoIcon />
                </div>
                <span>
                    {i.dt}
                </span>
            </div>
            <div className={styles.card_content}>
                <div dangerouslySetInnerHTML={{ __html: i.dd }}></div>
            </div>
            <div className={styles.card_footer}>
                <div className={styles.card_footer_img}>
                    <Image className={styles.author_img} src={AuthorIcon} alt={i.author}/>
                </div>
                <div className={styles.card_footer_author}>
                    {i.author}
                </div>
            </div>
        </Link>)}

      </article>
    </div>
  );
}

export default SupportPage;
