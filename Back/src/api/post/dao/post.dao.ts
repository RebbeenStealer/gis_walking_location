import { db, schema } from '../../../config/dbConfig';
import { QueryResult } from 'pg';

// interface IUser {
//   id: string;
//   password: string;
//   email: string;
//   username: string;
//   phone_number: string;
// }

interface IPost {
    post_id: number;
    user_id: number;
    content: string;
    image_url: string;
    likes_count: number;
    created_at: Date;
    updated_at: Date;
  }


  
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
    createPost,
};
