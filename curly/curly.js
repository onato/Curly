var request = require('request'),
	http = require('http'),
	should = require('should'),
	zlib = require('zlib');


module.exports = {
	request: function(options, verify) {
		options.encoding = null;
		request(options, function (error, response, body) {
			var responseObject = body;
			var responseString = JSON.stringify(body);
			var statusCode = response.statusCode;
			var statusCodeString = http.STATUS_CODES[statusCode].toLowerCase();

			var headers = camelCaseKeysInHeaders(response.headers);
			var contentType = headers['Content-Type'];

			var encoding = headers['Content-Encoding']
			if (encoding && encoding.indexOf('gzip') >= 0) {
				zlib.gunzip(body, function(err, dezipped) {
					if (error) {
					}else{
						body = dezipped.toString('utf-8');
						responseObject = JSON.parse(body);
						responseString = body;
						verify(statusCode, statusCodeString, contentType, responseObject, responseString, headers);
					}
				});
			}else{
				verify(statusCode, statusCodeString, contentType, responseObject, responseString, headers);
			}
		});
	}
};

function camelCaseKeysInHeaders(headers) {
	var newHeaders = {};
	for(key in headers){
		var value = headers[key];
		var camelKey = key.toLowerCase().replace(/-(.)/g, function(match, group1) {
			return "-"+group1.toUpperCase();
		});
		camelKey = camelKey.charAt(0).toUpperCase() + camelKey.slice(1);
		newHeaders[camelKey] = value;
	}
	return newHeaders;
}
