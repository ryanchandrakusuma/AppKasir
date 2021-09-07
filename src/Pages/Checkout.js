import React, { useState } from 'react';
import './Checkout.css';
import SelectItems from '../Components/SelectItems';
import Popup from '../Components/Popup';

function Checkout() {
  // const [input, setInput] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [passValue, setValue] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [jumlahBarang, setJumlahBarang] = useState('');
  const [satuanBarang, setSatuanBarang] = useState('');

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
            <SelectItems 
              input={namaBarang} 
              input2={jumlahBarang} 
              input3={satuanBarang}>
            </SelectItems>
        </div>
        <Popup 
          trigger={buttonPopup} 
          setTrigger={setButtonPopup} 
          value={passValue} 
          inputBarang={setNamaBarang} 
          inputJumlah={setJumlahBarang} 
          inputSatuan={setSatuanBarang}>
        </Popup>
    </div>
  );
}

export default Checkout;