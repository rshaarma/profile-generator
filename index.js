const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = [];

function start() {
  managerQuestions();
}

function managerQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the team manager?",
      },
      {
        type: "input",
        name: "id",
        message: "Team Manager's ID number",
      },
      {
        type: "input",
        name: "email",
        message: "Team Manager's email address",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Team Manager's office number",
      },
    ])
    .then((value) => {
      const manager = new Manager(
        value.name,
        value.id,
        value.email,
        value.officeNumber
      );
      team.push(manager);
      addTeamMember();
    });
}
function addTeamMember() {
  inquirer
    .prompt([
      {
        type: "List",
        name: "type",
        message: "Add an engineer or intern to the team?",
        choices: ["Engineer", "Intern", "Finish building the team"],
      },
    ])
    .then((value) => {
      if (value.type === "Engineer") {
        engineerInputs();
      } else if (value.type === "Intern") {
        internInputs();
      } else {
        createFile();
      }
    });
}

function engineerInputs() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "Engineer's ID number",
      },
      {
        type: "input",
        name: "email",
        message: "Engineer's email address",
      },
      {
        type: "input",
        name: "github",
        message: "What is the Engineer's Github Username?",
      },
    ])
    .then((value) => {
      const engineer = new Engineer(
        value.name,
        value.id,
        value.email,
        value.github
      );
      team.push(engineer);
      addTeamMember();
    });
}

function internInputs() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Intern's",
      },
      {
        type: "input",
        name: "id",
        message: "Intern's ID number",
      },
      {
        type: "input",
        name: "email",
        message: "Intern's email address:",
      },
      {
        type: "input",
        name: "school",
        message: "What school did the intern attend?",
      },
    ])
    .then((value) => {
      const intern = new Intern(
        value.name,
        value.id,
        value.email,
        value.school
      );
      team.push(intern);
      addTeamMember();
    });
}

function createFile() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  } else {
    fs.writeFileSync(outputPath, render(team), "UTF-8");
  }
}
start();
