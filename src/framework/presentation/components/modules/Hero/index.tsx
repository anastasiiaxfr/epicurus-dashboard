import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../../pages/_auth";
import { ProductContext } from "../../../../../pages/_products";

import Link from "next/link";
import Image from "next/image";
import Card from "../Card";
import Chart from "../Chart";

import styles from "./hero.module.sass";
import stylesCard from "../Card/card.module.sass";

import IconArr from "../../assets/icons/arr-t-rt.svg";
import DashboardBanner from "../../assets/img/banners/dashboard_banner.png";

export default function Hero() {
  const { currentUser, userToken }: any = useContext(AuthContext);

  const {
    depositAllSum,
    depositTotalPnl,
    depositTotalStatus,
    tmAllSum,
    tmTmTotalPnl,
    tmTotalStatus,
    rtAllSum,
    rtTotalPnl, 
    rtTotalStatus
  }: any = useContext(ProductContext);


  const cards = [
    {
      enable: depositTotalStatus,
      title: "Deposit",
      status: depositTotalStatus ? "Enabled" : "Disabled",
      url: "/deposit",
      cols: [
        {
          title: "Balance",
          val: `$ ${depositAllSum}`,
        },
        {
          title: "Total PNL",
          val: `${depositTotalPnl} $`,
        },
      ],
      cta: {
        enable: true,
        title: "Take It",
        url: "/deposit",
      },
    },
    {
      enable: tmTotalStatus,
      title: "Trust Management",
      status: tmTotalStatus ? "Enabled" : "Disabled",
      url: "/trust-management",
      cols: [
        {
          title: "Balance",
          val: `$ ${tmAllSum}`,
        },
        {
          title: "Total PNL",
          val: `${tmTmTotalPnl} $`,
        },
      ],
      cta: {
        enable: true,
        title: "Take It",
        url: "/trust-management",
      },
    },
    {
      enable: rtTotalStatus,
      title: "Robotic Trading",
      status: rtTotalStatus ? "Enabled" : "Disabled",
      url: "/robotic-trading",
      cols: [
        {
          title: "Balance",
          val: `$ ${rtAllSum}`,
        },
        {
          title: "Total PNL",
          val: `${rtTotalPnl} $`,
        },
        {
          title: "PNL за день",
          val: "0,00 $",
        },
      ],
      cta: {
        enable: true,
        title: "Take It",
        url: "/robotic-trading",
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
              <div
                className={`${stylesCard.card_row} ${
                  !i.enable ? stylesCard.card_row_disabled : null
                }`}
              >
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

              {!i.enable && (
                <div className={stylesCard.card_cta}>
                  <Link href={i.cta.url}>{i.cta.title}</Link>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <aside className={styles.sidebar}>
        <Image src={DashboardBanner} alt="Epicurus.io" />
        {/* <div className={styles.sidebar_card}>
          <div className={styles.sidebar_title}>Total Sum</div>
          <span className={styles.sidebar_chart_val}>
            {balanceDeposit ? balanceDeposit.toFixed(2) : (0).toFixed(2)} $
          </span>
          <div className={styles.sidebar_chart}>
            <Chart />
          </div>
        </div> */}
      </aside>
    </div>
  );
}
