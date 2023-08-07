import { useState } from "react";

import { auth } from "../../pages/_firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Link from "next/link";
import Card from "../Card";
import Chart from "../Chart";

import styles from "./hero.module.sass";
import stylesCard from "../Card/card.module.sass";

import IconArr from "../../assets/icons/arr-t-rt.svg";

export default function Hero() {
  const [user] = useAuthState(auth);


  const cards = [
    {
      title: "Robotic Trading",
      status: "Active",
      url: "/robotic-trading",
      cols: [
        {
          title: "Balance",
          val: "$ 100 342",
        },
        {
          title: "PNL за день",
          val: "+1434,75 $",
        },
        {
          title: "Total PNL",
          val: "+1434,75 $",
        },
      ],
      cta: {
        enable: false,
        title: "",
        url: "#",
      },
    },
    {
      title: "Deposit",
      status: "",
      url: "/deposit",
      cols: [
        {
          title: "Balance",
          val: "$ 100 342",
        },
        {
          title: "Total PNL",
          val: "+1434,75 $",
        },
      ],
      cta: {
        enable: true,
        title: "Accept",
        url: "/deposit",
      },
    },
    {
      title: "Trust Management",
      status: "Active",
      url: "/trust-management",
      cols: [
        {
          title: "Balance",
          val: "$ 100 342",
        },
        {
          title: "Total PNL",
          val: "+1434,75 $",
        },
      ],
      cta: {
        enable: false,
        title: "",
        url: "#",
      },
    },
  ];

  return (
    <div className={styles.hero}>
      <div className={styles.main}>
        {cards.map((i, k) => (
          <Card key={k}>
            <div className={stylesCard.card_header} >
              <div className={stylesCard.card_hgroup}>
                <div className={stylesCard.card_title}>{i.title}</div>
                {i.status && (
                  <div className={stylesCard.card_status}>
                    Status:
                    <span>{i.status}</span>
                  </div>
                )}
              </div>
              <Link href={i.url}>
                <IconArr with="16" height="16" />
              </Link>
            </div>
            <div className={stylesCard.card_body}>
              <div className={stylesCard.card_row}>
                {i.cols.map((j, key) => (
                  <div className={stylesCard.card_col} key={`card-col-${k}-${key}`}>
                    {j.title}
                    <span>{j.val}</span>
                  </div>
                ))}
              </div>

              {i.cta.enable && (
                <div className={stylesCard.card_cta}>
                  <Link href={i.cta.url}>{i.cta.title}</Link>
                </div>
              )}
            </div>
          </Card>
        ))}
       
      </div>

      <aside className={styles.sidebar}>
        <div className={styles.sidebar_card}>
            <div className={styles.sidebar_title}>
                Total Sum
            </div>
            <span className={styles.sidebar_chart_val}>5000.00 $</span>
            <div className={styles.sidebar_chart}>
                <Chart />
            </div>
        </div>
      </aside>
    </div>
  );
}
