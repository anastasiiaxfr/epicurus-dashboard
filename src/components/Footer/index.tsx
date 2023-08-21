import Link from 'next/link'

export default function Footer({ token }: any) {
    return (
        <footer className="pg__footer">
            <p className="text--label">
                Epicurus.
                Все права защищены. &copy; 2023. Ваша <Link href={`${process.env.REFFERAL}?referral=${token}`}>реферальная ссылка</Link>
            </p>
        </footer>

    )
}
