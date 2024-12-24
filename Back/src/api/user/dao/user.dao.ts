import { db, schema } from '../../../config/dbConfig';
import { QueryResult } from 'pg';

interface IUser {
  id: string;
  password: string;
  email: string;
  username: string;
  phone_number: string;
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

export default {
    createUser,
};
