const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const octokit = require('@octokit/rest');
const inquirer = require('inquirer');


/** Helper function to print welcome message */ 
function printWelcome(){
    console.log(
        chalk.hex('#24B88F')(
          figlet.textSync('Welcome to', { horizontalLayout: 'fitted' }) //todo: format these nicely
        )
    );

    console.log(
        // Hex colour taken from Multitudes website
        chalk.hex('#6DD8AA')(
          figlet.textSync('Multitudes CLI', { horizontalLayout: 'fitted' })
        )
    );
}


function Main(){
    clear();

    printWelcome();

    var questions = [
        {
          type: 'input',
          name: 'owner',
          message: "Who is the repo owner?"
        },
        {
            type: 'input',
            name: 'name',
            message: "What is the repo name?"
        }
      ]
      
    inquirer.prompt(questions).then(answers => {
        console.log(`Counting open PR requests for ${answers['owner']}/${answers['name']}!`)
    
    })

}


Main();