import Push from '../../framework/presentation/components/modules/Push'
import Hero from '../../framework/presentation/components/modules/Hero'
import Table from '../../framework/presentation/components/modules/Tables'
import Hgroup from "../../framework/presentation/components/modules/Hgroup";


function AcademyPage() {
    const hgroup = {
        title: 'Transaction',
        link: {
            label: 'See All',
            url: '#'
        }
    };

    return (
        <>
            <Push url="#" theme="default" type="Reminder" text="You Successfully Updated your Subscription  |  Ends at 11.07.23" close={false} />

            <Hero />
            
            {/* TRANSACTION */}
            <Hgroup props={hgroup}/>
            <Table />
            
        </>
    )
}

export default AcademyPage