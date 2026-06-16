const express = require('express');
const app = express();

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(session({
    secret: "passwvarun",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.get("/", (req, res)=>{
    if (req.session.username) {
        res.send(`<h1>username from session is : ${req.session.username} </h1>`);
    } else {
        res.send('<h1>Opps!! Expire Session</h1>');
    }
})

app.get("/set-username", (req, res) => {
    req.session.username = "Varun developer Session";

    req.session.save(() => {
        res.send("<h1>username has been set in session</h1>");
    });
});

app.get("/get-username", (req, res) => {

    if(req.session.username){
        res.send(`<h1>username from session is : ${req.session.username} </h1>`);
    }else{
        res.send('<h1>No username found in  session</h1>');
    }
});

app.get("/delete", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('failed to destroy session');
        }
        res.send('<h1>Session destroy successfully</h1>');
    });
});

app.listen(3000, ()=>{
    console.log('server running on port 3000')
})