var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const { response } = require('express');
app.use(cors());
app.use(bodyParser.json());
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://LGJ:1234@localhost:27017/madcamp';
//var url = 'mongodb+srv://admin:madcamp@week2.ivjze.mongodb.net/dojo?retryWrites=true&w=majority';

mongo.connect(url, (err)=>{
    console.log('connect mongodb madcamp database!')
})

app.get('/data', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        if (err) console.log(err);
        else{
            var collection = db.collection('user');
            collection.find({}).toArray((err, array)=>{
                res.send(array);
                console.log("get");
            })
        }
    })
})

app.post('/data', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        if (err) console.log(err);
        else {
            var collection = db.collection('user');
            var insertJson = {
                name: req.body.name,
                password: req.body.password
            }
            collection.insert(insertJson, (x, us)=>{
                res.send(us);
                console.log("post");
            })
        }
    })
})

app.listen(80, ()=>{
    console.log('Server start @port 80!');
})