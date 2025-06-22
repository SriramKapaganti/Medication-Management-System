const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err)=>{
    if(err){
        console.error('Could not able connect database')
    }
    else{
        console.log('Connected to SQLite Database');
    }
});
//create CareTakers Table 
db.run(`
    CREATE TABLE IF NOT EXISTS caretaker (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN('caretaker')) 
    )
    `);
// create users table

db.run(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL ,
        caretaker_id INTEGER NOT NULL,
        FOREIGN KEY (caretaker_id) REFERENCES caretaker(id)
    )
    `);

// create medicine table

db.run(`
  CREATE TABLE IF NOT EXISTS medications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);


// create medication logs table

db.run(
    `CREATE TABLE IF NOT EXISTS medication_logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medication_id INTEGER,
    date TEXT NOT NULL,
    taken BOOLEAN NOT NULL,
    FOREIGN KEY (medication_id) REFERENCES medications(id)
    )`
);

module.exports = db
