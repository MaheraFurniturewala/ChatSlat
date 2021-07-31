const path = require('path');
const express = require('express');


const publicPath = path.join(__dirname, '/../public');  //since the public folder will be the statics
const port = process.env.PORT || 3000;
var app = express();

//build static folder
app.use(express.static(publicPath));


app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});