import { useRouter } from "next/router";

import AuthProvider, { AuthContext } from "./_auth";
import ProductProvider from "./_products";

import Header from "../framework/presentation/components/modules/Header";
import Sidebar from "../framework/presentation/components/modules/Sidebar";


import Support from "../framework/presentation/components/modules/Support";

import Icon1 from "../framework/presentation/components/assets/icons/i1.svg";
import Icon2 from "../framework/presentation/components/assets/icons/i2.svg";
import Icon3 from "../framework/presentation/components/assets/icons/i3.svg";
import Icon4 from "../framework/presentation/components/assets/icons/i4.svg";
import Icon5 from "../framework/presentation/components/assets/icons/i5.svg";
import Icon6 from "../framework/presentation/components/assets/icons/i6.svg";
import Icon7 from "../framework/presentation/components/assets/icons/i7.svg";
import Icon9 from "../framework/presentation/components/assets/icons/i9.svg";
import Icon10 from "../framework/presentation/components/assets/icons/i10.svg";
import Icon11 from "../framework/presentation/components/assets/icons/i11.svg";
import Icon12 from "../framework/presentation/components/assets/icons/i12.svg";

import "../framework/presentation/components/assets/styles/main.sass";

export default function App({ Component, pageProps }: any) {
  const router = useRouter();

  const currentURL = router.asPath;

  let baseURL = `/`;

  const links = [
    {
      group: "Products",
      items: [
        {
          enable: true,
          title: "Dashboard",
          icon: <Icon1 with="16" height="16" />,
          url: "/",
        },
        {
          enable: true,
          title: "Robotic Trading",
          icon: <Icon2 with="16" height="16" />,
          url: "/robotic-trading",
        },
        {
          enable: true,
          title: "Trust Management",
          icon: <Icon3 with="16" height="16" />,
          url: "/trust-management",
        },
        {
          enable: true,
          title: "Deposit",
          icon: <Icon4 with="16" height="16" />,
          url: "/deposit",
        },
        {
          enable: false,
          title: "Academy",
          icon: <Icon5 with="16" height="16" />,
          url: "/academy",
        },
      ],
    },
    {
      group: "Payments",
      items: [
        {
          enable: true,
          title: "Payments",
          icon: <Icon6 with="16" height="16" />,
          url: "/payments",
        },
        {
          enable: true,
          title: "My API",
          icon: <Icon7 with="16" height="16" />,
          url: "/myapi",
        },
      ],
    },
    {
      group: "Support",
      items: [
        {
          enable: true,
          title: "FAQ",
          icon: <Icon9 with="16" height="16" />,
          url: "/support",
        },
        {
          enable: false,
          title: "Bug Report",
          icon: <Icon10 with="16" height="16" />,
          url: "/",
        },
        {
          enable: false,
          title: "Settings",
          icon: <Icon11 with="16" height="16" />,
          url: "/",
        },
        {
          enable: false,
          title: "Dark Theme",
          icon: <Icon12 with="16" height="16" />,
        },
      ],
    },
  ];

  const urlParent = "/" + currentURL.split("/")[1];

  const findTitleByURL = (url: any) => {
    for (const group of links) {
      for (const item of group.items) {
        if (
          item.url === url ||
          (item.url && item.url !== "/" && urlParent.includes(item.url))
        ) {
          return item.title;
        }
      }
    }
    return null;
  };

  const currentTitle = findTitleByURL(currentURL) || "Home";

  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <div className="pg__wrap">
            <Sidebar
              links={links}
              currentURL={currentURL}
              urlParent={urlParent}
            />
            <main className="pg__container">
              <Header title={currentTitle} />
              {/* <Support /> */}
              
              <article className="pg__content">
                <Component {...pageProps} />
              </article>
            </main>
          </div>
         
        </ProductProvider>
      </AuthProvider>
    </>
  );
}
