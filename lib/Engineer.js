// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(user) {
        super(user);
        this.github = user.github;
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;
