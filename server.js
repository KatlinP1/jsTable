const express = require('express');
var cors = require('cors');
var mongodb = require('mongodb');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const client = new mongodb.MongoClient('mongodb://localhost:27017');
var dbConn = null;

// Use connect method to connect to the Server
client.connect(function(err) {
    if (err) throw err;
    console.log("Connected successfully to server");
    dbConn = client.db("testdb");
    //client.close();
  });

const app = express();
app.use(cors());

app.set('view engine', ejs);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//insert page
app.use("/insert",  (req, res) => {
    res.render('insert.ejs')
});

// post-feedback
app.post("/inserts",  (req, res) => {
    delete req.body._id; // for safety reasons
    dbConn.collection('feedbacks').insertOne(req.body);    
    res.redirect("/");
});

// view-feedback
app.get("/get",  (req, res) => {
    dbConn.collection('feedbacks').find().toArray(function(err, docs){
        var result = [];
        docs.forEach(el => {
            result.push([el.name, el.position, el.office, el.age, el.date, el.salary]);
        });

        res.send(result);
    });
});

//homepage
app.use("/",  (req, res) => {
    res.render('index.ejs')
});

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
}); 
