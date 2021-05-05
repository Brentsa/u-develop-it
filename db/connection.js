const mysql = require('mysql2');

//Connect to our database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username - default 'root'
        user: 'root',
        //MySQL password
        password: 'Pluto1486!',
        database: 'election'
    });

module.exports = db;