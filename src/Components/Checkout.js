import React, { useState, useEffect } from 'react';
import './Checkout.css';
import SelectItems from './SelectItems';
import Popup from './Popup';

function Checkout() {
  let counter = -1;
  const [buttonPopup, setButtonPopup] = useState(false);
  const [passValue, setValue] = useState();
  const [barangList, setBarangList] = useState([]);
  const [checkoutList, setCheckoutList] = useState([]);

  const fetchData = async () => {
    return await fetch('http://localhost:8000/checkout')
      .then(response => response.json())
      .then(data => {
        setCheckoutList(data) 
      });
  }

  const fetchData2 = async () => {
    return await fetch('http://localhost:8001/barangs')
      .then(response => response.json())
      .then(data => {
        setBarangList(data) 
      });
  }

  useEffect( () => {fetchData()},[]);
  useEffect( () => {fetchData2()},[]);

  return (
    <div className="container">
        
        <div className="result">
          <SelectItems barangList={checkoutList}/>
          <br></br>
          <button>Checkout</button>
        </div>
    </div>
  );
}

export default Checkout;