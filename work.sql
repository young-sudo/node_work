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

 Date: 10/06/2021 17:46:45
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
  `Email` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `identity` enum('学生','老师','管理员') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '学生',
  `islogout` enum('no','yes') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'no',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `logout_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user`(`user`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES (1, 21323, '凯', '男', '21', '凯', '698d51a19d8a121ce581499d7b701668', 'youngsudo@163.com', '管理员', 'no', '2021-06-07 10:47:07', NULL);
INSERT INTO `member` VALUES (2, 10293832, '曜', '男', '18', '曜', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '管理员', 'no', '2021-06-04 09:21:50', NULL);
INSERT INTO `member` VALUES (3, 2313433, '镜', '女', '19', '镜', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '管理员', 'no', '2021-06-04 08:51:32', NULL);
INSERT INTO `member` VALUES (4, 2324322, '韩信', '男', '22', '韩信', '698d51a19d8a121ce581499d7b701668', 'qwuihwu@136.com', '老师', 'no', '2021-06-04 09:22:11', NULL);
INSERT INTO `member` VALUES (5, 641213, '李白', '男', '18', '李白', '698d51a19d8a121ce581499d7b701668', 'youngsudo@163.com', '老师', 'no', '2021-05-25 00:00:00', NULL);
INSERT INTO `member` VALUES (6, 122322, '云中君', '男', '21', '云中君', 'b59c67bf196a4758191e42f76670ceba', '2935160161@qq.com', '学生', 'no', '2021-05-26 00:00:00', NULL);
INSERT INTO `member` VALUES (7, 87972, '露娜', '女', '17', '露娜', 'f1c1592588411002af340cbaedd6fc33', 'youngsudo@163.com', '学生', 'no', '2021-05-28 00:00:00', NULL);
INSERT INTO `member` VALUES (8, 5661561, '貂蝉', '女', '19', '貂蝉', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-05-25 00:00:00', NULL);
INSERT INTO `member` VALUES (9, 6525654, '妲己', '女', '90', '妲己', '698d51a19d8a121ce581499d7b701668', 'youngsudo@163.com', '学生', 'no', '2021-05-25 16:03:36', NULL);
INSERT INTO `member` VALUES (10, 2333333, '娜可露露', '女', '19', '娜可露露', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-05-12 00:00:00', NULL);
INSERT INTO `member` VALUES (11, 836219, '橘右京', '男', '25', '橘右京', '2be9bd7a3434f7038ca27d1918de58bd', 'youngsudo@163.com', '学生', 'no', '2021-05-04 00:00:00', NULL);
INSERT INTO `member` VALUES (12, 893128, '不知火舞', '女', '11', '不知火舞', 'fae0b27c451c728867a567e8c1bb4e53', 'youngsudo@163.com', '老师', 'yes', '2021-05-25 16:04:26', '2021-06-03 22:31:56');
INSERT INTO `member` VALUES (13, 64115, '安琪拉', '女', '18', '安琪拉', '698d51a19d8a121ce581499d7b701668', 'youngsudo@163.com', '学生', 'no', '2021-05-25 00:00:00', NULL);
INSERT INTO `member` VALUES (14, 614115, '周瑜', '男', '92', '周瑜', '698d51a19d8a121ce581499d7b701668', 'youngsudo@163.com', '学生', 'no', '2021-05-25 22:32:01', NULL);
INSERT INTO `member` VALUES (15, 515645, '百里守约', '男', '34', '百里守约', '698d51a19d8a121ce581499d7b701668', 'youngsudo@163.com', '学生', 'no', '2021-05-25 22:34:44', NULL);
INSERT INTO `member` VALUES (16, 641154, '百里玄策', '男', '18', '百里玄策', '698d51a19d8a121ce581499d7b701668', 'youngsudo@163.com', '学生', 'no', '2021-06-02 21:11:51', NULL);
INSERT INTO `member` VALUES (17, 129048, '达摩', '男', '14', '达摩', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-03 22:15:08', '2021-06-03 22:31:53');
INSERT INTO `member` VALUES (18, 23234, '典韦', '男', '34', '典韦', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-03 22:20:41', NULL);
INSERT INTO `member` VALUES (19, 23243443, '曹操', '男', '34', '曹操', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-13 22:20:45', NULL);
INSERT INTO `member` VALUES (20, 123122, '钟无艳', '女', '32', '钟无艳', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-18 22:20:52', NULL);
INSERT INTO `member` VALUES (21, 111122123, '墨子', '男', '111', '墨子', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-03 22:20:48', NULL);
INSERT INTO `member` VALUES (22, 232433, '赵云', '男', '43', '赵云', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-17 22:21:04', '2021-06-03 22:32:02');
INSERT INTO `member` VALUES (23, 1323243, '吕布', '男', '1', '吕布', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-03 22:20:55', NULL);
INSERT INTO `member` VALUES (24, 1267311, '孙悟空', '男', '500', '孙悟空', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-19 22:21:08', NULL);
INSERT INTO `member` VALUES (25, 132124233, '李元芳', '男', '12', '李元芳', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-26 22:20:57', NULL);
INSERT INTO `member` VALUES (26, 1232423, '嬴政', '男', '200', '嬴政', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-08 22:21:00', NULL);
INSERT INTO `member` VALUES (27, 1234434, '诸葛亮', '男', '15', '诸葛亮', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-03 22:21:12', NULL);
INSERT INTO `member` VALUES (28, 13241, '芈月', '女', '23', '芈月', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-26 22:21:18', '2021-06-03 22:31:51');
INSERT INTO `member` VALUES (29, 12329, '刘备', '男', '39', '刘备', '310dcbbf4cce62f762a2aaa148d556bd', 'youngsudo@163.com', '学生', 'no', '2021-06-23 22:21:14', NULL);
INSERT INTO `member` VALUES (30, 16768756, '兰陵王', '男', '3', '兰陵王', '15de21c670ae7c3f6f3f1f37029303c9', 'youngsudo@163.com', '老师', 'no', '2021-06-03 22:30:06', NULL);
INSERT INTO `member` VALUES (31, 1231232, '扁鹊', '男', '89', '扁鹊', 'b59c67bf196a4758191e42f76670ceba', 'youngsudo@163.com', '学生', 'no', '2021-06-03 22:29:10', NULL);
INSERT INTO `member` VALUES (32, 137623198, '艾琳', '女', '10', '艾琳', 'b59c67bf196a4758191e42f76670ceba', 'youngsudo@163.com', '学生', 'no', '2021-06-03 22:30:10', NULL);
INSERT INTO `member` VALUES (33, 1234234, '干将莫邪', '男', '102', '干将莫邪', 'b59c67bf196a4758191e42f76670ceba', 'youngsudo@163.com', '学生', 'no', '2021-06-03 22:30:51', NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES (1, 10, 88, 10, 5);
INSERT INTO `score` VALUES (2, 4, 60, 3, 3);
INSERT INTO `score` VALUES (3, 5, 92, 7, 1);
INSERT INTO `score` VALUES (4, 10, 93, 5, 4);
INSERT INTO `score` VALUES (5, 24, 58, 8, 2);
INSERT INTO `score` VALUES (6, 8, 90, 9, 3);
INSERT INTO `score` VALUES (7, 16, 29, 2, 1);
INSERT INTO `score` VALUES (8, 11, 94, 2, 1);
INSERT INTO `score` VALUES (9, 11, 92, 2, 1);
INSERT INTO `score` VALUES (10, 11, 86, 2, 3);
INSERT INTO `score` VALUES (11, 16, 100, 1, 1);
INSERT INTO `score` VALUES (12, 16, 49, 9, 1);
INSERT INTO `score` VALUES (13, 16, 16, 10, 4);
INSERT INTO `score` VALUES (14, 16, 91, 6, 5);
INSERT INTO `score` VALUES (15, 16, 60, 10, 5);
INSERT INTO `score` VALUES (16, 10, 60, 6, 3);
INSERT INTO `score` VALUES (17, 27, 89, 3, 2);
INSERT INTO `score` VALUES (18, 34, 53, 1, 2);
INSERT INTO `score` VALUES (30, 10, 89, 7, 2);
INSERT INTO `score` VALUES (31, 11, 59, 9, 3);
INSERT INTO `score` VALUES (32, 16, 95, 5, 3);

-- ----------------------------
-- Table structure for tab_stu_tea
-- ----------------------------
DROP TABLE IF EXISTS `tab_stu_tea`;
CREATE TABLE `tab_stu_tea`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `student_id` int(0) NULL DEFAULT NULL,
  `teacher_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tab_stu_tea
-- ----------------------------
INSERT INTO `tab_stu_tea` VALUES (1, 6, 4);
INSERT INTO `tab_stu_tea` VALUES (2, 7, 5);
INSERT INTO `tab_stu_tea` VALUES (3, 8, 4);
INSERT INTO `tab_stu_tea` VALUES (4, 9, 5);
INSERT INTO `tab_stu_tea` VALUES (5, 10, 4);
INSERT INTO `tab_stu_tea` VALUES (6, 11, 5);
INSERT INTO `tab_stu_tea` VALUES (7, 12, 5);
INSERT INTO `tab_stu_tea` VALUES (8, 13, 5);
INSERT INTO `tab_stu_tea` VALUES (9, 14, 5);
INSERT INTO `tab_stu_tea` VALUES (10, 15, 4);
INSERT INTO `tab_stu_tea` VALUES (11, 16, 5);
INSERT INTO `tab_stu_tea` VALUES (12, 17, 4);
INSERT INTO `tab_stu_tea` VALUES (13, 18, 4);
INSERT INTO `tab_stu_tea` VALUES (14, 19, 4);
INSERT INTO `tab_stu_tea` VALUES (15, 20, 4);
INSERT INTO `tab_stu_tea` VALUES (16, 21, 4);
INSERT INTO `tab_stu_tea` VALUES (17, 22, 4);
INSERT INTO `tab_stu_tea` VALUES (18, 23, 4);
INSERT INTO `tab_stu_tea` VALUES (19, 24, 4);
INSERT INTO `tab_stu_tea` VALUES (20, 25, 5);
INSERT INTO `tab_stu_tea` VALUES (21, 26, 4);
INSERT INTO `tab_stu_tea` VALUES (22, 27, 5);
INSERT INTO `tab_stu_tea` VALUES (23, 28, 5);
INSERT INTO `tab_stu_tea` VALUES (24, 29, 5);
INSERT INTO `tab_stu_tea` VALUES (25, 30, 5);
INSERT INTO `tab_stu_tea` VALUES (26, 31, 5);
INSERT INTO `tab_stu_tea` VALUES (27, 32, 5);
INSERT INTO `tab_stu_tea` VALUES (28, 33, 5);
INSERT INTO `tab_stu_tea` VALUES (29, 6, 3);

-- ----------------------------
-- View structure for v_score
-- ----------------------------
DROP VIEW IF EXISTS `v_score`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_score` AS select `t`.`studentNumber` AS `studentNumber`,`s`.`name` AS `name`,`s`.`sex` AS `sex`,`s`.`score` AS `score`,`s`.`exam` AS `exam`,`s`.`type` AS `type`,`t`.`teacherNumber` AS `teacherNumber`,`t`.`teacherName` AS `teacherName` from (`v_student` `s` join `v_stu_tea` `t` on((`s`.`user` = `t`.`studentUser`)));

-- ----------------------------
-- View structure for v_stu_tea
-- ----------------------------
DROP VIEW IF EXISTS `v_stu_tea`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_stu_tea` AS select `t`.`id` AS `id`,`m`.`number` AS `studentNumber`,`m`.`name` AS `studentName`,`m`.`user` AS `studentUser`,`me`.`number` AS `teacherNumber`,`me`.`name` AS `teacherName`,`me`.`user` AS `teacherUser` from ((`tab_stu_tea` `t` join `member` `m` on((`m`.`id` = `t`.`student_id`))) join `member` `me` on((`me`.`id` = `t`.`teacher_id`)));

-- ----------------------------
-- View structure for v_student
-- ----------------------------
DROP VIEW IF EXISTS `v_student`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_student` AS select `m`.`name` AS `name`,`s`.`score` AS `score`,`e`.`type` AS `exam`,`c`.`type` AS `type`,`m`.`number` AS `number`,`m`.`age` AS `age`,`m`.`sex` AS `sex`,`m`.`user` AS `user`,`m`.`Email` AS `Email`,`m`.`identity` AS `identity` from (((`score` `s` join `member` `m` on((`m`.`id` = `s`.`member_id`))) join `course` `c` on((`c`.`id` = `s`.`course_id`))) join `exam` `e` on((`e`.`id` = `s`.`exam_id`))) where (`m`.`identity` = '学生');

SET FOREIGN_KEY_CHECKS = 1;
