var fs = require('fs');

if (process.argv.length != 2) {
	console.log("usage: node generateCode.js sampleServiceData.json template.js");
};

var template = process.argv[2];
var service = process.argv[3];

var templatePath = __dirname + '/generators/' + template;
fs.readFile( templatePath, function (err, data) {

	if (!data) {
		console.log("Could Not Open Template: " + templatePath);
	}else{
		eval(data.toString());

		fs.readFile( __dirname + '/' + service, function (err, data) {
			if (err) {
				throw err; 
			}

			var service = JSON.parse(data.toString());
			console.log(generateCode(service));
		});
	}
});

