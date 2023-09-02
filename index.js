var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/game.html');
});

app.use(express.static(__dirname + '/public'));

http.listen(3000, function(){
    console.log("Listening to PORT 3000");
});

var players = [];

io.on('connection', function(socket){
    console.log(socket.id + ' entered');

    socket.on('chat message', function(data){
        console.log('received message', socket.id, data.message);
        var name = data.name; // Get the name from the data object

        io.emit('chat message from server', { name: name, message: data.message }); // Broadcast the name and message
    });
    socket.on('disconnect', function(){
        for (var i = 0; i < players.length; i++){
            if(socket.id == players[i].id){
                players.splice(i, 1);
                console.log(socket.id + " disconnected");
            }
        } 
    });
});
