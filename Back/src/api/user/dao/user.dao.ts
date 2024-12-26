import { db, schema } from '../../../config/dbConfig';
import { QueryResult } from 'pg';

interface IUser {
  id: string;
  password: string;
  email: string;
  username: string;
  phone_number: string;
}

interface IPost {
    post_id: number;
    user_id: number;
    content: string;
    image_url: string;
    likes_count: number;
    created_at: Date;
    updated_at: Date;
  }

const createUser = async (userData: IUser): Promise<IUser> => {
    const query = `
        INSERT INTO ${schema}."user" (id, password, username, phone_number)
        VALUES ($1, $2, $3, $4)
        RETURNING user_id, id, username, phone_number, created_at
    `;
    try {
        const values = [userData.id, userData.password, userData.username, userData.phone_number];
        const result: QueryResult = await db.query(query, values);
        return result.rows[0] as IUser;
    } catch (error) {
        console.error('Error Dao createUser: ', error);
        const errorMessage = (error as Error).message;
        throw new Error(errorMessage);
    }
};

const getUserById = async (userId: string) => {
    const query = `
        SELECT user_id, id, password, username, phone_number, created_at 
        FROM team2."user" 
        WHERE id = $1;
    `;
    try {
        const result: QueryResult = await db.query(query, [userId]);
        return result.rows[0]; // 사용자 정보 반환
    } catch (error) {
        console.error('Error in getUserById:', error);
        throw new Error('데이터베이스 조회 오류');
    }
};
  
  const createPost = async (userId: number, content: string, imageUrl: string): Promise<IPost> => {
      const query = `
          INSERT INTO ${schema}."post" (user_id, content, image_url)
          VALUES ($1, $2, $3)
          RETURNING post_id, user_id, content, image_url, likes_count, created_at, updated_at
      `;
      try {
          const values = [userId, content, imageUrl];
          const result: QueryResult = await db.query(query, values);
          return result.rows[0] as IPost;
      } catch (error) {
          console.error('Error Dao createPost: ', error);
          const errorMessage = (error as Error).message;
          throw new Error(errorMessage);
      }
  };

export default {
    createUser,
    getUserById,
    createPost
};
