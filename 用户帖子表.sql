/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : luntan

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-07-13 18:19:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for 用户帖子表
-- ----------------------------
DROP TABLE IF EXISTS `用户帖子表`;
CREATE TABLE `用户帖子表` (
  `name` varchar(16) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `fid` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `ctime` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `unread` int(1) DEFAULT NULL,
  `reply` int(1) DEFAULT NULL,
  KEY `ctime` (`ctime`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n用户帖子表\r\n\r\nname -> 发帖人名字\r\n\r\npid -> 所在帖子\r\n\r\nfid -> 所在楼层\r\n\r\ncid -> 所在二级楼层\r\n\r\nctime -> 创建时间\r\n\r\ncontent -> 内容\r\n\r\nunread -> 是否已读\r\n\r\nreply -> 是回复还是被回复\r\n';

-- ----------------------------
-- Records of 用户帖子表
-- ----------------------------
