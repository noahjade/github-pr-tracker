# github-pr-tracker
```
 _  _  _ _______        _______  _____  _______ _______      _______  _____
 |  |  | |______ |      |       |     | |  |  | |______         |    |     |
 |__|__| |______ |_____ |_____  |_____| |  |  | |______         |    |_____|

  __  __         _  _    _  _               _               ____  _      ___
 |  \/  | _   _ | || |_ (_)| |_  _   _   __| |  ___  ___   / ___|| |    |_ _|
 | |\/| || | | || || __|| || __|| | | | / _` | / _ \/ __| | |    | |     | |
 | |  | || |_| || || |_ | || |_ | |_| || (_| ||  __/\__ \ | |___ | |___  | |
 |_|  |_| \__,_||_| \__||_| \__| \__,_| \__,_| \___||___/  \____||_____||___|
```

A CLI that uses the Github API to determine how many open PRs there are in a given public repo.

## How to install and run:
1) Clone repo
2) Open repo location in terminal
3) Enter command ```npm install```
4) Enter command ```node src/index.js```

## How to use
You will be prompted to enter the owner of the repo and the name of the repo you wish to count PRs for.  
  
If you enter invalid information, you will be prompted on whether you want to try again.


## Extra details
Developed in Node.js

#### Packages used:

* Chalk - for colouring and formatting the command line output.
* Figlet - for creating ASCII art from text.
* Clear - to clear the terminal screen and keep it clean.
* Inquirer - for command line i/o
* @octokit/rest - a Github REST API client for Node.js.

```
        __
   (___()'`;  < Thank you for your time!
   /,    /`
   \\"--\\
```
