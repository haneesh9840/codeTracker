var express = require('express')
var app = express()
const ejs = require('ejs')
const mongoose = require("mongoose")
const bodyparser = require('body-parser')
var lc = require("./leetcode.js");
var gfg = require("./gfg.js");
app.use(express.static("public"))

app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({ extended: true }))
mongoose.connect("mongodb://localhost:27017/codeTrackerDB")
var userdetails = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    gfgprofilename: String,
    lcprofilename: String,
    mtarget: Number,
    dtarget: Number
})

var Userdetails = mongoose.model('Userdetails', userdetails)
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/", (req, res) => {
    res.render("main")
})
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
        //db.collection.find({_id: "myId"}, {_id: 1}).limit(1)
    Userdetails.findOne({ "username": username, "password": { $exists: true } }, (err, founduser) => {
            if (err)
                console.log("sorry no user found")
            else {
                //console.log(founduser)
                if (founduser !== null && founduser.password === password) {
                    res.render('main')
                } else {
                    console.log('error')
                        //console.log(founduser.password + password)
                }

            }
        }

    )



})
app.post('/register', (req, res) => {
    const newuser = new Userdetails({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gfgprofilename: req.body.gfg,
        lcprofilename: req.body.lc,
        mtarget: req.body.mtarget,
        dtarget: req.body.dtarget

    })
    newuser.save((err) => {
        if (err)
            console.log(err)
        else
            res.render("success")
    })
})
console.log(lc.letscall("dabbiruhaneesh"))
console.log(lc.letscall("dabbiruhaneesh").ans)
console.log(gfg.scrapeData("dabbiruhaneesh"))
app.listen(3000, (req, res) => console.log("runnning on port 3000"));