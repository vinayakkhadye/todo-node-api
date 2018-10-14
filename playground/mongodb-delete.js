const {MongoClient, ObjectID} = require('mongodb');

dbName = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true}, (err, client)=>{
    if(err) {
        return console.log('unable to connect',err);
    }

    const TodoAppDB = client.db(dbName);
    const todoCollection  = TodoAppDB.collection('Todos');
    const userCollection  = TodoAppDB.collection('Users');
    
    // userCollection.deleteMany({
    //     name: 'vinayak khadye'
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    
    userCollection.deleteOne({
        name:'vinayak khadye'
    }).then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    });

    userCollection.findOneAndDelete({
        _id: new ObjectID("5bc36f921bb2f964a43e1a11")
    }).then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    });

});