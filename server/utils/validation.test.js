const expect = require('expect');

const {isRealString} = require('./isRealString');

describe('is Real String',()=>{
    it('should reject non-string values',()=>{
        let res = isRealString(78);
        expect(res).toBe(false);
        
    });

    it('should reject string with only spaces',()=>{
        let res = isRealString(' ');
        expect(res).toBe(false);
        
        
    });

    it('should allow string with non-space characters',()=>{
        let res = isRealString('    Mahera     ');
        expect(res).toBe(true);


    });
    it('should allow strings with no  spaces at all',()=>{
        let res = isRealString('asdfdgfhgfjhkhj');
        expect(res).toBe(true);
    })
});