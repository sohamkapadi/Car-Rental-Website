const mongoose=require("mongoose");
const carSchema=new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },

    price: {
        type: Number,
        required: true,
    },

    reg_ID: {
        type: Number,
        required: true,
    },
    
});

const Car=mongoose.model("Car",carSchema);
module.exports=Car;