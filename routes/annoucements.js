var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sys'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

router.get('/', function (req, res, next) {

    connection.query('SELECT * from annoucements', function (err, rows, fields) {
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

router.delete("/:id", function (req, res) {

    connection.query('delete from Annoucements WHERE AnnoucementID=' + req.params.id, function (err, rows, fields) {
        // connection.end();
        if (!err) {
            // console.log('The solution is: ', rows);
            res.json(rows)
        }

        else {
            console.log('Error while performing Query annoucements.');
            console.log(err)
            res.json('error')
        }
    });

});

router.post("/", function (req, res) {

    console.log('annoucement post')
    text = req.body.text
    title = req.body.title

    var annoucement = {Title: title, Info: text};

    connection.query('INSERT INTO annoucements SET ?', annoucement, function (err, result) {
        if (!err) {
            console.log('Insert annoucements success');
            res.json('inserting annoucement success')
        }

        else {
            console.log('Error while inserting annoucement');
            console.log(err)
            res.json('error')
        }
    });

});


module.exports = router;