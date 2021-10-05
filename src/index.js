const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');


const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({
    baseUrl: 'https://api.github.com'
});


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

async function countPRs(repoOwner, repoName) {

    // The GitHub API limits results to 100 a request, so we need to iterate through the pages to count all PRs.
    // The maximum amount (100) are fetched per page to minimise requests and avoid throttling.

    // todo: handle 404 errors

    /* Test data to play with:
        octocat hello-world
        microsoft typescript
    */

    await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner: repoOwner,
        repo: repoName
    }).then(({ data }) => {
        console.log(`we got: ${data.length}`);
    });

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
        
        countPRs(answers['owner'], answers['name']);

    })

}


Main();