import React, { useState, useEffect } from 'react';
import './Checkout.css';
import SelectItems from '../Components/SelectItems';
import Popup from '../Components/Popup';

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

  function openPopup(value) {
    console.log(value);
    setValue(barangList.at(value));
    setButtonPopup(true);
  }

  return (
    <div className="container">
        <div className="selection">
          <>
            { barangList.map((data,index) => {
                if (data) {
                  counter++;
                  return (
                    <div key={data.id}>
                      <button value={counter} onClick={(e) => openPopup(e.target.value)}>{data.namaBarang}</button><br></br>
                    </div>	
                  )
                }
                return null
            }) }
          </>
        </div>
        <div className="result">
          <SelectItems barangList={checkoutList}/>
          <br></br>
          <button>Checkout</button>
        </div>
        <Popup 
          trigger={buttonPopup} 
          setTrigger={setButtonPopup} 
          tempName={passValue}
        />
    </div>
  );
}

export default Checkout;