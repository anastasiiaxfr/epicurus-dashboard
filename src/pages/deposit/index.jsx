import Hgroup from "../../components/Hgroup";
import Card from "./Card";
import Calculator from "./Calculator";


function DepositPage() {
    const hgroup = {
        title: 'Our Solutions',
        link: {
            label: 'See All',
            url: '#'
        }
    };

    const deposits = [
        {
            type: 'Deposit Classic',
            about: {
                title: 'About the Deposit',
                text: 'DCA (Dollar Cost Averaging) бот - это программа, разработанная для автоматического выполнения стратегии долларового усреднения при инвестировании. Он основан на алгоритмах искусственного интеллекта и предназначен для помощи инвесторам в автоматическом распределении их инвестиций в течение определенного периода времени.'
            },
            offer: {
                title: 'Percentage',
                val: '10%'
            },
            cta: {
                title: 'Want to invest?',
                btn: {
                    title: 'Invest Now',
                    on_click: '/'
                }
            }
        },
        {
            type: 'Deposit Premium',
            about: {
                title: 'About the Deposit',
                text: 'DCA (Dollar Cost Averaging) бот - это программа, разработанная для автоматического выполнения стратегии долларового усреднения при инвестировании. Он основан на алгоритмах искусственного интеллекта и предназначен для помощи инвесторам в автоматическом распределении их инвестиций в течение определенного периода времени.'
            },
            offer: {
                title: 'Percentage',
                val: '20%'
            },
            cta: {
                title: 'Want to invest?',
                btn: {
                    title: 'Invest Now',
                    on_click: '/'
                }
            }
        },
        {
            type: 'Deposit VIP',
            about: {
                title: 'About the Deposit',
                text: 'DCA (Dollar Cost Averaging) бот - это программа, разработанная для автоматического выполнения стратегии долларового усреднения при инвестировании. Он основан на алгоритмах искусственного интеллекта и предназначен для помощи инвесторам в автоматическом распределении их инвестиций в течение определенного периода времени.'
            },
            offer: {
                title: 'Percentage',
                val: '12%'
            },
            cta: {
                title: 'Want to invest?',
                btn: {
                    title: 'Invest Now',
                    on_click: '/'
                }
            }
        },

    ];

    return (
        <>
            <Calculator />
            <Hgroup props={hgroup}/>
            <Card deposits={deposits} />
        </>
    )
}

export default DepositPage