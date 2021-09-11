import React, { useState } from 'react'
import './Popup.css'
import useFetch from '../Components/useFetch';

const Popup = (props) => {
    let namaBarang;
    let hargaBarang;
    const [jumlahBarang, setJumlahBarang] = useState(1);
    const [satuanBarang, setSatuanBarang] = useState('buah');
    const [isPending, setIsPending] = useState('false');

    const handleSubmit = (e) => {
        props.setTrigger(false);
        namaBarang = props.tempName.namaBarang;
        hargaBarang = props.tempName.hargaBarang * jumlahBarang;

        const barang = {namaBarang, jumlahBarang, satuanBarang, hargaBarang}
        setIsPending(true);
        fetch('http://localhost:8000/checkout',{
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(barang)
        }).then(()=>{
            console.log('Tambah berhasil');
            setIsPending('false');
            window.location.reload();
        })
    }
    const {data} = useFetch('http://localhost:8000/checkout')


    return(props.trigger) ? (
        <div className="popup">
            <div className={"popup-inner"}>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
                <form onSubmit={handleSubmit}>
                    Barang : <input type="text" disabled value={props.tempName.namaBarang}></input><br></br>
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