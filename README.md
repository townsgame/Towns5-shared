# `This project is very old and not maintained for a long time. So expect a very pure code quality, outdated dependencies and security issues.`

# 🌆Towns5 shared library

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
	├── [game]/                     <- game specific logic
	|   ├── [classes]/                 
	|   |   └── *.class.js       
	|   ├── [classes-static]/                
	|   |   └── *.static.js     	         
	|   ├── [inits]/           
	|   |   └── *.init.js       
	|   ├── [samples]/                
	|   |   └── *.sample.*     	         
	|   └── [test]/           
	|       └── *.test.js      	     
	├── [objects]/                  
	|   ├── [buildings]/             
	|   |   └── [main]/                
	|   |       └── *.building.js   <- buildings               
	|   ├── [stories]/              
	|   |   └── main.stories.js     <- stories
	|   └── [terrains]/             
	|       └── main.terrains.js    <- terrains
	├── .gitignore                  <- files ignored by git
	├── package.json                <- npm packages
	└── README.md                   <- guess what?

## How to run tests

**TODO: write tests**
