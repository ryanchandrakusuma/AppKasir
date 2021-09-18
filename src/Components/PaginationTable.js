import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect } from 'react-table';
import { COLUMNS } from './columns';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import Popup from './Popup';

export const PaginationTable = () => {
    let namaBarang;
    let hargaBarang;
    const [isPending, setIsPending] = useState('false');
    const [jumlahBarang, setJumlahBarang] = useState(1);
    const [satuanBarang, setSatuanBarang] = useState('buah');
    const [buttonPopup, setButtonPopup] = useState(false);
    const [barangList, setBarangList] = useState([]);
    const [passValue, setValue] = useState([]);
    const columns = useMemo (() => COLUMNS, [])

    const fetchData = async () => {
        return await fetch('http://localhost:8001/barangs')
          .then(console.log("loading"))
          .then(response => response.json())
          .then(console.log("got the data!"))
          .then(data => {
            setBarangList(data) 
          });
    }

    const handleSubmitInsert = (e) => {
        setButtonPopup(false);
        namaBarang = passValue.namaBarang;
        hargaBarang = passValue.hargaBarang * jumlahBarang;

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
      
    useEffect( () => {fetchData()},[]);
    const data = barangList

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

    return (
        <>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <form onSubmit={handleSubmitInsert}>
                Barang : <input type="text" disabled value={passValue.namaBarang}></input><br></br>
                Jumlah : <input type="number" required value={jumlahBarang} onChange={(e) => setJumlahBarang(e.target.value)}></input><br></br>
                Satuan : <select value={satuanBarang} onChange={(e) => setSatuanBarang(e.target.value)}>
                            <option value="buah">buah</option>
                            <option value="kg">kg</option>
                            <option value="porsi">porsi</option>
                         </select><br></br>
            {!isPending && <button>Submitting..</button>}
            {isPending && <button>Submit</button>}
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