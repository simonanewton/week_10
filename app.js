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

function gatherUserInfo() {
    const questions = [
        {
            type: "input",
            name: "name",
            message: "What is the employee name?",
            default: "Simon Newton",
            validate: (answers) => answers.length > 0 ? true : console.log("Please enter a name.")
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
            validate: (answers) => answers.length > 0 ? true : console.log("Please enter an id number.")
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email address?",
            default: "simonanewton@gmail.com",
            validate: (answers) => answers.length > 0 || answers.includes("@") ? true : console.log("Please enter a valid email address.")
        },
        {
            type: "number",
            name: "office",
            message: "What is the employee's office number?",
            default: "10",
            validate: (answers) => answers.length > 0 ? true : console.log("Please enter an office number."),
            when: (answers) => answers.role === "Manager"
        },
        {
            type: "input",
            name: "github",
            message: "What is the employee's GitHub username?",
            default: "simonanewton",
            validate: (answers) => answers.length > 0 ? true : console.log("Please enter a GitHub username."),
            when: (answers) => answers.role === "Engineer"
        },
        {
            type: "input",
            name: "school",
            message: "What school did the employee attend?",
            default: "Georgia Tech",
            validate: (answers) => answers.length > 0 ? true : console.log("Please enter a school name."),
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

async function promptUser() {
    console.log("------");
    console.log("Welcome to the Employee Summary Template Engine!");
    console.log("------");

    const employeeArray = [];

    async function repeatPrompt() {
        const employee = await gatherUserInfo();
        
        switch (employee.role) {
            case "Manager":
                employeeArray.push(new Manager(employee));
                break;
            case "Engineer":
                employeeArray.push(new Engineer(employee));
                break;
            case "Intern":
                employeeArray.push(new Intern(employee));
                break;
        }

        if (employee.additional) {
            console.log("------")
            repeatPrompt();
        }
        
        else {
            console.log("------");
            console.log("Generating employee summary...");
        }
    }

    await repeatPrompt();

    return employeeArray;
}

//----------------------------------------------------------------------------------------

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error) => {
        if (error) throw error;

        console.log("Success!");
        console.log("------");
    })
}

async function init() {
    const employees = await promptUser();

    // console.log(employees);

    const summaryHTML = render(employees);

    // writeToFile(outputPath, summaryHTML);
    writeToFile("team.html", summaryHTML);
}

init();

//----------------------------------------------------------------------------------------

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
