function generateCode(service) {

    var url = service.url;
    if (["GET", "HEAD", "DELETE"]) {
        url += "?" + service.data;
    };
    var method = capitaliseFirstLetter(service.method);

	var code = "require 'net/http'\n\n";
	code += "begin\n";
	code += "  uri = URI('"+url+"')\n";
    code += "  http = Net::HTTP.new(uri.host, uri.port)\n";
    code += "  req =  Net::HTTP::"+method+".new(uri)\n";
    for(key in service.headers) {
    	var header = service.headers[key];
        code += "  req.add_field '"+header.type+"', '"+header.value+"'\n";
    }
    code += "  res = http.request(req)\n";
    code += "  puts \"HTTP Status Code: #{res.code}\"\n";
    code += "  puts \"Response: #{res.body}\"\n";
    code += "rescue Exception => e\n";
    code += "  puts \"HTTP Request failed (#{e.message})\"\n";
    code += "end\n";

	return code;
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}