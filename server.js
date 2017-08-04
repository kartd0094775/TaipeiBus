var express = require('express');
var port = process.env.PORT || 3000;
var morgan = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}))

app.use(morgan("dev"));

require("./app/routes")(app);

app.set('view engine', 'ejs');

//launch==================================================
app.listen(port,function () {
    console.log('Server is running on port ' + port + '..........');
});

