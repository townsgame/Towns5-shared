# Towns 5 Shared library

This is shared library for Towns 5. All what is common between frontend and backend should be placed here. 

## How do I get set up?

You have to include this repo into your frontend or backend project. There are two ways to do that:
- git clone this repo and symlink it in your project
- add it as npm dependency and let npm to handle it for you

There are no dependencies at the moment, however if there will be any, they should be handled 
through npm's package.json. This shared library should not connect to any database or need any configuration. It is not
intended that this shared library will work on its own, so there are no deployment instructions. Code reviews are more
than welcomed.

## How to run tests

**TODO: write tests**