import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.style";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;

  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <Link to={`shop/${title}`}>Shop Now</Link>
      </Body>
    </DirectoryItemContainer>
  );
};

export default CategoryItem;
