class Users {
    constructor(name,age){
        //this refers to the instance(object) that is calling the class
        this.users = [];
    }
    addUser(id,name,room){
        let user = {
            id,
            name,
            room
        }
        this.users.push(user);
        return user;
    }

}

module.exports = {Users};