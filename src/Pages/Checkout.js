import React, { useState, useEffect } from 'react';
import './Checkout.css';
import SelectItems from '../Components/SelectItems';
import Popup from '../Components/Popup';

function Checkout() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [passValue, setValue] = useState('');
  const [barangList, setBarangList] = useState();

  const BarangLists = [
    {
      namaBarang: "Barang1",
      hargaBarang: 6000,
    },
    {
      namaBarang: "Barang2",
      hargaBarang: 7000,
    },
    {
      namaBarang: "Barang3",
      hargaBarang: 8000,
    },
    {
      namaBarang: "Barang4",
      hargaBarang: 10000,
    },
  ]

  const fetchData = async () => {
    return await fetch('http://localhost:8000/checkout')
      .then(response => response.json())
      .then(data => {
        setBarangList(data) 
      });}

  useEffect( () => {fetchData()},[]);

  function openPopup(value) {
    setValue(BarangLists.at(value));
    setButtonPopup(true);
  }

  return (
    <div className="container">
        <div className="selection">
            <button value="0" onClick={(e) => openPopup(e.target.value)}>Barang1</button><br></br>
            <button value="1" onClick={(e) => openPopup(e.target.value)}>Barang2</button><br></br>
            <button value="2" onClick={(e) => openPopup(e.target.value)}>Barang3</button><br></br>
            <button value="3" onClick={(e) => openPopup(e.target.value)}>Barang4</button>
        </div>
        <div className="result">
          <SelectItems barangList={barangList}/>
          <br></br>
          <button>Checkout</button>
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