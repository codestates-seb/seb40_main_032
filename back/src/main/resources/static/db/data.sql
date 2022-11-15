INSERT INTO Account(account_id, createdAt, modifiedAt, email, intro, nickname, password, profile, role) VALUES('10001', '2022-10-14 10:00:01', '2022-10-14 10:00:01', 'test1@test.com', 'testIntro', 'testNickname1', '$2a$10$.s16a34pwL.M9NksIVSkIOasWPPsBB39blD1lOqinqhzoR7ri84d.', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg', 'USER');
INSERT INTO Account(account_id, createdAt, modifiedAt, email, intro, nickname, password, profile, role) VALUES('10002', '2022-10-14 10:00:02', '2022-10-14 10:00:02', 'test2@test.com', 'testIntro', 'testNickname2', '$2a$10$.s16a34pwL.M9NksIVSkIOasWPPsBB39blD1lOqinqhzoR7ri84d.', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg', 'USER');
INSERT INTO Account(account_id, createdAt, modifiedAt, email, intro, nickname, password, profile, role) VALUES('10003', '2022-10-14 10:00:03', '2022-10-14 10:00:03', 'test3@test.com', 'testIntro', 'testNickname3', '$2a$10$.s16a34pwL.M9NksIVSkIOasWPPsBB39blD1lOqinqhzoR7ri84d.', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg', 'USER');
INSERT INTO Account(account_id, createdAt, modifiedAt, email, intro, nickname, password, profile, role) VALUES('10004', '2022-10-14 10:00:04', '2022-10-14 10:00:04', 'test3@test.com', 'testIntro', 'testNickname3', '$2a$10$.s16a34pwL.M9NksIVSkIOasWPPsBB39blD1lOqinqhzoR7ri84d.', 'https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg', 'USER');

INSERT INTO Follow(follow_id, createdAt, modifiedAt, follower_id, following_id) VALUES('11001', '2022-10-14 11:00:01', '2022-10-14 11:00:01', '10001', '10002');
INSERT INTO Follow(follow_id, createdAt, modifiedAt, follower_id, following_id) VALUES('11002', '2022-10-14 11:00:01', '2022-10-14 11:00:01', '10001', '10003');
INSERT INTO Follow(follow_id, createdAt, modifiedAt, follower_id, following_id) VALUES('11003', '2022-10-14 11:00:01', '2022-10-14 11:00:01', '10002', '10001');
INSERT INTO Follow(follow_id, createdAt, modifiedAt, follower_id, following_id) VALUES('11004', '2022-10-14 11:00:01', '2022-10-14 11:00:01', '10004', '10001');

INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('12001', '2022-10-14 12:00:01', '2022-10-14 12:00:01', 'RESTAURANT', 'testContents', '1', 'test-location', 'testTitle', '10', '10001');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('12002', '2022-10-14 12:00:02', '2022-10-14 12:00:02', 'SPOT', 'testContents', '3', 'test-location', 'testTitle', '10', '10002');
INSERT INTO Board(board_id, createdAt, modifiedAt, category, content, likeCount, location, title, views, account_id) VALUES('12003', '2022-10-14 12:00:03', '2022-10-14 12:00:03', 'STAY', 'testContents', '1', 'test-location', 'testTitle', '10', '10003');

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
