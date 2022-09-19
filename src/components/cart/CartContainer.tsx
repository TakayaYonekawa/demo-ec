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
    dispatch(handleCart());
    dispatch(handleTotalPrice());
  }, []);

  if (totalPrice < 1 || totalPrice === undefined) {
    return (
      <section className="cart">
        <div>
          <h2>買い物かご</h2>
          <h4 className="empty-cart">何も入ってません・・・</h4>
        </div>
      </section>
    );
  }

  return (
    <section className="cart">
      <div>
        <h2>買い物かご</h2>
      </div>
      <div>
        {cartShow
          ? cartShow.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })
          : ""}

        {/* {cartItems
          ? cartItems.map((item: cartArray) => {
              return <CartItem key={item.id} {...item} />;
            })
          : ""} */}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            合計 <span>{Math.floor(totalPrice * 100)}円</span>
          </h4>
        </div>
        <div className="clear-btn">
          <Button className="btn " onClick={() => dispatch(removeAll())}>
            全削除
          </Button>
        </div>
      </footer>
    </section>
  );
}

export default CartContainer;
