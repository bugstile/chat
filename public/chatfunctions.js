//Determines if a user is typing or not and has a timer to automatically remove if user hasn't sent their message.
function updateTyping (typing) {
    if (!typing) {
        typing = true;
        socket.emit('typing');
    }
    LastTimeTyping = (new Date()).getTime();

    setTimeout(function () {
        var TimeTyping = (new Date()).getTime();
        var timeDifference = TimeTyping - LastTimeTyping;
        if (timeDifference >= 700 && typing) {
                socket.emit('stop typing');
                typing = false;
        }
    }, 700);
};

//Scrolls to the bottom to make the chat comfortable for use
function scroll(){
    $('html, body').scrollTop( $(document).height());
};