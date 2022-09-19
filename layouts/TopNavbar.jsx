import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import { gsap } from 'gsap';
import FlowerMenuIcon from '../components/FlowerMenuIcon';

function TopNavbar({handleFlowerIconOnClick, responsiveMenuIsExpanded}) {

    const router = useRouter()
    const pathname = router.pathname
    const {id} = router.query

    const el = useRef();
    const q = gsap.utils.selector(el);

    useLayoutEffect(() => {
        gsap.fromTo(q(".fade-in"), {
            opacity: 0,
            x: -40,
        },{
            opacity: 1,
            duration: 0.3,
            delay: 1.9,
            x:0,
            stagger: 0.35,
        });
    }, []);
    return(
        <div className="top-navbar">
            <FlowerMenuIcon responsiveMenuIsExpanded={responsiveMenuIsExpanded} handleFlowerIconOnClick={handleFlowerIconOnClick} />
            <nav ref={el} className="top-navbar-container">
                <Link scroll={false} href="/about">
                    <a className={`${pathname == "/about" ? 'active' : null} fade-in`}>about</a>
                </Link>
                <Link scroll={false} href="/contact" className={`sub-categories ${pathname == "/contact" ? 'active' : null}`}>
                    <a className={`${pathname == "/contact" ? 'active' : null} fade-in`}>contact</a>
                </Link>
                <Link href="/nft">
                    <a className={`${pathname == "/nft" ? 'active' : null} fade-in`}>nft</a>
                </Link>
            </nav>
        </div>
    )
}

export default TopNavbar