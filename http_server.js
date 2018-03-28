var port = process.env.PORT || 5000;
var http = require("http");

exports.init = function() {
    http.createServer(function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Hello World!');
        res.end();
    }).listen(port);
}