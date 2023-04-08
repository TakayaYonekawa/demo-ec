import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";



export const Header = () => {
  let   totalAmount:number = 0;

  const handleTotalAmount = () => {
    let arr:any = localStorage.getItem('cartItems');
    if(arr !== null){
      totalAmount = JSON.parse(arr).length
    }
  }
  handleTotalAmount();




  return (
    <header className="header">
      <div className="container flex">
        <Link to='/'>
          <h2>デモECサイト</h2>        
        </Link>
        <div className="cart-logo">
          <Link to='cart'>
            <ShoppingCartIcon/>
            <span className="cart-logo__amount">
              {totalAmount}
            </span>          
          </Link>
        </div>
      </div>
    </header>
  );
};
