//implement testing units
//install mocha and expect libraries

const expect = require('expect');

let {generateMessage,generateLocationMessage} = require('./message');

describe('Generate Message',()=>{
    it("should generate correct message object",()=>{
        //dummy data
        let from = "Mahera",
        text = "some random text",
        message = generateMessage(from,text);

        expect(typeof message.createdAt).toBe('number');
        //what we expect message to return in response
        //so we want it to match from and text atleast
        expect(message).toMatchObject({
            from,
            text
        });
    })
})

describe('Generate Location Message',()=>{
    it('should generate correct location object',()=>{
        let from = 'Mahera',
            lat = 23489,
            lng = 8778,
            url = `https://www.google.com/maps?q=${lat},${lng}`,
            message = generateLocationMessage(from,lat,lng)

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url})
            
    });
});