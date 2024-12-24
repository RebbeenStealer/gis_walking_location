import { Request, Response } from "express";
import userService from '../service/user.service';

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      
      console.log("받은 사용자 데이터:", userData);

      const newUser = await userService.createUser(userData);
      res.status(201).json({ message: "회원가입 성공", user: newUser });
    } catch (error) {
      console.error("회원가입 오류:", error);
      res.status(500).json({ message: "회원가입 처리 중 오류가 발생했습니다." });
    }
  };

  const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, password } = req.body; // 클라이언트로부터 ID와 비밀번호 받기
        console.log('로그인 요청 데이터:', { id });

        const user = await userService.loginUser(id, password);
        
        res.status(200).json({ message: '로그인 성공', user });
    } catch (error) {
        console.error('로그인 오류:', error);
        res.status(401).json({ message: error }); // 401 Unauthorized
    }
};

export default {
  signup,
  login,
};
