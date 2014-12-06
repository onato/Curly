var exec = require('child_process').exec;

function runAll(){
	exec('./runWithAlert.sh', function (error, stdout, stderr) {
		var now = new Date();
	  	console.log(now + " - " + stdout);
	});
}

var interval = 15*60*1000;
interval = 60*1000;
setInterval(runAll, interval);
