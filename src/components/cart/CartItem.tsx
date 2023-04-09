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
  const { cartItems } = useSelector((store) => store.cart);

  // 要素数を数える
  let count = cartItems.filter(function(x){return x.id===id}).length;


  return (
    <section className="cart-item">
      <img src={image} alt={title} className="cart-item__image" />
      <div>
        <h3 className="cart-item__title">{title}</h3>
        <h3 className="cart-item__price">{price * 100}円</h3>
        <button className="cart-item__remove" onClick={() => dispatch(removeItem(id))}>
          削除
        </button>
        <p>注文数：{count}</p>
      </div>
    </section>
  );
}

export default CartItem;
