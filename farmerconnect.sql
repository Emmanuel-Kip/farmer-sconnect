-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Jul 31, 2021 at 02:18 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

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
  `dateOfHarvest` date NOT NULL,
  `farmerID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `poststorage`
--

CREATE TABLE `poststorage` (
  `storeID` int(11) NOT NULL,
  `facilityName` varchar(25) NOT NULL,
  `spaceAvailable` double NOT NULL,
  `price` double NOT NULL,
  `location` varchar(25) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `posttransport`
--

CREATE TABLE `posttransport` (
  `transID` int(11) NOT NULL,
  `vehicleName` varchar(45) NOT NULL,
  `amountCapable` double NOT NULL,
  `pricePerKm` double NOT NULL,
  `location` varchar(45) NOT NULL,
  `phoneNo` varchar(10) NOT NULL,
  `userID` int(11) NOT NULL,
  `destination` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `requestproduce`
--

CREATE TABLE `requestproduce` (
  `requestID` int(10) NOT NULL,
  `produceName` varchar(20) NOT NULL,
  `orderAmount` int(5) NOT NULL,
  `timeOrdered` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `postID` int(11) DEFAULT NULL,
  `phone_number` varchar(10) CHARACTER SET utf8mb4 DEFAULT NULL,
  `userID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `requestproduce2`
--

CREATE TABLE `requestproduce2` (
  `requestID` int(10) NOT NULL,
  `produceName` varchar(20) NOT NULL,
  `orderAmount` int(5) NOT NULL,
  `timeOrdered` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `postID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requestproduce2`
--

INSERT INTO `requestproduce2` (`requestID`, `produceName`, `orderAmount`, `timeOrdered`, `postID`) VALUES
(2, 'undefined', 0, '2021-07-27 17:58:48.000000', 0),
(3, 'onions,onions,orange', 0, '2021-07-27 18:00:58.000000', 0),
(4, ',,', 0, '2021-07-27 18:02:17.000000', 0),
(5, 'onions,onions,orange', 0, '2021-07-27 18:09:47.000000', 0),
(6, 'onions,onions,orange', 0, '2021-07-27 18:11:36.000000', 0),
(7, 'undefined', 0, '2021-07-29 17:21:10.000000', 0),
(8, 'undefined', 0, '2021-07-29 17:23:31.000000', 0),
(9, 'undefined', 0, '2021-07-29 17:34:25.000000', 0),
(10, 'undefined', 0, '2021-07-29 17:55:44.000000', 0),
(11, 'undefined', 0, '2021-07-29 17:57:30.000000', 0),
(12, 'undefined', 0, '2021-07-29 17:58:34.000000', 0),
(13, 'undefined', 0, '2021-07-29 17:58:54.000000', 0),
(14, 'undefined', 0, '2021-07-30 12:20:32.000000', 0),
(15, 'undefined', 0, '2021-07-30 12:20:34.000000', 0),
(16, 'undefined', 0, '2021-07-30 12:26:46.000000', 0),
(17, 'undefined', 0, '2021-07-30 13:01:59.000000', 0),
(18, 'undefined', 0, '2021-07-30 13:02:15.000000', 0),
(19, 'undefined', 0, '2021-07-30 13:03:01.000000', 0);

-- --------------------------------------------------------

--
-- Table structure for table `requeststorage`
--

CREATE TABLE `requeststorage` (
  `reqID` int(11) NOT NULL,
  `facilityName` varchar(25) NOT NULL,
  `spaceNeeded` double NOT NULL,
  `location` varchar(25) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `requesttransport`
--

CREATE TABLE `requesttransport` (
  `transID` int(11) NOT NULL,
  `vehicleName` varchar(25) NOT NULL,
  `amountTransported` int(5) NOT NULL,
  `timeOrdered` varchar(45) NOT NULL,
  `postID` int(11) DEFAULT NULL,
  `location` varchar(10) NOT NULL,
  `userid` varchar(45) DEFAULT NULL,
  `destination` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblpostproduce`
--

CREATE TABLE `tblpostproduce` (
  `postID` int(11) NOT NULL,
  `produceName` varchar(20) NOT NULL,
  `amountAvailable` int(11) NOT NULL,
  `pricePerKg` int(10) NOT NULL,
  `dateOfHarvest` date NOT NULL,
  `farmerID` int(11) DEFAULT NULL,
  `phoneNo` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblusers`
--

CREATE TABLE `tblusers` (
  `userID` int(11) NOT NULL,
  `emailID` varchar(45) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `city` varchar(20) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `password` varchar(45) NOT NULL,
  `password2` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `emailid` varchar(45) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `phone_number` int(10) NOT NULL,
  `city` varchar(20) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `password` varchar(45) NOT NULL,
  `password2` varchar(45) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `postproduce`
--
ALTER TABLE `postproduce`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `farmerID` (`farmerID`);

--
-- Indexes for table `poststorage`
--
ALTER TABLE `poststorage`
  ADD PRIMARY KEY (`storeID`);

--
-- Indexes for table `posttransport`
--
ALTER TABLE `posttransport`
  ADD PRIMARY KEY (`transID`),
  ADD KEY `phoneNo` (`phoneNo`);

--
-- Indexes for table `requestproduce`
--
ALTER TABLE `requestproduce`
  ADD PRIMARY KEY (`requestID`),
  ADD KEY `postID` (`postID`),
  ADD KEY `phone_number` (`phone_number`);

--
-- Indexes for table `requestproduce2`
--
ALTER TABLE `requestproduce2`
  ADD PRIMARY KEY (`requestID`);

--
-- Indexes for table `requeststorage`
--
ALTER TABLE `requeststorage`
  ADD PRIMARY KEY (`reqID`);

--
-- Indexes for table `requesttransport`
--
ALTER TABLE `requesttransport`
  ADD PRIMARY KEY (`transID`);

--
-- Indexes for table `tblpostproduce`
--
ALTER TABLE `tblpostproduce`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `farmerID` (`farmerID`),
  ADD KEY `phoneNo` (`phoneNo`);

--
-- Indexes for table `tblusers`
--
ALTER TABLE `tblusers`
  ADD PRIMARY KEY (`userID`,`phone_number`),
  ADD KEY `phone_number` (`phone_number`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`phone_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `postproduce`
--
ALTER TABLE `postproduce`
  MODIFY `postID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `poststorage`
--
ALTER TABLE `poststorage`
  MODIFY `storeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posttransport`
--
ALTER TABLE `posttransport`
  MODIFY `transID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `requestproduce`
--
ALTER TABLE `requestproduce`
  MODIFY `requestID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `requestproduce2`
--
ALTER TABLE `requestproduce2`
  MODIFY `requestID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `requeststorage`
--
ALTER TABLE `requeststorage`
  MODIFY `reqID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requesttransport`
--
ALTER TABLE `requesttransport`
  MODIFY `transID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tblpostproduce`
--
ALTER TABLE `tblpostproduce`
  MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tblusers`
--
ALTER TABLE `tblusers`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `postproduce`
--
ALTER TABLE `postproduce`
  ADD CONSTRAINT `postproduce_ibfk_1` FOREIGN KEY (`farmerID`) REFERENCES `tbl_users` (`phone_number`),
  ADD CONSTRAINT `postproduce_ibfk_2` FOREIGN KEY (`farmerID`) REFERENCES `tblusers` (`userID`),
  ADD CONSTRAINT `postproduce_ibfk_3` FOREIGN KEY (`farmerID`) REFERENCES `tblusers` (`userID`);

--
-- Constraints for table `posttransport`
--
ALTER TABLE `posttransport`
  ADD CONSTRAINT `posttransport_ibfk_1` FOREIGN KEY (`phoneNo`) REFERENCES `tblusers` (`phone_number`);

--
-- Constraints for table `requestproduce`
--
ALTER TABLE `requestproduce`
  ADD CONSTRAINT `requestproduce_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `postproduce` (`postID`),
  ADD CONSTRAINT `requestproduce_ibfk_2` FOREIGN KEY (`phone_number`) REFERENCES `tblusers` (`phone_number`);

--
-- Constraints for table `tblpostproduce`
--
ALTER TABLE `tblpostproduce`
  ADD CONSTRAINT `tblpostproduce_ibfk_1` FOREIGN KEY (`farmerID`) REFERENCES `tblusers` (`userID`),
  ADD CONSTRAINT `tblpostproduce_ibfk_2` FOREIGN KEY (`phoneNo`) REFERENCES `tblusers` (`phone_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
