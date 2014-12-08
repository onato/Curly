function generateCode(service) {

	var code = "";

	if (!service.contentType && !service.httpStatus && (!service.method || ["GET","POST","HEAD","PUT","PATCH","DELETE"].contains(service.method)) ) {
		code = generateSimpleCode(service);
	}else{
		code = generateFlexibleCode(service);
	}

	return code;
}

function generateSimpleCode(service) {
	var code = "";

	code += "AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];\n";

    code += "\n// Add Headers\n";
    for(key in service.headers) {
    	var header = service.headers[key];
	    code += "[_manager.requestSerializer setValue:@\"" + header.value + "\" forHTTPHeaderField:@\"" + header.type + "\"];\n";
    }
    code += "\n";

	code += "[manager GET:@\"" + service.url + "\" parameters:@" + service.dataDictionary + " success:^(AFHTTPRequestOperation *operation, id responseObject) {\n";
	code += "    NSLog(@\"JSON: %@\", responseObject);\n";
	code += "} failure:^(AFHTTPRequestOperation *operation, NSError *error) {\n";
	code += "    NSLog(@\"Error: %@\", error);\n";
	code += "}];\n";

	return code;
}

function generateFlexibleCode(service) {
	var code = "";
	code += "NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@\"" + service.url + "\"]];\n";
	
	code += "[request setHTTPMethod:@\"" + (service.method? service.method : "GET") + "\"];\n";
    if (!service.method || service.method == "GET") {//js
    	code += "NSDictionary *paramsDict = @" + service.dataDictionary;
    	code += "request = (NSMutableURLRequest *)[[self requestSerializer] requestBySerializingRequest:request withParameters:paramsDict error:nil];\n";
    }else{
		code += "NSString *data = @\"" + service.data + "\";\n";
		code += "[request setHTTPBody:[data dataUsingEncoding:NSUTF8StringEncoding]];\n";
    }

	code += "NSString *contentType = @\"" + (service.contentType? service.contentType : "application/x-www-form-urlencoded; charset=utf-8") + "\";\n";
	code += "[request setValue:contentType forHTTPHeaderField:@\"Content-Type\"];\n";

    code += "\n// Add Headers\n";
    for(key in service.headers) {
    	var header = service.headers[key];
	    code += "[request setValue:@\"" + header.value + "\" forHTTPHeaderField:@\"" + header.type + "\"];\n";
    }

    code += "AFHTTPRequestOperation *operation = [[AFHTTPRequestOperation alloc] initWithRequest:request];\n";
    code += "[operation setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {\n";
    code += "\tNSLog(@\"SUCCESS\");\n";
    code += "} failure:^(AFHTTPRequestOperation *operation, NSError *error) {\n";
    code += "\tNSLog(@\"FAILURE\");\n";
    code += "}];\n";

    code += "AFHTTPResponseSerializer *serializer = [AFHTTPResponseSerializer serializer];\n";

    if(service.httpStatus) {
	    code += "[serializer setAcceptableStatusCodes:[NSIndexSet indexSetWithIndex:" + service.httpStatus + "]];\n";
    }else{
	    code += "[serializer setAcceptableStatusCodes:[NSIndexSet indexSetWithIndexesInRange:NSMakeRange(100, 600)]];\n";
    }

    if (service.contentType) {
        code += "[serializer setAcceptableContentTypes:[NSSet setWithArray:@[@\"application/json\", @\"text/html\", service.contentType]]];\n";
    }else{
        code += "[serializer setAcceptableContentTypes:[NSSet setWithArray:@[@\"application/json\", @\"text/html\"]]];\n";
    }

    code += "operation.responseSerializer = serializer;\n";
    code += "[[NSOperationQueue mainQueue] addOperation:operation];\n";

	return code;
}