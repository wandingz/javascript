var express = require('express');
var app = express();
var cors = require('cors');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost:27017/angular2');
var db = mongoose.connection;

var User = mongoose.model('user', mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    credit: {
        type: Number,
        required: false,
    },
}), 'user');

app.get('/user/:username', function (req, res) {
    User.findOne({ username: req.params.username })
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.post('/credit_add_one', function (req, res) {
    console.log('credit_add_one: ', req.body);
    User.find({ username: req.body.username })
        .then(doc => {
            doc[0].credit += 1;
            let sum = 0;
            for (let i = 0; i < 100000000; i++) {
                sum += i * i + i;
            }
            doc[0].save().then(d => {
                console.log(sum);
                res.send(d);
            })
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


app.listen(4000, function () {
    console.log('Server is running @ localhost:4000');
});

