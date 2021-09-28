-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2021 at 06:29 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appkasir`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(11) NOT NULL,
  `nama_barang` varchar(200) NOT NULL,
  `kategori` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `nama_barang`, `kategori`) VALUES
(2, 'bayam', 'sayur');

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `id` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `id_satuanbarang` int(11) NOT NULL,
  `id_member` int(11) DEFAULT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL,
  `id_member` int(11) DEFAULT NULL,
  `id_barang` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `nama_member` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `satuan`
--

CREATE TABLE `satuan` (
  `id` int(11) NOT NULL,
  `nama_satuan` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `satuan`
--

INSERT INTO `satuan` (`id`, `nama_satuan`) VALUES
(3, 'kg'),
(4, 'ml');

-- --------------------------------------------------------

--
-- Table structure for table `satuanbarang`
--

CREATE TABLE `satuanbarang` (
  `id` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `id_satuan` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `stok` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `satuanbarang`
--

INSERT INTO `satuanbarang` (`id`, `id_barang`, `id_satuan`, `harga`, `stok`) VALUES
(2, 2, 3, 3000, 300);

-- --------------------------------------------------------

--
-- Table structure for table `satuanconverter`
--

CREATE TABLE `satuanconverter` (
  `id` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `id_satuan1` int(11) NOT NULL,
  `equal` int(11) NOT NULL,
  `id_satuan2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `checkout_fk1` (`id_barang`),
  ADD KEY `checkout_fk2` (`id_member`),
  ADD KEY `id_satuanbarang` (`id_satuanbarang`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `history_fk1` (`id_barang`),
  ADD KEY `history_fk2` (`id_member`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `satuan`
--
ALTER TABLE `satuan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `satuanbarang`
--
ALTER TABLE `satuanbarang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_barang` (`id_barang`),
  ADD KEY `id_satuan` (`id_satuan`);

--
-- Indexes for table `satuanconverter`
--
ALTER TABLE `satuanconverter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `satuanconverter_fk1` (`id_barang`),
  ADD KEY `satuanconverter_fk2` (`id_satuan1`),
  ADD KEY `satuanconverter_fk3` (`id_satuan2`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `satuan`
--
ALTER TABLE `satuan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `satuanbarang`
--
ALTER TABLE `satuanbarang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `satuanconverter`
--
ALTER TABLE `satuanconverter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checkout`
--
ALTER TABLE `checkout`
  ADD CONSTRAINT `checkout_fk1` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id`),
  ADD CONSTRAINT `checkout_fk2` FOREIGN KEY (`id_member`) REFERENCES `member` (`id`);

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_fk1` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id`),
  ADD CONSTRAINT `history_fk2` FOREIGN KEY (`id_member`) REFERENCES `member` (`id`);

--
-- Constraints for table `satuanbarang`
--
ALTER TABLE `satuanbarang`
  ADD CONSTRAINT `satuanbarang_fk1` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id`),
  ADD CONSTRAINT `satuanbarang_fk2` FOREIGN KEY (`id_satuan`) REFERENCES `satuan` (`id`);

--
-- Constraints for table `satuanconverter`
--
ALTER TABLE `satuanconverter`
  ADD CONSTRAINT `satuanconverter_fk1` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id`),
  ADD CONSTRAINT `satuanconverter_fk2` FOREIGN KEY (`id_satuan1`) REFERENCES `satuan` (`id`),
  ADD CONSTRAINT `satuanconverter_fk3` FOREIGN KEY (`id_satuan2`) REFERENCES `satuan` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
