import React, { useEffect } from "react";
import { Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch, useSelector } from "../../store";
import { removeItem } from "../../redux/cart/cartSlice";


type apiArray = {
  id: number | string;
  title: string;
  price: number;
  image: string;
};

function CartItem({ id, image, price, title }: apiArray) {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems , cartShow } = useSelector((store) => store.cart);

  // 要素数を数える
  let count = cartItems.filter(function(x){return x.id===id}).length;



  return (
    <article className="cart-item">
      <img src={image} alt={title} className="cart-item__image" />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">{price * 100}円</h4>
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          削除
        </button>
        <p>注文数：{count}</p>
      </div>
      <div></div>
    </article>
  );
}

export default CartItem;
