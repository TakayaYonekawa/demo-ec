import React from "react";
import { Link } from "react-router-dom";

type apiArray = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

function Item({ id, title, price, category, image }: apiArray) {
  return (
    <div className="item">
      <Link to={`detail/${id}`}>
        <div className="item__image">
        <img className="item__image__img" src={image}  alt="" />
        </div>

        <div className="item__text">
          <div className="text-overflow">{title}</div>
          <div className="">{price * 100}円 </div>
          <div className="">{category}</div>
        </div>
      </Link>
    </div>
  );
}

export default Item;
