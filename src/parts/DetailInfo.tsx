import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useSelector } from "../store";
import { addCart } from "../redux/cart/cartSlice";




const  DetailInfo = (detail:any) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="detail flex" key={detail.id}>
        <div className="detail__image">
          <img src={detail.image} />
        </div>
        <div className="detail__title">
          <h1 className="detail__title__text">{detail.title}</h1>
          <h2 className="detail__title__text">{detail.price * 100}円</h2>
          <h3 className="detail__title__text">カテゴリー：{detail.category}</h3>
          <p>{detail.description}</p>
            <Button
              variant="contained"
              onClick={() => {dispatch(addCart(detail));}}
              className="detail__btn"
            >
              カートに入れる
            </Button>
        </div>
      </div>
    </>
  );
}

export default DetailInfo;
