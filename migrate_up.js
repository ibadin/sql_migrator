import { readdir } from 'node:fs/promises'
import { Database } from 'bun:sqlite'
import { closeDbConnection, runSql } from './lib/mysql'
import { cOk, cWarn, cError, cAdvice, cInfo } from './lib/console'

//Getting all migration files
const allFiles = await readdir('./migrations')

//Getting all executed migrations
const db = Database.open('./index.sqlite')
const query = db.query(`SELECT *
                        FROM migrations`)
const executedMigrations = query.all().map(item => item.migration)

//Filtering files for migration
const filesForMigrations = allFiles.sort().
  filter(file => !executedMigrations.includes(file))

//Running  and saving migrations
if (filesForMigrations.length > 0) {
  for (const file of filesForMigrations) {
    const { up } = await import(`./migrations/${file}`)

    try {
      await runSql(up)
      const insert = db.query(`
        INSERT INTO migrations (migration)
        VALUES ('${file}')
    `)

      insert.run()
      cOk(`${file} migrate executed!`)
    } catch (e) {
      cError(`${file} migrate crashed!`, e)
    }
  }
} else {
  cWarn('No one files to migrate.')
  cAdvice('You may run command:', 'bun run migrate_create.js')
}

//Closing mysql db connection for exit from this script
closeDbConnection()





