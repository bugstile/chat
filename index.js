var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var func = require('./functions.js');

http.listen(3000, function(){
    console.log('listening on *:3000');
});

app.use(express.static(__dirname + '/public'));
var socketList = [];

var whitelistEnabled = false;
var whitelist = [
    '::1',
    "localhost",
    "127.0.0.1",
];

io.on('connection', function(socket){
    //Initalizing
    var ip = socket.handshake.address;
    socket.username = 'dat boi';
    socketList.push(socket);

    //It works a bit rough, but it works.
    if (whitelistEnabled && whitelist.indexOf(ip) == -1){
        io.emit('server message to user', "You are not allowed onto this server.");
        console.log("Denied client on IP: " + ip);
        console.log(whitelist.indexOf(ip));
        socket.disconnect();
    } else {
        console.log("Client connected on IP: " + ip);
    }
    
    io.emit('server message', socket.username + ' connected');
    socket.emit('server message to user', '/help for a list of commands');
    
    // Updates the userbar on the right hand side of the website
    func.updateUsers(socketList, io, socket);
    
    // Transfers the username to the buttons command
    socket.on('button handler', function(){
        io.emit('click button', socket.username);
    });
    
    /*
    *  The message handler decides if any conditions will be changed in the message
    *  such as commands, private messages or other potential conditions.
    */ 
    socket.on('message handler', function(msg){
        if(msg.substring(0,1) == '/'){
            func.command(socketList, msg, io, socket);
            func.updateUsers(socketList, io, socket);
        } else {
            func.message(msg, io, socket);
        }
        io.emit('flash', socket.username);
    });
    
    socket.on('typing', function(){
        io.emit('typing', socket.username);
    });
    
    socket.on('stop typing', function(){
        io.emit('stop typing', socket.username);
    });
    
    //Handles disconnection and removes the connected client
    socket.on('disconnect', function(){
        socketList.splice(socketList.indexOf(socket), 1);
        func.updateUsers(socketList, io, socket);
        io.emit('server message', socket.username + ' disconnected');
    });  
});