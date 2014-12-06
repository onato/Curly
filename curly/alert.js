var request = require('request')
  , JSONStream = require('JSONStream')
  , es = require('event-stream')
  , colors = require('colors')
  , config = require('../config');

process.stdin
	.pipe(JSONStream.parse())
	.pipe(es.mapSync(function (data) {
		var messages = "";
		data.failures.forEach(function(failure) {
		var message = "Project: " + failure.title + "\n";
		message += "  Service: " + failure.fullTitle + "\n";
		message += "    Error: " + failure.err.message + "\n";
		messages += message;
	});

	if(messages.length) {
		console.error("Fail".red);
		var email = encodeURIComponent(config.pushbullet.email);
		var body =  encodeURIComponent(messages);
		request.post({
		  url:     'https://api.pushbullet.com/v2/pushes',
		  headers: {"Authorization": "Bearer "+config.pushbullet.accessToken},
		  form:    "body=" + body + "&email=" + email + "&type=note&title="+config.pushbullet.alertTitle
		}, function(error, response, body){
			if (error) {
				console.log(error);
				console.log(messages);
				//console.log(response);
				//console.log(body);
			};
		});
	}

	return data
}))