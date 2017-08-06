var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taipeibus'
});
connection.connect();
module.exports = function(app){

    app.get("/", function (req,res) {
        var bus = require('taipei-bus');

        bus("", function(error, data) {
            if (error != null) {
                console.log(error);
                return;
            }
            res.render('index',{ data: data });
        });
    });

    app.post('/search', function(req, res){
        var bus = require('taipei-bus');
        bus(req.body.road, function(error, data) {
            var send_Data
            if (error != null) {
                console.log(error);
                return;
            }
            for (var i in data.go) {
                connection.query("SELECT * FROM stop WHERE nane=\"" + data.go[i].name + "\"", 
                    function(req, res) {

                    });
            }
            res.render('index', {data: send_Data});
        })

    });

    app.post('/send', function(req, res) {
        console.log(req.body.data);
        for (var i in req.body.data) {
            connection.query("INSERT INTO stop (name, lat, lng) VALUES (\"" + req.body.data[i].name 
                + "\", " + req.body.data[i].lat
                + ", " + req.body.data[i].lng
                + ")", function(err) {
                    if (err)
                        console.log(err);
                });
        }
        res.send({'msg': 'Successful'});
        connection.end();
    });

    app.get("*", function (req,res) {
        res.send('page not found');
    });
};