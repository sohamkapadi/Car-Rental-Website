const express = require("express");
const app = express();
const router = require("./Routing/router.js");

let port = 8080;
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");

main().then(() => {
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://kapadisoham96:ePnVDLVYZIlBbCiy@cluster0.7rggprp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});