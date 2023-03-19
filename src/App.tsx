import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/style.scss';
import { Header } from './components/Header';
import { ItemDetail } from './components/ItemDetail';
import { ItemsLists } from './components/ItemsLists';
import CartContainer from './components/cart/CartContainer';
import NotFound from './NotFound';


 const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes >
          <Route  path='/' element={<ItemsLists/>}/>
          <Route  path={`/detail/:productId`} element={<ItemDetail/>}/>
          <Route  path='cart' element={<CartContainer/>}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App


// https://github.com/dmalvia/React_Redux_Tutorial
// https://fakestoreapi.com/
// https://github.com/Shin-sibainu/redux-for-beginner-udemy/blob/main/src/features/cart/CartSlice.js
// https://github.com/Shin-sibainu/todolist-react-typescript/blob/main/src/App.tsx
// https://github.com/fireclint/filter-contact-list-react
// https://qiita.com/cocottejs/items/7afe6d5f27ee7c36c61f
// https://github.com/suzu1997/react-redux-ec
// https://github.com/Shin-sibainu/react-todoapp-youtube/blob/main/todoapp/src/components/TodoList.jsx