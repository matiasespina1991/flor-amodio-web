import CategoryLink from '../components/CategoryLink'
import SubcategoriesPanel from '../components/SubcategoriesPanel';
import { useState } from 'react';


function LeftNavbar({children}) {

    const [ categorySelected, setCategorySelected, handleSubCategoryClick ] = useState('');
    
    const handleCategoryClick = (id) => {
        setCategorySelected(id.target.id);
    }

    return(
        <>
            <div className="left-navbar">
                <CategoryLink categoryName="GRAPHIC DESIGN" categoryId="graphic-design" handleSubCategoryClick={handleSubCategoryClick} handleCategoryClick={handleCategoryClick} />
                <SubcategoriesPanel categoryName="GRAPHIC DESIGN" categoryId="graphic-design" handleSubCategoryClick={handleSubCategoryClick} categorySelected={categorySelected} />
                <CategoryLink categoryName="ART & EXHIBITIONS" categoryId="art-and-exhibition" handleSubCategoryClick={handleSubCategoryClick} cat handleCategoryClick={handleCategoryClick} />
                <SubcategoriesPanel categoryName="ART & EXHIBITIONS" categoryId="art-and-exhibition" handleSubCategoryClick={handleSubCategoryClick} cat categorySelected={categorySelected} />
                <CategoryLink categoryName="MERCH" categoryId="merch" handleSubCategoryClick={handleSubCategoryClick} handleCategoryClick={handleCategoryClick} />
                <SubcategoriesPanel categoryName="MERCH" categoryId="merch" handleSubCategoryClick={handleSubCategoryClick} categorySelected={categorySelected} />
            </div>
            {children}
        </>
    )

}

export default LeftNavbar;