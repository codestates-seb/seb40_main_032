import axios from 'axios';
import { getCookie } from '../util/cookie';
// 게시글 단일 조회시 필요한 정보 요청 API

const jwt = getCookie('accessToken');
const authHeader = {
  headers: {
    Authorization: jwt,
  },
};
// 비로그인 게시글 상세화면 요청
export const postDetailApi = async boardId => {
  console.log(boardId);
  const postDetail = await axios.get(`/boards/${boardId}`); // ${boardId};

  const board = {
    post: postDetail.data,
  };
  return board;
};
// 로그인 유저시 게시글 상세화면 요청
export const postDetailUserApi = async (boardId, accountId) => {
  // 게시글 단일 조회 Api
  const postDetail = await axios.get(`/boards/${boardId}`); // ${boardId}
  // 좋아요 조회 Api
  const like = axios.get(`/likes/${boardId}`, authHeader);
  // 팔로우 조회 Api
  const follow = axios.get(
    `/follows/${postDetail.data.account.accountId}`,
    authHeader,
  );

  const data = await Promise.all([like, follow]);

  const board = {
    post: postDetail.data,
    like: data[0].data,
    follow: data[1].data,
    self: accountId === postDetail.data.account.accountId,
  };
  return board;
};
// 게시물 삭제 Api
export const postDetailDeleteApi = async boardId => {
  const data = await axios.delete(`/boards${boardId}`, {}, authHeader);

  return data;
};

// 게시글 댓글 조회
export const postDetailCommentApi = async boardId => {
  const comment = await axios.get(`/comments/board/${boardId}`);

  console.log(comment);
  return comment;
};
// 게시글 상세화면 댓글 입력
export const postDetailCommentSubmitApi = async (boardId, comment) => {
  const status = await axios.post(
    '/comments',
    { boardId, content: comment },
    authHeader,
  );
  console.log(status);
  return status;
};
// 댓글 수정 Api
export const postDetailCommentModifyApi = async (commentId, content) => {
  const status = await axios.patch(
    `/comments/${commentId}`,
    { content },
    authHeader,
  );
  console.log(status);
  return status;
};
// 댓글 삭제 Api
export const postDetaulCommentDeleteApi = async commentId => {
  const status = await axios.delete(`/comments${commentId}`, authHeader);
  console.log(status);
  return status;
};

// 팔로우 및 팔로우 취소 Api
export const postDetailFollowApi = async accoundId => {
  const follow = await axios.post(`/follows/${accoundId}`, {}, authHeader);
  return follow.data.status;
};

// 좋아요 체크 및 취소 Api
export const postDetailLikeApi = async boardId => {
  const like = await axios.post(`/likes/${boardId}`, {}, authHeader);
  return like.data.status;
};
