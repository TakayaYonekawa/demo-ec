import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sidebar } from "../templates/Sidebar";
import { AppDispatch, useSelector } from "../../store";
import Item from "../../parts/Item";
import axios from "axios";
import { useDispatch } from "react-redux";

export const ItemsLists = () => {
  type apiArray = {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
  };
  const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState<apiArray[]>([]);
  const { maxPriceRange, minPriceRange } = useSelector((store) => store.items);
  const [filterItem, setFilterItem] = useState<apiArray[]>([]);
  const [filterFlag, setFilterFlag] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const categoryParams = searchParams.get("category");

  // API(Fakeshop)
  const getItems = () => {
    axios
      .get<apiArray[]>("https://fakestoreapi.com/products")
      .then((res) => {
        setItems(res.data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  // API反映
  useEffect(() => {
    getItems();
  }, []);

  // 絞り込み

  const fitlerClick = () => {
    let copyPosts = [...items];

    // 料金絞り込み
    if (!minPriceRange && maxPriceRange === 100000) {
      setFilterFlag(false);
    } else if (minPriceRange || maxPriceRange) {
      copyPosts = copyPosts.filter((post: apiArray) => {
        return (
          post.price < maxPriceRange / 100 && post.price > minPriceRange / 100
        );
      });
      setFilterItem(copyPosts);
      setFilterFlag(true);
    }

    // カテゴリー絞り込み
    if (categoryParams === "all") {
      setFilterItem(copyPosts);
      return;
    } else if (categoryParams) {
      copyPosts = copyPosts.filter((post: apiArray) =>
        post.category.match(categoryParams)
      );
      setFilterFlag(true);
    }
    setFilterItem(copyPosts);
  };

  useEffect(() => {
    // 料金絞り込み
    fitlerClick();
  }, [categoryParams, maxPriceRange, minPriceRange]);

  return (
    <div className="container item-lists-wrap flex">
      <Sidebar />
      {items ? (
        <div className="item-lists flex">
          {filterFlag
            ? filterItem.map((item: apiArray) => {
                return <Item key={item.id} {...item} />;
              })
            : items.map((item: apiArray) => {
                return <Item key={item.id} {...item} />;
              })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
