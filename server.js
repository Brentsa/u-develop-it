const express = require('express');

//Set up the appropriate port for the server and instantiate a server object
const PORT = process.env.PORT || 3001;
const app = express();

//Express middlware
app.use(express.urlencoded({extended: false}));
app.use(express.json());




//Catch all route that must be used last to return an error
app.use((req, res)=>{
    res.status(404).end();
})

//Listen function to start the express sever
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});