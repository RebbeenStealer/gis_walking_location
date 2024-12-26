import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userDao from '../dao/user.dao';

const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key"; // 기본값 설정 (개발용)

const createUser = async (userData: any) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const newUser = await userDao.createUser({
      ...userData,
      password: hashedPassword,
      phone_number: userData.phonenumber
    });

    console.log(newUser)

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error) {
    console.error("사용자 정보 처리 중 오류:", error);
    throw new Error("사용자 정보 처리 중 오류 발생");
  }
};

const loginUser = async (userId: string, password: string) => {
  try {
    const user = await userDao.getUserById(userId);
    
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('비밀번호가 올바르지 않습니다.');
    }

    const token = jwt.sign({ id: user.user_id }, SECRET_KEY, { expiresIn: '1h' });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  } catch (error) {
    console.error("로그인 처리 중 오류:", error);
    throw new Error("로그인 처리 중 오류 발생");
  }
};

const createPost = async (userId: number, content: string, imageUrl: string) => {
  try {
    const newPost = await userDao.createPost(userId, content, imageUrl);
    return newPost;
  } catch (error) {
    console.error("게시물 생성 중 오류:", error);
    throw new Error("게시물 생성 중 오류 발생");
  }
};

export default {
  createUser,
  loginUser,
  createPost,
};
