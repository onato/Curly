var curly = require('../curly/curly');

describe('Curly', function(){
  it('Content Type', function(done){
    var headers = {
                    'X-CURLY-CUSTOM-HEADER':'Eat Your Crusts',
                    'Accept-Encoding':'gzip'
                  };
    var service = {
                    url:'http://development.onato.com/curly/contentTypes/json.php',
                    headers:headers,
                    json:true
                  };
    curly.request(service, function(statusCode, statusCodeString, contentType, response, responseString, headers){


statusCode.should.be.exactly(200)
contentType.should.be.exactly("application/json")



      done();
    });
  });
  it('Authenticate - Header', function(done){
    var headers = {
                    'Authorization':'Bearer 3586bbd190feb40ccd28b2aad90a21eea3fd6027',
                    'Accept-Encoding':'gzip'
                  };
    var service = {
                    url:'http://development.onato.com/curly/authenticateHeader.php',
                    headers:headers,
                    json:true
                  };
    curly.request(service, function(statusCode, statusCodeString, contentType, response, responseString, headers){


statusCode.should.be.exactly(200)


      done();
    });
  });
  it('GZip', function(done){
    var headers = {
                    'Accept-Language':'de',
                    'X-CURLY-CUSTOM-HEADER':'Eat Your Crusts',
                    'Accept-Encoding':'gzip, deflate'
                  };
    var service = {
                    url:'http://development.onato.com/curly/gzip/gzip.php',
                    headers:headers,
                    json:true
                  };
    curly.request(service, function(statusCode, statusCodeString, contentType, response, responseString, headers){


statusCode.should.be.exactly(200)

response.should.containDeep({"X-CURLY-CUSTOM-HEADER" : "Eat Your Crusts"})

headers.should.have.enumerable('Connection')





      done();
    });
  });
  it('Custom Header', function(done){
    var headers = {
                    'X-CURLY-CUSTOM-HEADER':'Eat Your Crusts',
                    'Accept-Encoding':'gzip'
                  };
    var service = {
                    url:'http://development.onato.com/curly/customHeader.php',
                    headers:headers,
                    json:true
                  };
    curly.request(service, function(statusCode, statusCodeString, contentType, response, responseString, headers){


statusCode.should.be.exactly(200)

response.should.containDeep({"X-CURLY-CUSTOM-HEADER" : "Eat Your Crusts"})

headers.should.have.enumerable('Connection')





      done();
    });
  });
  it('403', function(done){
    var headers = {
                    'X-CURLY-CUSTOM-HEADER':'Eat Your Crusts',
                    'Accept-Encoding':'gzip'
                  };
    var service = {
                    url:'http://development.onato.com/curly/403.php',
                    headers:headers,
                    json:true
                  };
    curly.request(service, function(statusCode, statusCodeString, contentType, response, responseString, headers){


statusCode.should.be.exactly(403)
statusCodeString.should.be.exactly("forbidden")
responseString.should.match(/.*denied.*/)
response.should.containDeep({"message" : "access denied"})


      done();
    });
  });
  it('Authenticate - Basic', function(done){
    var headers = {
                    'Accept-Encoding':'gzip'
                  };
    var service = {
                    url:'http://user:pwd@development.onato.com/curly/authenticateBasic.php',
                    headers:headers,
                    json:true
                  };
    curly.request(service, function(statusCode, statusCodeString, contentType, response, responseString, headers){


statusCode.should.be.exactly(200)





      done();
    });
  });
});
