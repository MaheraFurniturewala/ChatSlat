
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
        });
// when we emit there are actually 3 args:
// 1)The event name
// 2)The data 
// 3)The callback when the server gets it
        socket.emit('createMessage',{
            from:'John',
            text:'Hey!!!'
        }, function(message){
            console.log("Server Got it   ",message);
        });