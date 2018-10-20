const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/db/models/User');

const id = '5bc7f0fabf5f5827f8d771ec';
 if(ObjectID.isValid(id)) {
     console.log('object is valid');
 }else{
    console.log('object is not valid');
 }

User.findOne({_id:id})
.then((doc)=>{
    console.log(doc);
})
.catch((err)=>{
    if(err){
        return console.log(err.message);    
    }
    console.log(doc);
})
