<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
=======
import React from 'react';
>>>>>>> Stashed changes
import Checkout from '../Components/Checkout';
import { ListBarang } from '../Components/ListBarang';
import './Home.css';

const Home = () => {
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
  )
}

export default Home;