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

function printResult(result){
   console.log(`# of open PRs: ${result}`);

   // check if the user wants to search again
   var questions = [
        {
        type: 'input',
        name: 'action',
        message: "Search again? y/n"
        }
    ]
  
    inquirer.prompt(questions).then(answers => {

        if(answers['action'].toLowerCase() == 'yes' || answers['action'].toLowerCase() == 'y') {
            Main();
        } else {
            console.log(`bye then!`);
        }
    })
  
}

async function countPRs(repoOwner, repoName, count, page) {
    // The GitHub API limits results to 100 a request, so we need to iterate through the pages to count all PRs.
    // The maximum amount (100) are fetched per page to minimise requests and avoid throttling.
    // By default, the API returns OPEN PRs, so only open PRs are counted.

    // todo: handle 404 errors

    /* Available public repos to play with:
        octocat hello-world
        microsoft typescript
        octokit octokit.js
    */

    await octokit.request('GET /repos/{owner}/{repo}/pulls?per_page=100&page={page}', {
        owner: repoOwner,
        repo: repoName,
        page: page
    }).then(({ data }) => {

        count = count + data.length;

        if(data.length == 100) {
            // the maximum limit was reached, we need to check the next page
            page = page + 1;
            countPRs(repoOwner, repoName, count, page);
        } else {
            // if it didn't get to 100, then we will be on the last page.
            printResult(count);
        }

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
        
        countPRs(answers['owner'], answers['name'], 0, 1);

    })

}


Main();