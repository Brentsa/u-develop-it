const mysql = require('mysql2');

//NOTE =====================
//Create a .env file in the root directory and assign DB_HOST, DB_USER, and DB_PASS

//Connect to our database
const db = mysql.createConnection(
    {
        //MySQL host
        host: process.env.DB_HOST,
        //MySQL username - default 'root'
        user: process.env.DB_USER,
        //MySQL password
        password: process.env.DB_PASS,
        
        database: 'election'
    });

module.exports = db;