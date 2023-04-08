import {  Backdrop, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AppDispatch, useSelector } from "../../store";
import {  useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import DetailInfo from "../../parts/DetailInfo";


type apiDetailArray = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
};
export const ItemDetail = () => {
  const [detail, setDetail] = useState<apiDetailArray[]>([])
  const { productId } = useParams();
  const open:boolean = true;


  const getDetail = async () => {
     await axios.get(`https://fakestoreapi.com/products/${productId}`,{
    }).then((res) =>{
      const data = res.data;
      setDetail(data)
    }
    ).catch(() => {
      console.log('error');
    });
  }


  useEffect(() => {
    getDetail();
    
  },[]);

  return (
    <div className="container">

      {detail ? (
        <div>
          <DetailInfo {...detail} />
        </div>
      ) : (
        <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      )}
    </div>
  );
};
