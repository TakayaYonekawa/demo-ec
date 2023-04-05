import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import {
  clickPrice,
  handleMaxPrice,
  handleMinPrice,
} from "../../redux/item/itemSlice";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import CategoryLists from "../../categoryLists";

export const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { maxPrice, minPrice } = useSelector((state) => state.items);
  const [searchParams, setSearchParams] = useSearchParams();
  let params = "";

  // カテゴリ絞り込み
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    let checkedId = e.target.id;
    let checkedName = e.target.value;
    params = createSearchParams({
      categoryId: checkedId,
      category: checkedName,
    }).toString();
    navigate(`?${params}`, { replace: false });
  };

  useEffect(() => {
    setSearchParams(params);
  }, [params]);

  return (
    <div className="sidebar">
      <div className="price-wrap">
        <p>値段で絞り込む</p>
        <div className="price-wrap__multithumb">
          <input
            className="price-wrap__thumb1"
            type="range"
            name="range-1"
            id="back"
            onChange={(e) => dispatch(handleMinPrice(e.target.value))}
            value={minPrice}
            min="0"
            max="100000"
            step="1000"
          />
          <input
            className="price-wrap__thumb2"
            type="range"
            name="range-2"
            id="front"
            onChange={(e) => dispatch(handleMaxPrice(e.target.value))}
            value={maxPrice}
            min="0"
            max="100000"
            step="1000"
          />
        </div>

        <p>
          {minPrice}円〜{maxPrice}円
        </p>
        <Button variant="outlined" onClick={() => dispatch(clickPrice())}>
          料金絞り込み
        </Button>
      </div>
      <div className="cate-wrap">
        <p>カテゴリー一覧</p>
        <ul>
          {/* カテゴリ表示 */}
          {CategoryLists.map((categoryList) => (
            <li key={categoryList.id}>
              <label htmlFor={categoryList.id}>
                <input
                  type="radio"
                  name="category"
                  id={categoryList.id}
                  value={categoryList.category}
                  onChange={(e) => handleChecked(e)}
                />
                {categoryList.categoryName}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// https://www.hypertextcandy.com/react-tutorial-04-form-and-events
