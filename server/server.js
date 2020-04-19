const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const PORT = process.env.PORT || 3000 ;
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./db/models/Todo');
const {User} = require('./db/models/User');

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
        res.status(400).send(e);
    })
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send(todos);
    }).catch(err => res.status(400).send(err));
})

app.get('/todos/:id',(req,res)=>{
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
       return res.status(404).send({error:'id is not valid'});
    }
    Todo.findById(id).then((doc)=>{
            if(doc) {
                return res.status(200).send(doc);
        }
        else {
            return res.status(404).send({error : 'id not found in db'});
        }
    }
    ).catch((err)=>{
        return res.status(404).send(err);
    });
});

app.delete('/todos/:id',(req, res)=> {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({error:'id is not valid'});
    }

    Todo.findByIdAndRemove(id).then((doc)=>{
        return res.status(200).send(doc);
    }).catch(()=>{
        return res.status(404).send({error : 'id not found in db'});
    })
});

app.patch('/todos/:id',(req, res)=> {
    const id = req.params.id;
    console.log(req.params);
    const body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send({error:'id is not valid'});
    }

    Todo.findByIdAndRemove(id).then((doc)=>{
        return res.status(200).send(doc);
    }).catch(()=>{
        return res.status(404).send({error : 'id not found in db'});
    })
});

app.listen(PORT,()=>{
    console.log(`todo server is started on port ${PORT}`);
});

module.exports={app};

process.on("uncaughtException",(err)=>{
    console.log(err);
});
