import React, { useMemo, useState, useEffect } from 'react'
import './Checkout.css';
import { CHECKCOLUMNS } from './columns';
import './table.css';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect } from 'react-table';
import Popup from './Popup';

function Checkout() {
  let totalHarga = 0;
  const [checkoutList, setCheckoutList] = useState([]);
  const [buttonPopupEdit, setButtonPopupEdit] = useState(false);
  const [passValue, setValue] = useState([]);
  const [jumlahBarang, setJumlahBarang] = useState(0);
  const [satuanBarang, setSatuanBarang] = useState('buah');
  const data = checkoutList;
  const columns = useMemo (() => CHECKCOLUMNS, [])

  const fetchData = async () => {
    return await fetch('http://localhost:8000/checkout')
      .then(response => response.json())
      .then(data => {
        setCheckoutList(data) 
      });
  }

  function editData(value) {
    console.log(value);
    setJumlahBarang(value.jumlahBarang);
    setValue(value);
    setButtonPopupEdit(true);
  }

  const deleteData = async (id) => {
    return await fetch('http://localhost:8000/checkout/' + id, {
      method: 'DELETE'
    }).then(()=>{
      console.log('Hapus berhasil');
      window.location.reload();
    });
  }

  const handleSubmitEdit = (id) => {
    let idBarang = 0;
    let namaBarang = "";
    let hargaBarang = 0;
    setButtonPopupEdit(false);
    idBarang = passValue.idBarang;
    namaBarang = passValue.namaBarang;
    hargaBarang = passValue.hargaBarang;

    const barang = {idBarang, namaBarang, jumlahBarang, satuanBarang, hargaBarang}
    fetch('http://localhost:8000/checkout/' + id,{
        method: 'PUT',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(barang)
    }).then(()=>{
        console.log('Tambah berhasil');
        window.location.reload();
    })
  }

  useEffect( () => {fetchData()},[]);

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    } = useTable(
        {
            columns,
            data
        }, useGlobalFilter, useSortBy, usePagination, useRowSelect
    )

  return (
    <div className="container">
        <div className="result">

        <>
        <span>
            <strong>
                {data.length} Item(s){' '}
            </strong>
        </span>
        <table {...getTableProps()}>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        totalHarga += (row.values.jumlahBarang * row.values.hargaBarang);
                        return (
                            <tr {...row.getRowProps()}>
                                <td>{row.values.namaBarang}<br></br>{row.values.jumlahBarang} {row.values.satuanBarang}<br></br>Total : {row.values.hargaBarang * row.values.jumlahBarang}</td>
                                <td><button onClick={() => editData(row.values)}>Edit</button></td>
                                <td><button onClick={() => deleteData(row.values.id)}>Delete</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </>

        <Popup trigger={buttonPopupEdit} setTrigger={setButtonPopupEdit}>
            <form onSubmit={() => handleSubmitEdit(passValue.id)}>
                Barang : <input type="text" disabled value={passValue.namaBarang}></input><br></br>
                Jumlah : <input type="number" required value={jumlahBarang} onChange={(e) => setJumlahBarang(e.target.value)}></input><br></br>
                Satuan : <select value={passValue.type} onChange={(e) => setSatuanBarang(e.target.value)}>
                            <option value="buah">buah</option>
                            <option value="kg">kg</option>
                            <option value="porsi">porsi</option>
                         </select><br></br>
            <button>Submit</button>
            </form>
        </Popup>

          <br></br>
          <h1>Tax : Rp. 0</h1>
          <button className="checkoutButt">Total Belanja : {totalHarga}</button>
          {/* <button class="clearButt" onClick={() => deleteDataAll()}>Clear</button> */}
        </div>
    </div>
  );
}

export default Checkout;