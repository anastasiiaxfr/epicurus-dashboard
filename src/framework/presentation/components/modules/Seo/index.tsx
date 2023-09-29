export default function Seo({ seo }: any) {
  return (
    <>
      {/* Fav base (needed advanced) */}
      <link href="fav/favicon.ico" rel="shortcut icon" type="image/x-icon" />
      <link href="fav/favicon.ico" rel="icon" type="image/x-icon" />

      <link rel="shortcut icon" href="fav/favicon.png" type="image/x-icon" />
      <link rel="icon" href="fav/favicon.png" type="image/x-icon" />

      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="fav/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="fav/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="fav/favicon-16x16.png"
      />
      <link rel="mask-icon" href="fav/safari-pinned-tab.svg" color="#fff" />

      <link rel="manifest" href="fav/site.webmanifest" />
      <link rel="mask-icon" href="fav/safari-pinned-tab.svg" color="#0F1014" />
      <meta name="msapplication-TileColor" content="#0F1014" />
      <meta name="theme-color" content="#0F1014" />

      {/* Canonical link tag */}
      <link rel="canonical" href={seo.metaURL} />

      {/* Main SEO meta */}
      <title key="title">{seo.metaHeading}</title>
      <meta
        name="description"
        content={seo.metaDescription}
        key="description"
      />
      <meta name="author" content="Epicurus && Anastasiia_Berest"></meta>

      {/* Schema.org markup for Google+ */}
      <meta itemProp="name" content={seo.metaHeading} key="itemPropname" />
      <meta
        itemProp="description"
        content={seo.metaDescription}
        key="itemPropdescription"
      />
      <meta itemProp="image" content={seo.metaImg} key="itemPropimage" />

      {/* Twitter Card data */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={seo.metaURL} key="twitter:site" />
      <meta
        name="twitter:title"
        content={seo.metaHeading}
        key="twitter:title"
      />
      <meta
        name="twitter:description"
        content={seo.metaDescription}
        key="twitter:description"
      />
      <meta name="twitter:creator" content="MixFin" key="twitter:creator" />
      <meta name="twitter:image" content={seo.metaImg} key="twitter:image" />

      {/* Open Graph data  */}
      <meta property="og:url" key="og:url" content={seo.metaURL} />
      <meta
        property="og:site_name"
        key="og:site_name"
        content={seo.metaSiteName}
      />
      <meta property="og:title" key="og:title" content={seo.metaHeading} />
      <meta
        property="og:description"
        key="og:description"
        content={seo.metaDescription}
      />
      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:locale" key="og:locale" content={seo.metaLocale} />
      <meta property="og:image" key="og:image" content={seo.metaImg} />
      <meta
        property="og:image:width"
        key="og:image:width"
        content={seo.metaImgWidth}
      />
      <meta
        property="og:image:height"
        key="og:image:height"
        content={seo.metaImgHeight}
      />
    </>
  );
}
