import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/style.scss';
import { Header } from './parts/Header';
import { ItemDetail } from './components/views/ItemDetail';
import { ItemsLists } from './components/views/ItemsLists';
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


