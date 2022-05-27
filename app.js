const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
// to do list items 
var items = [];

app.get("/", function (req, res) {
    var options = { 
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }; 
    var day = new Date().toLocaleDateString("en-US", options);
    
    res.render("list", {
        currentDay: day,
        listItems: items
    });
});

app.post("/", function(req, res) { 
    items.push(req.body.newItem);
    res.redirect("/");
});

app.listen(8000, function (param) {
    console.log("Server running on port 8000");
});