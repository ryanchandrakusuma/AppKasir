import React, { useState } from 'react'
import './Popup.css'
import useFetch from '../Components/useFetch';
import { useHistory } from 'react-router';

const Popup = (props) => {
    let namaBarang;
    const [jumlahBarang, setJumlahBarang] = useState('');
    const [satuanBarang, setSatuanBarang] = useState('buah');
    const [isPending, setIsPending] = useState('false');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setTrigger(false);
        namaBarang = props.tempName;
        // props.inputJumlah(jumlahBarang);
        // props.inputSatuan(satuanBarang);

        const barang = {namaBarang, jumlahBarang, satuanBarang}
        setIsPending(true);
        fetch('http://localhost:8000/checkout',{
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(barang)
        }).then(()=>{
            console.log('Tambah berhasil');
            setIsPending('false');
            history.push('/');
        })
    }
    const {data} = useFetch('http://localhost:8000/checkout')


    return(props.trigger) ? (
        <div className="popup">
            <div className={"popup-inner"}>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
                <form onSubmit={handleSubmit}>
                    Barang : <input type="text" disabled value={props.tempName}></input><br></br>
                    Jumlah : <input type="number" required value={jumlahBarang} onChange={(e) => setJumlahBarang(e.target.value)}></input><br></br>
                    Satuan : <select value={satuanBarang} onChange={(e) => setSatuanBarang(e.target.value)}>
                        <option value="buah">buah</option>
                        <option value="kg">kg</option>
                        <option value="porsi">porsi</option>
                    </select><br></br>
                    {!isPending && <button>Submitting..</button>}
                    {isPending && <button>Submit</button>}
                </form>
            </div>
        </div>
    ) : "" ;
}

export default Popup