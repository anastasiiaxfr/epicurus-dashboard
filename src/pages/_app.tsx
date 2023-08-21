import { useRouter } from "next/router";

import AuthProvider from "./_auth.tsx";
import ProductProvider from "./_products";


import Seo from "../components/Seo";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


import Icon1 from "../assets/icons/i1.svg";
import Icon2 from "../assets/icons/i2.svg";
import Icon3 from "../assets/icons/i3.svg";
import Icon4 from "../assets/icons/i4.svg";
import Icon5 from "../assets/icons/i5.svg";
import Icon6 from "../assets/icons/i6.svg";
import Icon7 from "../assets/icons/i7.svg";
import Icon9 from "../assets/icons/i9.svg";
import Icon10 from "../assets/icons/i10.svg";
import Icon11 from "../assets/icons/i11.svg";
import Icon12 from "../assets/icons/i12.svg";


import "../assets/styles/main.sass";

const seo = {
  metaHeading: "Epicurus | 💙💛",
  metaDescription: "Epicurus Description",
  metaSiteName: "Epicurus",
  metaLocale: "en",
  metaURL: `${process.env.NEXT_PUBLIC_HOST}`,
  //metaImg: `${process.env.NEXT_PUBLIC_HOST}/og.jpg`,
  metaImg: "og.jpg",
  metaImgWidth: "600",
  metaImgHeight: "314",
};

const schema = {
  "@context": "http://schema.org/",
  "@type": "Organization",
  name: "Epicurus",
  brand: "Epicurus",
  alternateName: "Epicurus",
  url: process.env.NEXT_PUBLIC_HOST,
  logo: `${process.env.NEXT_PUBLIC_HOST}/ua/logo.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "SOHO The Strand, Fawwara Building, Triq L-Imsida",
    addressLocality: "Gzira",
    postalCode: "GZR 1362",
    addressCountry: "Malta",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "380505635807",
      email: "info@epicurus.com",
      contactType: "customer support",
      areaServed: "US",
      availableLanguage: ["English"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/epicurus",
    "https://twitter.com/epicurus",
    "https://www.linkedin.com/company/epicurus",
    "https://www.instagram.com/epicurus",
  ],
};

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
          url: baseURL,
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
      group: "Help and Settings",
      items: [
        {
          enable: true,
          title: "Support & Wiki",
          icon: <Icon9 with="16" height="16" />,
          url: "/support",
        },
        {
          enable: false,
          title: "Bug Report",
          icon: <Icon10 with="16" height="16" />,
          url: "/bug-report",
        },
        {
          enable: true,
          title: "Settings",
          icon: <Icon11 with="16" height="16" />,
          url: "/settings",
        },
        {
          enable: false,
          title: "Dark Theme",
          icon: <Icon12 with="16" height="16" />,
        },
      ],
    },
  ];

  const urlParent = '/' + currentURL.split('/')[1]

  const findTitleByURL = (url: any) => {
    for (const group of links) {
      for (const item of group.items) {
        if (item.url === url || item.url && item.url !== '/' && urlParent.includes(item.url)) {
          return item.title;
        }
      }
    }
    return null; 
  };

  const currentTitle = findTitleByURL(currentURL) || "Home";
  return (
    <>
      <Seo seo={seo} />
      
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          ></script>

          <AuthProvider>
            <ProductProvider>
            <div className="pg__wrap">
              <Sidebar links={links} currentURL={currentURL} urlParent={urlParent}/>
              <main className="pg__container">
                <Header title={currentTitle} />
                <article className="pg__content">
                  <Component {...pageProps} />
                </article>
              </main>
            </div>
            </ProductProvider>
          </AuthProvider>
        </>
      
    </>
  );
}
