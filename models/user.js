const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },

    username: {
        type:String,
        required:true,
        maxLength:15,
        unique:true,
    },

    email_ID: {
        type: String,
        required: true,
    },

    password: {
        type:String,
        required: true,
        minLength: 8,
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    
});

const User=mongoose.model("User",userSchema);
module.exports=User;