// module.exports = function(app){

//     app.get("/", function (req,res) {
//         res.render('index');
//     })

//     app.post('/search', function(req, res){

//         var request = require("request");

//         var url = 'http://www.omdbapi.com/?s=' + req.body.name;

//         console.log('request url: ' + url);

//         request({ url: url, json: true}, function (error, response, body) {

//             if (!error && response.statusCode == 200) {
//                 var array = [];
//                 if (body.Response == "False"){
//                     res.render('result',{ movies:array });
//                 }
                
//                 for (var i = 0 ; i < body.Search.length ; i ++){
//                     array.push({'Title':body.Search[i].Title,
//                         'Year':body.Search[i].Year,
//                         'imdbID':body.Search[i].imdbID,
//                         'Type':body.Search[i].Type,
//                         'Poster':body.Search[i].Poster,
//                     });。
//                 }
//                 res.render('result',{ movies:array });
//             }
//         })
//     });

//     app.get("*", function (req,res) {
//         res.send('page not found');
//     })
// };
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
            if (error != null) {
                console.log(error);
                return;
            }
            res.render('index', {data: data});
        })

    });

    app.get("*", function (req,res) {
        res.send('page not found');
    });
};