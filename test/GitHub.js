var curly = require('../curly/curly');

describe('GitHub', function(){
  it('Last Message', function(done){
    var headers = {
                    'Accept-Encoding':'gzip, deflate'
                  };
    var service = {
                    url:'https://status.github.com/api/last-message.json',
                    headers:headers,
                    json:true
                  };
    curly.request(service, function(statusCode, statusCodeString, contentType, response, responseString, headers){


      //Start Verification Script
      statusCode.should.be.exactly(200);
      contentType.should.be.exactly("application/json");
      response.should.have.property("status");
      response.should.have.property("body");
      
      response.should.have.property("created_on");
      var dateCreated = new Date(response["created_on"]);
      dateCreated.getTime().should.not.be.NaN;
      
      //End Verification Script


      done();
    });
  });
  it('Status', function(done){
    var headers = {
                    'Accept-Encoding':'gzip, deflate'
                  };
    var service = {
                    url:'https://status.github.com/api/status.json',
                    headers:headers,
                    json:true
                  };
    curly.request(service, function(statusCode, statusCodeString, contentType, response, responseString, headers){


      //Start Verification Script
      statusCode.should.be.exactly(200);
      contentType.should.be.exactly("application/json");
      response.should.have.property("status");
      response.should.have.property("last_updated");
      //End Verification Script


      done();
    });
  });
});
