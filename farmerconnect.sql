-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2021 at 07:31 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

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
-- Table structure for table `post_produce`
--

CREATE TABLE `post_produce` (
  `postID` int(10) NOT NULL,
  `produceName` varchar(30) NOT NULL,
  `amountAvailable` int(10) NOT NULL,
  `pricePerKg` int(10) NOT NULL,
  `dateOfHarvest` date NOT NULL,
  `phone_number` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `requeststorage`
--

CREATE TABLE `requeststorage` (
  `id` int(20) NOT NULL,
  `typeProduce` varchar(20) NOT NULL,
  `size` varchar(20) NOT NULL,
  `phoneNumber` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `request_produce`
--

CREATE TABLE `request_produce` (
  `requestID` int(10) NOT NULL,
  `produceName` varchar(30) NOT NULL,
  `orderAmount` int(10) NOT NULL,
  `timeOrdered` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `storage`
--

CREATE TABLE `storage` (
  `storageCompany` varchar(20) NOT NULL,
  `unitSize` varchar(20) NOT NULL,
  `location` varchar(20) NOT NULL,
  `emailaddress` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `emailID` varchar(45) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `phone_number` int(10) NOT NULL,
  `city` varchar(20) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `password` varchar(45) NOT NULL,
  `password2` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`emailID`, `first_name`, `last_name`, `phone_number`, `city`, `user_type`, `password`, `password2`) VALUES
('kendi@gmail.com', 'Kendi', 'Ibeere', 702374378, 'Nairobi', 'farmer', '1234', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post_produce`
--
ALTER TABLE `post_produce`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `phone_number` (`phone_number`);

--
-- Indexes for table `requeststorage`
--
ALTER TABLE `requeststorage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request_produce`
--
ALTER TABLE `request_produce`
  ADD PRIMARY KEY (`requestID`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`phone_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post_produce`
--
ALTER TABLE `post_produce`
  MODIFY `postID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `requeststorage`
--
ALTER TABLE `requeststorage`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `post_produce`
--
ALTER TABLE `post_produce`
  ADD CONSTRAINT `post_produce_ibfk_1` FOREIGN KEY (`phone_number`) REFERENCES `tbl_users` (`phone_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
