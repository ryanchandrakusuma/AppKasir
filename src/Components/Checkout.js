import React, { useMemo, useState, useEffect } from 'react'
import './Checkout.css';
import { CHECKCOLUMNS } from './columns';
import './table.css';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect } from 'react-table';

function Checkout() {
  let totalHarga = 0;
  const [checkoutList, setCheckoutList] = useState([]);
  const data = checkoutList;
  const columns = useMemo (() => CHECKCOLUMNS, [])

  const fetchData = async () => {
    return await fetch('http://localhost:8000/checkout')
      .then(response => response.json())
      .then(data => {
        setCheckoutList(data) 
      });
  }

  const editData = async (value) => {
    
    }

  const deleteData = async (id) => {
    return await fetch('http://localhost:8000/checkout/' + id, {
      method: 'DELETE'
    }).then(()=>{
      console.log('Hapus berhasil');
      window.location.reload();
    });
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
                        totalHarga += row.values.hargaBarang;
                        return (
                            <tr {...row.getRowProps()}>
                                <td>{row.values.namaBarang}<br></br>{row.values.jumlahBarang} {row.values.satuanBarang}<br></br>Total : {row.values.hargaBarang}</td>
                                <td><button onClick={() => editData(row.values)}>Edit</button></td>
                                <td><button onClick={() => deleteData(row.values.id)}>Delete</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </>

          <br></br>
          <h1>Tax : Rp. 0</h1>
          <button className="checkoutButt">Total Belanja : {totalHarga}</button>
          {/* <button class="clearButt" onClick={() => deleteDataAll()}>Clear</button> */}
        </div>
    </div>
  );
}

export default Checkout;