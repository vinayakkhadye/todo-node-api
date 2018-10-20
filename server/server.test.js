const {ObjectID}= require('mongodb'); 
const {app}     = require('./server'); 
const {Todo}    = require('./db/models/Todo'); 
const expect = require('expect');
const request = require('supertest');

var todos = [{
    _id:new ObjectID(),
    text:'this my test todo'
},{
    _id:new ObjectID(),
    text:'second todo'
}];

beforeEach( (done) => {
    Todo.deleteMany()
    .then(()=>{
        return Todo.insertMany(todos);
    })
    .then((docs)=>{
        done();
    })
    .catch(()=> {
        done(err);
    });
});

describe('/todos',()=>{
    // it('should add a new todo',(done)=>{
    //     let text = 'this my test todo';
    //     request(app)
    //     .post('/todos')
    //     .send({text})
    //     .expect(200)
    //     .expect((response)=>{
    //         expect(response.body.text).toBe(text);
    //     }).end((err, result)=>{
    //         if(err){
    //             done(err);
    //         }
    //         Todo.find().then((documents)=>{
    //             expect(documents.length).toBe(3);
    //             expect(documents[0]['text']).toBe(text);
    //             done();
    //         }).catch((err)=>done(err));
    //     })
    // })

    // it('should not add a new note',(done) => {
    //     request(app)
    //     .post('/todos')
    //     .send({})
    //     .expect(400)
    //     .end((err, result) => {
    //         if(err) {
    //             return done(err);
    //         }
    //         Todo.countDocuments().then((count)=>{
    //             expect(count).toBe(2);
    //             done();
    //         }).catch(()=>done(err));
    //     })        
    // })

    // it('should get all todos',(done)=>{
    //     request(app)
    //     .get('/todos')
    //     .send({})
    //     .expect(200)
    //     .expect((res)=>{
    //         expect(res.body.length).toBe(2);
    //     })
    //     .end(done);
    // })

    it('should return a test todo with id',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            console.log(res.body._id);
            expect(res.body._id).toBe(todos[0]._id.toHexString());
        })
        .end(done);
    })

    it('should return 404 if todo not found',(done)=>{
        var id = new ObjectID();
        request(app)
        .get(`/todos/${id.toHexString()}`)
        .expect(404)
        .end(done);
    })

    it('should return 404 if invalid id',(done)=>{
        var id = '1233';
        request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    })

})