const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const completeTeam = [];

const manager = async () => {
  const managerInputs = await inquirer.prompt([
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
  ]);

  const manager = new Manager(
    managerInputs.name,
    managerInputs.id,
    managerInputs.email,
    managerInputs.officeNumber
  );
  completeTeam.push(manager);
  console.table(manager);
  return menu();
};

const engineer = async () => {
  const engineerInputs = await inquirer.prompt([
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
  ]);

  const engineer = new Engineer(
    engineerInputs.name,
    engineerInputs.id,
    engineerInputs.email,
    engineerInputs.github
  );
  completeTeam.push(engineer);
  console.table(engineer);
  return menu();
};

const intern = async () => {
  const internInputs = await inquirer.prompt([
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
  ]);

  const intern = new Intern(
    internInputs.name,
    internInputs.id,
    internInputs.email,
    internInputs.school
  );
  completeTeam.push(intern);
  console.table();
  return menu();
};

const menu = async () => {
  const chosenOption = await inquirer.prompt([
    {
      type: "List",
      name: "menu",
      message: "Add an engineer or intern to the team?",
      choices: ["Engineer", "Intern", "Finish building the team"],
    },
  ]);

  if (chosenOption.menu === "Engineer") {
    await engineer();
  } else if (chosenOption.menu === "Intern") {
    await intern();
  } else {
    console.log("Team:", completeTeam);
    return;
  }
};

function writeToFile(fileName, data) {
  const OUTPUT_DIR = path.resolve(__dirname, "output");

  // checking if the output folder exists, and create it if not
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const outputPath = path.join(OUTPUT_DIR, fileName);
  fs.writeFile(outputPath, data, (err) =>
    err
      ? console.error(err)
      : console.log("Success! File written to:", outputPath)
  );
}

manager().then(() => {
  console.log("Team building completed!");
  // call writeToFile function with filename and contents
  writeToFile("team.html", render(completeTeam));
});
