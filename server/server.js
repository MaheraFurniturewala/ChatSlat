const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public');  //since the public folder will be the statics
const port = process.env.PORT || 8000;
let app = express();
//we did not have this instance in our express app that is why we needed to create our own server so we could pass it in socket.io
let server = http.createServer(app);
let io = socketIO(server);

//build static folder
app.use(express.static(publicPath));

//this io(server instance) is going to listen to a pre-built event-->connection event
//this socket(in the callback is the same that we have in the client side io method)
io.on('connection',(socket) => {
    console.log("A new user just connected");
    //for everybody (individually) that connects to the server(basically this will only be sent to the user whi just joined in)
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

    //everybody but the current user(basically to everyone except the user who just joined in)
    socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));

    socket.on('createMessage',(message)=>{
        console.log("createMessage",message);
        io.emit('newMessage',generateMessage(message.from,message.text));

    });


    socket.on('disconnect',() => {
        console.log("User was disconnected");
    });
});


server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});