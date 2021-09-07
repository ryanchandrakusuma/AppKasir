import React from 'react';

const SelectItems = ({input:nama, input2:jumlah, input3:satuan}) => {
  
  return (
    <p>{nama} {jumlah} {satuan}</p>
  );
}

export default SelectItems;