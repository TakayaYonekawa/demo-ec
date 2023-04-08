import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  filterItems: [],
  maxPrice:100000,
  minPrice:0,
  maxPriceRange:100000,
  minPriceRange: 0,
  filterFlag: false,
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers:{

    // 最大価格の取得
    handleMaxPrice: (state, action) => {
      let maxPriceValue = Number(action.payload);
      if(state.minPrice + 1000 > maxPriceValue){
        return
      }
      state.maxPrice = maxPriceValue;
    },
    // 最低価格の取得
    handleMinPrice: (state, action) => {
      let minPriceValue = Number(action.payload);
      if(state.maxPrice - 1000 < minPriceValue){
        return
      }
      state.minPrice = minPriceValue;
    },
    // 絞り込みを実行
    clickPrice: (state) => {
      state.maxPriceRange = state.maxPrice;
      state.minPriceRange = state.minPrice;

      
    },

  },

});


export const { handleMaxPrice, handleMinPrice, clickPrice} = itemSlice.actions;
export default itemSlice.reducer;
