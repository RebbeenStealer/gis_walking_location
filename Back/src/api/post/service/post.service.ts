import postDao from '../dao/post.dao';

const createPost = async (userId: number, content: string, imageUrl: string) => {
  try {
    const newPost = await postDao.createPost(userId, content, imageUrl);
    return newPost;
  } catch (error) {
    console.error("게시물 생성 중 오류:", error);
    throw new Error("게시물 생성 중 오류 발생");
  }
};

export default {
  createPost,
};
