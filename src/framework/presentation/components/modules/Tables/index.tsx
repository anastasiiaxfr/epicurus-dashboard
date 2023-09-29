import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../../pages/_auth";

import UsersIcon from "../../assets/icons/users.svg";

import styles from "./table.module.sass";

const heading = [
  { title: "Name", width: "20%" },
  { title: "Date", width: "15%" },
  { title: "Hash code", width: "20%" },
  { title: "Status", width: "10%" },
  { title: "Info", width: "10%" },
];

const data = [
  {
    title: "Cryptocommunity",
    time: "10:34AM",
    date: "2 Nov 2023",
    crypto: "0.02 BTC",
    hash: "0056 GJ57 K7H5 8HG4 648K",
    status: "Completed",
    info: "...",
  },
  {
    title: "Academy",
    time: "10:34AM",
    date: "2 Nov 2023",
    crypto: "0.02 BTC",
    hash: "0056 GJ57 K7H5 8HG4 648K",
    status: "In progress",
    info: "...",
  },
  {
    title: "CryptoBot",
    time: "10:34AM",
    date: "2 Nov 2023",
    crypto: "0.02 BTC",
    hash: "0056 GJ57 K7H5 8HG4 648K",
    status: "Declined",
    info: "...",
  },
  {
    title: "CryptoBot",
    time: "10:34AM",
    date: "2 Nov 2023",
    crypto: "0.02 BTC",
    hash: "0056 GJ57 K7H5 8HG4 648K",
    status: "Declined",
    info: "...",
  },
];

export default function Table({ setHeading, setData }: any) {
  const [table, setTable] = useState({ date_time: "", name: "", hash_code: "", is_active: "", info: "" });
  const [loading, setLoading] = useState(true);
  const { currentUser, userToken }: any = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    if (currentUser) {
      const URL = "https://epicurus-railway-production.up.railway.app/v1";

      if (userToken !== undefined) {
        fetch(`${URL}/dashboard/test`, {
          method: "GET",
          headers: { Authorization: `Bearer ${userToken}` },
        }).then((response) => {
          if (!response.ok) {
            console.log(`Request failed with status: ${response.status}`);
          } else {
            response.json().then((res) => {
              setTable(res[0].transaction);
            });
          }
        });
      }
    }
  }, []);

  const dateString = table.date_time || "2023-10-02T08:35:37.963441";
  const timeString = dateString.split("T")[1].split(".")[0];
  const dateObj = new Date(dateString);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return (
    <>
      <div className={styles.table_wrap}>
        <div className={styles.table}>
          <div className={styles.table_heading}>
            {heading.map((i: any, ind: number) => (
              <div key={ind}>{i.title}</div>
            ))}
          </div>
          <div className={styles.table_body}>
            {loading && (
              <div className={styles.table_caption}>
                You Don’t Have Transactions Yet
              </div>
            )}
            {!loading && (
              <div className={styles.table_row}>
                <div data-value={heading[0].title}>
                  <div className={styles.table_title}>
                    <div className={styles.table_icon}>
                      <UsersIcon width="21" height="15" />
                    </div>
                    {table.name}
                  </div>
                </div>
                <div data-value={heading[1].title}>
                  <div className={styles.table_datetime}>
                    <div className={styles.table_time}>{timeString}</div>
                    <div className={styles.table_date}>{formattedDate}</div>
                  </div>
                </div>

                <div data-value={heading[2].title}>
                  <div className={styles.table_hash}>{table.hash_code}</div>
                </div>
                <div data-value={heading[3].title}>
                  <div className={`${styles.table_status}`}>
                    {table.is_active ? "Enable" : "Disable"}
                  </div>
                </div>
                <div data-value={heading[4].title}>
                  <div className={styles.table_info}>{table.info}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
