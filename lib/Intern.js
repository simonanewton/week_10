// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee {
    constructor(user) {
        super(user);
        this.school = user.school;
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;
