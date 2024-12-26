import { Request, Response } from "express";
import postService from '../service/post.service';

const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { content, imageUrl } = req.body;
      const userId = (req as any).user.id; // JWT에서 추출한 사용자 ID
  
      const newPost = await postService.createPost(userId, content, imageUrl);
      res.status(201).json({ message: "게시물 작성 성공", post: newPost });
    } catch (error) {
      console.error("게시물 작성 오류:", error);
      res.status(500).json({ message: "게시물 작성 중 오류가 발생했습니다." });
    }
  };

export default {
  createPost,
};
