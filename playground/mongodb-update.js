const {MongoClient, ObjectID} =  require('mongodb');

const dbName = 'TodoApp';
MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser:true}, (err, client) => {
    if(err) {
        return console.log("Unable to Connect server. ",err);
    }
    const TodoAppDB = client.db(dbName);

    const todoCollection = TodoAppDB.collection('Todos');
    const userCollection = TodoAppDB.collection('Users');

    userCollection.findOneAndUpdate(
        {_id: new ObjectID("5bc393ae0526547c4c7e738f")},
        {
            $set:{name:'shlaka khadye'},
            $inc:{age:3}
        },
        {
            returnOriginal: false
        }
    ).then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    });

    client.close();
})
