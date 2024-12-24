import pg from 'pg'

const dbConfig = {
    host: '34.64.248.193', 
    port: 5432,
    database: 'postgres',
    user: 'codelab',
    password : 'codelab1234',
};

export const db = new pg.Pool(dbConfig)

export const schema = 'kej'