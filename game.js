var socket = io();

$('#chat').submit(function(){
    var msg = $('#m').val();
    var name = $('#name').val(); // Get the name from the input field
    socket.emit('chat message', { name: name, message: msg }); // Send both the name and message as an object
    $('#m').val("");
    return false;
});

socket.on('chat message from server', function (data){
    console.log(data.name, data.message);
    $('#messageboard').append($('<li>').html('<span style="color:red">' + data.name + '</span>' + " | " + '<span>' + data.message + '</span>'));
});
