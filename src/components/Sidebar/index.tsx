import { useState, useEffect } from "react";

import styles from "./styles.module.sass";


import Link from "next/link";
import Logo from "../Logo";

export default function Sidebar({ links, currentURL, urlParent }: any) {

  const [showMenu, setShowMenu] = useState(true);

  const onToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const MAX_WIDTH_SIDEBAR = "(max-width: 1120px)";
  const smallWindow = window.matchMedia(MAX_WIDTH_SIDEBAR);

  const onMenuItemClick = () => {
    smallWindow.matches && setShowMenu(true);
  };

  useEffect(() => {
    const onAwaySidebarClick = (event: any) => {
      const sidebarElement = document.querySelector(".pg__sidebar");
      if (sidebarElement && !sidebarElement.contains(event.target)) {
        smallWindow.matches && setShowMenu(true);
      }
    };
    document.addEventListener("click", onAwaySidebarClick);
    return () => {
      document.removeEventListener("click", onAwaySidebarClick);
    };
  }, []);

  return (
    <aside className={`pg__sidebar ${showMenu ? "" : "active"}`}>
      <div className="pg__sidebar-inner">
        <div className="pg__sidebar-content">
          <div className="pg__sidebar-logo">
            <Logo onToggleMenu={() => onToggleMenu()} />
          </div>

          {links.map((i: any, k: number) => (
            <ul className={styles.sidebar_nav} key={k}>
              <li className={styles.sidebar_nav_caption}>
                <span>{i.group}</span>
              </li>
              {i.items.map(
                (j: any, k: number) =>
                  j.enable && (
                    <li key={k}>
                      {j.url ? (
                        <Link
                          className={""}
                          href={j.url}
                          onClick={onMenuItemClick}
                        >
                          {j.icon}
                          <span>{j.title}</span>
                        </Link>
                      ) : (
                        <div>
                          {j.icon}
                          <span>{j.title}</span>
                        </div>
                      )}
                    </li>
                  )
              )}
            </ul>
          ))}
        </div>
      </div>
    </aside>
  );
}
