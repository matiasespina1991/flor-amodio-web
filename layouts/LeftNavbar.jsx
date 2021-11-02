import CategoryLink from '../components/CategoryLink'
import SubcategoriesPanel from '../components/SubcategoriesPanel';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';


function LeftNavbar({children}) {

    const [ categorySelected, setCategorySelected, handleSubCategoryClick ] = useState('');

    const el = useRef();
    const q = gsap.utils.selector(el);

    const handleCategoryClick = (id) => {
        setCategorySelected(id.target.id);
    }

    useEffect(() => {
        gsap.fromTo(q(".fade-in"), {
            opacity: 0,
            y: -30,
        },{
            opacity: 1,
            delay: 0.2,
            duration: 0.8,
            ease: "power4",
            y:0,
            stagger: 0.2,
        });
    }, []);

    return(
        <>
            <div ref={el} className="left-navbar">
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