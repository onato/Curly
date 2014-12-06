Curly - Web-Service Monitoring
=====

Curly is a [Node.js](http://nodejs.org/) app for monitoring webservices with the [Mocha](https://github.com/mochajs/mocha) test framework, verifying them using [Should.js](https://github.com/shouldjs/should.js) and alerting of any failures using [Pushbullet](https://www.pushbullet.com) push notifications.

##Install
    git clone https://github.com/onato/Curly.git
    cd Curly
    npm install
    node scheduler.js

All test in the `test/` folder will be run.

##Example (Monitoring the GitHub Status API)

```javascript
var curly = require('../curly/curly');

describe('GitHub', function(){
  it('Status', function(done){
    var headers = {
                    'Accept-Encoding':'gzip'
                  };
    var service = {
                    url:'https://status.github.com/api/status.json',
                    headers:headers,
                    json:true
                  };
    curly.request(service, function(statusCode, statusCodeString, contentType, response, responseString, headers){

      statusCode.should.be.exactly(200);
      contentType.should.be.exactly("application/json");
      response.should.have.property("status");
      response.should.have.property("last_updated");

      done();
    });
  });

  it('Last Message', function(done){
    var headers = {
                    'Accept-Encoding':'gzip'
                  };
    var service = {
                    url:'https://status.github.com/api/last-message.json',
                    headers:headers,
                    json:true
                  };
    curly.request(service, function(statusCode, statusCodeString, contentType, response, responseString, headers){

      statusCode.should.be.exactly(200);
      contentType.should.be.exactly("application/json");
      response.should.have.property("status");
      response.should.have.property("created_on");
      response.should.have.property("body");

      done();
    });
  });
});

```