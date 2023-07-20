import { useState, useEffect } from "react";

import styles from './styles.module.sass';

import { auth } from "../../pages/_firebase";
import { useAuthState } from "react-firebase-hooks/auth";
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
    const [user] = useAuthState(auth);
    const { push } = useRouter();
    const router = useRouter();

    //console.log(router.query)

    const { token } = router.query || "";

    let baseURL = `/dashboard`;
    const [showURL, setShowURL] = useState(true);

    const [showMenu, setShowMenu] = useState(false);

    const onToggleMenu = (title) => {
        setShowMenu(!showMenu);
        getTitle(title);
    };

    const onSetTitle = (title) => {
        getTitle(title);
        setShowMenu(false);
    };

    useEffect(() => {
        if (user !== null) {
            //alert(user.displayName)
            setShowURL(true);
        } else {
            //push(`/?token=${token}`)
        }
    }, [user]);

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
                        <Link href="/" onClick={() => onSetTitle("Dashboard")}>
                            <Icon1 with="16" height="16" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={showURL ? "/robotic-trading" : baseURL}
                            onClick={() => onSetTitle("Robotic Trading")}
                            title="Robotic Trading"
                        >
                            <Icon2 with="16" height="16" />
                            <span>Robotic Trading</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={showURL ? "/" : baseURL}
                            onClick={() => onSetTitle("Trust Management")}
                            title="Trust Management"
                        >
                            <Icon3 with="16" height="16" />
                            <span>Trust Management</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={showURL ? "/" : baseURL}
                            onClick={() => onSetTitle("Deposit")}
                            title="Deposit"
                        >
                            <Icon4 with="16" height="16" />
                            <span>Deposit</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={showURL ? "/" : baseURL}
                            onClick={() => onSetTitle("Academy")}
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
                        <Link
                            href={showURL ? "/" : baseURL}
                            onClick={() => onSetTitle("Payments")}
                            title="Payments"
                        >
                            <Icon6 with="16" height="16" />
                            <span>Payments</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={showURL ? "/" : baseURL}
                            onClick={() => onSetTitle("My API")}
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
                        <Link
                            href={showURL ? "/" : baseURL}
                            onClick={() => onSetTitle("Wiki")}
                            title="Wiki"
                        >
                            <Icon10 with="16" height="16" />
                            <span>Wiki</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={showURL ? "/" : baseURL}
                            onClick={() => onSetTitle("Support")}
                            title="Support"
                        >
                            <Icon9 with="16" height="16" />
                            <span>Support</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={showURL ? "/" : baseURL}
                            onClick={() => onSetTitle("Bug Report")}
                            title="Bug Report"
                        >
                            <Icon10 with="16" height="16" />
                            <span>Bug Report</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={showURL ? "/" : baseURL}
                            onClick={() => onSetTitle("Settings")}
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
