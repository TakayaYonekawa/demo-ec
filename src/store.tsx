import { configureStore } from "@reduxjs/toolkit";
import { useSelector as rawUseSelector ,TypedUseSelectorHook } from "react-redux";
import itemReducer from './redux/item/itemSlice'
import cartReducer from './redux/cart/cartSlice'


export const store = configureStore({
    reducer: {
        items: itemReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector; 