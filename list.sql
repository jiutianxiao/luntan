/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : luntan

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-07-13 18:18:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for list
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `pid` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `num` int(11) DEFAULT NULL,
  `ctime` int(11) NOT NULL,
  `etime` int(11) DEFAULT NULL,
  `creater` varchar(16) NOT NULL,
  `ecreater` varchar(16) DEFAULT NULL,
  `del` tinyint(1) DEFAULT NULL,
  KEY `index` (`etime`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n帖子列表\r\n\r\npid -> 帖子ID\r\n\r\ntitle -> 帖子名字\r\n\r\ncontent ->一楼内容\r\n\r\nnum -> 回帖数量\r\n\r\nctime -> 创建帖子的时间\r\n\r\netime -> 最后回复时间\r\n\r\ncreater -> 创建人\r\n\r\necreater -> 最后回复人\r\ndel -> 帖子是否删除\r\n';

-- ----------------------------
-- Records of list
-- ----------------------------
INSERT INTO `list` VALUES ('1', 'sad', 'sd', '21', '213', '213', '32', '231', '127');
INSERT INTO `list` VALUES ('6', '43', '5', '34', '343', '3', '34', '34', '34');
INSERT INTO `list` VALUES ('6', '213', '', '1', '0', '5555', '0', '55', null);
