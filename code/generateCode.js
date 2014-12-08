var fs = require('fs');

var template = process.argv[2];
var service = process.argv[3];

fs.readFile( __dirname + '/generators/' + template + '.js', function (err, data) {

	eval(data.toString());

	fs.readFile( __dirname + '/' + service + '.json', function (err, data) {
	  if (err) {
	    throw err; 
	  }

	  var service = JSON.parse(data.toString());
	  console.log(generateCode(service));
	});

});

