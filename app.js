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

async function gatherUserInfo() {
    const introduction = [
        {
            type: "input",
            message: "What is your name?",
            name: "userName",
            default: "Simon Newton",
            validate: (response) => response.length === 0 ? console.log("Please enter a name.") : true
        },
        {
            type: "list",
            message: "What is your role at the company?",
            choices: ["Manager", "Engineer", "Intern"],
            name: "userRole",
            default: 0
        },
        {
            type: "input",
            message: "What is your ID Number?",
            name: "userID",
            default: "12345"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "userEmail",
            default: "simonanewton@gmail.com",
            validate: (response) => response.length === 0 || !response.includes("@") ? console.log("Please enter a valid email address.") : true
        }
    ];

    const manager = [
        {
            type: "input",
            message: "What is your Office Number?",
            name: "userOffice",
            default: "01",
            validate: (response) => response.length === 0 ? console.log("Please enter an office number.") : true
        }
    ];

    const engineer = [
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "userGitHub",
            default: "simonanewton",
            validate: (response) => response.length === 0 ? console.log("Please enter a GitHub username.") : true
        }
    ];

    const intern = [
        {
            type: "input",
            message: "What school did you attend?",
            name: "userSchool",
            default: "Georgia Tech",
            validate: (response) => response.length === 0 ? console.log("Please enter a school name.") : true
        }
    ];

    console.log("Welcome to the Employee Summary Template Engine!");
    console.log("-----");
    const user = await inquirer.prompt(introduction);

    if (user.userRole === "Manager") await inquirer.prompt(manager);
    else if (user.userRole === "Engineer") await inquirer.prompt(engineer);
    else if (user.userRole === "Intern") await inquirer.prompt(intern);

    console.log("-----");

    return user;
}

//----------------------------------------------------------------------------------------

async function init() {
    const userInfo = await gatherUserInfo();

    console.log(userInfo);
}

init();

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
