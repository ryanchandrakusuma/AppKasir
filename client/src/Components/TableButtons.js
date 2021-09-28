import React, { useState, useRef } from 'react';
import Popup from './Popup';
import { StyleSheet, css } from 'aphrodite';
import ReactiveButton from 'reactive-button';

const TableButtons = () => {

    const clickedParent = () => {};
    const clickedChild = () => {};

    const [isPending, setIsPending] = useState('false');
    const [buttonaddbarang, setaddbarang] = useState(false);
    const [nama_barang, setNamaBarang] = useState();
    const [stock, setStock] = useState(0);
    const [harga, setHarga] = useState(0);
    const [kategori, setKategori] = useState();
    const [type, setType] = useState();
    const [state, setState] = useState('idle');
    const [stateCancel, setStateCancel] = useState('idle');

    const handleSubmit = (e) => {
        const barang = {nama_barang,kategori,type,harga,stock}
        setIsPending(true);
        fetch('http://localhost:8001/barangs',{
          method: 'POST',
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(barang)
        }).then(()=>{
          console.log('barang masuk');
          setIsPending('false');
        })
      }

    function openPopupBarang(){
        setaddbarang(true);
        setState('loading');
    }

    function closePopupBarang()
    {
        setaddbarang(false);
        setState('idle');
    }

    const styles = StyleSheet.create({
        buttonsBar: {
            height:'100%',
            width:'50%',
            padding:'1rem',
            float:'right',
        },
    });
    
    return (
        <>
        <Popup trigger={buttonaddbarang} setTrigger={setaddbarang} setState={setState} ref={ref}>
            <form onSubmit={handleSubmit}>
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
                    <ReactiveButton
                        buttonState={stateCancel}
                        onClick={ closePopupBarang }
                        idleText={'Cancel'}
                        color={'red'}
                    />
                        {!isPending && <button>Adding..</button>}
                        {isPending && <ReactiveButton
                        buttonState={stateCancel}
                        idleText={'Add'}
                        type={'submit'}
                        color={'green'}
                    />}
                    </td> 
                </tr>
            </table>
            </form>
        </Popup>
        
        
        <div className = {css(styles.buttonsBar)} onClick={clickedParent}>
            <ReactiveButton
                buttonState={state}
                onClick={ openPopupBarang }
                idleText={'Tambah Barang'}
                loadingText={'Adding Barang'}
                messageDuration={5000}
            />
        </div>
        </>
    )
}

export default TableButtons;