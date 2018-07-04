//Technically creates and exports a module for use
func = module.exports;

//Handles all commands
func.command = function(list, input, io, socket) {
    //initializing
    var cmd = input.substr(1).split(" ")[0].toLowerCase();
    var message = input.substring(3);

    //Decides which command has been done and executes it
    switch(cmd) {
        case 'me':
            io.emit('action message', '*' + socket.username + '  ' + message + '*');
            break;
        case 'name':
            func.changeName(list, input, io, socket);
            break;
        case 'help':
            socket.emit('server message to user', '/me, /name, /help, /w ');
            socket.emit('server message to user', "/w user: message. it needs to be seperated by a : or it won't work");
            break;
        case 'w':
            func.whisper(list, message, io, socket);
            break;
        default:
            socket.emit('server message to user', '/'+ cmd + ' is not a valid command, try /help for a more informative list of commands');
    }
};

//Whisper function seperated by a : since spaces are allowed in usernames
func.whisper = function(list, input, io, socket){
    var user = input.substring(0, input.indexOf(':'));
    var msg = input.substring(input.indexOf(':')+1);
    var found = false;
    for(var i = 0; i < list.length; i++) {
        if(list[i].username == user){
            found = true;
            io.to(socket.id).emit('user message to user', ' to ' + list[i].username + ': ' +  msg);
            io.to(list[i].id).emit('user message to user', ' from ' + socket.username + ': ' + msg);
            break;
        }
    }
    if(found==false){
        socket.emit('server message to user', 'no user with that name was found, make sure you format your whisper like = "/w user: hello');
    }
}

//Handles messages
func.message = function(input, io, socket){
    if(input.length<1000){
        io.emit('user message', socket.username, input);
    } else {
        socket.emit('server message to user', 'your message is too long, max 1000 letters');
    }
};

//Changes users name
func.changeName = function(list, input, io, socket){
    var newName = input.substring(6);
    var notExist = false;
    
    for(var i = 0; i < list.length; i++) {
        if(list[i].username == newName){
            notExist = true;
            socket.emit('server message to user', 'this name already exists');
            break;
        }
    }
    
    if(notExist == false){
        if (newName.length>20){
            socket.emit('server message to user', 'that name is too long, max 20 letters');
        } else {
            var oldName = socket.username;
            socket.username = newName;

            io.emit('server message', oldName + ' has changed their name to ' + socket.username); 
        } 
    }
};

//Updates the user list
func.updateUsers = function(list, io, socket){
    io.emit('user cleared');
    for(var i = 0; i < list.length; i++) {
        io.emit('user inserted', list[i].username);
    }
};