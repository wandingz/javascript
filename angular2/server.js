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

mongoose.connect('mongodb://localhost:27017/angular2');
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
    }
}), 'user');

app.post('/authenticate', function (req, res) {
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
});

app.post('/register', function (req, res) {
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

});

const secretKey = 'zhaoyi12345';
app.use(function (req, res, next) {
    var token = req.body.authorization || req.query.authorization || req.headers.authorization || req.cookies.authorization;
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

var LikesScheme = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
})

var PostScheme = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    comments: {
        type: Array,
        default: [],
    },
    likes: {
        type: [LikesScheme],
        default: [],
    }
});

var Post = mongoose.model('post', PostScheme, 'post');

app.post('/post/create', function (req, res) {
    req.body.author = req.decodedAuthorization.username;
    var post = Post(req.body);
    post.save().then(() => {
        res.send(post);
    })
});

app.get('/post/list', function (req, res) {
    Post.find({})
        .then(data => res.send(data));
});

app.get('/post/detail/:ID', function (req, res) {
    var _id = req.params.ID;
    Post.findById(_id)
        .then(data => {
            if (data)
                res.send(data);
            else
                res.status(404).send('Request post not exist. ');
        });
});

app.post('/post/delete', function (req, res) {
    let author = req.decodedAuthorization.username;
    Post.findOneAndDelete({ _id: req.body._id, author: author })
        .then(d => {
            if (d) {
                res.send({ message: "OK" });
            } else {
                res.status(403).send({
                    message: "Cannot find target post. Check if you are attemping to delete other's post",
                });
            }
        })
});


/**
 * @deprecated
 */
app.post('/post/update', function (req, res) {
    let author = req.decodedAuthorization.username;
    if (author !== req.body.author) {
        res.status(403).send({
            message: "Invalid user. It seems you are attemping to update other's post",
        });
        return;
    }
    var instance = Post(req.body)
    instance.isNew = false;
    instance.save()
        .then(() => {
            res.send({ message: "OK" });
        });
});

app.post('/post/addComment', function (req, res) {
    console.log(new Date(), req.body)
    let author = req.decodedAuthorization.username;
    let _id = req.body._id;
    var comment = req.body.new_comment
    comment.author = author;
    Post.findById(_id)
        .then(data => {
            if (data) {
                return data;
            } else {
                throw { status: 404, message: 'Request post not exist. ' };
            }
        })
        .then(data => {
            data.comments.push(comment);
            data.save().then(() => {
                res.send(comment);
            })
        })
});

// TODO
// potential concurrency issues
app.post('/post/like', function (req, res) {
    let author = req.decodedAuthorization.username;
    let _id = req.body._id;
    Post.findById(_id)
        .then(data => {
            if (data) {
                return data;
            } else {
                throw { status: 404, message: 'Request post not exist. ' };
            }
        })
        .then(data => {
            var likes = data.likes
            var index = likes.findIndex(l => l.username === author);
            if (index < 0) {
                data.likes.push({ username: author });
                data.save().then(() => {
                    res.send({ username: author });
                })
            } else {
                res.send(null);
            }
        })
        .catch(err => {
            res.status(err.status).send({ message: err.message });
        })
})

app.listen(3000, function () {
    console.log('Server is running @ localhost:3000');
});

