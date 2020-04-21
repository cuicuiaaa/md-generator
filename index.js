const fs = require("fs");
const inquirer = require("inquirer");
const axios =require("axios");
//const getUser = require("./utils/api");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown");

writeFileAsync = util.promisify(fs.writeFile);

const questions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "username"
        },
        {
            type: "input",
            message: "What is your project's name",
            name: "project"
        },
        {
            type: "input",
            message: "Please write a short description of your project.",
            name: "description"
        },
        {
            type: "list",
            message: "What kind of license should your project have?",
            name: "license",
            choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
        },
        {
            type: "input",
            message: "What command should be run to install dependencies?",
            name: "install",
            default: "npm i"
        },
        {
            type: "input",
            message: "What command should be run to run tests?",
            name: "test",
            default: "npm test"
        },
        {
            type: "input",
            message: "what does the user need to know about using the repo?",
            name: "use"
        },
        {
            type: "input",
            message: "What does the user need to know about contributing to the repo?",
            name: "contribute"
        }
]);
};



const generateBadge = function(answers) {
    let badge = "";
    if (answers.license === "MIT") {
        badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (answers.license === "APACHE 2.0") {
        badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (answers.license === "GPL 3.0") {
        badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (answers.license === "BSD 3") {
        badge = "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
    };
    return badge;
};

const getUser = function(username) {
    const queryUrl = `https://api.github.com/users/${username}`;

    return axios
    .get(queryUrl)
    .then(function(res) { 
        const object = {
            picture: res.data.avatar_url,
            email: (res.data.email) ? res.data.email : "cuicuiaaa0307@gmail.com"
        }
        return object;
    })
};


async function init() {
    
    
    
    try {
        const answers = await questions();

        const badge = await generateBadge(answers);

        const userInforamtion = await getUser(answers.username);
        console.log(userInforamtion);

        const md = await generateMarkdown(answers, badge, userInforamtion.picture, userInforamtion.email);
        
        await writeFileAsync("readme.md", md);

        console.log("File written successfully!");
    } catch(err) {
        console.log(err);
    }
};

init();
