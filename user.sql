/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : luntan

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-07-13 18:19:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` int(11) DEFAULT NULL,
  `username` varchar(16) DEFAULT NULL,
  `name` varchar(16) DEFAULT NULL,
  `password` varchar(26) DEFAULT NULL,
  `tel` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `headimg` varchar(255) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `unread` tinyint(1) DEFAULT NULL,
  `tab` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n用户表\r\nuserid -> 用户id\r\n\r\nusername -> 用户姓名\r\n\r\nname -> 用户名\r\n\r\npassword -> 密码\r\n\r\ntel -> 用户手机号\r\n\r\naddress ->  地址\r\n\r\nemail -> 用户邮箱\r\n\r\nheadimg -> 头像\r\n\r\nsex -> 性别\r\n\r\nunread -> 未读\r\n\r\n\r\n\r\n ';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('6', '1', '', '', '34', '34', '34', null, null, null, null);
INSERT INTO `user` VALUES ('2', '23', '', '', '1', null, null, null, null, null, null);
INSERT INTO `user` VALUES ('6', '1', '', '', '34', '34', '34', null, null, null, null);
INSERT INTO `user` VALUES (null, '4', null, null, '4', null, null, null, null, null, null);
INSERT INTO `user` VALUES (null, '2', null, null, '2', null, null, null, null, null, null);
INSERT INTO `user` VALUES (null, '3', null, null, '3', null, null, null, null, null, null);
