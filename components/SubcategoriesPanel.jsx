import Link from 'next/link';

function SubcategoriesPanel({categorySelected, categoryId, handleSubCategoryClick}) {

    const subcategoryData = [
        {
            "parentCategory": "graphic-design",
            "subcategory": "Cover Artwork",
            "id": "cover-artwork"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "Brands & Logos"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "Video Titles"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "Posters & Flyers"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "Merch"
        },
        {
            "parentCategory": "art-and-exhibition",
            "subcategory": "DEMETE"
        },
        {
            "parentCategory": "merch",
            "subcategory": "SHOP NOW"
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
                                    <Link href="/subcategory"> 
                                        <a onClick={handleSubCategoryClick} className="sub-categories">{item.subcategory}</a>
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
