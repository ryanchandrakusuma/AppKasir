import React, { useState } from 'react'
import './Popup.css'

const Popup = (props) => {
    const [jumlahBarang, setJumlahBarang] = useState('');
    const [satuanBarang, setSatuanBarang] = useState('buah');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setTrigger(false);
        props.inputBarang(props.value);
        props.inputJumlah(jumlahBarang);
        props.inputSatuan(satuanBarang);
    }


    return(props.trigger) ? (
        <div className="popup">
            <div className={"popup-inner"}>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
                <form onSubmit={handleSubmit}>
                    Barang : <input type="text" disabled value={props.value}></input><br></br>
                    Jumlah : <input type="number" required value={jumlahBarang} onChange={(e) => setJumlahBarang(e.target.value)}></input><br></br>
                    Satuan : <select value={satuanBarang} onChange={(e) => setSatuanBarang(e.target.value)}>
                        <option value="buah">buah</option>
                        <option value="kg">kg</option>
                        <option value="porsi">porsi</option>
                    </select><br></br>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    ) : "" ;
}

export default Popup