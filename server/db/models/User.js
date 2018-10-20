const mongoose = require('mongoose');
const User = mongoose.model('User',{
    email:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
            message: props => `${props.value} is not a valid email!`
        }
        
    }
});

module.exports = {User};
