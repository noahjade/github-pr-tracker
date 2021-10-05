const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const octokit = require('@octokit/rest');

clear();

console.log(
  // Hex colour taken from Multitudes website
  chalk.hex('#6DD8AA')(
    figlet.textSync('Multitudes CLI', { horizontalLayout: 'fitted' })
  )
);