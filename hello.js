const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3306;

app.use("/css", express.static("css"));
//app.use(' /css', express.static(__dirname + '/css'));

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug');


app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname
    })
});


//database connection
var connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'test'
    //remote database connection
    host: 'remotemysql.com',
    user: ' hvn3DbB63t',
    password: 'Qo9Brt2jYH',
    database: 'hvn3DbB63t'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected');
})



app.post('/submit', function(req, res) {
    console.log(req.body);
    var sql = "Insert into users(name,email,mobile) values('" + req.body.name + "', '" + req.body.email + "', '" + req.body.mobile + "')";
    connection.query(sql, function(err) {
        if (err) throw err
        res.render('index', {
            title: 'Data Saved',
            message: 'Data Saved Success'
        })
        connection.end();
    })



})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})