import Link from 'next/link';
import { useRouter } from 'next/router'
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

function SubcategoriesPanel({categorySelected, categoryId, handleSubCategoryClick}) {

    const router = useRouter()
    const pathname = router.query.id

    const el = useRef();
    const q = gsap.utils.selector(el);

    const subcategoryData = [
        {
            "parentCategory": "graphic-design",
            "subcategory": "cover art",
            "id": "cover-art"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "identity",
            "id": "identity"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "video titles",
            "id": "video-titles"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "posters & flyers",
            "id": "posters-and-flyers"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "merch",
            "id": "merch-graphic-design"
        },
        // {
        //     "parentCategory": "art-and-exhibition",
        //     "subcategory": "demete",
        //     "id": "demete"
        // },
        {
            "parentCategory": "merch",
            "subcategory": "shop now",
            "id": "merch-shop-now"
        }
    ]

    const isExpanded = "isExpanded";

    const keepMenuExpanded = true;


    useLayoutEffect(() => {
        gsap.fromTo(q(".fade-in"), {
            opacity: 0,
            y: -30,
        },{
            opacity: 1,
            delay: 1.9,
            duration: 0.8,
            ease: "power4",
            y:0,
            stagger: 0.35,
        });
    }, []);


    return(
        <div 
            style={{opacity: 0}}
            ref={el}
                className={`
                    lower-panel
                    fade-in
                    ${categorySelected === categoryId || keepMenuExpanded ? isExpanded : null}
                `}
            >
                <div className="sub-categories-container">
                    {subcategoryData.map((item, id) => (
                        item.parentCategory === categoryId ? 
                                <div key={id}>
                                    <Link scroll={false} href={`/portfolio/${item.id}`}> 
                                        <a onClick={handleSubCategoryClick} className={`sub-categories ${item.id == pathname ? 'active' : null}`}>{item.subcategory}</a>
                                    </Link>
                                </div>
                            : 
                            ""
                        ))
                    }
                </div>
                
        </div>
    )  
}

export default SubcategoriesPanel
