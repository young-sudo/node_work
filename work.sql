/*
 Navicat Premium Data Transfer

 Source Server         : design
 Source Server Type    : MySQL
 Source Server Version : 80024
 Source Host           : localhost:3306
 Source Schema         : work

 Target Server Type    : MySQL
 Target Server Version : 80024
 File Encoding         : 65001

 Date: 03/06/2021 22:34:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `type` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, '语文');
INSERT INTO `course` VALUES (2, '数学');
INSERT INTO `course` VALUES (3, '英语');
INSERT INTO `course` VALUES (4, '物理');
INSERT INTO `course` VALUES (5, '生物');
INSERT INTO `course` VALUES (6, '化学');
INSERT INTO `course` VALUES (7, '地理');
INSERT INTO `course` VALUES (8, '政治');
INSERT INTO `course` VALUES (9, '体育');
INSERT INTO `course` VALUES (10, '历史');

-- ----------------------------
-- Table structure for exam
-- ----------------------------
DROP TABLE IF EXISTS `exam`;
CREATE TABLE `exam`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `type` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam
-- ----------------------------
INSERT INTO `exam` VALUES (1, '周考');
INSERT INTO `exam` VALUES (2, '月考');
INSERT INTO `exam` VALUES (3, '期中考');
INSERT INTO `exam` VALUES (4, '期末考');
INSERT INTO `exam` VALUES (5, '联考');

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `number` int(0) NULL DEFAULT NULL,
  `name` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` enum('男','女') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '男',
  `age` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phonenumber` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `identity` enum('学生','老师','管理员') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '学生',
  `islogout` enum('no','yes') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'no',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `logout_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user`(`user`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES (1, 111111, '凯', '男', '21', '凯', '698d51a19d8a121ce581499d7b701668', '13117808152', '管理员', 'no', '2021-05-25 00:00:00', NULL);
INSERT INTO `member` VALUES (2, 712872, '曜', '男', '12', '曜', 'bcbe3365e6ac95ea2c0343a2395834dd', '2312111', '管理员', 'no', '2021-05-19 00:00:00', NULL);
INSERT INTO `member` VALUES (3, 641153, '镜', '女', '18', '镜', '698d51a19d8a121ce581499d7b701668', '13122233223', '老师', 'no', '2021-05-30 21:24:58', NULL);
INSERT INTO `member` VALUES (4, 641, '韩信', '男', '18', '韩信', '550a141f12de6341fba65b0ad0433500', '58558652', '老师', 'no', '2021-05-13 00:00:00', NULL);
INSERT INTO `member` VALUES (5, 641213, '李白', '男', '18', '李白', '15de21c670ae7c3f6f3f1f37029303c9', '121111112', '学生', 'no', '2021-05-25 00:00:00', NULL);
INSERT INTO `member` VALUES (6, 122322, '云中君', '男', '21', '云中君', 'fae0b27c451c728867a567e8c1bb4e53', '411111111', '学生', 'no', '2021-05-26 00:00:00', NULL);
INSERT INTO `member` VALUES (7, 87972, '露娜', '女', '17', '露娜', 'f1c1592588411002af340cbaedd6fc33', '5615651', '学生', 'no', '2021-05-28 00:00:00', NULL);
INSERT INTO `member` VALUES (8, 5661561, '貂蝉', '女', '19', '貂蝉', '310dcbbf4cce62f762a2aaa148d556bd', '54554', '学生', 'no', '2021-05-25 00:00:00', NULL);
INSERT INTO `member` VALUES (9, 6525654, '妲己', '女', '90', '妲己', 'b706835de79a2b4e80506f582af3676a', '561616', '学生', 'no', '2021-05-25 16:03:36', NULL);
INSERT INTO `member` VALUES (10, 2333333, '娜可露露', '女', '38', '娜可露露', '934b535800b1cba8f96a5d72f72f1611', '561616', '学生', 'no', '2021-05-12 00:00:00', NULL);
INSERT INTO `member` VALUES (11, 836219, '橘右京', '男', '25', '橘右京', '2be9bd7a3434f7038ca27d1918de58bd', '65646', '学生', 'no', '2021-05-04 00:00:00', NULL);
INSERT INTO `member` VALUES (12, 893128, '不知火舞', '女', '11', '不知火舞', 'fae0b27c451c728867a567e8c1bb4e53', '121211112', '老师', 'yes', '2021-05-25 16:04:26', '2021-06-03 22:31:56');
INSERT INTO `member` VALUES (13, 64115, '安琪拉', '女', '18', '安琪拉', '698d51a19d8a121ce581499d7b701668', '12121111222', '学生', 'no', '2021-05-25 00:00:00', NULL);
INSERT INTO `member` VALUES (14, 614115, '周瑜', '男', '92', '周瑜', '698d51a19d8a121ce581499d7b701668', '12122111222', '学生', 'no', '2021-05-25 22:32:01', NULL);
INSERT INTO `member` VALUES (15, 515645, '百里守约', '男', '34', '百里守约', '698d51a19d8a121ce581499d7b701668', '5494954565', '学生', 'no', '2021-05-25 22:34:44', NULL);
INSERT INTO `member` VALUES (16, 641154, '百里玄策', '男', '18', '百里玄策', '7fa8282ad93047a4d6fe6111c93b308a', '13121111222', '老师', 'no', '2021-06-02 21:11:51', NULL);
INSERT INTO `member` VALUES (17, 129048, '达摩', '男', '14', '达摩', '310dcbbf4cce62f762a2aaa148d556bd', '38927478289', '学生', 'no', '2021-06-03 22:15:08', '2021-06-03 22:31:53');
INSERT INTO `member` VALUES (18, 23234, '典韦', '男', '34', '典韦', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-03 22:20:41', NULL);
INSERT INTO `member` VALUES (19, 23243443, '曹操', '男', '34', '曹操', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-13 22:20:45', NULL);
INSERT INTO `member` VALUES (20, 123122, '钟无艳', '女', '32', '钟无艳', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-18 22:20:52', NULL);
INSERT INTO `member` VALUES (21, 111122123, '墨子', '男', '111', '墨子', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-03 22:20:48', NULL);
INSERT INTO `member` VALUES (22, 232433, '赵云', '男', '43', '赵云', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-17 22:21:04', '2021-06-03 22:32:02');
INSERT INTO `member` VALUES (23, 1323243, '吕布', '男', '1', '吕布', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-03 22:20:55', NULL);
INSERT INTO `member` VALUES (24, 1267311, '孙悟空', '男', '500', '孙悟空', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-19 22:21:08', NULL);
INSERT INTO `member` VALUES (25, 132124233, '李元芳', '男', '12', '李元芳', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-26 22:20:57', NULL);
INSERT INTO `member` VALUES (26, 1232423, '嬴政', '男', '200', '嬴政', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-08 22:21:00', NULL);
INSERT INTO `member` VALUES (27, 1234434, '诸葛亮', '男', '15', '诸葛亮', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-03 22:21:12', NULL);
INSERT INTO `member` VALUES (28, 13241, '芈月', '女', '23', '芈月', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-26 22:21:18', '2021-06-03 22:31:51');
INSERT INTO `member` VALUES (29, 12329, '刘备', '男', '39', '刘备', '310dcbbf4cce62f762a2aaa148d556bd', '13117808152', '学生', 'no', '2021-06-23 22:21:14', NULL);
INSERT INTO `member` VALUES (30, 16768756, '兰陵王', '男', '3', '兰陵王', '15de21c670ae7c3f6f3f1f37029303c9', '111111112323', '老师', 'no', '2021-06-03 22:30:06', NULL);
INSERT INTO `member` VALUES (31, 1231232, '扁鹊', '男', '89', '扁鹊', 'b59c67bf196a4758191e42f76670ceba', '7168293616', '学生', 'no', '2021-06-03 22:29:10', NULL);
INSERT INTO `member` VALUES (32, 137623198, '艾琳', '女', '10', '艾琳', 'b59c67bf196a4758191e42f76670ceba', '1122132', '学生', 'no', '2021-06-03 22:30:10', NULL);
INSERT INTO `member` VALUES (33, 1234234, '干将莫邪', '男', '102', '干将莫邪', 'b59c67bf196a4758191e42f76670ceba', '12132324323', '学生', 'no', '2021-06-03 22:30:51', NULL);

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `member_id` int(0) NOT NULL,
  `score` int(0) UNSIGNED NULL DEFAULT NULL,
  `course_id` int(0) NULL DEFAULT NULL,
  `exam_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES (1, 10, 88, 10, 5);
INSERT INTO `score` VALUES (2, 4, 60, 3, 3);
INSERT INTO `score` VALUES (3, 5, 92, 7, 1);
INSERT INTO `score` VALUES (4, 10, 93, 5, 4);
INSERT INTO `score` VALUES (5, 4, 58, 8, 2);
INSERT INTO `score` VALUES (6, 8, 90, 9, 3);
INSERT INTO `score` VALUES (7, 16, 29, 2, 1);
INSERT INTO `score` VALUES (8, 12, 94, 2, 1);
INSERT INTO `score` VALUES (9, 11, 92, 2, 1);
INSERT INTO `score` VALUES (10, 11, 86, 2, 3);
INSERT INTO `score` VALUES (11, 16, 100, 1, 1);
INSERT INTO `score` VALUES (12, 16, 49, 9, 1);
INSERT INTO `score` VALUES (24, 16, 16, 10, 4);
INSERT INTO `score` VALUES (25, 16, 91, 6, 5);
INSERT INTO `score` VALUES (26, 16, 13, 10, 5);
INSERT INTO `score` VALUES (27, 10, 60, 6, 3);

-- ----------------------------
-- View structure for v_student
-- ----------------------------
DROP VIEW IF EXISTS `v_student`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_student` AS select `m`.`name` AS `name`,`s`.`score` AS `score`,`e`.`type` AS `exam`,`c`.`type` AS `type`,`m`.`number` AS `number`,`m`.`age` AS `age`,`m`.`sex` AS `sex`,`m`.`user` AS `user`,`m`.`phonenumber` AS `phonenumber`,`m`.`identity` AS `identity` from (((`score` `s` join `member` `m` on((`m`.`id` = `s`.`member_id`))) join `course` `c` on((`c`.`id` = `s`.`course_id`))) join `exam` `e` on((`e`.`id` = `s`.`exam_id`)));

SET FOREIGN_KEY_CHECKS = 1;
