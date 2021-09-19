import React from 'react';
import Checkout from '../Components/Checkout';
import { PaginationTable } from '../Components/PaginationTable';
import './Products.css';

const Products = () => {

  return (
    <div className = "wrapper">
      <div className = "left">
        <div className = "top-filter"></div>
        <PaginationTable />
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