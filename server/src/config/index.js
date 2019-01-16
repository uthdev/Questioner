const { Pool } = require('pg')
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ 
  connectionString : process.env.DATABASE_URL,
})

export {
  query: (text, params, callback) => {
    const start = Date.now();
    console.log(start)
    return pool.query(text, params, callback);
    }
}
