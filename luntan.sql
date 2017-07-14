/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : luntan

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-07-14 18:03:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for list
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `pid` bigint(20) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 NOT NULL,
  `num` int(11) DEFAULT NULL,
  `ctime` bigint(20) DEFAULT NULL,
  `etime` bigint(20) DEFAULT NULL,
  `creater` varchar(16) CHARACTER SET utf8 NOT NULL,
  `ecreater` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `del` tinyint(1) DEFAULT NULL,
  KEY `index` (`etime`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n帖子列表\r\n\r\npid -> 帖子ID\r\n\r\ntitle -> 帖子名字\r\n\r\ncontent ->一楼内容\r\n\r\nnum -> 回帖数量\r\n\r\nctime -> 创建帖子的时间\r\n\r\netime -> 最后回复时间\r\n\r\ncreater -> 创建人\r\n\r\necreater -> 最后回复人\r\ndel -> 帖子是否删除\r\n';

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `pid` bigint(11) NOT NULL,
  `fid` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `creater` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `createred` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `ctime` bigint(11) DEFAULT NULL,
  `del` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n帖子表\r\n\r\npid ->帖子ID 用于标识帖子\r\n\r\nfid ->楼层ID 用于标记楼层\r\n\r\ncid -> 二级楼层ID 用于标记二级楼层位置\r\n\r\ncontent -> 回帖内容\r\n\r\ncreater -> 回帖人\r\n\r\ncreatered -> 被回帖人\r\n\r\nctime -> 回帖时间\r\n\r\ndel -> 是否删除\r\n\r\n';

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` int(11) DEFAULT NULL,
  `username` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `name` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(26) CHARACTER SET utf8 DEFAULT NULL,
  `tel` int(11) DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `headimg` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `unread` tinyint(1) DEFAULT NULL,
  `tab` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n用户表\r\nuserid -> 用户id\r\n\r\nusername -> 用户姓名\r\n\r\nname -> 用户名\r\n\r\npassword -> 密码\r\n\r\ntel -> 用户手机号\r\n\r\naddress ->  地址\r\n\r\nemail -> 用户邮箱\r\n\r\nheadimg -> 头像\r\n\r\nsex -> 性别\r\n\r\nunread -> 未读\r\n\r\n\r\n\r\n ';

-- ----------------------------
-- Table structure for userpost
-- ----------------------------
DROP TABLE IF EXISTS `userpost`;
CREATE TABLE `userpost` (
  `pid` bigint(11) NOT NULL,
  `fid` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `creater` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `createred` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `unread` int(1) DEFAULT NULL,
  `del` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='用户回帖表\r\n\r\npid ->帖子ID\r\n\r\nfid ->1级楼层\r\n\r\ncid -> 2级楼层\r\n\r\nreturned -> 回复人\r\n\r\nreply -> 被回复人\r\n\r\nunread ->是否已读\r\n\r\ndel -> 是否已删';

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
