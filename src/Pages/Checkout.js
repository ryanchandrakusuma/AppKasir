import React, { useState, useEffect } from 'react';
import './Checkout.css';
import SelectItems from '../Components/SelectItems';
import Popup from '../Components/Popup';

function Checkout() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [passValue, setValue] = useState('');
  const [barangList, setBarangList] = useState();

  const fetchData = async () => {
    return await fetch('http://localhost:8000/checkout')
      .then(response => response.json())
      .then(data => {
        setBarangList(data) 
      });}

  useEffect( () => {fetchData()},[]);

  function openPopup(value) {
    setValue(value);
    setButtonPopup(true);
  }

  return (
    <div className="container">
        <div className="selection">
            <button value="Barang1" onClick={(e) => openPopup(e.target.value)}>Barang1</button><br></br>
            <button value="Barang2" onClick={(e) => openPopup(e.target.value)}>Barang2</button><br></br>
            <button value="Barang3" onClick={(e) => openPopup(e.target.value)}>Barang3</button><br></br>
            <button value="Barang4" onClick={(e) => openPopup(e.target.value)}>Barang4</button>
        </div>
        <div className="result">
          <SelectItems barangList={barangList}/>
        </div>
        <Popup 
          trigger={buttonPopup} 
          setTrigger={setButtonPopup} 
          tempName={passValue}
          >
        </Popup>
    </div>
  );
}

export default Checkout;