const moment = require('moment');

let generateMessage = (from,text)=>{
    // console.log(moment().valueOf());
    return {
        //or from:from
        from,
        text,
        createdAt: moment().valueOf()
        }
}

let generateLocationMessage = (from,lat,lng)=>{
    return {
        from,
        url:`https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: moment().valueOf()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage,
}
