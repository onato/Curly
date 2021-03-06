function generateCode(service) {

	var code = "var request = require('request'),\n";
	code += "       http = require('http');\n";
	code += "\n";
    code += "var headers = {\n";
    var headersString = "";
    for(key in service.headers) {
    	var header = service.headers[key];
    	if (headersString.length) {
    		headersString += ",\n";
    	};
	    headersString += "                '"+header.type+"':'"+header.value+"'";
    }
    headersString += "\n              };\n\n";
    code += headersString;
    code += "var options = {\n";
    if (service.method) {
	    code += "                 method:'" + service.method + "',\n";
    };
    code += "                 url:'" + service.url + "',\n";
    code += "                 headers:headers,\n";
    code += "                 qs:" + JSON.stringify(service.parametersObject) + ",\n";
    code += "                 json:true\n";
    code += "               };\n\n";
	code += "request(options, function (error, response, body) {\n";
	code += "    // repond to the request.\n";
	code += "});\n";



	return code;
}