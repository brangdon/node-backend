var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: false}));


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sys'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... login");
    } else {
        console.log("Error connecting database ... login");
    }
});

router.post("/", function (req, res) {

    console.log('login post')
    // console.log(JSON.parse(req))
    console.log(req.body.login)
    console.log(req.body.password)
    console.log('------------')

    // res.send('good', 'good credentials');

    connection.query('SELECT * from Persons WHERE `Login` = ' + '"' + req.body.login + '"', function (err, rows, fields) {
        if (!err) {
            console.log('The solution is follwoing: ');
            if (rows.length == 1) {
                console.log(rows)
                res.json(rows[0])
            }

        }

        else {
            console.log('Error while performing Query.');
            console.log(err)
            res.json('error')
        }
    });

});

module.exports = router;