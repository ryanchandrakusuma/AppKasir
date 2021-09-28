import React from 'react';

const SelectItems = ({barangList=[]}) => {
  let totalHarga = 0;
  return (
    <>
    { barangList.map((data,index) => {
        if (data) {
          totalHarga += data.hargaBarang;
          return (
            <div key={data.id}>
              <p>{data.namaBarang} {data.jumlahBarang} {data.satuanBarang}, Harga : {data.hargaBarang}</p>
	          </div>	
    	    )	
    	  }
    	  return null
    }) }
    <br></br>
    <div>
      <p>Total Harga: {totalHarga}</p>
	  </div>	
    </>
  );
}

export default SelectItems;