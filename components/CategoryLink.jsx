function CategoryLink({handleCategoryClick, categoryName, categoryId}) {
    return (
      <>
          <button className="left-link" id={categoryId} onClick={handleCategoryClick}>{categoryName}</button>
      </>
    );
  }

export default CategoryLink