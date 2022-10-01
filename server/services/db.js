const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "xyogxHos,k", // << Change this password (✿◠‿◠) 
    database: 'Cloud_Project_DB'  // << Change this database name (っ＾▿＾)💨
});

conn.connect();

module.exports = conn;