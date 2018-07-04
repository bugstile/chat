var socket = io();
$(function() {
    var typing = false;
    var lastTypingTime;
    
    //Looks if something is inside input
    $('.inputMessage').on('input', function() {
        updateTyping(typing);
    });
    
    //Checks if someone is typing or not, and cancels if they sent their message
    $(window).keydown(function (event) {
        if (event.which === 13) {
            socket.emit('stop typing');
            typing = false;
        }
    });

    //Handles input when a user sent their message
    $('form').submit(function(){
        socket.emit('message handler', 
        $('.inputMessage').val());
        $('.inputMessage').val('');
        return false;
    });
    
    //Puts out a thumbs up when a user pressed the button
    $('button').click(function(){
        socket.emit('button handler');
    });

    //Creates the "user is typing..."
    socket.on('typing', function (username) {
        typing = true;
        $('.typingfield').append($('<li class="typing">').text(username + ' is typing...'));
        scroll();
    });

    //Removes "user is typing..."
    socket.on('stop typing', function (username) {
        typing = false;
        $('.typingfield').empty();
    });
    
    //Adds the thumbs up to the chat feed
    socket.on('click button', function(username){
        $('.messages').append($('<li class="like">').append($('<i id="thumbs" class="fa fa-thumbs-o-up"></i>')));
        $('.messages li:last-child').prepend($('<span>').text(username + " "));
        scroll();
    });
    
    //Writes out a user message
    socket.on('user message', function(username, msg){
        socket.emit('user message');
        $('.messages').append($('<li>').text(msg));
        $('.messages li:last-child').prepend($('<span>').text(username + ": "));
        scroll();
    });
    
    //Clears the user list
    socket.on('user cleared', function(){
        socket.emit('user cleared');
        $('.users').empty();
    });
    
    //Adds into the user list
    socket.on('user inserted', function(list){
        socket.emit('user inserted');
        $('.users').append($('<li class="user">').text(list));
    });
    
    //Writes out a server message
    socket.on('server message', function(msg){
        socket.emit('server message');
        $('.messages').append($('<li class="server">').text(msg));
        scroll();
    });
    
    //Writes out an action message
    socket.on('action message', function(msg){
        socket.emit('action message');
        $('.messages').append($('<li class="action">').text(msg));
        scroll();
    });
    
    //Writes out a private message to a user from server
    socket.on('user message to user', function(msg){
        $('.messages').append($('<li class="userToUser">').text(msg));
        scroll();
    });
    
    //Writes out a private message to a user from server
    socket.on('server message to user', function(msg){
        socket.emit('server message to user');
        $('.messages').append($('<li class="serverToUser">').text(msg));
        scroll();
    });
});