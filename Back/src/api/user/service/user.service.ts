import bcrypt from 'bcrypt';
import userDao from '../dao/user.dao';

const createUser = async (userData: any) => {
  try {
    // 비밀번호 암호화
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // 암호화된 정보 콘솔에 출력
    console.log("암호화된 사용자 정보:");
    console.log("해시된 비밀번호:", hashedPassword);

    // DAO를 통해 데이터베이스에 저장
    const newUser = await userDao.createUser({
      ...userData,
      password: hashedPassword
    });

    // 비밀번호 필드 제거 후 반환
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error) {
    console.error("사용자 정보 처리 중 오류:", error);
    throw new Error("사용자 정보 처리 중 오류 발생");
  }
};

export default {
  createUser
};
