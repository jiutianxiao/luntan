/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : luntan

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-07-13 18:18:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `pid` int(11) NOT NULL,
  `fid` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `creater` varchar(16) DEFAULT NULL,
  `createred` varchar(16) DEFAULT NULL,
  `ctime` int(11) DEFAULT NULL,
  `del` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n帖子表\r\n\r\npid ->帖子ID 用于标识帖子\r\n\r\nfid ->楼层ID 用于标记楼层\r\n\r\ncid -> 二级楼层ID 用于标记二级楼层位置\r\n\r\ncontent -> 回帖内容\r\n\r\ncreater -> 回帖人\r\n\r\ncreatered -> 被回帖人\r\n\r\nctime -> 回帖时间\r\n\r\ndel -> 是否删除\r\n\r\n';

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('1', '2', '32', '32', '32', '23', '23', '0');
