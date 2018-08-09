var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb').MongoClient;

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/zhaoyi');
var db = mongoose.connection;

db.on('open', () => console.log('connect open'));

var server = app.listen(3000, function () {
    console.log('Server is running @ localhost:3000');
});


var user_schema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: String,
        required: function () {
            console.log(this.password, this.password.length);
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

app.post('/api/users', function (req, res) {
    var doc = user_model(req.body);
    doc.validate()
        .then(d => {
            return doc.save();
        })
        .then(d => {
            console.log(d)
            res.set('Location', '/users/' + d._id);
            res.sendStatus(201);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

app.get('/api/users/:username', function (req, res) {
    var username = req.params.username;
    user_model.findOne({'username': username})
        .then(d => {
            res.send(d);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

