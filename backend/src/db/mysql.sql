/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 10.4.32-MariaDB : Database - summa.auth
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`summa.auth` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_spanish_ci */;

USE `summa.auth`;

/*Table structure for table `apps` */

DROP TABLE IF EXISTS `apps`;

CREATE TABLE `apps` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `alias` varchar(10) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

/*Data for the table `apps` */

insert  into `apps`(`id`,`name`,`alias`,`url`,`icon`) values ('603c01cf-90bc-4554-9513-3e895e53ced3','SOPORTE','soporte','https://summasoft.do/soporte/','https://files.softicons.com/download/toolbar-icons/flatastic-icons-part-2-by-custom-icon-design/png/256x256/ticket.png'),('ad379dd8-b820-4aa1-be95-34f69144b565','CONOZCA A SU CLIENTE','csc','http://localhost/tienda-virtual/','https://i.pinimg.com/736x/ab/d3/fd/abd3fdbf74f54dc52461687b9581b397.jpg');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `enabled` int(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usr_usuario` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`password`,`email`,`enabled`) values ('506c905a-bd91-4856-978b-d0d2773f2f57','darlinlv','$2b$10$lNQ9ZpM6vIS2awtHpGhG8ek20bvvCV51jGDzwtDw2JLCaLcp7x.8G','darlinlv@gmail.do',1),('5106d9c6-57e7-43f3-916a-527b92e884cb','teresa','$2b$10$Jcohwk19Vrg40IBudaVkfOfpYG6bp284YHnSLSCfRyuFNQmyU4vpy','teresalv@gmail.do',1),('a94bc4e1-e6ce-4026-806d-143c4ee4b9f2','carina','$2b$10$XYFOLXkTaO88E2V5RYFzV.kcEJxF8Y/l44u.qITDjztlKFmgno6ze','carina',1),('cff7d6e3-4f58-4777-b336-5a43eb5576b0','admin','$2b$10$To/UZ4dN3QBRrbebjxj5WeAEf0pE8CMaNr8KJLNSCaiLhhC9HOr3m','admin@gmail.do',1),('fec6b8bb-7264-4d60-999a-c495d6da34fb','cdiazlora','$2b$10$DTM0kjIrRd6Kg1jXRyLfS.NSvZ6OnVhdgTd/CCGYpjMrFnQzj5rn2','cdiazlora@gmail.do',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
