INSERT INTO Account(account_id, createdAt, modifiedAt, email, intro, nickname, password, profile, role) VALUES('10001', '2022-10-14 10:00:01', '2022-10-14 10:00:01', 'test1@test.com', 'testIntro', 'testNickname1', '$2a$10$.s16a34pwL.M9NksIVSkIOasWPPsBB39blD1lOqinqhzoR7ri84d.', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg', 'USER');
INSERT INTO Account(account_id, createdAt, modifiedAt, email, intro, nickname, password, profile, role) VALUES('10002', '2022-10-14 10:00:02', '2022-10-14 10:00:02', 'test2@test.com', 'testIntro', 'testNickname2', '$2a$10$.s16a34pwL.M9NksIVSkIOasWPPsBB39blD1lOqinqhzoR7ri84d.', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg', 'USER');
INSERT INTO Account(account_id, createdAt, modifiedAt, email, intro, nickname, password, profile, role) VALUES('10003', '2022-10-14 10:00:03', '2022-10-14 10:00:03', 'test3@test.com', 'testIntro', 'testNickname3', '$2a$10$.s16a34pwL.M9NksIVSkIOasWPPsBB39blD1lOqinqhzoR7ri84d.', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg', 'USER');
INSERT INTO Account(account_id, createdAt, modifiedAt, email, intro, nickname, password, profile, role, tempPassword) VALUES('10004', '2022-10-14 10:00:04', '2022-10-14 10:00:04', 'test4@test.com', 'testIntro', 'testNickname4', '$2a$10$.s16a34pwL.M9NksIVSkIOasWPPsBB39blD1lOqinqhzoR7ri84d.', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg', 'USER', 'qinqhzoR7ri84d');

INSERT INTO Follow(follow_id, createdAt, modifiedAt, follower_id, following_id) VALUES('11001', '2022-10-14 11:00:01', '2022-10-14 11:00:01', '10001', '10002');
INSERT INTO Follow(follow_id, createdAt, modifiedAt, follower_id, following_id) VALUES('11002', '2022-10-14 11:00:01', '2022-10-14 11:00:01', '10001', '10003');
INSERT INTO Follow(follow_id, createdAt, modifiedAt, follower_id, following_id) VALUES('11003', '2022-10-14 11:00:01', '2022-10-14 11:00:01', '10002', '10001');

INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('12001', '2022-10-14 12:00:01', '2022-10-14 12:00:01', 'RESTAURANT', 'testContents', '1', 'test-location', 'testTitle', '10', '10001');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('12002', '2022-10-14 12:00:02', '2022-10-14 12:00:02', 'RESTAURANT', 'testContents', '3', 'test-location', 'testTitle', '10', '10002');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('12003', '2022-10-14 12:00:03', '2022-10-14 12:00:03', 'RESTAURANT', 'testContents', '1', 'test-location', 'testTitle', '10', '10003');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('12004', '2022-10-14 12:00:04', '2022-10-14 12:00:04', 'RESTAURANT', 'testContents', '1', 'test-location', 'testTitle', '10', '10001');

INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('13001', '12001', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('13002', '12001', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('13003', '12001', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('13004', '12002', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('13005', '12003', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');

INSERT INTO Likes(likes_id, createdAt, modifiedAt, account_id, board_id) VALUES('14001', '2022-10-14 13:00:01', '2022-10-14 13:00:01', '10002', '12001');
INSERT INTO Likes(likes_id, createdAt, modifiedAt, account_id, board_id) VALUES('14002', '2022-10-14 13:00:02', '2022-10-14 13:00:02', '10001', '12002');
INSERT INTO Likes(likes_id, createdAt, modifiedAt, account_id, board_id) VALUES('14003', '2022-10-14 13:00:03', '2022-10-14 13:00:03', '10002', '12002');
INSERT INTO Likes(likes_id, createdAt, modifiedAt, account_id, board_id) VALUES('14004', '2022-10-14 13:00:04', '2022-10-14 13:00:04', '10003', '12002');
INSERT INTO Likes(likes_id, createdAt, modifiedAt, account_id, board_id) VALUES('14005', '2022-10-14 13:00:05', '2022-10-14 13:00:05', '10001', '12003');

INSERT INTO Comment(comment_id, createdAt, modifiedAt, content, account_id, board_id) VALUES('15001', '2022-10-14 14:00:01', '2022-10-14 14:00:01', 'testContents', '10001', '12002');
INSERT INTO Comment(comment_id, createdAt, modifiedAt, content, account_id, board_id) VALUES('15002', '2022-10-14 14:00:01', '2022-10-14 14:00:01', 'testContents', '10001', '12003');
INSERT INTO Comment(comment_id, createdAt, modifiedAt, content, account_id, board_id) VALUES('15003', '2022-10-14 14:00:01', '2022-10-14 14:00:01', 'testContents', '10002', '12001');

INSERT INTO Tag(tag_id, createdAt, modifiedAt, name) VALUES('16001', '2022-10-14 15:00:01', '2022-10-14 14:00:01', 'testName1');
INSERT INTO Tag(tag_id, createdAt, modifiedAt, name) VALUES('16002', '2022-10-14 15:00:02', '2022-10-14 15:00:02', 'testName2');
INSERT INTO Tag(tag_id, createdAt, modifiedAt, name) VALUES('16003', '2022-10-14 15:00:03', '2022-10-14 15:00:03', 'testName3');

INSERT INTO BoardTag(boardTag_id, board_id, tag_id) VALUES('17001', '12001', '16001');
INSERT INTO BoardTag(boardTag_id, board_id, tag_id) VALUES('17002', '12001', '16002');


-- Board and Comment Test
INSERT INTO Account(account_id, createdAt, modifiedAt, email, intro, nickname, password, profile, role) VALUES('20001', '2022-10-14 10:00:01', '2022-10-14 10:00:01', 'userA@test.com', 'testIntro', 'userA', '$2a$10$.s16a34pwL.M9NksIVSkIOasWPPsBB39blD1lOqinqhzoR7ri84d.', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg', 'USER');
INSERT INTO Account(account_id, createdAt, modifiedAt, email, intro, nickname, password, profile, role) VALUES('20002', '2022-10-14 10:00:01', '2022-10-14 10:00:01', 'userB@test.com', 'testIntro', 'userB', '$2a$10$.s16a34pwL.M9NksIVSkIOasWPPsBB39blD1lOqinqhzoR7ri84d.', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg', 'USER');
INSERT INTO Account(account_id, createdAt, modifiedAt, email, intro, nickname, password, profile, role) VALUES('20003', '2022-10-14 10:00:01', '2022-10-14 10:00:01', 'userC@test.com', 'testIntro', 'userC', '$2a$10$.s16a34pwL.M9NksIVSkIOasWPPsBB39blD1lOqinqhzoR7ri84d.', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg', 'USER');

INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21001', '2022-11-14 12:00:01', '2022-11-14 12:00:01', 'RESTAURANT', 'testContents', '1', 'test-location', 'testTitle', '101', '20001');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21002', '2022-11-14 12:00:02', '2022-11-14 12:00:02', 'RESTAURANT', 'testContents', '2', 'test-location', 'testTitleContainsQuery', '102', '20002');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21003', '2022-11-14 12:00:03', '2022-11-14 12:00:03', 'RESTAURANT', 'testContentsContainsQuery', '3', 'test-location', 'testTitle', '103', '20003');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21004', '2022-11-14 12:00:04', '2022-11-14 12:00:04', 'RESTAURANT', 'testContents', '4', 'test-location', 'testTitleContainsQuery', '104', '20001');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21005', '2022-11-14 12:00:05', '2022-11-14 12:00:05', 'RESTAURANT', 'testContents', '5', 'test-location', 'testTitle', '105', '20002');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21006', '2022-11-14 12:00:06', '2022-11-14 12:00:06', 'RESTAURANT', 'testContentsContainsQuery', '6', 'test-location', 'testTitleContainsQuery', '106', '20003');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21007', '2022-11-14 12:00:07', '2022-11-14 12:00:07', 'SPOT', 'testContents', '7', 'test-location', 'testTitle', '107', '20001');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21008', '2022-11-14 12:00:08', '2022-11-14 12:00:08', 'SPOT', 'testContents', '8', 'test-location', 'testTitleContainsQuery', '108', '20002');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21009', '2022-11-14 12:00:09', '2022-11-14 12:00:09', 'SPOT', 'testContentsContainsQuery', '9', 'test-location', 'testTitle', '109', '20003');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21010', '2022-11-14 12:00:10', '2022-11-14 12:00:10', 'SPOT', 'testContents', '0', 'test-location', 'testTitleContainsQuery', '110', '20001');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21011', '2022-11-14 12:00:11', '2022-11-14 12:00:11', 'SPOT', 'testContents', '1', 'test-location', 'testTitle', '111', '20002');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21012', '2022-11-14 12:00:12', '2022-11-14 12:00:12', 'SPOT', 'testContentsContainsQuery', '2', 'test-location', 'testTitleContainsQuery', '112', '20003');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21013', '2022-11-14 12:00:13', '2022-11-14 12:00:13', 'STAY', 'testContents', '3', 'test-location', 'testTitle', '113', '20001');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21014', '2022-11-14 12:00:14', '2022-11-14 12:00:14', 'STAY', 'testContents', '4', 'test-location', 'testTitleContainsQuery', '114', '20002');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21015', '2022-11-14 12:00:15', '2022-11-14 12:00:15', 'STAY', 'testContentsContainsQuery', '5', 'test-location', 'testTitle', '115', '20003');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21016', '2022-11-14 12:00:16', '2022-11-14 12:00:16', 'STAY', 'testContents', '6', 'test-location', 'testTitleContainsQuery', '116', '20001');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21017', '2022-11-14 12:00:17', '2022-11-14 12:00:17', 'STAY', 'testContents', '7', 'test-location', 'testTitle', '117', '20002');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21018', '2022-11-14 12:00:18', '2022-11-14 12:00:18', 'STAY', 'testContentsContainsQuery', '8', 'test-location', 'testTitleContainsQuery', '118', '20003');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21019', '2022-11-14 12:00:19', '2022-11-14 12:00:19', 'RESTAURANT', 'testContents', '9', 'test-location', 'testTitle', '119', '20001');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21020', '2022-11-14 12:00:20', '2022-11-14 12:00:20', 'SPOT', 'testContents', '0', 'test-location', 'testTitleContainsQuery', '120', '20002');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('21021', '2022-11-14 12:00:21', '2022-11-14 12:00:21', 'STAY', 'testContentsContainsQuery', '1', 'test-location', 'testTitle', '121', '20003');
-- for modify
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('31001', '2022-11-13 12:00:01', '2022-11-13 12:00:01', 'RESTAURANT', 'testContents', '1', 'test-location', 'testTitle', '101', '20001');
-- for delete
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('31002', '2022-11-13 12:00:01', '2022-11-13 12:00:01', 'RESTAURANT', 'testContents', '1', 'test-location', 'testTitle', '101', '20001');

INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22001', '21001', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22002', '21002', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22003', '21003', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22004', '21004', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22005', '21005', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22006', '21006', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22007', '21007', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22008', '21008', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22009', '21009', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22010', '21010', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22011', '21011', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22012', '21012', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22013', '21013', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22014', '21014', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22015', '21015', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22016', '21016', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22017', '21017', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22018', '21018', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22019', '21019', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22020', '21020', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('22021', '21021', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('32001', '31001', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');
INSERT INTO BoardPhoto(boardPhoto_id, board_id, photo) VALUES('32002', '31002', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg');

INSERT INTO Tag(tag_id, createdAt, modifiedAt, name) VALUES('23001', '2022-11-14 12:00:01', '2022-11-14 12:00:01', 'tag1');
INSERT INTO Tag(tag_id, createdAt, modifiedAt, name) VALUES('23002', '2022-11-14 12:00:01', '2022-11-14 12:00:01', 'tag2');
INSERT INTO Tag(tag_id, createdAt, modifiedAt, name) VALUES('23003', '2022-11-14 12:00:01', '2022-11-14 12:00:01', 'testContainsQuery');

INSERT INTO BoardTag(boardTag_id, board_id, tag_id) VALUES('24001', '21001', '23001');
INSERT INTO BoardTag(boardTag_id, board_id, tag_id) VALUES('24002', '21001', '23002');
INSERT INTO BoardTag(boardTag_id, board_id, tag_id) VALUES('24003', '21005', '23003');
INSERT INTO BoardTag(boardTag_id, board_id, tag_id) VALUES('24004', '21010', '23003');
INSERT INTO BoardTag(boardTag_id, board_id, tag_id) VALUES('24005', '21015', '23003');
INSERT INTO BoardTag(boardTag_id, board_id, tag_id) VALUES('24006', '21020', '23003');

INSERT INTO Comment(comment_id, createdAt, modifiedAt, content, account_id, board_id) VALUES('25001', '2022-10-14 14:00:01', '2022-10-14 14:00:01', 'testComment', '20001', '21001');
INSERT INTO Comment(comment_id, createdAt, modifiedAt, content, account_id, board_id) VALUES('25002', '2022-10-14 14:00:01', '2022-10-14 14:00:01', 'testComment', '20002', '21001');
INSERT INTO Comment(comment_id, createdAt, modifiedAt, content, account_id, board_id) VALUES('25003', '2022-10-14 14:00:01', '2022-10-14 14:00:01', 'testComment', '20003', '21001');
INSERT INTO Comment(comment_id, createdAt, modifiedAt, content, account_id, board_id) VALUES('25004', '2022-10-14 14:00:01', '2022-10-14 14:00:01', 'testComment', '20001', '21001');
INSERT INTO Comment(comment_id, createdAt, modifiedAt, content, account_id, board_id) VALUES('25005', '2022-10-14 14:00:01', '2022-10-14 14:00:01', 'testComment', '20002', '21001');
INSERT INTO Comment(comment_id, createdAt, modifiedAt, content, account_id, board_id) VALUES('25006', '2022-10-14 14:00:01', '2022-10-14 14:00:01', 'testComment', '20003', '21001');
-- for delete
INSERT INTO Comment(comment_id, createdAt, modifiedAt, content, account_id, board_id) VALUES('35001', '2022-10-14 14:00:01', '2022-10-14 14:00:01', 'testComment', '20001', '31001');
