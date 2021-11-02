import Link from 'next/link';
import { useRouter } from 'next/router'

function SubcategoriesPanel({categorySelected, categoryId, handleSubCategoryClick}) {

    const router = useRouter()
    const pathname = router.query.id

    const subcategoryData = [
        {
            "parentCategory": "graphic-design",
            "subcategory": "cover artwork",
            "id": "cover-artwork"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "brands & logos",
            "id": "brands-and-logos"
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
        {
            "parentCategory": "art-and-exhibition",
            "subcategory": "demete",
            "id": "demete"
        },
        {
            "parentCategory": "merch",
            "subcategory": "shop now",
            "id": "merch-shop-now"
        }
    ]

    const classToggle = "isExpanded";

    return(
        <div 
                className={`
                    lower-panel
                    ${categorySelected === categoryId ? classToggle : null}
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
