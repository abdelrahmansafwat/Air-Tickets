require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const airport = require("./routes/airport")
const path = require("path");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static("public"));

//Initializing routes
app.use('/api/airport', airport);     //Route for all airport related functions

//For testing the root when deployed to cloud
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


//Uncomment the line below this if testing on local machine
app.listen(process.env.PORT || 3000, () => console.log("Listening on: " + (process.env.PORT || 3000)));

//Uncomment the line below and comment the line above if deploying to cloud
//module.exports = app;
