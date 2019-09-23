//Routing Mechanism - URL Define Here.
const express = require('express');

//Mongo Object
var ObjectId = require('mongodb').ObjectID;
//Express Only Get Data If Body-Parser Is Worked.

//To Get Value Of Any Control Body-Parser Is Compulsory.
var bodyParser = require('body-parser');



//Object of Express
const app = express();
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));

//Set The File Type To App As EJS.
app.set('view engine', 'ejs');


//Httpserver Port Number 3000.
server=app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.get('/', function(req, res){
  res.render('home');
  
});

//Socket.io
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');
  
	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message});
    })
	
	//listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
  
});



