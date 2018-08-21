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

var mongodb = require('mongodb').MongoClient;
var db = '';

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost:27017/zhaoyi');
var db = mongoose.connection;

db.on('open', () => console.log('mongoose connect open'));

// app.use(express.static("dist"));

var product_schema = mongoose.Schema({
    productId: Number,
    productName: {
        type: String,
        required: function () {
            console.log(this.password, this.password.length);
            return this.password && this.password.length >= 3;
        },
    },
    productCode: {
        type: String,
        required: [true, 'Username is required'],
    },
    releaseDate: String,
    description: String,
    price: Number,
    starRating: Number,
    imageUrl: String,
})

var product_model = mongoose.model('products', product_schema, 'products');

const secretKey = 'zhaoyi12345';

app.post('/authenticate', function (req, res) {
    if (req.body.username === 'zhaoyi') {
        var token = jwt.sign({
            username: req.body.username,
        }, secretKey, {
                expiresIn: '1h',
            });
        res.send({
            isLoggedIn: true,
            token: token,
        });
    } else {
        res.status(400).send({
            isLoggedIn: false,
            message: "Invalid username. ",
        });
    }
});

app.use(function (req, res, next) {
    var token = req.body.authorization || req.query.authorization || req.headers.authorization || req.cookies.authorization;
    if (token) {
        jwt.verify(token, secretKey, function (err, decoded) {
            if (!err) {
                req.decodedAuthorization = decoded;
                next();
            } else {
                res.status(400).send({
                    isLoggedIn: false,
                    message: 'Invalid request. ',
                    error: err,
                })
            }
        });
    } else {
        res.status(400).send({
            isLoggedIn: false,
            message: 'Invalid request. Missing authorization. ',
        })
    }
});

app.get('/getProducts', function (req, res) {
    product_model.find({})
        .then(data => res.send(data));
});

app.get('/getProduct/:productCode', function (req, res) {
    var productCode = req.params.productCode;
    product_model.find({ productCode: productCode })
        .then(data => res.send(data));
});



app.listen(3000, function () {
    console.log('Server is running @ localhost:3000');
});

