import React from 'react';
import { FilteringTable } from '../Components/FilteringTable';
import { PaginationTable } from '../Components/PaginationTable';
import './Products.css';

const Products = () => {

  return (
    <div className = "wrapper">
      <div className = "left-content" >
        <div className = "top-filter"></div>
        <PaginationTable />
      </div>
      <div className = "right-content">
        <input type = 'number'></input>
      </div>
        
    </div>
  );
}

export default Products;