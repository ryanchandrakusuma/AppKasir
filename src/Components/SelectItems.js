import React from 'react';

const SelectItems = ({barangList=[]}) => {
  return (
    <>
    { barangList.map((data,index) => {
        if (data) {
          return (
            <div key={data.namaBarang}>
              <p>{data.namaBarang} {data.jumlahBarang} {data.satuanBarang}, Total : {data.hargaBarang}</p>
	          </div>	
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default SelectItems;