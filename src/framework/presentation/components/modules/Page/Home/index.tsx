import Push from '../../../../components/modules/Push'
import Hero from '../../../../components/modules/Hero'
import Table from '../../../../components/modules/Tables'
import Hgroup from "../../../../components/modules/Hgroup";


function HomePage() {
    const hgroup = {
        title: 'Transaction',
        link: {
            label: 'See All',
            url: '#'
        }
    };

    return (
        <>
            {/* <Push url="#" theme="default" type="Reminder" text="You Successfully Updated your Subscription  |  Ends at 11.07.23" close={false} /> */}

            <Hero />
            
            {/* TRANSACTION */}
            <Hgroup props={hgroup}/>
            <Table />
            
        </>
    )
}

export default HomePage