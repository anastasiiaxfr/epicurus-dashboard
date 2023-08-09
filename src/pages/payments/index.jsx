import { useState } from "react";

import Table from '../../components/Tables';
import Card from "../../components/Card2";
import CardPayments from "./Table";
import Hero from "./Hero";
import Banner from "../../components/Banner";

import styles from "./styles.module.sass";


function PaymentsPage() {
    const [active, setActive] = useState(0);

    const tabs = [
        {
            title: 'My Wallets',
            text: 'Press to see and manage your connected Wallets',
            on_click: ''
        },
        {
            title: 'Subscriptions',
            text: 'Press to see and manage your payments or subscriptions',
            on_click: ''
        },
        {
            title: 'Transactions',
            text: 'Press to see and manage all your transactions',
            on_click: ''
        }
    ];

    return (
        <>
            <section className={styles.cards}>
                {tabs.map((i, k) => (
                    <Card props={i} key={k} active={active === k} onClick={() => setActive(k)}/>
                ))}
            </section>

            <section className={styles.cards_content}>
                {active === 0  && <><Hero /><Banner /></>}
                {active === 1  && <CardPayments />}
                {active === 2  && <Table />}
            </section>
        </>
    )
}

export default PaymentsPage