const express = require('express');
const bodyParser = require('body-parser');
//console.log(process.env);
const PORT = 3000 ;
const {mongoose} = require('../db/mongoose');
const {Todo} = require('../db/models/Todo');
const {User} = require('../db/models/User');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req, res)=>{
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        console.log(doc);
        res.send(doc);
    }).catch((e)=>{
        console.log(e);
        res.status(404).send(e);
    })
});

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
});


