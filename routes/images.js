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
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

router.get('/', function (req, res, next) {

    connection.query('SELECT * from images', function (err, rows, fields) {
        // connection.end();
        if (!err) {
            console.log('The solution is: ', rows);
            res.json(rows)
        }

        else {
            console.log('Error while performing Query.');
            res.json('error')
        }
    });

});

router.get("/:id", function (req, res) {

    connection.query('SELECT * from images WHERE ImageID=' + req.params.id, function (err, rows, fields) {
        // connection.end();
        if (!err) {
            console.log('The solution is: ', rows);
            res.json(rows)
        }

        else {
            console.log('Error while performing Query.');
            res.json('error')
        }
    });

});

module.exports = router;