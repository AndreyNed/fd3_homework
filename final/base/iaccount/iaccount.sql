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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы iaccount.accounts: ~6 rows (приблизительно)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
REPLACE INTO `accounts` (`id`, `name`, `comment`, `currency`) VALUES
	(1, 'Счет 1', '0', 4),
	(2, 'Счет 2', '0', 4),
	(3, 'Счет 3', 'тест', 4),
	(4, 'Test33', '0', 4),
	(6, 'Test388', '0', 4),
	(7, 'Счет 4', '0', 4);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы iaccount.currency: ~3 rows (приблизительно)
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы iaccount.operations: ~13 rows (приблизительно)
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
	(21, 3, 14, 'DEBIT', 500, '2018-01-30 22:24:08', 'тест зарплата');
/*!40000 ALTER TABLE `operations` ENABLE KEYS */;

-- Дамп структуры для таблица iaccount.operation_categories
CREATE TABLE IF NOT EXISTS `operation_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `comment` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы iaccount.operation_categories: ~14 rows (приблизительно)
/*!40000 ALTER TABLE `operation_categories` DISABLE KEYS */;
REPLACE INTO `operation_categories` (`id`, `name`, `comment`) VALUES
	(1, 'Квартплата', '0'),
	(2, 'Электроэнергия', '0'),
	(3, 'Водоснабжение', '0'),
	(4, 'Коммуникации', 'тест1'),
	(6, 'Транспорт авто', '0'),
	(7, 'Продукты питания', '0'),
	(8, 'Школа питание', '0'),
	(9, 'Кружки оплата', '0'),
	(10, 'Test33', '0'),
	(12, 'Транспорт проездной', '0'),
	(13, 'Автомобиль ( техосмотр )', '0'),
	(14, 'Зарплата', '0'),
	(15, 'Премия', '0'),
	(16, 'Тестовая категория', '0');
/*!40000 ALTER TABLE `operation_categories` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
