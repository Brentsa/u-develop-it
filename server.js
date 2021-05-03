const express = require('express');
const mysql = require('mysql2');

//Set up the appropriate port for the server and instantiate a server object
const PORT = process.env.PORT || 3001;
const app = express();

//Express middlware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Connect to our database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username - default 'root'
        user: 'root',
        //MySQL password
        password: 'Pluto1486!',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

//db query method that returns rows matching the query or an error
db.query('SELECT * FROM candidates', (err, rows)=>{
    // console.log(rows);
});

//db query to select a single candidate
db.query('SELECT * FROM candidates WHERE id=1', (err, row)=>{
    // if(err){console.log(err);}
    // console.log(row)
});

//db query to delete a candidate
db.query('DELETE FROM candidates WHERE id = ?', 1, (err, result)=>{
    // if(err){console.log(err)};
    // console.log(result);
});

//Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result)=>{
    //if(err){console.log(err);}
    //console.log(result);
});

//Catch all route that must be used last to return a NOT FOUND error
app.use((req, res)=>{
    res.status(404).end();
})

//Listen function to start the express sever
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});