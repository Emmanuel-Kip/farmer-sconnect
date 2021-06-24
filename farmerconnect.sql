-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Jun 24, 2021 at 10:23 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `farmerconnect`
--

-- --------------------------------------------------------

--
-- Table structure for table `postproduce`
--

CREATE TABLE `postproduce` (
  `postID` int(20) NOT NULL,
  `produceName` varchar(20) NOT NULL,
  `amountAvailable` int(11) NOT NULL,
  `pricePerKg` int(10) NOT NULL,
  `dateOfHarvest` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `requestproduce`
--

CREATE TABLE `requestproduce` (
  `requestID` int(10) NOT NULL,
  `produceName` varchar(20) NOT NULL,
  `orderAmount` int(5) NOT NULL,
  `timeOrdered` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `postproduce`
--
ALTER TABLE `postproduce`
  ADD PRIMARY KEY (`postID`);

--
-- Indexes for table `requestproduce`
--
ALTER TABLE `requestproduce`
  ADD PRIMARY KEY (`requestID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `postproduce`
--
ALTER TABLE `postproduce`
  MODIFY `postID` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requestproduce`
--
ALTER TABLE `requestproduce`
  MODIFY `requestID` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
