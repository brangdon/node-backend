var express = require('express');
var router = express.Router();
var mysql      = require('mysql');


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'sys'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... images");
    } else {
        console.log("Error connecting database ... images");
    }
});

router.get('/', function (req, res, next) {

    connection.query('SELECT * from images', function (err, rows, fields) {
        // connection.end();
        if (!err) {
            // console.log('The solution is: ', rows);
            res.json(rows)
        }

        else {
            console.log('Error while performing Query.');
            res.json('error')
        }
    });

});

router.post("/", function (req, res) {

    console.log('images post')
    name = req.body.name
    console.log('name: ' + name)

    var image = {UserID: 1, ImageName: name};

    connection.query('INSERT INTO images SET ?', image, function (err, result) {
        if (!err) {
            console.log('Insert image success');
            res.json('inserting image success')
        }

        else {
            console.log('Error while image comment');
            console.log(err)
            res.json('error')
        }
    });

});

router.get("/:id", function (req, res) {

    connection.query('SELECT * from images WHERE ImageID=' + req.params.id, function (err, rows, fields) {
        // connection.end();
        if (!err) {
            // console.log('The solution is: ', rows);
            res.json(rows)
        }

        else {
            console.log('Error while performing Query.');
            res.json('error')
        }
    });

});

module.exports = router;