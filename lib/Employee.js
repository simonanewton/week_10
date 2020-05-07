// TODO: Write code to define and export the Employee class

class Employee {
    constructor(user) {
        this.name = user.name;
        this.role = user.role;
        this.id = user.id;
        this.email = user.email;
    }

    getName() {
        return this.name;
    }

    getRole() {
        return this.role;
    }

    getID() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }
}

module.exports = Employee;
