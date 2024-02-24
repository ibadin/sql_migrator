import { Database } from "bun:sqlite"
import { cOk, cWarn } from './lib/console'

const dbFile = Bun.file("./index.sqlite")
if (dbFile.size === 0) {
   const db = Database.open('./index.sqlite')

   const query = db.query(`
      CREATE TABLE migrations
      (
         "id"        integer primary key,
         "migration" varchar(255)
      );
   `)

   query.run()

   db.close()
   cOk('Migration db was created!')
} else {
   cWarn('Migration db was already create!')
}
