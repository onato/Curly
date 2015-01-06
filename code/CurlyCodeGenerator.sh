#!/usr/bin/env xcrun swift

import Cocoa
import JavaScriptCore

var templateLocation = ""
var serviceLocation = ""
let currentPath = NSFileManager.defaultManager().currentDirectoryPath + "/"

println("")
if(C_ARGC < 3) {
	println("Usage: ./CurlyCodeGenerator.sh generators/Objective-C-AFNetworking.js exampleServiceSimple.json")
} else {
	templateLocation = currentPath + String.fromCString(C_ARGV[1])!
	serviceLocation = currentPath + String.fromCString(C_ARGV[2])!
}

func contextWithScriptString(scriptString: String!, error: NSErrorPointer) -> JSContext!
{
    let virtualMachine = JSVirtualMachine()
    let context = JSContext(virtualMachine:virtualMachine)
    context.exceptionHandler = { (context:JSContext!, exception:JSValue!)->Void in 
    	println("Error: " + (exception.toString()))
//    	error.memory = NSError(domain: domain, code: code, userInfo: [:])
    }
    context.evaluateScript(scriptString)
    return context
}

var fileManager = NSFileManager.defaultManager()
if (!fileManager.fileExistsAtPath(serviceLocation)) {
	println("Error: Could not read the service file " + serviceLocation)
}else if (!fileManager.fileExistsAtPath(templateLocation)) {
	println("Error: Could not read the template file " + templateLocation)
}else{
	let serviceString = NSString(contentsOfFile: serviceLocation, encoding: NSUTF8StringEncoding, error: nil)
	let scriptString = NSString(contentsOfFile: templateLocation, encoding: NSUTF8StringEncoding, error: nil)

	var error: NSError?
	let context = contextWithScriptString(scriptString, &error)

	let data = (serviceString as NSString!).dataUsingEncoding(NSUTF8StringEncoding)
	var service: NSDictionary = NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers, error: nil) as NSDictionary
	context.setObject(service, forKeyedSubscript:"service")


	let generateCodeScript: String = "var generatedCode = generateCode(service);"

	context.evaluateScript(generateCodeScript)

	println(context.objectForKeyedSubscript("generatedCode"))
}
