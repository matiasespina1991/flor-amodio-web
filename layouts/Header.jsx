import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Header() {

    const el = useRef();
    const q = gsap.utils.selector(el);

    useEffect(() => {
        gsap.fromTo(q(".fade-in"), {
            opacity: 0,
        },{
            opacity: 1,
            duration: 4,
            delay: 0.1,
            ease: "back.out"
        });
    }, []);

    return (
        <Link  scroll={false} href="/" passHref>
            <div ref={el}>
                <div className="header fade-in">
                </div>
             </div>
        </Link>
    )
}

export default Header