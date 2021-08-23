const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/isRealString');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '/../public');  //since the public folder will be the statics
const port = process.env.PORT || 8000;
let app = express();
//we did not have this instance in our express app that is why we needed to create our own server so we could pass it in socket.io
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

//build static folder
app.use(express.static(publicPath));

//this io(server instance) is going to listen to a pre-built event-->connection event
//this socket(in the callback is the same that we have in the client side io method)
io.on('connection', (socket) => {
    console.log("A new user just connected");
    //for everybody (individually) that connects to the server(basically this will only be sent to the user whi just joined in)


    socket.on('join', (params, callback) => {
      
        if (!isRealString(params.name) || !isRealString(params.room)) {
            console.log("inside the error part");
            return callback('Name and room are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUsersList',users.getUserList(params.room));

        
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        //everybody but the current user(basically to everyone except the user who just joined in)
        socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));
    })

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));
        }
        //send it to everybody in the network
        
        callback('This is the server!');

    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lng));
        }
        
    });

//here we need to re-update the list because even when we refresh it ahs to be considered as a disconnect
    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUsersList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left ${user.room} chat room.`))
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

