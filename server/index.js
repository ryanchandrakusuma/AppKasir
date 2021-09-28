const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "appkasir",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/getBarang", (req, res) => {

    const sqlSelect = "SELECT a.id, a.nama_barang, a.kategori, c.nama_satuan, b.harga, b.stok FROM barang AS a INNER JOIN satuanbarang AS b ON b.id_barang = a.id INNER JOIN satuan AS c ON b.id_satuan = c.id";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
});

app.get("/api/getSatuan", (req, res) => {

    const sqlSelect = "SELECT * FROM satuan";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
});



app.post("/api/insert", (req, res) => {
    const id = 'DEFAULT';
    const idBarang = req.body.barang.idBarang;
    const namaBarang = req.body.barang.namaBarang;
    const jumlahBarang = req.body.barang.jumlahBarang;
    const satuanBarang = req.body.barang.satuanBarang;
    const hargaBarang = req.body.barang.hargaBarang;

    const sqlInsert = "INSERT INTO `checkout`(`id`, `idBarang`, `namaBarang`, `jumlahBarang`, `satuanBarang`, `hargaBarang`) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [id, idBarang, namaBarang, jumlahBarang, satuanBarang, hargaBarang], (err, result) => {
        console.log(err);
    });
});

app.listen(3001, () => { 
    console.log("running");
})