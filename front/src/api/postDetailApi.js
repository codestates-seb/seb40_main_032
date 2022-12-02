import axios from 'axios';

const jwt = localStorage.getItem('accessToken');
const authHeader = {
  headers: {
    Authorization: jwt,
  },
};
export const postDetailApi = async boardId => {
  const postDetail = await axios.get(`/boards/${boardId}`);

  const board = {
    post: postDetail.data,
  };
  return board;
};
export const postDetailUserApi = async (boardId, accountId) => {
  const postDetail = await axios.get(`/boards/${boardId}`);
  const like = axios.get(`/likes/${boardId}`, authHeader);
  const follow = axios.get(
    `/follows/${postDetail.data.account.accountId}`,
    authHeader,
  );

  const data = await Promise.all([like, follow]);

  const board = {
    post: postDetail.data,
    like: data[0].data,
    follow: data[1].data,
    self: Number(accountId) === postDetail.data.account.accountId,
  };
  return board;
};
export const postDetailDeleteApi = async boardId => {
  const data = await axios.delete(`/boards/${boardId}`, authHeader);

  return data;
};

export const postDetailCommentApi = async (boardId, lastData, size = 6) => {
  const comment = await axios.get(
    `/comments/board/${boardId}?&size=${size}&${lastData}`,
  );
  return comment.data;
};
export const postDetailCommentSubmitApi = async (boardId, comment) => {
  const { status } = await axios.post(
    '/comments',
    { boardId, content: comment },
    authHeader,
  );
  return status;
};
export const postDetailCommentModifyApi = async (commentId, content) => {
  const status = await axios.patch(
    `/comments/${commentId}`,
    { content },
    authHeader,
  );
  return status;
};
export const postDetaulCommentDeleteApi = async commentId => {
  const status = await axios.delete(`/comments/${commentId}`, authHeader);
  return status;
};

export const postDetailFollowApi = async accoundId => {
  const follow = await axios.post(`/follows/${accoundId}`, {}, authHeader);
  return follow.data.status;
};

export const postDetailLikeApi = async boardId => {
  const like = await axios.post(`/likes/${boardId}`, {}, authHeader);
  return like.data.status;
};
