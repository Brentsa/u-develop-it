const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

//Set up the appropriate port for the server and instantiate a server object
const PORT = process.env.PORT || 3001;
const app = express();

//Express middlware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Use apiRoutes
app.use('/api', apiRoutes);

//Catch all route that must be used last to return a NOT FOUND error
app.use((req, res)=>{
    res.status(404).end();
})

//Start server after connection with db
db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');

    //Listen function to start the express sever
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    });
});

