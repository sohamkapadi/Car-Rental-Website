const mongoose=require("mongoose");
const Car=require("./cars.js");
main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://kapadisoham96:ePnVDLVYZIlBbCiy@cluster0.7rggprp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

let cars= [
    {
        name: "Lamborgini",
        price: 50000,
        reg_ID: 1234,
    },
    {
        name: "Mercedes",
        price: 30000,
        reg_ID: 5678,
    },
    {
        name: "BMW",
        price: 25000,
        reg_ID: 3214,
    },
    {
        name: "Ferrari",
        price: 35000,
        reg_ID: 8765,
    },
    {
        name: "Thar",
        price: 10000,
        reg_ID: 9669,
    },
    {
        name: "MustangFerrari",
        price: 15000,
        reg_ID: 6589,
    },
];

Car.insertMany(cars).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});