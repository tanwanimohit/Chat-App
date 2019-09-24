
$(function(){
   	//make connection
	var url=window.location.href;
	var socket = io.connect(url)

	//buttons and inputs
	var message = $("#message")
	var send_message = $("#send_message")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")
	var username= $("#userName")
	var change_user = $("#change")
	

	//Emit message
	send_message.click(function(){
		
		socket.emit('new_message', {message : message.val()})
		//chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
	//	console.log(data);
		chatroom.append("<p class='message'> <b>"+data.username +"</b> : " + data.message + "</p>")
		chatroom.scrollTop(chatroom.prop('scrollHeight'));
		//chatroom.scrollTop=chatroom.scrollHeight;
	})

	//Emit a username
	change_user.click(function(){
		socket.emit('change_username', {username : username.val()})
	})
	
	//New User
	socket.on("custom_message", (data) => {
		feedback.html('');
		message.val('');
	//	console.log(data);
		
		chatroom.append("<p class='message'> <b>"+data.message+"</b> </p>")
		
		chatroom.scrollTop(chatroom.prop('scrollHeight'));
		//chatroom.scrollTop=chatroom.scrollHeight;
	})

	//Emit typing
	message.bind("keypress", (event) => {
		
		if (event.keyCode === 13) {
			// Cancel the default action, if needed
			event.preventDefault();
			// Trigger the button element with a click
			send_message.click();
		}
		else socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});


