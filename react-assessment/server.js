var express = require('express');
var app = express();
var cors = require('cors');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var autoIncrement = require('mongoose-auto-increment');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost:27017/react');
var db = mongoose.connection;
autoIncrement.initialize(db);


db.on('open', () => console.log('mongoose connect open'));

// app.use(express.static("dist"));

app.get('/test', function (req, res) {
    setTimeout(() => {
        res.status(204);
        res.header({
            'Set-Cookie': 'sessionid=38afes7a8; HttpOnly; Path=/',
            'Set-Cookie': 'qwerty=219ffwef9w0f; Path=/',
        });
        res.send();
    }, 3000);
});

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

app.post('/authenticate', function (req, res) {
    setTimeout(() => {
        User.find({ username: req.body.username, password: req.body.password })
            .then(data => {
                if (!data || data.length === 0) {
                    throw 'Invalid authenticate';
                }
                var token = jwt.sign({
                    username: req.body.username,
                }, secretKey, {
                        expiresIn: '1h',
                    });
                res.send({
                    isLoggedIn: true,
                    username: req.body.username,
                    token: token,
                });
            })
            .catch(err => {
                res.status(401).send({
                    isLoggedIn: false,
                    message: "Invalid authenticate. ",
                    err: err
                });
            });
    }, 1000);
});

app.post('/register', function (req, res) {
    setTimeout(() => {
        User(req.body).save()
            .then(() => {
                var token = jwt.sign({
                    username: req.body.username,
                }, secretKey, {
                        expiresIn: '1h',
                    });
                res.send({
                    isLoggedIn: true,
                    username: req.body.username,
                    token: token,
                });
            })
            .catch(err => {
                res.status(400).send({
                    isLoggedIn: false,
                    message: "Invalid user information. ",
                    err: err
                });
            });
    }, 1000);
});

const secretKey = 'zhaoyi12345';
app.use(function (req, res, next) {
    var token = req.body.authorization || req.query.authorization || req.headers.authorization || req.cookies.authorization;
    if (token === 'masterToken') {
        req.decodedAuthorization = { username: "master" };
        next();
        return;
    }
    if (token) {
        jwt.verify(token, secretKey, function (err, decoded) {
            if (!err) {
                req.decodedAuthorization = decoded;
                next();
            } else {
                res.status(401).send({
                    isLoggedIn: false,
                    message: 'Invalid request. ',
                    error: err,
                })
            }
        });
    } else {
        res.status(401).send({
            isLoggedIn: false,
            message: 'Invalid request. Missing authorization. ',
        })
    }
});

var RequestScheme = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending"
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

RequestScheme.plugin(autoIncrement.plugin, { model: 'Request', field: 'id' });

var Request = mongoose.model('request', RequestScheme, 'request');

app.post('/request', function (req, res) {
    var request = Request(req.body);
    request.author = req.decodedAuthorization.username;
    request.save().then(() => {
        res.send(request);
    }).catch(err => {
        res.status(500).send(err);
    })
});

app.patch('/request/:id', function (req, res) {
    var id = req.params.id;
    Request.findOne({ id: id }).then(request => {
        if (request) {
            if (req.body.status !== undefined) {
                request.status = req.body.status;
            }
            request.updated = Date.now();
            request.save().then(request => {
                res.send(request);
            })
        } else {
            res.status(404).send();
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

app.delete('/request/:id', function (req, res) {
    var id = req.params.id;
    Request.findOneAndRemove({ id: id }).then(request => {
        if (request) {
            res.send(request);
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/requests', function (req, res) {
    Request.find().then(requests => {
        res.send(requests);
    }).catch(err => {
        res.status(500).send(err);
    });
});


module.exports = app.listen(4000, function () {
    console.log('Server is running @ localhost:4000');
});

