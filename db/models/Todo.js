const mongoose = require('mongoose');
const Todo = mongoose.model('Todo', {
    text:{
        type:String,
        required:[true,'text is required for todos'],
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
});

module.exports={Todo};
