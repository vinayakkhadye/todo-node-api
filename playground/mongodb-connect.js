const {MongoClient, ObjectID } = require('mongodb');
const dbName = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true}, (err, client)=>{
    if(err) {
        console.log("unable to connect to serve: ",err);
        return;
    }
    const todoAppDB = client.db(dbName);

    const todosCollection   = todoAppDB.collection('Todos');
    const usersCollection   = todoAppDB.collection('Users');
    
    todosCollection.insertOne({text:'walk the dog',completed:false},(err, result)=>{
        if(err){
            console.log("unable to insert todos: ",err);
            return;
        }
        console.log(result.ops[0]._id.getTimestamp());
        // console.log('data', JSON.stringify(result.ops[0]._id.getTimestamp() , undefined, 2) );
    });
    usersCollection.insertOne({
        name: 'vinayak khadye',
        age: 30,
        location: 'dombivli'
    },(err, result)=>{
        if(err) {
            console.log("unable to insert user: ",err);
            return;
        }
        console.log(result.ops[0]._id.getTimestamp());
        // console.log('data', JSON.stringify(result.ops, undefined, 2) );
    })

    client.close();
});