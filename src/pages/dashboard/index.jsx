// import Link from 'next/link'
import Hero from '../../components/Hero'
// import Table from '../../components/Tables'
// import DownloadIcon from '../../assets/icons/download.svg'


function DashboardPage() {
    return (
        <>
            {/* HERO */}
            <section className="pg__section">
                <Hero />
            </section>

            {/* TRANSACTION */}
            {/* <section className="pg__section">
                <div className="pg__section-header">
                    <h2 className="h3">Transaction</h2>

                    <div className="table__cta">
                        <DownloadIcon width="15" height="15" />
                        <Link href="/" className="text--link-btn">
                            See All
                        </Link>
                    </div>
                </div>
                <Table />
            </section> */}
        </>
    )
}

export default DashboardPage