import React from 'react';
import Checkout from '../Components/Checkout';
import { ListBarang } from '../Components/ListBarang';
import './Products.css';

const Products = () => {

  return (
    <div className = "wrapper">
      <div className = "left">
        <div className = "top-filter"></div>
        <ListBarang />
      </div>
      <div className = "right">
        <div className = "right-wrapper">
          <div className= "right-content">
          <Checkout/>  
          </div>
        </div>
      </div>
        
    </div>
  );
}

export default Products;