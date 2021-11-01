import Link from 'next/link';

function SubcategoriesPanel({categorySelected, categoryId, handleSubCategoryClick}) {

    const subcategoryData = [
        {
            "parentCategory": "graphic-design",
            "subcategory": "cover artwork",
            "id": "cover-artwork"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "brands & bogos"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "video titles"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "posters & flyers"
        },
        {
            "parentCategory": "graphic-design",
            "subcategory": "merch"
        },
        {
            "parentCategory": "art-and-exhibition",
            "subcategory": "demete"
        },
        {
            "parentCategory": "merch",
            "subcategory": "shop now"
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
                                    <Link href={`/subcategories/${item.subcategory}`}> 
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
