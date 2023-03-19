import {  Backdrop, Button, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { AppDispatch, useSelector } from "../store";
import {  useParams } from "react-router-dom";
import { getDetail } from "../redux/item/itemSlice";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/cart/cartSlice";


export const ItemDetail = () => {
  // type apiDetailArray = {
  //     id: number;
  //     title: string;
  //     image: string;
  //     price: number;
  //     category: string;
  //     description: string;
  // };

  const dispatch = useDispatch<AppDispatch>();
  const {detail}:any= useSelector((store) => store.items);
  const { productId } = useParams();
  const open:boolean = true;
  
  // const onUnload = (e: { preventDefault: () => void; returnValue: string; }) => {
  //   e.preventDefault();
  //   e.returnValue = '';
  // }
  //   window.addEventListener('beforeunload', onUnload);

  useEffect(() => {
    dispatch(getDetail(productId));
  });


  return (
    <div className="container">

      
      {detail ? (
        <div>
          {
            <div className="detail flex" key={detail.id}>
              <div className="detail__image">
                <img src={detail.image} />
              </div>
              <div className="detail__title">
                <h1 className="detail__title__text">{detail.title}</h1>
                <h2 className="detail__title__text">
                  {detail.price * 100}円
                </h2>
                <h3 className="detail__title__text">カテゴリー：{detail.category}</h3>
                <p>{detail.description}</p>
                <div className="detail__title__text">
                  <Button variant="contained" onClick={() => {dispatch(addCart(detail)) }} className="detail__cart_btn">
                    カートに入れる
                  </Button>
                </div>
              </div>
            </div>
          }
        </div>
      ) : (
        <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      )}
    </div>
  );
};
