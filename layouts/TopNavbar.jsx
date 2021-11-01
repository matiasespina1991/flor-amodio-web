import Link from 'next/link';

function TopNavbar() {
    return(
        <div className="top-navbar">
            <nav className="top-navbar-container">
                <Link href="/about">
                    <a href="#">ABOUT</a>
                </Link>
                <Link href="/contact">
                    <a href="#">CONTACT</a>
                </Link>
                <Link href="#">
                    <a href="#">INSTAGRAM</a>
                </Link>
                <Link href="#">
                    <a href="#">BEHANCE</a>
                </Link>
            </nav>
        </div>
    )
}

export default TopNavbar