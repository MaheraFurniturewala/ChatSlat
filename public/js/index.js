
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
            const template = document.querySelector('#message-template').innerHTML;
            const html = Mustache.render(template);

            const div = document.createElement('div');
            div.innerHTML = html;

            document.querySelector('#messages').appendChild(div);
            // const formattedTime = moment(message.createdAt).format('LT');
            // console.log("New message",message);
            // let li = document.createElement('li');
            // li.innerText = `${message.from} ${formattedTime}: ${message.text}`;

            // document.querySelector('#messages').appendChild(li);
        });
        //for listening to createLocationMessage
        socket.on('newLocationMessage',function(message){
            const formattedTime = moment(message.createdAt).format('LT');
            console.log("newLocationMessage",message);
            let li = document.createElement('li');
            let a = document.createElement('a');
            li.innerText = `${message.from} ${formattedTime}: `;
            a.setAttribute('target','_blank');
            a.setAttribute('href',message.url);
            a.innerText='My Current Location';
            li.appendChild(a);

            document.querySelector('#messages').appendChild(li);
        });
// when we emit there are actually 3 args:
// 1)The event name
// 2)The data 
// 3)The callback when the server gets it
      
// stopping the form from refreshing the page and grabbing values at the same time

document.querySelector('#submit-btn').addEventListener('click',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:document.querySelector('input[name="message"]').value,

    },function(){

    });
});

document.querySelector('#send-location').addEventListener('click',function(e){
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }
    ///this takes in two functions
    // 1st function --> everything went well and it grabbed our location and it starts our process of location
    // 2nd function --> If something went wrong it will print it out
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            lat:position.coords.latitude,
            lng:position.coords.longitude,
        });
    },function(){
        alert("Unable to fetch location.");
    })
});

