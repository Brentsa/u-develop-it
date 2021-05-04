const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

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

//Return all candidates JSON
app.get('/api/candidates', (req, res)=>{
    const sql = 'SELECT * FROM candidates';

    //db query method that returns rows matching the query or an error
    db.query(sql, (err, rows)=>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }

        res.json({ message: "Success!", data: rows });
    });
});

//Return a single candidate JSON
app.get('/api/candidates/:id', (req, res)=>{
    const sql = 'SELECT * FROM candidates WHERE id = ?';
    const params = [req.params.id];

    //db query to select a single candidate
    db.query(sql, params, (err, row)=>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }

        res.json({ message: "Success!", data: row });
    });
});

//Delete a single candidate from the database
app.delete('/api/candidates/:id', (req, res)=>{
    const sql = 'DELETE FROM candidates WHERE id = ?';
    const params = [req.params.id];

    //db query used to delete candidate if they are found
    db.query(sql, params, (err, result)=>{
        if(err){
            res.status(400).json({error: err.message});
        }
        else if(!result.affectedRows){
            res.json({message: "Candidate was not found."});
        }
        else{
            res.json({message: "Candidate deleted.", changes: result.affectedRows, id: req.params.id});
        }
    });
});

//Create a candidate
app.post('/api/candidate', ({body}, res)=>{
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }

    const sql = 'INSERT INTO candidates (first_name, last_name, industry_connected) VALUE (?,?,?)';
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result)=>{
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }
        
        res.json({message: 'Candidate added', data: body});
    });
});

//Catch all route that must be used last to return a NOT FOUND error
app.use((req, res)=>{
    res.status(404).end();
})

//Listen function to start the express sever
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});