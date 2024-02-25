import { readdir } from 'node:fs/promises'
import { closeDbConnection, runSql } from './lib/mysql'
import { cOk, cWarn, cError } from './lib/console'

//Getting all executed migrations
const [rows] = await runSql(() => `
    SELECT *
    FROM migrations
    ORDER BY id DESC
    LIMIT 1
`)

const executedMigrations = rows.map(item => item.migration)

if (executedMigrations.length > 0) {
  const file = executedMigrations[0]
  const { down } = await import(`./migrations/${file}`)
  try {
    if (typeof down() !== 'undefined' &&
      down()?.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, ' ').length > 0) {
      await runSql(down)
      await runSql(() => `
          DELETE
          FROM migrations
          WHERE migration = '${file}'
      `)

      cOk(`${file} migrate rollback!`)
    } else {
      cWarn(`${file} rollback migrate has empty sql!`)
      const prompt = 'Continue? [y,N]'
      process.stdout.write(prompt)
      for await (const line of console) {
        if (line === 'y') {
          await runSql(() => `
              DELETE
              FROM migrations
              WHERE migration = '${file}'
          `)
          cOk(`${file} migrate rollback!`)
        }
        break
      }
    }
  } catch
    (e) {
    cError(`${file} migrate rollback is crashed!`)
    console.table(e)
  }
} else {
  cWarn(`No one files to rollback!`)
}

//Closing mysql db connection for exit from this script
closeDbConnection()