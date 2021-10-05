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

/** Helper function to print the result and end the program */ 
function printResult(result){
    console.log(`# of open PRs: ${result}`);

    tryAgain();

}

function tryAgain(){

        // check if the user wants to search again
        var questions = [
            {
            type: 'input',
            name: 'action',
            message: "Search again? y/n"
            }
        ]
    
        // anything that is a clear yes is treated as a yes, and anything else is treated as a no so the program doesn't loop without the user definately wanting it to.
        inquirer.prompt(questions).then(answers => {
            if(answers['action'].toLowerCase() == 'yes' || answers['action'].toLowerCase() == 'y') {
                Main();
            } else {
                console.log(`bye then!`);
            }
        })
}

/**
 * This function calls the GitHub API to determine the number of open PRs for a given repo.
 * 
 * By default, the API returns OPEN PRs, so only open PRs are counted. The GitHub API limits results to 100 a request, so we need to iterate through 
 * the pages to count all PRs. Whenever a page is found to be full, the next page is checked by recursively calling this function. When the page 
 * is detected to not be full we know that these are the last results, and the cumulated count is passed on to the printResult() function.
 * 
 * @param repoOwner - inputted by user
 * @param repoName - inputted by user
 * @param count - the # of PRs counted in all previous pages (starts at 0)
 * @param page  - the page # currently being investigated
 */
async function countPRs(repoOwner, repoName, count, page) {

    /* Available public repos to play with:
        octocat hello-world
        microsoft typescript
        octokit octokit.js
    */
    
    // The maximum amount (100) are fetched per page to minimise requests and avoid throttling.
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

    }).catch( ( error ) =>
    {   
        if (error.status == 404){
            // the user likely entered invalid repo information
            console.log(`${repoOwner}/${repoName} could not be found :(`);
            tryAgain();
        } else if (error.status == 429) {
            // too many requests
            console.log(`Sorry! The maximum number of requests has been made to the server, please try again later.`);
            console.log(`Error: ${error}`);
        } else if (error.status == 408) {
            // timeout
            console.log(`Sorry! The request timed out, please try again later.`);
            console.log(`Error: ${error}`);
        } else {
            // another error occurred
            console.log(`Error: ${error}`);
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