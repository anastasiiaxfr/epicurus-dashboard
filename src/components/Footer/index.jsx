import Link from 'next/link'

export default function Footer({ token }) {
    return (
        <footer className="pg__footer">
            <p className="text--label">
                Epicurus.
                All Rights Reserved. &copy; 2023. Your <Link href={`${process.env.REFFERAL}?referral=${token}`}>Referral link</Link>
            </p>
        </footer>

    )
}
