import ButtonComponent from "../ButtonComponent";

const Category = ({ name, image }) => {
  return (
    <div className="categories-slide-wrapper">
      <div className="categories-slide">
        <div
          className="categories-box"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="category-overlay">
            <p className="category-name">{name}</p>
            <ButtonComponent
              text="View All"
              variant=" "
              className="category-view-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
