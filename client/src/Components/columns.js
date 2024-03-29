import { format } from 'date-fns';

export const COLUMNS_BARANG = 
[
    {
        Header: 'Id',
        accessor : 'id',
    },
    {
        Header: 'Nama',
        accessor: 'nama_barang'
    },
    {
        Header: 'Kategori',
        accessor: 'kategori'
    },
    {
        Header: 'Satuan',
        accessor: 'nama_satuan'
    },
    {
        Header: 'Harga',
        accessor: 'harga'
    },
    {
        Header: 'Stok',
        accessor: 'stok'
    }
]

export const CHECKCOLUMNS = 
[
    {
        Header: 'Keranjang',
        Footer: 'Keranjang',
        columns: [
            {
                accessor: 'id'
            },
            {
                accessor: 'idBarang'
            },
            {
                accessor: 'namaBarang'
            },
            {
                accessor: 'jumlahBarang'
            },
            {
                accessor: 'satuanBarang'
            },
            {
                accessor: 'hargaBarang'
            }
        ]
    }
]

export const GROUPED_COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor : 'id'
    },
    {
        Header: 'Name',
        Footer: 'Name',
        columns: [
            {
                Header: 'First Name',
                Footer: 'First Name',
                accessor: 'first_name'
            },
            {
                Header: 'Last Name',
                Footer: 'Last Name',
                accessor: 'last_name'
            }
        ]
    },
    {
        Header: 'Info',
        Footer: 'Info',
        columns: [
            {
                Header: 'Date of Birth',
                Footer: 'Date of Birth',
                accessor: 'dateofbirth',
                Cell: ({ value }) => { return format (new Date(value), 'dd-MMMM-yyyy')}
            },
            {
                Header: 'Email Address',
                Footer: 'Email Address',
                accessor: 'email'
            },
            {
                Header: 'Gender',
                Footer: 'Gender',
                accessor: 'gender'
            },
            {
                Header: 'IP Address',
                Footer: 'IP Address',
                accessor: 'ip_address'
            }
        ]
    }
    
]