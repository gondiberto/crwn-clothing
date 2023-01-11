import "./directory-item.style.scss";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;

  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      <div className="body">
        <h2>{title}</h2>
        <Link to={`shop/${title}`}>Shop Now</Link>
      </div>
    </div>
  );
};

export default CategoryItem;
