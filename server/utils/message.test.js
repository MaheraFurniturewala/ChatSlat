//implement testing units
//install mocha and expect libraries

const expect = require('expect');

let {generateMessage} = require('./message');

describe('Generate Message',()=>{
    it("should generate correct message object",()=>{
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
