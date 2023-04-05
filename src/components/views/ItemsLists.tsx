import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Sidebar } from "../templates/Sidebar";
import { getItems } from "../../redux/item/itemSlice";
import { AppDispatch, useSelector } from "../../store";
import Item from "../../parts/Item";

export const ItemsLists = () => {
  type apiArray = {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
  };

  const dispatch = useDispatch<AppDispatch>();
  const {items, maxPriceRange, minPriceRange} = useSelector((store) => store.items)
  const [filterItem, setFilterItem] = useState<apiArray[]>([]);
  const [filterFlag, setFilterFlag] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const categoryParams = searchParams.get("category");



  // API反映
  useEffect(() => {
    dispatch(getItems());
  }, []);


  // 絞り込み
  useEffect(() => {
    let copyPosts = [...items];

    // 料金絞り込み
    if(!minPriceRange && maxPriceRange === 100000){
      setFilterFlag(false);
    } else if(minPriceRange || maxPriceRange){
      copyPosts = copyPosts.filter((post: apiArray) => {
       return (post.price < maxPriceRange/100 && post.price > minPriceRange/100)
      })
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
  }, [categoryParams ,maxPriceRange, minPriceRange]);

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
