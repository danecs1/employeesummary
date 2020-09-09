const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


const render = require("./lib/htmlRenderer");


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
// for the provided `render` function to work! ```

const teamArray = [];

//Questions for team members

// This holds questions specific to the manager
const managerQuestions = [
    {
        type: 'input',
        name: 'managerName',
        message: 'Please enter the name of the manager of this team or your name if you are the manager of this team'
    },

    {
        type: 'input',
        name: 'managerID',
        message: 'Please enter the ID of the manager of this team or your ID if you are the manager of this team'
    },

    {
        type: 'input',
        name: 'managerEmail',
        message: 'Please enter the email of the manager of this team or your email if you are the manager of this team'
    },

    {
        type: 'input',
        name: 'officeNumber',
        message: 'Please enter the office number of the manager of this team or your office number if you are the manager of this team'
    }
]


// Questions specific to the engineer
const engineerQuestions = [
    {
        type: 'input',
        name: 'engineerName',
        message: 'Enter the name of this engineer'
    },

    {
        type: 'input',
        name: 'engineerID',
        message: 'Enter the ID of this engineer'
    },

    {
        type: 'input',
        name: 'engineerEmail',
        message: 'Enter the email of this engineer'
    },

    {
        type: 'input',
        name: 'github',
        message: 'Enter the github username of this engineer'
    }
]

// Questions specific to the interns
const internQuestions = [
    {
        type: 'input',
        name: 'internName',
        message: 'Enter the name of this intern'
    },

    {
        type: 'input',
        name: 'internID',
        message: 'Enter the ID of this intern'
    },

    {
        type: 'input',
        name: 'internEmail',
        message: 'Enter the email of this intern'
    },

    {
        type: 'input',
        name: 'school',
        message: 'Enter the school of this intern'
    }
]

//This will check if the user wants to add more team members
const promptQuestion = [
    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Select the type of team member you would like to add next, if you are done, select "Done" to generate your team',
        choices: ['Engineer', 'Intern', 'Done']
    }
]
//End of questions

// This function processes user input for the manager
function promptManager() {
    inquirer.prompt(managerQuestions).then((response) => {

        let { managerName, managerID, managerEmail, officeNumber } = response;

        //create a manager object
        let newManager = new Manager(managerID, managerName, managerEmail, officeNumber);

        //push the newly created manager detail to the initially declared team array
        teamArray.push(newManager);
        next();
    })
}


// This function processes user input for the engineer
function promptEngineer() {
    inquirer.prompt(engineerQuestions).then((response) => {


        let { engineerName, engineerID, engineerEmail, github } = response;

        //create an engineer object
        let newEngineer = new Engineer(engineerID, engineerName, engineerEmail, github);

        //push the newly created engineer detail to the initially declared team array
        teamArray.push(newEngineer);
        next();
    })
}


// This function processes user input about the intern
function promptIntern() {
    inquirer.prompt(internQuestions).then((response) => {

        let { internName, internID, internEmail, school } = response;

        //create a new intern object
        let newIntern = new Intern(internID, internName, internEmail, school);

        //push the newly created intern detail to the initially declared team array
        teamArray.push(newIntern);
        next();
    })
}


//This function prompts users to select the next type of employee they are adding
function next() {
    inquirer.prompt(promptQuestion).then((response) => {

        if (response.nextEmployee === 'Engineer') {
            promptEngineer();
        }

        else if (response.nextEmployee === 'Intern') {
            promptIntern();
        }

        else {
            console.log('Hurray, you are done creating your team');
            makeTeam();
        }

    })
}

//This function writes the output into the html file
function makeTeam() {
    fs.writeFile(outputPath, render(teamArray), function (err) {
        if (err) {
            console.log(err);
            return;
        }
    })
}

//This function starts the prompting process since each team will always have a manager and the manager will handle the selection process
function init() {
    promptManager();
}


//starts the chain of prompts
init();
