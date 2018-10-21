var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.static('public'));

var child = require('./child');
app.use('/child', child);

app.get('/', function (req, res) {
    res.send('OK');
});


app.listen(4000, function () {
    console.log('Server is running @ localhost:4000');
});
