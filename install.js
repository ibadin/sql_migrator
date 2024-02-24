import { Database } from "bun:sqlite";

const db = Database.open("./index.sqlite");

const query = db.query(`
    CREATE TABLE migrations("id" integer primary key, "migration" varchar(255));
`);
query.run();

db.close();