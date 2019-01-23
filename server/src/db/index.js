import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

dbConfig.test = {};

dbConfig.database = {};

const dbPool = (process.env.NODE_ENV === 'production') ? new Pool(dbConfig.database) : new Pool(dbConfig.test);

export default dbPool;
