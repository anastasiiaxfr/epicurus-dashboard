import Link from 'next/link'
import Push from '../components/Push'
import Hero from '../components/Hero'
import Table from '../components/Tables'
import DownloadIcon from '../assets/icons/download.svg'


function HomePage() {
    return (
        <>
            <Push url="#" theme="default" type="Reminder" text="You Successfully Updated your Subscription  |  Ends at 11.07.23" close={false} />

            <Hero />
            
            {/* TRANSACTION */}
            <section className="pg__section">
                <div className="pg__section-header">
                    <h2 className="h3">Transaction</h2>

                    <div className="table__cta">
                        <DownloadIcon width="15" height="15" />
                        <Link href="/" className="text--link">
                            See All
                        </Link>
                    </div>
                </div>
                <Table />
            </section>
        </>
    )
}

export default HomePage