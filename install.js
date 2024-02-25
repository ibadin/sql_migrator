import { cError, cOk, cWarn } from './lib/console'
import { closeDbConnection, runSql } from './lib/mysql'

try {
  const sql = () => `
      CREATE TABLE migrations
      (
          id int(11) NOT NULL AUTO_INCREMENT,
          migration varchar(255) NOT NULL,
          PRIMARY KEY (id)
      );
  `
  await runSql(sql)
  cOk('Migration db was created!')
} catch (e) {
  console.log(e)
  cError('Migration error', e)
}
closeDbConnection()
