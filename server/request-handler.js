
var exports = module.exports = {};
var requestHandler;
var url = require('url');

exports.requestHandler = function(request, response) {

  //new code
  var objectIdCounter = 1;
  var messages = [];

  var router = {
    '/classes/messages': messages.requestHandler
  };

  var route = router[url.parse(request.url).pathname];

  if (!route) {
      sendResponse(response, '', 404);
    }

  var statusCode = response.statusCode;
  var responseData = null;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  var sendResponse = function(response, data, statusCode){
    statusCode = statusCode || 200;
    response.writeHead(statusCode, headers);
    responseData = JSON.stringify(data);
  }    
  
  var collectData = function(request, callback) {
    var data = '';
    request.on('data', function (chunk) {
      data += chunk;
    });
    request.on('end', function () {
      callback(JSON.parse(data));
    })
  }

//REQUEST === GET
 if(request.method === 'GET') {
    sendResponse(response, {results: messages});
  }
//REQUEST === POST
  else if(request.method === 'POST') {
     
    collectData(request, function(message){
      message.objectId = ++objectIdCounter;
      messages.push(message);
      sendResponse(response, {objectId: message.objectId}, 201)
    })
  }
  // else if(request.method === 'OPTIONS') {
  //   sendResponse(response, null);
  // } 
  else {
    sendResponse(response, '', 404);
  }

  response.end(responseData);

};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

