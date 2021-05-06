const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//Return all the voters from the database
router.get('/voters', (req, res)=>{
    const sql = `SELECT * FROM voters ORDER BY last_name ASC`;

    db.query(sql, (err, rows)=>{
        if(err){
            res.status(500).json({error: err.message});
        }
        else{
            res.json({message: "Success!", data: rows});
        }
    });
});

//Return a single voter from the database based on id
router.get('/voter/:id', (req, res)=>{
    const sql = `SELECT * FROM voters WHERE id = ?`;
    const param = [req.params.id];

    db.query(sql, param, (err, row)=>{
        if(err){
            res.status(400).json({error: err.message});
        }
        else{
            res.json({message: 'Success', data: row});
        }
    });
});

//Add a new voter into the database
router.post('/voter', ({body}, res)=>{
    const errors = inputCheck(body, 'first_name', 'last_name', 'email');
    if(errors){
        return res.status(400).json({error: errors});
    }

    const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.email];

    db.query(sql, params, (err, result)=>{
        if(err){
            res.status(400).json({error: err.message});
        }
        else{
            res.json({message: "Voter added.", data: body});
        }
    });
});

//Update a voter's email
router.put('/voter/:id', (req, res)=>{
    const errors = inputCheck(req.body, 'email');
    if(errors){
        return res.status(400).json({error: errors});
    }

    const sql = `UPDATE voters SET email = ? WHERE id = ?`;
    const params = [req.body.email, req.params.id];

    db.query(sql, params, (err, result)=>{
        if(err){
            res.status(400).json({error: err.message});
        }
        else if(!result.affectedRows){
            res.json({message: "Voter not found."});
        }
        else{
            res.json({message: "Voter email updated.", data: req.body, change: result.affectedRows});
        }
    });
});

//Delete a voter from the database
router.delete('/voter/:id', (req, res)=>{
    const sql = `DELETE FROM voters WHERE id = ?`;
    
    db.query(sql, req.params.id, (err, result)=>{
        if(err){
            res.status(400).json({error: err.message});
        }
        else if(!result.affectedRows){
            res.json({message: 'Voter not found.'})
        }
        else{
            res.json({message: "Voter deleted.", change: result.affectedRows, id: req.params.id});
        }
    });
});

module.exports = router;