const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//----------------------------------------------------------------------------------------

// prompts the user with relevant questions about the employee
function gatherEmployeeInfo() {
    const questions = [
        {
            type: "input",
            name: "name",
            message: "What is the employee name?",
            default: "Simon Newton",
            validate: (answer) => answer.length > 0 ? true : console.log("Please enter a name.")
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role at the company?",
            choices: ["Manager", "Engineer", "Intern"],
            default: 0
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's ID Number?",
            default: "12345",
            validate: (answer) => answer.length > 0 ? true : console.log("Please enter an id number.")
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email address?",
            default: "simonanewton@gmail.com",
            validate: (answer) => answer.length > 0 || answer.includes("@") ? true : console.log("Please enter a valid email address.")
        },
        {
            type: "number",
            name: "officeNumber",
            message: "What is the employee's office number?",
            default: "10",
            validate: (answer) => answer.length > 0 ? true : console.log("Please enter an office number."),
            when: (answers) => answers.role === "Manager"
        },
        {
            type: "input",
            name: "github",
            message: "What is the employee's GitHub username?",
            default: "simonanewton",
            validate: (answer) => answer.length > 0 ? true : console.log("Please enter a GitHub username."),
            when: (answers) => answers.role === "Engineer"
        },
        {
            type: "input",
            name: "school",
            message: "What school did the employee attend?",
            default: "Georgia Tech",
            validate: (answer) => answer.length > 0 ? true : console.log("Please enter a school name."),
            when: (answers) => answers.role === "Intern"
        },
        {
            type: "confirm",
            name: "additional",
            message: "Would you like to add another employee to your company?"
        }
    ];

    const employee = inquirer.prompt(questions);

    return employee;
}

// prompts the user with questions about their employees, creates an array of objects for each Employee
async function promptUser() {
    console.log("------");
    console.log("Welcome to the Employee Summary Template Engine!");
    console.log("------");

    const employeeArray = [];

    let employeeInfo = await gatherEmployeeInfo();
    employeeArray.push(employeeInfo);

    while (employeeInfo.additional) {
        console.log("------");
        employeeInfo = await gatherEmployeeInfo();
        employeeArray.push(employeeInfo);
    }

    console.log("------");
    console.log("Generating employee summary...");

    const employees = employeeArray.map((employee) => {
        switch (employee.role) {
            case "Manager":
                return new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
            case "Engineer":
                return new Engineer(employee.name, employee.id, employee.email, employee.github);
            case "Intern":
                return new Intern(employee.name, employee.id, employee.email, employee.school);
        }
    });

    return employees;
}

// writes html to the output folder in the root, if no output folder exists, creates one
function writeToOutput(data) {
    fs.access(OUTPUT_DIR, (err) => {
        if (err) {
            fs.mkdir(OUTPUT_DIR, (err) => {
                if (err) throw err;
            });
        }
        fs.writeFile(outputPath, data, (err) => {
            if (err) throw err;
    
            console.log("Success!");
            console.log("------");
        });
    });
}

//----------------------------------------------------------------------------------------

// prompts the user for employee information, renders HTML with that information, writes the HTML to a file in the output folder
async function init() {
    const employees = await promptUser();

    const summaryHTML = render(employees);

    writeToOutput(summaryHTML);
}

init();
