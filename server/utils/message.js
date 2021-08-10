let generateMessage = (from,text)=>{
    return {
        //or from:from
        from,
        text,
        createdAt: new Date().getTime()
        }
}

module.exports = {
    generateMessage
}