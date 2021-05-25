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

 Date: 25/05/2021 18:06:33
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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `number` int(0) NULL DEFAULT NULL,
  `name` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` enum('男','女') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '男',
  `age` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phonenumber` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `identity` enum('学生','老师','管理员') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '学生',
  `islogout` enum('no','yes') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'no',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `logout_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user`(`user`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES (1, 11111111, '凯', '男', '21', '凯', '111', '1315551', '管理员', 'no', '2021-05-25 00:00:00', '2021-05-25 00:00:00');
INSERT INTO `member` VALUES (2, 712872, '曜', '男', '12', '曜', '222', '23121', '老师', 'no', '2021-05-19 00:00:00', '2021-05-25 00:00:00');
INSERT INTO `member` VALUES (3, 912828, '镜', '女', '19', '镜', '333', '15615644', '老师', 'no', '2021-05-25 00:00:00', NULL);
INSERT INTO `member` VALUES (4, 641, '韩信', '男', '18', '韩信', '444', '58558652', '学生', 'no', '2021-05-13 00:00:00', NULL);
INSERT INTO `member` VALUES (5, 641153, '李白', '男', '18', '李白', '555', '12121111222', '学生', 'no', '2021-05-25 00:00:00', NULL);
INSERT INTO `member` VALUES (6, 122322, '云中君', '男', '46', '云中君', '777', '48989', '学生', 'no', '2021-05-26 00:00:00', NULL);
INSERT INTO `member` VALUES (7, 87972, '露娜', '女', '17', '露娜', '666', '5615651', '学生', 'no', '2021-05-28 00:00:00', NULL);
INSERT INTO `member` VALUES (8, 5661561, '貂蝉', '女', '19', '貂蝉', '888', '5455', '学生', 'no', '2021-05-25 00:00:00', NULL);
INSERT INTO `member` VALUES (9, 6525654, '妲己', '女', '90', '妲己', '1111', '561616', '学生', 'no', '2021-05-25 16:03:36', NULL);
INSERT INTO `member` VALUES (10, 2333333, '娜可露露', '女', '38', '娜可露露', '2222', '561616', '学生', 'no', '2021-05-12 00:00:00', NULL);
INSERT INTO `member` VALUES (11, 836219, '橘右京', '男', '25', '橘右京', '3333', '65646', '学生', 'no', '2021-05-04 00:00:00', NULL);
INSERT INTO `member` VALUES (12, 893128, '不知火舞', '女', '11', '不知火舞', '4444', '12121111222', '老师', 'no', '2021-05-25 16:04:26', NULL);
INSERT INTO `member` VALUES (13, 64115, '安琪拉', '女', '18', '安琪拉', '3333', '12121111222', '学生', 'no', '2021-05-25 00:00:00', NULL);

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES (1, 10, 88, 10, 5);
INSERT INTO `score` VALUES (2, 4, 23, 3, 3);
INSERT INTO `score` VALUES (3, 5, 92, 7, 1);
INSERT INTO `score` VALUES (4, 10, 93, 5, 4);
INSERT INTO `score` VALUES (5, 4, 58, 8, 2);
INSERT INTO `score` VALUES (6, 8, 90, 9, 3);

-- ----------------------------
-- View structure for v_student
-- ----------------------------
DROP VIEW IF EXISTS `v_student`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_student` AS select `m`.`name` AS `name`,`s`.`score` AS `score`,`e`.`type` AS `exam`,`c`.`type` AS `type`,`m`.`number` AS `number`,`m`.`age` AS `age`,`m`.`sex` AS `sex`,`m`.`user` AS `user`,`m`.`phonenumber` AS `phonenumber`,`m`.`identity` AS `identity` from (((`score` `s` join `member` `m` on((`m`.`id` = `s`.`member_id`))) join `course` `c` on((`c`.`id` = `s`.`course_id`))) join `exam` `e` on((`e`.`id` = `s`.`exam_id`)));

SET FOREIGN_KEY_CHECKS = 1;
