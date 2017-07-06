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

    console.log('register post')
    // console.log(JSON.parse(req))
    console.log(req.body.login)
    console.log(req.body.password)
    console.log(req.body.repeatPassword)
    console.log('------------')


    var person  = {Login: req.body.login, Pass: req.body.password, IsAdmin: 0};

    connection.query('INSERT INTO Persons SET ?', person, function(err, result) {
        if (!err) {
            console.log('Insert comment success');
            res.json(result)
        }

        else {
            console.log('Error while inserting comment');
            res.json('error')
        }
    });

});

router.get("/:id", function (req, res) {

    connection.query('SELECT * from comments WHERE CommentID=' + req.params.id, function (err, rows, fields) {
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