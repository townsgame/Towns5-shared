# `This project is very old and not maintained for a long time. So expect a very pure code quality, outdated dependencies and security issues.`

# πTowns5 shared library

This is shared library for Towns 5. All what is common between frontend and backend should be placed here. 

## How do I get set up?

You have to include this repo into your frontend or backend project. There are two ways to do that:
- git clone this repo and symlink it in your project
- add it as npm dependency and let npm to handle it for you

There are no dependencies at the moment, however if there will be any, they should be handled 
through npm's package.json. This shared library should not connect to any database or need any configuration. It is not
intended that this shared library will work on its own, so there are no deployment instructions. Code reviews are more
than welcomed.

## Usage

    gulp build

### Browser

       <script>
           var module={};
           var global=window;
       </script>
       <script src="path-to-towns-shared/build/towns-shared.js"></script>

### Node.js

    var T = require('path-to-towns-shared/build/towns-shared.js');

## Versioning

We use semver versioning. Example version 1.0.2 means 1st major release, zero features added and 2 patches fixed. When 
we tag master branch with version, please update this also in package.json file.

# Folder Structure

todo update

    [towns5shared]/                 <- root folder
	βββ [game]/                     <- game specific logic
	|   βββ [classes]/                 
	|   |   βββ *.class.js       
	|   βββ [classes-static]/                
	|   |   βββ *.static.js     	         
	|   βββ [inits]/           
	|   |   βββ *.init.js       
	|   βββ [samples]/                
	|   |   βββ *.sample.*     	         
	|   βββ [test]/           
	|       βββ *.test.js      	     
	βββ [objects]/                  
	|   βββ [buildings]/             
	|   |   βββ [main]/                
	|   |       βββ *.building.js   <- buildings               
	|   βββ [stories]/              
	|   |   βββ main.stories.js     <- stories
	|   βββ [terrains]/             
	|       βββ main.terrains.js    <- terrains
	βββ .gitignore                  <- files ignored by git
	βββ package.json                <- npm packages
	βββ README.md                   <- guess what?

## How to run tests

**TODO: write tests**
