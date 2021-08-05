
        let socket = io();
        //now when it is connected what to do:
        socket.on('connect',function(){
            //this will show when you inspect the page
            console.log("Connected to server.");

        });
        //this will log when the server is up or down
        socket.on('disconnect',function(){
            console.log("Disconnected from the server");
        });
        
        socket.on('newMessage',function(message){
            console.log("New message",message);
        })