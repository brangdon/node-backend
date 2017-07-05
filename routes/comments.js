var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: false}));


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

    connection.query('SELECT * from comments', function (err, rows, fields) {
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

router.post("/", function (req, res) {

    console.log('comment post')
    // console.log(req.body.firstParam)
    // console.log(req.body.secondParam)
    console.log(req.body.comment)
    console.log('------------')

    var comment  = {UserID: 1, Info: req.body.comment};

    connection.query('INSERT INTO comments SET ?', comment, function(err, result) {
        if (!err) {
            console.log('Insert comment success');
            // res.json(rows)
        }

        else {
            console.log('Error while inserting comment');
            res.json('error')
        }
    });

});

router.get("/:id", function (req, res) {

    connection.query('SELECT * from comments WHERE CommentID=' + req.params.id, function (err, rows, fields) {
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