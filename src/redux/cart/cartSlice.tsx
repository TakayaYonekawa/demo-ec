import { createSlice } from "@reduxjs/toolkit";

//stateの型を記述する
export interface apiState {
  cartItems: {
    id: number | string;
    title: string;
    price: number;
    image: string;
  }[];
  cartShow: {
    id: number | string;
    title: string;
    price: number;
    image: string;
  }[];
  totalPrice: number
  totalAmount: number;
}

let arr:any= localStorage.getItem('cartItems') ;


const initialState:apiState  = {
  cartItems: [],
  cartShow: [],
  totalPrice: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart:  (state, action) => {

      let current = [{...state.cartItems}]
      if(arr !== null){
        current= JSON.parse(arr);       
      }
      current.push(action.payload);
      let cartArray = JSON.stringify(current);
      localStorage.setItem('cartItems', cartArray);
      arr = localStorage.getItem('cartItems');
      state.cartItems = arr;
      window.location.href = '/';
      alert('カートへ追加が完了しました。')

    },
    
    removeAll: (state) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      window.location.href = '/';

    },
    removeItem:(state, action) => {
      const itemId = action.payload;
      state.cartShow = state.cartShow.filter((item) => item.id !== itemId);
      localStorage.setItem('cartItems', JSON.stringify(state.cartShow));
      window.location.href = '/';

    },
    handleCart:(state) => {
      arr = localStorage.getItem('cartItems');
      if(arr !== null){
        state.cartItems = JSON.parse(arr);

        // 重複表示回避
        let map = new Map(state.cartItems.map((o) => [o.id, o]));
        state.cartShow = Array.from(map.values())
      }
      
    },
    handleTotalAmount: (state) => {
      let current = [{...state.cartItems}]
      if(arr !== null){current= JSON.parse(arr);}
        state.totalAmount = current.length;
    },
    handleTotalPrice: (state) => {
      let total:number = 0;
      state.cartItems.forEach((item) => {
        total += item.price;
      });
      //新しい状態に更新
      state.totalPrice = total;
    }
  },
});

export const { addCart, removeAll ,removeItem, handleCart,handleTotalAmount,handleTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;
