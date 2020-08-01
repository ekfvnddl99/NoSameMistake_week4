var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://LGJ:1234@localhost:27017/dojo';
//var url = 'mongodb+srv://admin:madcamp@week2.ivjze.mongodb.net/dojo?retryWrites=true&w=majority';

mongo.connect(url, (err)=>{
    console.log('connect mongodb database!')
})

app.get('/data', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection = db.collection('ninja');
        collection.find({}).toArray((x, hasil)=>{
            res.send(hasil);
        })
    })
})

app.post('/data', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection = db.collection('ninja');
        var sesuatu = {
            name: req.body.name,
            age: req.body.age
        }
        collection.insert(sesuatu, (x, hasil)=>{
            res.send(hasil);
        })
    })
})

app.listen(80, ()=>{
    console.log('Server start @port 80!');
})