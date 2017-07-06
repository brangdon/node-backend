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
    text = req.body.comment
    userID = req.body.userID
    imageID = req.body.imageID
    // console.log(req.body.comment)
    // console.log(req.body.userID)
    // console.log(req.body.imageID)

    var comment = {UserID: userID, ImageID: imageID, CommentText: text};
    //
    // console.log(comment)
    // console.log('not working')
    connection.query('INSERT INTO comments SET ?', comment, function (err, result) {
        if (!err) {
            console.log('Insert comment success');
            res.json('inserting comment success')
        }

        else {
            console.log('Error while inserting comment');
            console.log(err)
            res.json('error')
        }
    });

});

router.get("/:id", function (req, res) {

    connection.query('SELECT * from comments WHERE ImageID=' + req.params.id, function (err, rows, fields) {
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