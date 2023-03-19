import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getItems = createAsyncThunk('items/getItems', async () => {
    return await fetch('https://fakestoreapi.com/products',{
    }).then((res) =>
      res.json()
    ).catch(() => {
      console.log('error');
      
    });
  });

  export const getDetail = createAsyncThunk('items/getDetail', async (id: string | undefined) => {
    return await fetch(`https://fakestoreapi.com/products/${id}`,{
    }).then((res) =>
      res.json()
    ).catch(() => {
      console.log('error');
      
    });
  });

const initialState = {
  items: [],
  detail: [],
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
  extraReducers: {
    [getItems.fulfilled.toString()]: (state, action) => {
      state.items = action.payload;
    },
    [getDetail.fulfilled.toString()]: (state, action) => {
        state.detail = action.payload;
    },
  },
});


export const {handleMaxPrice, handleMinPrice, clickPrice} = itemSlice.actions;
export default itemSlice.reducer;
