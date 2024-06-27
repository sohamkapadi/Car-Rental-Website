const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Car = require("../models/cars.js");
const mongoose = require("mongoose");
const axios = require('axios');
const { jsPDF } = require('jspdf');
const fs = require("fs").promises;
const bcrypt=require("bcrypt");
const saltRounds=10;

let location;
let car;
let user;
router.get("/", (req,res)=>{
    res.render("file.ejs");
});

router.get("/signup", (req,res)=>{
    res.render("Sign_up.ejs");
});

router.get("/signin",(req,res)=>{
    res.render("Sign_in.ejs");
});

router.get("/signout", (req,res)=>{
    user=null;
    res.redirect("/");
});

router.get("/home",(req,res)=>{
    res.render("home.ejs");
});

router.post("/signup",async (req,res)=>{
    let {name,username,email_ID,password,age}=req.body;
    const existingUser = await User.findOne({ email_ID: email_ID });
    if (existingUser) {
        res.send("Email already exists. Try logging in.");
    }
    else{
        bcrypt.hash(password,saltRounds,async (err,hash)=>{
            if(err){
                console.log("Error hashing password: ",err);
            }
            else{
                console.log("Hashed Password: ",hash);
                password=hash;
                let newUser=new User({
                    name:name,
                    username:username,
                    email_ID:email_ID,
                    password:password,
                    age:age,
                });
                newUser.save().then((res)=>{
                    console.log("user was saved");
                }).catch((err)=>{
                    console.log(err);
                });
                res.redirect("/signin");
            }
        });
    }
});

router.post("/signin",async (req,res)=>{
    let {username,password}=req.body;
    try{
        console.log(username)
         user= await User.findOne({username: username});
         console.log(user);
        if(user){
            const storedHashedPassword=user.password;
            bcrypt.compare(password,storedHashedPassword, (err,result)=>{
                if(err){
                    console.error("Error comparing passwords: ",err);
                    res.status(500).send("Internal server error");
                }
                else{
                    if(result){
                        res.redirect("/home");
                    }
                    else{
                        res.status(401).send("Invalid Password");
                    }
                }
            });
        }
        else{
            res.send("User not found");
        }
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal server error" );
    }
});

router.get("/services",async (req,res)=>{
    let cars=await Car.find();
    res.render("services.ejs", {cars});
});

router.post("/services", async (req,res)=>{
    let {reg_ID}=req.body;
    let cars=await Car.findOne({reg_ID:reg_ID});
    car=cars;
    res.render("ride.ejs", {cars,location});
});

router.get("/location", async (req,res)=>{
    res.render("location.ejs");
});

router.post("/location", async (req, res) => {
    const { latitude, longitude } = req.body;
    let cars=car;
    // Make a request to Google Maps Geocoding API to get the location from latitude and longitude
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAnFqeZfLV5PlAvZ48Ssr5BWYZD0nxTnWE`);
        
        // Check if the response is successful
        if (response.data && response.data.results.length > 0) {
            // Extract the formatted address from the response
            const formattedAddress = response.data.results[0].formatted_address;
            
            // Send the formatted address as the response
            location=formattedAddress;
            console.log(location);
            console.log(cars);
            res.render("ride.ejs", {cars,location});
        } else {
            res.status(404).json({ error: 'Location not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.post("/submit",(req,res)=>{
    let {carName,carRegistrationID,carPrice,selectedLocation,pickupDate,returnDate}=req.body;
    let start=pickupDate.slice(8);
    let end=returnDate.slice(8);
    let days=end-start+1;
    let totalPrice=days*carPrice;
    res.render("bill.ejs" ,{carName,carRegistrationID,carPrice,selectedLocation,pickupDate,returnDate,days,totalPrice,user});
});

router.post("/bill", (req, res) => {
    const { carName, carRegistrationID, carPrice, selectedLocation, pickupDate, returnDate, days, totalPrice } = req.body;

    const pdfDoc = new jsPDF();

    pdfDoc.setFontSize(12);

    pdfDoc.text(`Car Details:
    Name: ${carName}
    Registration ID: ${carRegistrationID}
    Price: $${carPrice} /day

    Location and Date:
    Location: ${selectedLocation}
    Pickup Date: ${pickupDate}
    Return Date: ${returnDate}

    User Details:
    Name: ${user.name}
    Email: ${user.email_ID}

    Total Amount:
    No. of Days: ${days}
    Total: $${totalPrice}`, 10, 10);

    const pdfFilePath = "bill.pdf";
    pdfDoc.save(pdfFilePath);

    res.download(pdfFilePath, (err) => {
        if (err) {
            console.error("Error downloading PDF:", err);
            res.status(500).send("Error generating bill PDF");
        }
            fs.unlink(pdfFilePath);
    });
});

router.get("/about",(req,res)=>{
    res.render("about.ejs");
});

module.exports = router;
