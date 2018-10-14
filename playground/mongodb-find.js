const {MongoClient, ObjectID} =  require('mongodb');

const dbName = 'TodoApp';
MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser:true}, (err, client) => {
    if(err) {
        return console.log("Unable to Connect server. ",err);
    }
    const TodoAppDB = client.db(dbName);

    const todoCollection = TodoAppDB.collection('Todos');
    const userCollection = TodoAppDB.collection('Users');
    // todoCollection.find().count().then((count)=>{
    //     console.log(`total count of items ${count}`);
    // }).catch((err)=>{
    //     console.log('unable to fetch cout',err);
    // })
    userCollection.find({
        name:'mahesh kadam'
    }).toArray().then((items)=>{
        items.forEach((item)=>{
            console.log(item);
        })
    }).catch((err)=>{
        console.log(err);
    })
    client.close();
})
