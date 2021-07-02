-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Jul 01, 2021 at 12:27 PM
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
-- Table structure for table `post_produce`
--

CREATE TABLE `post_produce` (
  `postID` int(10) NOT NULL,
  `produceName` varchar(30) NOT NULL,
  `amountAvailable` int(10) NOT NULL,
  `dateOfHarvest` date NOT NULL,
  `phone_number` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for dumped tables
--

--
-- Indexes for table `post_produce`
--
ALTER TABLE `post_produce`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `phone_number` (`phone_number`);

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
  MODIFY `postID` int(10) NOT NULL AUTO_INCREMENT;

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
