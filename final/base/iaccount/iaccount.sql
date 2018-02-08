-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.7.19 - MySQL Community Server (GPL)
-- Операционная система:         Win64
-- HeidiSQL Версия:              9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Дамп структуры для таблица iaccount.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `comment` varchar(50) NOT NULL DEFAULT '',
  `currency` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы iaccount.accounts: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
REPLACE INTO `accounts` (`id`, `name`, `comment`, `currency`) VALUES
	(1, 'Счет 1', '0', 4),
	(2, 'Счет 2', '0', 4),
	(3, 'Счет 3', 'тест', 4),
	(4, 'Test33', '', 2),
	(6, 'Test388', '', 4),
	(7, 'Счет 4', '', 3),
	(8, 'Основной', '', 4);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Дамп структуры для таблица iaccount.currency
CREATE TABLE IF NOT EXISTS `currency` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `abbreviation` varchar(10) NOT NULL,
  `scale` int(10) unsigned NOT NULL DEFAULT '1',
  `rate` double unsigned NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы iaccount.currency: ~4 rows (приблизительно)
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
REPLACE INTO `currency` (`id`, `code`, `name`, `abbreviation`, `scale`, `rate`, `updated`) VALUES
	(1, '840', 'Доллар США', 'USD', 1, 1.9839, '2018-01-31 17:53:06'),
	(2, '978', 'ЕВРО', 'EUR', 1, 2.4514, '2018-01-31 17:57:23'),
	(3, '643', 'Российский рубль', 'RUB', 100, 3.5251, '2018-01-31 18:00:48'),
	(4, '933', 'Белорусский рубль', 'BYN', 1, 1, '2018-01-31 18:03:06');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;

-- Дамп структуры для таблица iaccount.operations
CREATE TABLE IF NOT EXISTS `operations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account` int(11) unsigned NOT NULL DEFAULT '0',
  `category` int(11) unsigned NOT NULL DEFAULT '0',
  `type` enum('DEBIT','CREDIT') NOT NULL DEFAULT 'CREDIT',
  `sum` bigint(20) unsigned NOT NULL DEFAULT '0',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  KEY `account` (`account`),
  CONSTRAINT `account` FOREIGN KEY (`account`) REFERENCES `accounts` (`id`),
  CONSTRAINT `category` FOREIGN KEY (`category`) REFERENCES `operation_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы iaccount.operations: ~95 rows (приблизительно)
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;
REPLACE INTO `operations` (`id`, `account`, `category`, `type`, `sum`, `date`, `comment`) VALUES
	(1, 2, 1, 'CREDIT', 50, '2018-01-03 16:55:30', 'Квартплата'),
	(3, 6, 3, 'CREDIT', 20, '2018-01-03 16:56:12', 'Вода'),
	(4, 6, 4, 'CREDIT', 30, '2018-01-03 16:56:52', 'Телефон, интернет'),
	(5, 6, 2, 'CREDIT', 30, '2018-01-03 16:59:36', 'Электроэнергия'),
	(6, 6, 12, 'CREDIT', 49, '2018-01-02 21:00:00', 'тест'),
	(7, 1, 1, 'CREDIT', 16, '2018-01-14 16:41:45', 'Тест'),
	(8, 2, 2, 'CREDIT', 20, '2018-01-14 16:45:18', 'тест'),
	(9, 2, 3, 'CREDIT', 15, '2018-01-14 16:45:59', 'Тест2'),
	(10, 2, 3, 'CREDIT', 15, '2018-01-14 16:45:59', 'Тест2'),
	(11, 2, 4, 'CREDIT', 20, '2018-01-14 17:13:45', 'тест'),
	(12, 3, 4, 'CREDIT', 20, '2018-01-14 17:36:55', 'тест'),
	(14, 3, 12, 'CREDIT', 48, '2018-01-14 19:00:49', 'тест'),
	(18, 1, 12, 'CREDIT', 48, '2018-01-15 20:10:03', 'Тестовый проездной'),
	(19, 1, 3, 'CREDIT', 15, '2018-01-19 18:58:36', 'тест3'),
	(20, 2, 3, 'CREDIT', 15, '2018-01-22 22:19:08', 'тест'),
	(21, 3, 14, 'DEBIT', 500, '2018-01-30 22:24:08', 'тест зарплата'),
	(22, 4, 14, 'DEBIT', 1000, '2018-02-03 21:15:25', 'test'),
	(23, 7, 15, 'DEBIT', 3000, '2018-02-03 21:17:47', ''),
	(24, 8, 18, 'CREDIT', 25, '2018-01-25 21:00:00', ''),
	(25, 8, 18, 'CREDIT', 21, '2018-01-30 21:00:00', ''),
	(26, 8, 19, 'CREDIT', 7, '2018-01-30 21:00:00', ''),
	(27, 8, 20, 'CREDIT', 2, '2018-02-05 16:46:09', ''),
	(28, 8, 18, 'CREDIT', 40, '2018-02-02 21:00:00', ''),
	(29, 8, 8, 'CREDIT', 40, '2018-02-01 21:00:00', 'Софья'),
	(30, 8, 8, 'CREDIT', 40, '2018-02-01 21:00:00', 'Вера'),
	(31, 8, 18, 'CREDIT', 25, '2018-01-25 21:00:00', ''),
	(32, 8, 18, 'CREDIT', 28, '2018-01-23 21:00:00', ''),
	(33, 8, 18, 'CREDIT', 9, '2018-01-22 21:00:00', ''),
	(34, 8, 21, 'CREDIT', 11, '2018-01-22 21:00:00', ''),
	(35, 8, 18, 'CREDIT', 44, '2018-01-21 21:00:00', ''),
	(36, 8, 14, 'DEBIT', 400, '2018-01-22 21:00:00', ''),
	(37, 8, 15, 'DEBIT', 583, '2018-01-22 21:00:00', ''),
	(38, 8, 18, 'CREDIT', 54, '2018-01-20 21:00:00', ''),
	(39, 8, 4, 'CREDIT', 20, '2018-01-17 21:00:00', 'интернет'),
	(40, 8, 1, 'CREDIT', 75, '2018-01-17 21:00:00', ''),
	(41, 8, 2, 'CREDIT', 26, '2018-01-17 21:00:00', ''),
	(42, 8, 4, 'CREDIT', 10, '2018-01-17 21:00:00', 'телефон'),
	(43, 8, 4, 'CREDIT', 15, '2018-01-17 21:00:00', ''),
	(44, 8, 8, 'CREDIT', 30, '2018-01-18 21:00:00', 'Софья'),
	(45, 8, 8, 'CREDIT', 25, '2018-01-17 21:00:00', 'Вера'),
	(46, 8, 19, 'CREDIT', 5, '2018-01-17 21:00:00', ''),
	(47, 8, 19, 'CREDIT', 45, '2018-01-31 21:00:00', 'налик, питание'),
	(48, 8, 22, 'CREDIT', 3, '2018-01-12 21:00:00', ''),
	(49, 8, 18, 'CREDIT', 17, '2018-01-14 21:00:00', ''),
	(50, 8, 18, 'CREDIT', 87, '2018-01-12 21:00:00', ''),
	(51, 8, 18, 'CREDIT', 32, '2018-01-11 21:00:00', ''),
	(52, 8, 12, 'CREDIT', 50, '2018-01-05 21:00:00', ''),
	(53, 8, 4, 'CREDIT', 15, '2018-01-07 21:00:00', 'Телефон'),
	(54, 8, 18, 'CREDIT', 19, '2018-01-05 21:00:00', ''),
	(55, 8, 9, 'CREDIT', 50, '2018-01-04 21:00:00', 'Гимнастика (Софья)'),
	(56, 8, 14, 'DEBIT', 492, '2018-01-07 21:00:00', ''),
	(57, 8, 19, 'CREDIT', 6, '2018-01-03 21:00:00', ''),
	(58, 8, 18, 'CREDIT', 13, '2018-01-03 21:00:00', ''),
	(59, 8, 20, 'CREDIT', 2, '2018-01-04 21:00:00', ''),
	(60, 8, 19, 'CREDIT', 2, '2018-01-01 21:00:00', ''),
	(61, 8, 18, 'CREDIT', 6, '2018-01-01 21:00:00', ''),
	(62, 8, 18, 'CREDIT', 7, '2018-01-01 21:00:00', ''),
	(63, 8, 18, 'CREDIT', 17, '2017-12-28 21:00:00', ''),
	(64, 8, 9, 'CREDIT', 50, '2018-02-08 19:25:34', 'Гимнастика ( Софья )'),
	(65, 8, 14, 'DEBIT', 458, '2018-02-08 19:25:34', ''),
	(66, 8, 19, 'CREDIT', 2, '2018-02-04 21:00:00', ''),
	(67, 8, 12, 'CREDIT', 50, '2018-02-04 21:00:00', ''),
	(68, 8, 18, 'CREDIT', 18, '2017-11-28 21:00:00', ''),
	(69, 8, 4, 'CREDIT', 10, '2018-02-08 20:04:24', 'Софья'),
	(70, 8, 4, 'CREDIT', 10, '2017-12-02 21:00:00', 'Люда'),
	(71, 8, 18, 'CREDIT', 69, '2017-12-02 21:00:00', ''),
	(72, 8, 18, 'CREDIT', 2, '2017-12-02 21:00:00', ''),
	(73, 8, 20, 'CREDIT', 2, '2017-12-05 21:00:00', ''),
	(74, 8, 19, 'CREDIT', 124, '2017-12-05 21:00:00', 'день рождения'),
	(75, 8, 14, 'DEBIT', 450, '2017-12-07 21:00:00', ''),
	(76, 8, 12, 'CREDIT', 50, '2017-12-05 21:00:00', ''),
	(77, 8, 18, 'CREDIT', 9, '2018-02-06 21:00:00', ''),
	(78, 8, 18, 'CREDIT', 28, '2017-12-09 21:00:00', ''),
	(79, 8, 18, 'CREDIT', 28, '2017-12-07 21:00:00', ''),
	(80, 8, 23, 'CREDIT', 11, '2017-12-10 21:00:00', ''),
	(81, 8, 18, 'CREDIT', 10, '2017-12-10 21:00:00', ''),
	(82, 8, 8, 'CREDIT', 20, '2017-12-12 21:00:00', 'Вера'),
	(83, 8, 8, 'CREDIT', 20, '2017-12-12 21:00:00', 'Софья'),
	(84, 8, 19, 'CREDIT', 2, '2017-12-12 21:00:00', ''),
	(85, 8, 19, 'CREDIT', 7, '2017-12-12 21:00:00', ''),
	(86, 8, 18, 'CREDIT', 17, '2017-12-12 21:00:00', ''),
	(87, 8, 18, 'CREDIT', 8, '2017-12-12 21:00:00', ''),
	(88, 8, 18, 'CREDIT', 100, '2017-12-16 21:00:00', ''),
	(89, 8, 4, 'CREDIT', 10, '2017-12-15 21:00:00', ''),
	(90, 8, 4, 'CREDIT', 30, '2017-12-15 21:00:00', 'телефон'),
	(91, 8, 8, 'CREDIT', 20, '2017-12-17 21:00:00', 'Вера'),
	(92, 8, 1, 'CREDIT', 52, '2017-12-15 21:00:00', ''),
	(93, 8, 2, 'CREDIT', 18, '2017-12-15 21:00:00', ''),
	(94, 8, 8, 'CREDIT', 20, '2017-12-17 21:00:00', 'Софья'),
	(95, 8, 22, 'CREDIT', 12, '2017-12-16 21:00:00', ''),
	(96, 8, 14, 'CREDIT', 400, '2017-12-21 21:00:00', ''),
	(97, 8, 23, 'CREDIT', 35, '2017-12-25 21:00:00', ''),
	(98, 8, 14, 'DEBIT', 400, '2017-11-22 21:00:00', ''),
	(99, 8, 14, 'DEBIT', 448, '2017-11-07 21:00:00', ''),
	(100, 8, 19, 'CREDIT', 5, '2017-11-22 21:00:00', '');
/*!40000 ALTER TABLE `operations` ENABLE KEYS */;

-- Дамп структуры для таблица iaccount.operation_categories
CREATE TABLE IF NOT EXISTS `operation_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `comment` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы iaccount.operation_categories: ~20 rows (приблизительно)
/*!40000 ALTER TABLE `operation_categories` DISABLE KEYS */;
REPLACE INTO `operation_categories` (`id`, `name`, `comment`) VALUES
	(1, 'Квартплата', '0'),
	(2, 'Электроэнергия', '0'),
	(3, 'Водоснабжение', ''),
	(4, 'Коммуникации', 'тест1'),
	(6, 'Транспорт авто', '0'),
	(8, 'Школа питание', '0'),
	(9, 'Кружки оплата', '0'),
	(10, 'Test33', '0'),
	(12, 'Транспорт проездной', '0'),
	(13, 'Автомобиль ( техосмотр )', '0'),
	(14, 'Зарплата', '0'),
	(15, 'Премия', '0'),
	(16, 'Тестовая категория', '0'),
	(17, 'Оплата курсов', ''),
	(18, 'Питание (продукты в магазине)', 'Покупки в магазине'),
	(19, 'Питание (общепит)', ''),
	(20, 'Абонентская плата (банковская карточка)', ''),
	(21, 'Сервис (часы)', 'Замена батарейки и др.'),
	(22, 'Парфюмерия (включая моющие)', ''),
	(23, 'Технические аксессуары', 'Кабели, батарейки, др');
/*!40000 ALTER TABLE `operation_categories` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
