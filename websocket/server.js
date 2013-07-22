var http = require("http"),
	io   = require("socket.io");

//create http server
var server = http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "text/html"});
	response.end("HTML5 WebSocket Demo");
});
server.listen(8000, "localhost");

//wrap http server by socket.io
var socket = io.listen(server);
socket.on("connection", function(client){
	console.log("connect");

	client.on("message", function(data){
		client.send("Hello" + data);
	});

	client.on("disconnect", function(){
		console.log("disconnect");
	});
});
