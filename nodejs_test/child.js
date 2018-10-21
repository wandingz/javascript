var express = require('express');
var router = express.Router();

var formidable = require('formidable');
var fs = require('fs');

// Home page route.
router.get('/', function (req, res) {
    res.header('Content-Type', 'text/html');
    res.send(`
    <form action="fileupload" method="post" enctype="multipart/form-data">
        <input type="file" name="filetoupload"><br>
        <input type="submit">
    </form>
    `);
});

// About page route.
router.get('/about', function (req, res) {
    res.send('About this upload');
});

router.post('/fileupload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.status(500).send(err);
            return ;
        }
        var oldpath = files.filetoupload.path;
        var newpath = 'C:/Users/ZhaoYi/Desktop/javascript/nodejs_test/uploads/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.send('File uploaded and moved!');
        });
        // res.send('File uploaded');
    });
});

module.exports = router;
