var Connection = require('tedious').Connection;
//var Request = require('tedious').Request;
var cheerio = require('cheerio');
var request = require('request');

request('http://pda.5284.com.tw/MQS/businfo1.jsp', function(error, response, body) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(body);
		$("tr:nth-child(7) td option").each(function(i, elem) {
			//console.log($(this).text());
			//console.log('http://pda.5284.com.tw/MQS/businfo2.jsp?routename=' + $(this).text());
			request('http://pda.5284.com.tw/MQS/businfo2.jsp?routename=' + $(this).text(), function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var $ = cheerio.load(body);
				// $("table:nth-child(2) tr td").each(function(i, elem) {
				// 	console.log($(this).text());
				// })
				} else {
					console.log(response.statusCode);
				}
			});
		})
	} else {
		
	}

});






// var config = {
// 	userName: 'root',
// 	password: '',
// 	server: '127.0.0.1'
// }

// var connection = new Connection(config);

// connection.on('connect', function(err) {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	} else {
// 		executeStatement();
// 	}
// });

// function executeStatement() {
// 	request = new Request("")
// }
