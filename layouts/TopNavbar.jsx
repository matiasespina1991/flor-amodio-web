import Link from 'next/link';
import { useRouter } from 'next/router'

function TopNavbar() {

    const router = useRouter()
    const pathname = router.pathname

    return(
        <div className="top-navbar">
            <nav className="top-navbar-container">
                <Link href="/about">
                    <a className={`${pathname == "/about" ? 'active' : null}`}>ABOUT</a>
                </Link>
                <Link href="/contact" className={`sub-categories ${pathname == "/contact" ? 'active' : null}`}>
                    <a className={`${pathname == "/contact" ? 'active' : null}`}>CONTACT</a>
                </Link>
                <Link href="https://www.instagram.com/amodioflori/">
                    <a href="https://www.instagram.com/amodioflori/" target="_blank" rel="noreferrer">INSTAGRAM</a>
                </Link>
                <Link href="https://www.behance.net/FlorAmodio">
                    <a href="https://www.behance.net/FlorAmodio" target="_blank" rel="noreferrer">BEHANCE</a>
                </Link>
            </nav>
        </div>
    )
}

export default TopNavbar