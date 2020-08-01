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

mongo.connect(url, (err, client)=>{
    if (err)
        console.log('Unable to connect to the mongoDB server.Error',err);
    else{
        
        app.get('/data', (req, res)=>{
            if (err) console.log(err);
            else{
                var collection = db.collection('user');
                collection.find({}).toArray((err, array)=>{
                    res.send(array);
                    console.log("get");
                })
            }
        })


        // register button click
        app.post('/register', (request, response)=>{
            var id = request.body.id;
            var password = request.body.password;

            var collection = db.collection('user');

            var insertJson = {
                id: id,
                password: password
            }

            collection.find({id:id}).count(function(err, number){
                if (number != 0){
                    response.send("Id already exist");
                    console.log("Id already exist");
                }
                else{
                    collection.insert(insertJson, (err, res)=>{
                        response.send("yes");
                        console.log("Register success");
                    })
                }
            })
        })
        // login button click
        app.post('/login', (request, response) =>{
            console.log("login start");
            var id = request.body.id;
            var password = request.body.password;

            var db = client.db('madcamp')
            var collection = db.collection("user");

            collection.find({id:id}).count(function(err, number){
                if (number == 0){
                    response.send("id");
                    console.log("Wrong ID");
                }
                else{
                    collection.findOne({id:id}, function(err, user){
                        if (password == user.password){
                            response.send("yes");
                            console.log("Login Success");
                        }
                        else{
                            response.send("password");
                            console.log("Wrong password");
                        }
                    })
                }
            })
        })

        //Start Web Server
        app.listen(80,()=>{
            console.log('Connected to MongoDB Server, Webservice running on port 80');
        })
    }
})

