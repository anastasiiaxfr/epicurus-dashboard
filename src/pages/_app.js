import Head from 'next/head'

import '../assets/styles/main.sass'


export default function App({ Component, pageProps }) {
    return (
        <>
            <Head> Header </Head>
            <Component {...pageProps} />
        </>
    )
}