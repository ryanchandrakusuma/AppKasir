import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import useFetch from '../Components/useFetch';

function Reports () {
    const [nama_barang, setNamaBarang] = useState();
    const [stock, setStock] = useState();
    const [harga, setHarga] = useState();
    const [kategori, setKategori] = useState();
    const [type, setType] = useState();
    const [isPending, setIsPending] = useState('false');
    const history = useHistory();
    const handleSubmit = (e) => {
      e.preventDefault();
      const barang = {nama_barang,kategori,type,harga,stock}
      setIsPending(true);
      fetch('http://localhost:8001/barangs',{
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(barang)
      }).then(()=>{
        console.log('barang masuk');
        setIsPending('false');
        history.push('/');
      })
    }
    const data = useFetch('http://localhost:8001/barangs')
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label>Nama barang : </label>
          <input type="text"
            required
            value={nama_barang}
            onChange={(e)=> setNamaBarang(e.target.value)}
          />
          <label>Kategori : </label>
          <input type="text"
            required
            value={kategori}
            onChange={(e)=> setKategori(e.target.value)}
          />
          <label>Type : </label>
          <input type="text"
            required
            value={type}
            onChange={(e)=> setType(e.target.value)}
          />
          <label>Harga : </label>
          <input type="text"
            required
            value={harga}
            onChange={(e)=> setHarga(e.target.value)}
          />
          <label>Jumlah Stok : </label>
          <input type="text"
            required
            value={stock}
            onChange={(e)=> setStock(e.target.value)}
          />
          {!isPending && <button>Adding..</button>}
          {isPending && <button>Add Barang</button>}
        </form>   
      </>
    );
}

export default Reports;