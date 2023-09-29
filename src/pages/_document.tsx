import Document, { Html, Head, Main, NextScript } from "next/document";

import Seo from "../framework/presentation/components/modules/Seo";

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

function MyDocument (){
 
    return (
      <Html>
        <Head>
          <Seo seo={seo} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            src="https://cdn.pulse.is/livechat/loader.js"
            data-live-chat-id="651576acd32739aebf0a7b9e"
            async
          ></script>
        </body>
      </Html>
    );
  
}

export default MyDocument;
