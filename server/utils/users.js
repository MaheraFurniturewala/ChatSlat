class Users {
    constructor() {
        //this refers to the instance(object) that is calling the class
        this.users = [];
    }
    addUser(id, name, room) {
        let user = { id, name, room }
        this.users.push(user);
        return user;
    }

    getUserList(room) {
        //filtering every user that has a room of user.room(here i will get the user object)
        let users = this.users.filter((user) =>  user.room === room );
        //names of those uses who are in that room
        let namesArray = users.map((user) =>  user.name );
        return namesArray;
    }

    getUser(id){
        return this.users.filter((user)=> user.id === id)[0];
    }

    removeUser(id){
        let user = this.getUser(id);
          if(user){
          this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }


}

module.exports = { Users };