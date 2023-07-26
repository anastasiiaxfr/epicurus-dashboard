import { useState, useEffect } from "react";

import styles from './styles.module.sass';

import { useRouter } from "next/navigation";

import Link from "next/link";
import Logo from "../Logo";

import Icon1 from "../../assets/icons/i1.svg";
import Icon2 from "../../assets/icons/i2.svg";
import Icon3 from "../../assets/icons/i3.svg";
import Icon4 from "../../assets/icons/i4.svg";
import Icon5 from "../../assets/icons/i5.svg";
import Icon6 from "../../assets/icons/i6.svg";
import Icon7 from "../../assets/icons/i7.svg";
import Icon9 from "../../assets/icons/i9.svg";
import Icon10 from "../../assets/icons/i10.svg";
import Icon11 from "../../assets/icons/i11.svg";
import Icon12 from "../../assets/icons/i12.svg";


export default function Sidebar({ getTitle }) {
    const { push } = useRouter();
    const router = useRouter();

    //console.log(router.query)

    const { token } = router.query || "";

    let baseURL = `/dashboard`;
    const [showURL, setShowURL] = useState(true);

    const [showMenu, setShowMenu] = useState(false);

    const [active, setActive] = useState('Dashboard');

    const onToggleMenu = (title) => {
        setShowMenu(!showMenu);
        getTitle(title);
    };

   
    const onClick = (title) => {
        getTitle(title);
        setShowMenu(false);
        setActive(title);
    }

  

    useEffect(() => {
        const onAwaySidebarClick = (event) => {
            const sidebarElement = document.querySelector(".pg__sidebar");
            if (sidebarElement && !sidebarElement.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("click", onAwaySidebarClick);
        return () => {
            document.removeEventListener("click", onAwaySidebarClick);
        };
    }, []);

    return (
        <aside className={`pg__sidebar${showMenu ? " active" : ""}`}>
            <div className="pg__sidebar-inner">
              <div className="pg__sidebar-content">
              <div className="pg__sidebar-logo">
                    <Logo onToggleMenu={() => onToggleMenu("Dashboard")} />
                </div>

                <ul className={styles.sidebar_nav}>
                    <li className={styles.sidebar_nav_caption}>
                        <span>Products</span>
                    </li>
                    <li>
                        <Link className={active === 'Dashboard' ? styles.active : ''} href="/" onClick={() => {onClick("Dashboard")}}>
                            <Icon1 with="16" height="16" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={active === 'Robotic Trading' ? styles.active : ''}
                            href={showURL ? "/robotic-trading" : baseURL}
                            onClick={() => {onClick("Robotic Trading")}}
                            title="Robotic Trading"
                        >
                            <Icon2 with="16" height="16" />
                            <span>Robotic Trading</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={active === 'Trust Management' ? styles.active : ''}
                            href={showURL ? "/trust-management" : baseURL}
                            onClick={() => {onClick("Trust Management")}}
                            title="Trust Management"
                        >
                            <Icon3 with="16" height="16" />
                            <span>Trust Management</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={active === 'Deposit' ? styles.active : ''}
                            href={showURL ? "/" : baseURL}
                            onClick={() => {onClick("Deposit")}}
                            title="Deposit"
                        >
                            <Icon4 with="16" height="16" />
                            <span>Deposit</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={active === 'Academy' ? styles.active : ''}
                            href={showURL ? "/" : baseURL}
                            onClick={() => {onClick("Academy")}}
                            title="Academy"
                        >
                            <Icon5 with="16" height="16" />
                            <span>Academy</span>
                        </Link>
                    </li>
                </ul>
                <ul className={styles.sidebar_nav}>
                    <li className={styles.sidebar_nav_caption}>
                        <span>Payments</span>
                    </li>
                    <li>
                        <Link className={active === 'Payments' ? styles.active : ''}
                            href={showURL ? "/" : baseURL}
                            onClick={() => {onClick("Payments")}}
                            title="Payments"
                        >
                            <Icon6 with="16" height="16" />
                            <span>Payments</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={active === 'My API' ? styles.active : ''}
                            href={showURL ? "/myapi" : baseURL}
                            onClick={() => {onClick("My API")}}
                            title="My API"
                        >
                            <Icon7 with="16" height="16" />
                            <span>My API</span>
                        </Link>
                    </li>
                </ul>

                <ul className={`${styles.sidebar_nav} ${styles.sidebar_nav_btm}`}>
                    <li className={styles.sidebar_nav_caption}>
                        <span>Help and Settings</span>
                    </li>

                    <li>
                        <Link className={active === 'Wiki' ? styles.active : ''}
                            href={showURL ? "/" : baseURL}
                            onClick={() => {onClick("Wiki")}}
                            title="Wiki"
                        >
                            <Icon10 with="16" height="16" />
                            <span>Wiki</span>
                        </Link>
                    </li>

                    <li>
                        <Link className={active === 'Support' ? styles.active : ''}
                            href={showURL ? "/" : baseURL}
                            onClick={() => {onClick("Support")}}
                            title="Support"
                        >
                            <Icon9 with="16" height="16" />
                            <span>Support</span>
                        </Link>
                    </li>

                    <li>
                        <Link className={active === 'Bug Report' ? styles.active : ''}
                            href={showURL ? "/" : baseURL}
                            onClick={() => {onClick("Bug Report")}}
                            title="Bug Report"
                        >
                            <Icon10 with="16" height="16" />
                            <span>Bug Report</span>
                        </Link>
                    </li>

                    <li>
                        <Link className={active === 'Settings' ? styles.active : ''}
                            href={showURL ? "/" : baseURL}
                            onClick={() => {onClick("Settings")}}
                            title="Settings"

                        >
                            <Icon11 with="16" height="16" />
                            <span>Settings</span>
                        </Link>
                    </li>

                    <li>
                        <div>
                            <Icon12 with="16" height="16" />
                            <span>Dark Theme</span>
                        </div>
                    </li>

                </ul>
              </div>
            </div>
        </aside>
    );
}
