const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const weather = require("./weather.js");
const forecast = weather.weatherData;
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views")); 
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("/weather", (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    weather.requestCoordinates(req.query.address, (error, latitude, longitude)=>{
            if (error) return res.send({error: error});
            forecast(latitude, longitude, (err, data)=>{
                if (err) res.send({error: err});
                res.send(data);
            })
    });    
})



app.get("", (req, res)=>{
    res.render("index", {title: "Weather"})
})

app.get("/about", function(req, res){
    res.render("about", {title: "About me"});
})

app.get("/help", function(req, res){
    res.render("about", {title: "Help"});
})

app.get("/help/*", function(req, res){
    res.render("404", {title: "Help article not found"});
})



app.get("/products", (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query);
    res.send({
        products: []
    });
})

app.get("*", function(req, res){
    res.render("404", {title: "Page not found"});
})


app.listen((process.env.PORT || 3000), ()=> console.log("Server has started..."));