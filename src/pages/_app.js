import { useState, useEffect } from 'react'

import Seo from '../components/Seo'
import Preloader from '../components/Preloader'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

import '../assets/styles/main.sass'
import './_firebase'


const seo = {
    metaHeading: 'Epicurus',
    metaDescription: 'Epicurus Description',
    metaSiteName: 'Epicurus',
    metaLocale: 'en',
    metaURL: `${process.env.NEXT_PUBLIC_HOST}`,
    //metaImg: `${process.env.NEXT_PUBLIC_HOST}/og.jpg`,
    metaImg: 'og.jpg',
    metaImgWidth: '600',
    metaImgHeight: '314',
}

const schema = {
    '@context': 'http://schema.org/',
    '@type': 'Organization',
    name: 'Epicurus',
    brand: 'Epicurus',
    alternateName: 'Epicurus',
    url: process.env.NEXT_PUBLIC_HOST,
    logo: `${process.env.NEXT_PUBLIC_HOST}/ua/logo.svg`,
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'SOHO The Strand, Fawwara Building, Triq L-Imsida',
        addressLocality: 'Gzira',
        postalCode: 'GZR 1362',
        addressCountry: 'Malta',
    },
    contactPoint: [
        {
            '@type': 'ContactPoint',
            telephone: '380505635807',
            email: 'info@epicurus.com',
            contactType: 'customer support',
            areaServed: 'US',
            availableLanguage: ['English'],
        },
    ],
    sameAs: [
        'https://www.facebook.com/epicurus',
        'https://twitter.com/epicurus',
        'https://www.linkedin.com/company/epicurus',
        'https://www.instagram.com/epicurus',
    ]
}



export default function App({ Component, pageProps }) {

    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('Home')
    const getTitle = (value) => {
        setTitle(value)
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500)
    }, [])

    return (
        <>
            <Seo seo={seo} />

            {loading ? <Preloader /> : (
                <>
                   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}></script>

                    <div className="pg__wrap">
                        <Sidebar getTitle={getTitle} />
                        <main className="pg__container">
                            <Header title={title} getTitle={getTitle} />
                            <article className="pg__content">
                                <Component {...pageProps} />
                            </article>
                            <Footer />
                        </main>
                    </div>
                </>
            )}
        </>
    )
}