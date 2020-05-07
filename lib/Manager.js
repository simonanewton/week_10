// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee {
    constructor(user) {
        super(user);
        this.office = user.office;
    }

    getOfficeNumber() {
        return this.office;
    }
}

module.exports = Manager;
