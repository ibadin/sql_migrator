import { createConnection } from 'mysql2/promise'

const dbConnection = await createConnection({
  host: Bun.env.DB_HOST,
  user: Bun.env.DB_USER,
  password: Bun.env.DB_PASSWORD,
  database: Bun.env.DB_DATABASE,
  port: Bun.env.DB_PORT,
})

// const [rows] = await connection.execute("SELECT 1+2 AS count");

const runSql = async (sql) => {
  const [rows] = await dbConnection.execute(sql())
  // console.log(rows)
}

const closeDbConnection = () => dbConnection.close()

export {
  runSql,
  dbConnection,
  closeDbConnection,
}