var express = require('express');
var app = express();
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var mongodb = require('mongodb').MongoClient;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var db = '';

mongodb.connect('mongodb://localhost:27017/', function (err, client) {
    if (!err) {
        console.log('connect established!!');
        db = client.db('zhaoyi');

        var server = app.listen(3000, function () {
            console.log('Server is running @ localhost:3000');
        });

        var io = socketio.listen(server);
        io.sockets.on('connection', function (socket) {
            socket.emit('data_to_client', 'Hello from server. ');
            socket.on('data_to_server', function (data) {
                socket.emit('data_to_client', 'Hello. ' + data);
                io.sockets.emit('data_to_client', 'All: ' + data);
            });
        });
    } else {
        console.log(err);
    }
});

app.post('/dev/postdata', function (req, res) {
    console.log(req.body, req.body.username);
    res.send("hello, " + req.body.username);
});

app.get('/dev/socket', function (req, res) {
    res.sendFile(__dirname + '/socket.html');
});

app.get('/api/mongodb', function (req, res) {
    var username = req.param("username");
    var str = db.collection('heheda').find({ username: username }).toArray()
        .then(data => {
            if (data.length > 0) {
                res.send(data[0]);
            } else {
                res.sendStatus(400);
            }
        })
        .catch(err => {
            res.sendStatus(500);
        });
});


var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost:27017/zhaoyi');
var db = mongoose.connection;

db.on('open', () => console.log('connect open'));


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var user_schema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: String,
        required: function () {
            return this.password && this.password.length >= 3;
        },
    },
    first_name: {
        type: String,
        required: [true, 'First name is required'],
    },
    last_name: String,
    credit: Number,
})

var user_model = mongoose.model('user', user_schema, 'heheda');

app.post('/users', function (req, res) {
    var doc = user_model(req.body);
    doc.validate()
        .then(d => {
            return doc.save();
        })
        .then(d => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});


