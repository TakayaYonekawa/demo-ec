import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  handleCart,
  handleTotalPrice,
  removeAll,
} from "../../redux/cart/cartSlice";
import { AppDispatch, useSelector } from "../../store";
import CartItem from "./CartItem";

function CartContainer() {


  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, cartShow,totalPrice } = useSelector((store) => store.cart);

  useEffect(() => {
    // イベントの設定
    window.addEventListener('beforeunload', onUnload);
    return () => {
      // イベントの設定解除
      window.removeEventListener('beforeunload', onUnload);
    }
  })
  const onUnload = (e: { preventDefault: () => void; returnValue: string; }) => {
    e.preventDefault();
    e.returnValue = '';
  }

  useEffect(() => {
    dispatch(handleCart());
    dispatch(handleTotalPrice());
  }, []);

  if (totalPrice < 1 || totalPrice === undefined) {
    return (
      <section className="cart">
        <div className="cart__empty">
          <h2>買い物かご</h2>
          <h3 className="cart__empty__text">何も入ってません・・・</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="cart">
        <h2 className="cart__title">買い物かご</h2>
      <div>
        {cartShow
          ? cartShow.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })
          : ""}

      </div>
      <div className="cart__total">
        <hr />
        <div className="cart__total__price">
          <h3 className="cart__total__price__text">
            合計 <span>{Math.floor(totalPrice * 100)}円</span>
          </h3>
        </div>
        <div className="cart__total__clear">
          <Button className="u-btn " onClick={() => dispatch(removeAll())}>
            全削除
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CartContainer;
