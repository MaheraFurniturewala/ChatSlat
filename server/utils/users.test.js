const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    //creating c data
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "John",
            room: "Java",
        },
        {
            id: "2",
            name: "Pike",
            room: "C++",
        },
        {
            id: "3",
            name: "Moses",
            room: "Java",
        }]
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: "abcd",
            name: "Milo",
            room: "NodeJS",
        };
        let reUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for the Java room', () => {
        let userList = users.getUserList('Java');

        expect(userList).toEqual(['John', 'Moses']);
    });

    it('should return names for Scrubs Fans', () => {
        let userList = users.getUserList('C++');

        expect(userList).toEqual(['Pike']);
    });

    it('should find user', () => {
        let userID = '2',
            user = users.getUser(userID);
        expect(user.id).toBe(userID);
    });
    it('should not find user', () => {
        let userID = '12',
            user = users.getUser(userID);
        expect(user).toBeUndefined;
    });
    //to check id it is deleted from the array && it is returning user with the required id
    it('should not remove a user', () => {
        let userID = '108',
            user = users.removeUser(userID);
    
        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
      });
    
      it('should remove a user', () => {
        let userID = '1',
            user = users.removeUser(userID);
    
        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2);
      });
});