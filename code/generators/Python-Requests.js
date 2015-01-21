function generateCode(service) {

    var url = service.url;
    var code = "# Install the \"Requests\" library\n";
    code += "# pip install requests\n\n";
    code += "import requests\n\n" 
    code += "try:\n";
    code += "  r = requests." + service.method.toLowerCase() + "(\n"
    code += "    url = '"+url+"',\n";
    code += "    params = " + formatParameters(service.parametersObject) + ",\n";

    code += "    headers = {\n";
    for(key in service.headers) {
        var header = service.headers[key];
        code += "      '"+header.type+"': '"+header.value+"',\n";
    }
    code += "    },\n";
    code += "  )\n";

    code += "  print('HTTP Status Code : {status_code}'.format(status_code=r.status_code))\n";
    code += "  print('Response : {content}'.format(content=r.content))\n";
    code += "except requests.exceptions.RequestException as e:\n";
    code += "  print e\n";

    return code;
}

function formatData(data){
    var returnDict = {};
    var elements = data.split("&");
    for(key in elements) {
        var paramParts = elements[key].split("=");
        returnDict[paramParts[0]] = paramParts[1];
    };

    return JSON.stringify(returnDict);
}

function formatParameters(parameters){
    var newParameters = {};
    for(key in parameters) {
        var value = parameters[key];
        if (Array.isArray(value)) {
            key += "[]";
        };
        newParameters[key]=value;
    };
    return JSON.stringify(newParameters);
}
