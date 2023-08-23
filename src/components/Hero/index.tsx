import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../pages/_products";

import Link from "next/link";
import Card from "../Card";
import Chart from "../Chart";

import styles from "./hero.module.sass";
import stylesCard from "../Card/card.module.sass";

import IconArr from "../../assets/icons/arr-t-rt.svg";

export default function Hero() {
  const { allDepositSum, totalDeposit: balanceDeposit, totalTMBalance: balanceTM, totalRTBalance: balanceRT}: any = useContext(ProductContext);

  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalRT, setTotalRT] = useState(0);
  const [totalTM, setTotalTM] = useState(0);



  const cards = [
    {
      title: "Deposit",
      status: "",
      url: "/deposit",
      cols: [
        {
          title: "Balance",
          val: `$ ${allDepositSum}`,
        },
        {
          title: "Total PNL",
          val: `${totalDeposit.toFixed(2)} $`,
        },
      ],
      cta: {
        enable: true,
        title: "Accept",
        url: "/deposit",
      },
    },
    {
      title: "Robotic Trading",
      status: "Active",
      url: "/robotic-trading",
      cols: [
        {
          title: "Balance",
          val: `$ ${balanceRT}`,
        },
        {
          title: "Total PNL",
          val: `${totalRT.toFixed(2)} $`,
        },
        {
          title: "PNL за день",
          val: "0,00 $",
        },
      ],
      cta: {
        enable: false,
        title: "",
        url: "#",
      },
    },
    {
      title: "Trust Management",
      status: "Active",
      url: "/trust-management",
      cols: [
        {
          title: "Balance",
          val: `$ ${balanceTM}`,
        },
        {
          title: "Total PNL",
          val: `${totalTM.toFixed(2)} $`,
        },
        {
            title: "PNL за день",
            val: "0,00 $",
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
        {cards.map((i: any, k: number) => (
          <Card key={k}>
            <div className={stylesCard.card_header}>
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
                {i.cols.map((j: any, key: number) => (
                  <div
                    className={stylesCard.card_col}
                    key={`card-col-${k}-${key}`}
                  >
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
          <div className={styles.sidebar_title}>Total Sum</div>
          <span className={styles.sidebar_chart_val}>
            {balanceDeposit} $
          </span>
          <div className={styles.sidebar_chart}>
            <Chart />
          </div>
        </div>
      </aside>
    </div>
  );
}
