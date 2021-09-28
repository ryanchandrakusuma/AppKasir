import React, { useMemo, useState, useEffect } from 'react';
import Axios from 'axios';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect } from 'react-table';
import { COLUMNS_BARANG } from './columns';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import Popup from './Popup';

export const ManageBarang = () => {
    const [isPending, setIsPending] = useState('false');
    const [jumlahBarang, setJumlahBarang] = useState(1);
    const [satuanBarang, setSatuanBarang] = useState('buah');
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonaddbarang, setaddbarang] = useState(false);
    const [barangList, setBarangList] = useState([]);
    const [passValue, setValue] = useState([]);
    const columns = useMemo (() => COLUMNS_BARANG, [])
    const [nama_barang, setNamaBarang] = useState();
    const [stock, setStock] = useState(0);
    const [harga, setHarga] = useState(0);
    const [kategori, setKategori] = useState();
    const [type, setType] = useState();
    const [satuanBarang1, setSatuanBarang1] = useState([]);

    
//     const handleSubmit = (e) => {

//     const barang = {nama_barang,kategori,type,harga,stock}
//     setIsPending(true);
//     fetch('http://localhost:8001/barangs',{
//       method: 'POST',
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify(barang)
//     }).then(()=>{
//       console.log('barang masuk');
//       setIsPending('false');
//     })
//   }

    const fetchData = async () => {
        return await fetch('http://localhost:3001/api/getBarang')
          .then(console.log("loading"))
          .then(response => response.json())
          .then(console.log("got the data!"))
          .then(data => {
            setBarangList(data) 
          });
    }

    const fetchData1 = async () => {
        return await fetch('http://localhost:3001/api/getSatuan')
          .then(console.log("loading"))
          .then(response => response.json())
          .then(console.log("got the data!"))
          .then(data => {

            setSatuanBarang1(data) 
          });
    }

    const handleSubmitInsert = (e) => {
        let idBarang;
        let namaBarang;
        let hargaBarang;

        setButtonPopup(false);
        idBarang = passValue.id;
        namaBarang = passValue.nama_barang;
        hargaBarang = passValue.harga;

        const barang = {idBarang, namaBarang, jumlahBarang, satuanBarang, hargaBarang}

        Axios.post("http://localhost:3001/api/insert", {barang}).then(()=>{
            console.log('Tambah berhasil');
        })
    }
      
    useEffect( () => {fetchData()},[]);
    useEffect( () => {fetchData1()},[]);
    const data = barangList
    const data1 = satuanBarang1

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data
        }, useGlobalFilter, useSortBy, usePagination, useRowSelect
    )

    const { globalFilter } = state
    const { pageIndex, pageSize } = state

    function openPopupInsert(value) {
        console.log(value);
        setValue(value);
        setButtonPopup(true);
    }
    function openPopupBarang(){
        setaddbarang(true);
    }

    return (
        <>
        <button onClick = { openPopupBarang }>Tambah Barang</button>
        <Popup trigger={buttonaddbarang} setTrigger={setaddbarang}>
            <form onSubmit={handleSubmitInsert}>
            <table>
                <tr>
                    <td><label>Nama barang  : </label></td>
                    <td><input type="text" required
                            value={nama_barang}
                            onChange={(e)=> setNamaBarang(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td><label>Kategori : </label></td>
                    <td>
                        <input type="text"
                            required
                            value={kategori}
                            onChange={(e)=> setKategori(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td><label>Satuan yang tersedia : </label></td>
                    <td><select type="submit">
                     <option>Pilih Satuan</option>
                     {
                         data1.map((result)=>(<option text={result.nama_satuan}>{result.nama_satuan}</option>))
                     }
                     </select>
                  </td>
                </tr>
                <tr>
                    <td><label>Satuan : </label></td>
                    <td>
                        <input type="text"
                            required
                            value={type}
                            onChange={(e)=> setType(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td><label>Harga    : </label></td>
                    <td>
                    <input type="text"
                        required
                        value={harga}
                        onChange={(e)=> setHarga(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td><label>Jumlah Stok  : </label></td>
                    <td>
                    <input type="text"
                        required
                        value={stock}
                        onChange={(e)=> setStock(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan="2" align="right"> 
                        {!isPending && <button>Adding..</button>}
                        {isPending && <button>Add Barang</button>}
                    </td>
                </tr>
            </table>
       
      </form>
        </Popup>
        
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <span>
                Page{' '}
                <strong>
                    { pageIndex + 1 } of {pageOptions.length}
                </strong>
            </span>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? '^' : 'v') : ''}
                                        </span>
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell) => {
                                        return <td onClick ={() => openPopupInsert(row.values)}
                                        {...cell.getCellProps()} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                } 
            </tbody>
        </table>
        
        <div>
            <span>
                Page{' '}
                <strong>
                    { pageIndex + 1 } of {pageOptions.length}
                </strong>
            </span>
            <span>
                | Go to page : {' '}
                <input type='number' defaultValue={pageIndex + 1}
                onChange={e => {
                    const pageNumber = e.target.value ? Number(e.target.value) -1 : 0
                    gotoPage(pageNumber)
                }}
                style={{width: '50px'}} />
            </span>
            <select value={pageSize} onChange = {e => setPageSize(Number(e.target.value))}>
                {
                    [10, 25, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))
                }
            </select>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                Previous
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
                Next
            </button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
        </div>
        <pre>
      </pre>
        </>
    )
}