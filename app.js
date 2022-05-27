const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
// to do list items 
let items = [];
let workItems = [];

app.get("/", function (req, res) {
    var options = { 
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }; 
    var day = new Date().toLocaleDateString("en-US", options);

    res.render("list", {
        listTitle: day,
        listItems: items
    });
});

app.get("/work", function(req, res) {
    res.render("list", {
        listTitle: "Work List",
        listItems: workItems
    });
});

app.post("/", function(req, res) {
    console.log(req.body);
    if(req.body.list === "Work"){
        workItems.push(req.body.newItem);
        res.redirect("/work");
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }
});

app.listen(8000, function (param) {
    console.log("Server running on port 8000");
});